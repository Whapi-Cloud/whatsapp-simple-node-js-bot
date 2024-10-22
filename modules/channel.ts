import { WebHook } from "../types/index";
import { webhookUrl } from "../config.json";
import * as fs from "fs";

export class Channel {
    token: string;
    constructor(token: string) {
        this.token = token;
    }

    async checkHealth() {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                authorization: `Bearer ${this.token}`,
            },
        };
        try {
            const responseRaw = await fetch("https://gate.whapi.cloud/health", options);
            const response = await responseRaw.json();
            if (response.status.text !== "AUTH") throw "Channel not auth";
        }
        catch (e) {
            console.log(e)
            throw "Channel not found";
        }

    }

    async sendMessage(to: string, body: string): Promise<boolean> {
        const options = {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({ typing_time: 0, to, body }),
        };

        const responseRaw = await fetch(
            "https://gate.whapi.cloud/messages/text",
            options
        );
        const response = await responseRaw.json();
        return response.sent;
    }

    async setWebHook(): Promise<boolean> {
        const fullWebhookUrl = webhookUrl + "/hook";
        const currentHooks = await this.getWebHooks();
        if (currentHooks.find((elem) => elem.url === fullWebhookUrl)) return true;
        const index = currentHooks.findIndex((elem) => elem.url.includes("ngrok"));
        if (index !== -1) currentHooks[index].url = fullWebhookUrl;
        else
            currentHooks.push({
                events: [{ type: "messages", method: "post" }],
                mode: "body",
                url: fullWebhookUrl,
            });
        const options = {
            method: "PATCH",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({ webhooks: currentHooks }),
        };

        const responseRaw = await fetch(
            "https://gate.whapi.cloud/settings",
            options
        );
        if (responseRaw.status !== 200) return false;
        return true;
    }

    async getWebHooks(): Promise<WebHook[]> {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                authorization: `Bearer ${this.token}`,
            },
        };

        const responseRaw = await fetch(
            "https://gate.whapi.cloud/settings",
            options
        );
        const response = await responseRaw.json();
        return response.webhooks;
    }

    async sendLocalJPG(filePath: string, to: string, caption?: string): Promise<string> {
        let media: string;
        const base64 = fs.readFileSync(filePath, "base64"); // file to base64
        if (!base64 || base64 === "") {
            return "File is empty!";
        }
        console.log(`Encoded file: ${base64}`); // Log base64
        const fileName = filePath.split("/").pop(); // Get fileName from filePath
        media = `data:image/jpeg;name=${fileName};base64,${base64}`; // if you need send png - change jpeg to png
        const options = {
            method: "POST",
            headers: {
                authorization: `Bearer ${this.token}`,
                accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                to,
                media,
                caption
            }),
        };
        const url = "https://gate.whapi.cloud/messages/image";
        const response = await fetch(url, options);
        if (response.status === 200) return "success"
        throw response.statusText
    }
}

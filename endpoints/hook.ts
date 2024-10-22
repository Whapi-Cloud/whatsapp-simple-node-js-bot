import { Channel } from "../modules";
import config from "../config.json";

export async function handler(req, res) {
    const message = req.body.messages[0]; // message info
    const isMe = message.from_me;
    if (isMe) // if recieved message from me - skip
        return res.status(200).send("OK");
    const type = message.type; // type of message
    if (type !== "text") return res.status(200).send("OK")
    const senderPhone = message.chat_id.replace("@s.whatsapp.net", ""); // get sender phone
    const recievedText = message.text.body.toLowerCase(); // get recieved message
    const channel = new Channel(config.token);
    await channel.checkHealth();
    switch (recievedText) {
        case "help": {
            await channel.sendMessage(senderPhone, "Text1"); // 1 arg is phone number. 2 arg is text message
            break;
        }
        case "command": {
            await channel.sendMessage(senderPhone, "Text2");
            break;
        }
        case "image": {
            await channel.sendLocalJPG("./images/example.jpg", senderPhone, "Caption")
            break;
        }
        default: {
            await channel.sendMessage(senderPhone, "Unknown command");
            break;
        }
    }

    return res.status(200).send("OK");
}
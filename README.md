# Simple WhatsApp Bot - Node.js

This project is a simple WhatsApp bot built with **Node.js**. It’s an ideal solution for beginner developers looking to get started with WhatsApp bot development. The bot is capable of responding to several commands with both text and images.

## Prerequisites

Before you get started, ensure that you have **Node.js** installed on your machine. If you haven't installed it yet, you can download it from the official [Node.js website](https://nodejs.org/).

## Setup Instructions

To get the bot up and running, follow these steps:

1. **Obtain an API token from [Whapi.Cloud](https://panel.whapi.cloud/register):**
   - Once you have the token, insert it into the `config.json` file under the `token` field. To get started with Whapi.Cloud and find your token, check out this article: [Getting Started with Whapi.Cloud](https://support.whapi.cloud/help-desk/getting-started/getting-started).

2. **Set up a webhook:**
   - You will also need to provide a webhook URL in `config.json`. 
   - If you're unsure where to get a webhook URL, refer to our [Knowledge Base article](https://support.whapi.cloud/help-desk/receiving/webhooks/where-to-find-the-webhook-url).

3. **Install dependencies and run the bot:**
   - Run the following commands:
     ```bash
     npm install
     npm run start
     ```

## Project Structure

- **index.js:**
  - This file checks the functionality of the WhatsApp channel and verifies the token. It also sets up the webhook through the API (there's no need to set up the webhook manually through the interface).
  
- **/modules/channel.ts:**
  - Functions to check channel health (`checkHealth()`), send messages (`sendMessage()`), set the webhook (`setWebHook()`), check existing webhooks (`getWebHooks()`), and send images (`sendLocalJPG()`). The `sendLocalJPG()` function converts a JPG file from the `/images/` folder into Base64 format.

- **/endpoints/hook.ts:**
  - Contains the core bot logic:
    - It listens for incoming messages and skips outgoing ones.
    - It processes incoming messages, fetching the sender's number and text.
    - Non-text messages are ignored.
    - A switch-case logic is implemented to handle different incoming commands and respond accordingly.

## Usage

After setting up the bot, you can test its functionality by sending messages to the connected WhatsApp channel. Once the WhatsApp account is connected to the channel, it becomes a bot. To test it, send a message to the connected number from a different phone number. Depending on the command you send, the bot will respond with either text or an image.
- On receiving the message `help`, the bot will reply with **Text1**.
- For the message `command`, it will respond with **Text2**.
- On the `image` command, it will send a message.
You will be able to change this yourself in the script.

## Learn More

For a detailed walkthrough on how to configure and use this bot, check out our YouTube tutorial: [YouTube Video Link].

---

### Need Help?

If you have any questions or issues, feel free to refer to our [Knowledge Base](https://support.whapi.cloud/help-desk/source-code/whatsapp-chatbot/whatsapp-node-js-bot) or reach out to our support team at **care@whapi.cloud**.

Happy Coding!

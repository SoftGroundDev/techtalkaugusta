import { j as json } from "../../../../chunks/index.js";
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;
const POST = async ({ request }) => {
  try {
    const event = await request.json();
    const message = {
      content: `🎉 **New Event: ${event.title}**

📅 **Date:** ${new Date(event.date).toLocaleDateString()}
⏰ **Time:** ${event.time}
📍 **Location:** ${event.location}

${event.description}

Register here: ${event.registrationUrl}`
    };
    const response = await fetch(`https://discord.com/api/v10/channels/${DISCORD_CHANNEL_ID}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bot ${DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    });
    if (!response.ok) {
      throw new Error("Failed to send message to Discord");
    }
    return json({ success: true });
  } catch (error) {
    console.error("Error syncing event to Discord:", error);
    return json({ success: false, error: "Failed to sync event with Discord" }, { status: 500 });
  }
};
export {
  POST
};

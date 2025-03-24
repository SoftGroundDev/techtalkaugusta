import { j as json } from "../../../../../chunks/index.js";
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;
const POST = async ({ request }) => {
  try {
    const { event, reminderTime } = await request.json();
    const eventDate = /* @__PURE__ */ new Date(`${event.date}T${event.time}`);
    const reminderDate = new Date(reminderTime);
    const timeUntilReminder = reminderDate.getTime() - Date.now();
    setTimeout(async () => {
      const message = {
        content: `🔔 **Reminder: ${event.title}**

The event starts in 1 hour!

📅 **Date:** ${new Date(event.date).toLocaleDateString()}
⏰ **Time:** ${event.time}
📍 **Location:** ${event.location}

${event.description}

Register here: ${event.registrationUrl}`
      };
      await fetch(`https://discord.com/api/v10/channels/${DISCORD_CHANNEL_ID}/messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bot ${DISCORD_BOT_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
      });
    }, timeUntilReminder);
    return json({ success: true });
  } catch (error) {
    console.error("Error scheduling reminder:", error);
    return json({ success: false, error: "Failed to schedule reminder" }, { status: 500 });
  }
};
export {
  POST
};

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { event, reminderTime } = await request.json();

		// Calculate time until reminder
		const eventDate = new Date(`${event.date}T${event.time}`);
		const reminderDate = new Date(reminderTime);
		const timeUntilReminder = reminderDate.getTime() - Date.now();

		// Schedule the reminder
		setTimeout(async () => {
			const message = {
				content: `🔔 **Reminder: ${event.title}**\n\n` +
					`The event starts in 1 hour!\n\n` +
					`📅 **Date:** ${new Date(event.date).toLocaleDateString()}\n` +
					`⏰ **Time:** ${event.time}\n` +
					`📍 **Location:** ${event.location}\n\n` +
					`${event.description}\n\n` +
					`Register here: ${event.registrationUrl}`
			};

			// Send reminder to Discord
			await fetch(`https://discord.com/api/v10/channels/${DISCORD_CHANNEL_ID}/messages`, {
				method: 'POST',
				headers: {
					'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(message)
			});
		}, timeUntilReminder);

		return json({ success: true });
	} catch (error) {
		console.error('Error scheduling reminder:', error);
		return json({ success: false, error: 'Failed to schedule reminder' }, { status: 500 });
	}
}; 
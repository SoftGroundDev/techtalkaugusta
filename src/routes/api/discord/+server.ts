import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

export const POST: RequestHandler = async ({ request }) => {
	try {
		const event = await request.json();

		// Format the event message for Discord
		const message = {
			content: `🎉 **New Event: ${event.title}**\n\n` +
				`📅 **Date:** ${new Date(event.date).toLocaleDateString()}\n` +
				`⏰ **Time:** ${event.time}\n` +
				`📍 **Location:** ${event.location}\n\n` +
				`${event.description}\n\n` +
				`Register here: ${event.registrationUrl}`
		};

		// Send to Discord channel
		const response = await fetch(`https://discord.com/api/v10/channels/${DISCORD_CHANNEL_ID}/messages`, {
			method: 'POST',
			headers: {
				'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(message)
		});

		if (!response.ok) {
			throw new Error('Failed to send message to Discord');
		}

		return json({ success: true });
	} catch (error) {
		console.error('Error syncing event to Discord:', error);
		return json({ success: false, error: 'Failed to sync event with Discord' }, { status: 500 });
	}
}; 
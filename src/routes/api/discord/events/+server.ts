import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_BOT_URL = process.env.DISCORD_BOT_URL || 'http://localhost:3001'; // Update with your bot's URL

// Simple in-memory cache
let cache = {
	events: null,
	lastFetch: 0
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const GET: RequestHandler = async () => {
	try {
		// Check cache first
		const now = Date.now();
		if (cache.events && (now - cache.lastFetch) < CACHE_DURATION) {
			return json({ events: cache.events });
		}

		// Fetch events from the bot's API
		const response = await fetch(`${DISCORD_BOT_URL}/api/events`, {
			headers: {
				Authorization: `Bearer ${DISCORD_BOT_TOKEN}`
			}
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || 'Failed to fetch events from bot');
		}

		const data = await response.json();
		
		// Transform the events to match our frontend format
		const events = data.events.map((event: any) => ({
			id: event.id,
			title: event.title,
			date: event.date,
			time: event.time,
			location: event.location,
			description: event.description,
			registrationUrl: event.registrationUrl,
			createdAt: new Date().toISOString()
		}));

		// Update cache
		cache = {
			events,
			lastFetch: now
		};

		return json({ events });
	} catch (error) {
		console.error('Error fetching events from bot:', error);
		
		// If we have cached events, return them even if they're expired
		if (cache.events) {
			return json({ 
				events: cache.events,
				error: 'Using cached data due to fetch error'
			});
		}

		return json({ 
			error: 'Failed to fetch events',
			details: error instanceof Error ? error.message : 'Unknown error'
		}, { status: 500 });
	}
}; 
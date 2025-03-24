import { j as json } from "../../../../../chunks/index.js";
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_BOT_URL = process.env.DISCORD_BOT_URL || "http://localhost:3001";
let cache = {
  events: null,
  lastFetch: 0
};
const CACHE_DURATION = 5 * 60 * 1e3;
const GET = async () => {
  try {
    const now = Date.now();
    if (cache.events && now - cache.lastFetch < CACHE_DURATION) {
      return json({ events: cache.events });
    }
    const response = await fetch(`${DISCORD_BOT_URL}/api/events`, {
      headers: {
        Authorization: `Bearer ${DISCORD_BOT_TOKEN}`
      }
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch events from bot");
    }
    const data = await response.json();
    const events = data.events.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      registrationUrl: event.registrationUrl,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    }));
    cache = {
      events,
      lastFetch: now
    };
    return json({ events });
  } catch (error) {
    console.error("Error fetching events from bot:", error);
    if (cache.events) {
      return json({
        events: cache.events,
        error: "Using cached data due to fetch error"
      });
    }
    return json({
      error: "Failed to fetch events",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
};
export {
  GET
};

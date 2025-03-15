const axios = require('axios');

class EventbriteManager {
    constructor() {
        this.apiToken = process.env.EVENTBRITE_TOKEN;
        this.organizationId = process.env.EVENTBRITE_ORGANIZATION_ID;
        this.baseUrl = 'https://www.eventbriteapi.com/v3';
    }

    async getHeaders() {
        return {
            'Authorization': `Bearer ${this.apiToken}`,
            'Content-Type': 'application/json'
        };
    }

    async getEvent(eventId) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/events/${eventId}`,
                { headers: await this.getHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Failed to fetch Eventbrite event:', error.response?.data || error.message);
            throw error;
        }
    }

    async createEvent(eventData) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/organizations/${this.organizationId}/events/`,
                {
                    event: {
                        name: { html: eventData.title },
                        description: { html: eventData.description || '' },
                        start: {
                            timezone: 'America/New_York',
                            utc: new Date(`${eventData.date}T${eventData.time}`).toISOString()
                        },
                        end: {
                            timezone: 'America/New_York',
                            utc: new Date(`${eventData.date}T${eventData.time}`).toISOString()
                        },
                        venue_id: process.env.EVENTBRITE_VENUE_ID,
                        capacity: 100,
                        currency: 'USD',
                        online_event: false,
                        listed: true,
                        shareable: true,
                        invite_only: false,
                        show_remaining: true,
                        is_free: true
                    }
                },
                { headers: await this.getHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Failed to create Eventbrite event:', error.response?.data || error.message);
            throw error;
        }
    }

    async cancelEvent(eventId) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/events/${eventId}/cancel/`,
                { headers: await this.getHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Failed to cancel Eventbrite event:', error.response?.data || error.message);
            throw error;
        }
    }

    async getAttendees(eventId) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/events/${eventId}/attendees/`,
                { headers: await this.getHeaders() }
            );
            return response.data.attendees;
        } catch (error) {
            console.error('Failed to fetch Eventbrite attendees:', error.response?.data || error.message);
            throw error;
        }
    }

    async syncWithDiscord(meetup) {
        try {
            // Create Eventbrite event
            const eventbriteEvent = await this.createEvent({
                title: meetup.title,
                description: `
                    <h2>${meetup.topic}</h2>
                    <p><strong>Speaker:</strong> ${meetup.speaker}</p>
                    <p><strong>Location:</strong> ${meetup.location}</p>
                    <p>Join us for this Tech Talk Augusta meetup!</p>
                `,
                date: meetup.date.toISOString().split('T')[0],
                time: meetup.time
            });

            return {
                eventbriteId: eventbriteEvent.id,
                eventbriteUrl: eventbriteEvent.url
            };
        } catch (error) {
            console.error('Failed to sync with Eventbrite:', error);
            throw error;
        }
    }
}

module.exports = new EventbriteManager(); 
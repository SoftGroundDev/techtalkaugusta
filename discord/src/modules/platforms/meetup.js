const axios = require('axios');
const { logger } = require('../../utils/logger');

class MeetupAPI {
    constructor() {
        this.apiKey = process.env.MEETUP_API_KEY;
        this.groupId = process.env.MEETUP_GROUP_ID;
        this.baseUrl = 'https://api.meetup.com';
    }

    async createEvent(eventData) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/${this.groupId}/events`,
                {
                    name: eventData.title,
                    description: eventData.description,
                    time: new Date(eventData.startTime).getTime(),
                    duration: eventData.duration,
                    venue: {
                        name: eventData.location,
                        address_1: eventData.address,
                        city: eventData.city,
                        state: eventData.state,
                        country: 'US'
                    },
                    publish_status: 'published',
                    rsvp_limit: eventData.capacity,
                    fee: eventData.price ? {
                        amount: eventData.price,
                        currency: 'USD'
                    } : null
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data.id;
        } catch (error) {
            logger.error('Error creating Meetup event:', error);
            throw error;
        }
    }

    async updateEvent(eventId, updates) {
        try {
            await axios.patch(
                `${this.baseUrl}/${this.groupId}/events/${eventId}`,
                {
                    name: updates.title,
                    description: updates.description,
                    time: updates.startTime ? new Date(updates.startTime).getTime() : undefined,
                    duration: updates.duration,
                    venue: updates.location ? {
                        name: updates.location,
                        address_1: updates.address,
                        city: updates.city,
                        state: updates.state,
                        country: 'US'
                    } : undefined,
                    rsvp_limit: updates.capacity,
                    fee: updates.price ? {
                        amount: updates.price,
                        currency: 'USD'
                    } : undefined
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return true;
        } catch (error) {
            logger.error('Error updating Meetup event:', error);
            throw error;
        }
    }

    async deleteEvent(eventId) {
        try {
            await axios.delete(
                `${this.baseUrl}/${this.groupId}/events/${eventId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`
                    }
                }
            );

            return true;
        } catch (error) {
            logger.error('Error deleting Meetup event:', error);
            throw error;
        }
    }

    async getRSVPs(eventId) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/${this.groupId}/events/${eventId}/rsvps`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`
                    }
                }
            );

            return response.data.map(rsvp => ({
                userId: rsvp.member.id,
                name: rsvp.member.name,
                response: rsvp.response,
                timestamp: new Date(rsvp.created).toISOString()
            }));
        } catch (error) {
            logger.error('Error getting Meetup RSVPs:', error);
            throw error;
        }
    }
}

module.exports = { MeetupAPI }; 
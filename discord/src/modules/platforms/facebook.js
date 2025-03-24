const axios = require('axios');
const { logger } = require('../../utils/logger');

class FacebookAPI {
    constructor() {
        this.accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
        this.pageId = process.env.FACEBOOK_PAGE_ID;
        this.baseUrl = 'https://graph.facebook.com/v18.0';
    }

    async createEvent(eventData) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/${this.pageId}/events`,
                {
                    name: eventData.title,
                    description: eventData.description,
                    start_time: new Date(eventData.startTime).toISOString(),
                    end_time: new Date(new Date(eventData.startTime).getTime() + eventData.duration).toISOString(),
                    place: eventData.location ? {
                        name: eventData.location,
                        location: {
                            street: eventData.address,
                            city: eventData.city,
                            state: eventData.state,
                            country: 'US'
                        }
                    } : null,
                    privacy_type: 'OPEN',
                    ticket_uri: eventData.price ? eventData.registrationUrl : null,
                    max_attendees: eventData.capacity,
                    online_event: !eventData.location
                },
                {
                    params: {
                        access_token: this.accessToken
                    }
                }
            );

            return response.data.id;
        } catch (error) {
            logger.error('Error creating Facebook event:', error);
            throw error;
        }
    }

    async updateEvent(eventId, updates) {
        try {
            await axios.post(
                `${this.baseUrl}/${eventId}`,
                {
                    name: updates.title,
                    description: updates.description,
                    start_time: updates.startTime ? new Date(updates.startTime).toISOString() : undefined,
                    end_time: updates.startTime ? new Date(new Date(updates.startTime).getTime() + updates.duration).toISOString() : undefined,
                    place: updates.location ? {
                        name: updates.location,
                        location: {
                            street: updates.address,
                            city: updates.city,
                            state: updates.state,
                            country: 'US'
                        }
                    } : undefined,
                    ticket_uri: updates.price ? updates.registrationUrl : undefined,
                    max_attendees: updates.capacity,
                    online_event: !updates.location
                },
                {
                    params: {
                        access_token: this.accessToken
                    }
                }
            );

            return true;
        } catch (error) {
            logger.error('Error updating Facebook event:', error);
            throw error;
        }
    }

    async deleteEvent(eventId) {
        try {
            await axios.delete(
                `${this.baseUrl}/${eventId}`,
                {
                    params: {
                        access_token: this.accessToken
                    }
                }
            );

            return true;
        } catch (error) {
            logger.error('Error deleting Facebook event:', error);
            throw error;
        }
    }

    async getRSVPs(eventId) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/${eventId}/attending`,
                {
                    params: {
                        access_token: this.accessToken
                    }
                }
            );

            return response.data.data.map(user => ({
                userId: user.id,
                name: user.name,
                response: 'attending',
                timestamp: new Date().toISOString() // Facebook doesn't provide RSVP timestamp
            }));
        } catch (error) {
            logger.error('Error getting Facebook attendees:', error);
            throw error;
        }
    }

    async shareEvent(eventId) {
        try {
            await axios.post(
                `${this.baseUrl}/${this.pageId}/feed`,
                {
                    message: `Join us for our upcoming event!`,
                    link: `https://www.facebook.com/events/${eventId}`,
                    privacy: { value: 'EVERYONE' }
                },
                {
                    params: {
                        access_token: this.accessToken
                    }
                }
            );

            return true;
        } catch (error) {
            logger.error('Error sharing Facebook event:', error);
            throw error;
        }
    }

    async uploadEventPhoto(eventId, photoUrl) {
        try {
            await axios.post(
                `${this.baseUrl}/${eventId}/photos`,
                {
                    url: photoUrl,
                    caption: 'Event photo'
                },
                {
                    params: {
                        access_token: this.accessToken
                    }
                }
            );

            return true;
        } catch (error) {
            logger.error('Error uploading Facebook event photo:', error);
            throw error;
        }
    }
}

module.exports = { FacebookAPI }; 
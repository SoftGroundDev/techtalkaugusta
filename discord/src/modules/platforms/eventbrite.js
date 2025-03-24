const axios = require('axios');
const { logger } = require('../../utils/logger');

class EventbriteAPI {
    constructor() {
        this.apiKey = process.env.EVENTBRITE_API_KEY;
        this.organizationId = process.env.EVENTBRITE_ORGANIZATION_ID;
        this.baseUrl = 'https://www.eventbriteapi.com/v3';
    }

    async createEvent(eventData) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/organizations/${this.organizationId}/events/`,
                {
                    event: {
                        name: {
                            html: eventData.title
                        },
                        description: {
                            html: eventData.description
                        },
                        start: {
                            timezone: eventData.timezone || 'America/New_York',
                            utc: new Date(eventData.startTime).toISOString()
                        },
                        end: {
                            timezone: eventData.timezone || 'America/New_York',
                            utc: new Date(new Date(eventData.startTime).getTime() + eventData.duration).toISOString()
                        },
                        venue_id: await this._getOrCreateVenue(eventData),
                        capacity: eventData.capacity,
                        currency: 'USD',
                        online_event: !eventData.location,
                        status: 'live'
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Create ticket class if price is specified
            if (eventData.price) {
                await this._createTicketClass(response.data.id, eventData.price);
            }

            return response.data.id;
        } catch (error) {
            logger.error('Error creating Eventbrite event:', error);
            throw error;
        }
    }

    async updateEvent(eventId, updates) {
        try {
            await axios.post(
                `${this.baseUrl}/events/${eventId}/`,
                {
                    event: {
                        name: {
                            html: updates.title
                        },
                        description: {
                            html: updates.description
                        },
                        start: updates.startTime ? {
                            timezone: updates.timezone || 'America/New_York',
                            utc: new Date(updates.startTime).toISOString()
                        } : undefined,
                        end: updates.startTime ? {
                            timezone: updates.timezone || 'America/New_York',
                            utc: new Date(new Date(updates.startTime).getTime() + updates.duration).toISOString()
                        } : undefined,
                        venue_id: updates.location ? await this._getOrCreateVenue(updates) : undefined,
                        capacity: updates.capacity,
                        online_event: !updates.location
                    }
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
            logger.error('Error updating Eventbrite event:', error);
            throw error;
        }
    }

    async deleteEvent(eventId) {
        try {
            await axios.delete(
                `${this.baseUrl}/events/${eventId}/`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`
                    }
                }
            );

            return true;
        } catch (error) {
            logger.error('Error deleting Eventbrite event:', error);
            throw error;
        }
    }

    async getRSVPs(eventId) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/events/${eventId}/attendees/`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`
                    }
                }
            );

            return response.data.attendees.map(attendee => ({
                userId: attendee.id,
                name: `${attendee.profile.first_name} ${attendee.profile.last_name}`,
                response: attendee.status,
                timestamp: attendee.created
            }));
        } catch (error) {
            logger.error('Error getting Eventbrite attendees:', error);
            throw error;
        }
    }

    async _getOrCreateVenue(eventData) {
        if (!eventData.location) return null;

        try {
            // Search for existing venue
            const response = await axios.get(
                `${this.baseUrl}/organizations/${this.organizationId}/venues/`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`
                    }
                }
            );

            const existingVenue = response.data.venues.find(
                venue => venue.name === eventData.location
            );

            if (existingVenue) {
                return existingVenue.id;
            }

            // Create new venue
            const createResponse = await axios.post(
                `${this.baseUrl}/organizations/${this.organizationId}/venues/`,
                {
                    venue: {
                        name: eventData.location,
                        address: {
                            address_1: eventData.address,
                            city: eventData.city,
                            region: eventData.state,
                            postal_code: eventData.zipCode,
                            country: 'US'
                        }
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return createResponse.data.id;
        } catch (error) {
            logger.error('Error managing Eventbrite venue:', error);
            throw error;
        }
    }

    async _createTicketClass(eventId, price) {
        try {
            await axios.post(
                `${this.baseUrl}/events/${eventId}/ticket_classes/`,
                {
                    ticket_class: {
                        name: 'General Admission',
                        free: false,
                        quantity_total: 1000,
                        cost: `${price}USD`,
                        description: 'General admission ticket'
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        } catch (error) {
            logger.error('Error creating Eventbrite ticket class:', error);
            throw error;
        }
    }
}

module.exports = { EventbriteAPI }; 
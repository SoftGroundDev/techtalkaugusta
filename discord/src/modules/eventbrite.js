const axios = require('axios');

class EventbriteManager {
    constructor() {
        this.apiToken = process.env.EVENTBRITE_TOKEN;
        this.organizationId = process.env.EVENTBRITE_ORGANIZATION_ID;
        this.baseUrl = 'https://www.eventbriteapi.com/v3';

        if (!this.apiToken) {
            throw new Error('Eventbrite API token is not configured');
        }

        if (!this.organizationId) {
            throw new Error('Eventbrite Organization ID is not configured');
        }
    }

    async getHeaders() {
        return {
            'Authorization': `Bearer ${this.apiToken}`,
            'Content-Type': 'application/json'
        };
    }

    // Extract numeric ID from event URL or ID string
    extractEventId(eventId) {
        console.log('Extracting event ID from:', eventId);
        
        // If it's already just a number, return it
        if (/^\d+$/.test(eventId)) {
            console.log('Event ID is already numeric:', eventId);
            return eventId;
        }

        // Try to extract ID from URL or slug
        const matches = eventId.match(/(?:events\/.*-)?(\d+)(?:-tickets)?$/);
        if (matches && matches[1]) {
            console.log('Extracted numeric ID:', matches[1]);
            return matches[1];
        }

        throw new Error('Invalid Eventbrite event ID format');
    }

    async getEvent(eventId) {
        try {
            const numericId = this.extractEventId(eventId);
            console.log('Fetching event with ID:', numericId);
            console.log('Using API token:', this.apiToken.substring(0, 5) + '...');
            console.log('Using organization ID:', this.organizationId);

            const headers = await this.getHeaders();
            console.log('Request headers:', headers);

            const url = `${this.baseUrl}/events/${numericId}/`;
            console.log('Making request to:', url);

            const response = await axios.get(url, { 
                headers,
                validateStatus: null // Allow any status code for better error handling
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            
            if (response.status !== 200) {
                console.error('Error response data:', response.data);
                
                if (response.status === 400) {
                    throw new Error(`Bad request: ${response.data.error_description || 'Unknown error'}`);
                } else if (response.status === 401) {
                    throw new Error('Invalid or expired Eventbrite API token. Please check your configuration.');
                } else if (response.status === 403) {
                    throw new Error('Permission denied. Please verify your API token has the correct permissions.');
                } else if (response.status === 404) {
                    throw new Error('Event not found. Please verify the event ID and ensure you have access to it.');
                } else {
                    throw new Error(`API Error (${response.status}): ${response.data.error_description || 'Unknown error'}`);
                }
            }

            return response.data;
        } catch (error) {
            console.error('Failed to fetch Eventbrite event:', error.response?.data || error.message);
            
            // If it's an axios error with response data, format it nicely
            if (error.response?.data) {
                const errorData = error.response.data;
                throw new Error(
                    `Eventbrite API Error:\n` +
                    `Status: ${error.response.status}\n` +
                    `Error: ${errorData.error || 'Unknown'}\n` +
                    `Description: ${errorData.error_description || 'No description provided'}`
                );
            }
            
            throw error;
        }
    }

    async linkExistingEvent(eventId) {
        try {
            console.log('Attempting to link Eventbrite event:', eventId);
            
            const event = await this.getEvent(eventId);
            console.log('Successfully fetched event data:', {
                id: event.id,
                name: event.name?.text,
                start: event.start?.utc,
                end: event.end?.utc
            });
            
            // Convert Eventbrite UTC dates to local time
            const startDate = new Date(event.start.utc);
            const endDate = new Date(event.end.utc);
            
            // Format date as YYYY-MM-DD
            const formattedDate = startDate.toISOString().split('T')[0];
            
            // Format time as HH:MM in 12-hour format with AM/PM
            const formatTimeString = (date) => {
                return date.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                });
            };
            
            const timeStr = `${formatTimeString(startDate)} - ${formatTimeString(endDate)}`;
            
            // Extract venue information safely
            const location = event.venue 
                ? `${event.venue.name}${event.venue.address ? `, ${event.venue.address.localized_address_display}` : ''}`
                : (event.online_event ? 'Online' : 'TBA');
            
            const meetupData = {
                title: event.name.text,
                description: event.description.text || '',
                date: formattedDate,
                time: timeStr,
                location: location,
                topic: event.name.text.split('-')[1]?.trim() || 'Tech Talk Augusta Meetup',
                speaker: 'TBA',
                eventbriteId: event.id,
                eventbriteUrl: event.url,
                capacity: event.capacity,
                isFree: event.is_free
            };

            console.log('Converted to meetup data:', meetupData);
            return meetupData;
        } catch (error) {
            console.error('Failed to link Eventbrite event:', error);
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

    async listOrganizationEvents() {
        try {
            console.log('Fetching organization events');
            const url = `${this.baseUrl}/organizations/${this.organizationId}/events/`;
            console.log('Request URL:', url);
            
            const response = await axios.get(url, {
                headers: await this.getHeaders(),
                params: {
                    status: 'live',
                    order_by: 'start_desc',
                    time_filter: 'current_future'
                },
                validateStatus: null
            });

            console.log('Response status:', response.status);
            
            if (response.status !== 200) {
                console.error('Error response:', response.data);
                throw new Error(`Failed to list events: ${response.data.error_description || 'Unknown error'}`);
            }

            return response.data.events;
        } catch (error) {
            console.error('Failed to list organization events:', error.response?.data || error);
            throw new Error(
                `Failed to list organization events: ${error.response?.data?.error_description || error.message}`
            );
        }
    }
}

module.exports = new EventbriteManager(); 
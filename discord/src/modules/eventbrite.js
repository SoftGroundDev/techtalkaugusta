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

        // Validate Organization ID format
        if (!/^\d+$/.test(this.organizationId)) {
            throw new Error(
                'Invalid Eventbrite Organization ID format. ' +
                'Please make sure you are using the numeric ID from your Eventbrite organization settings. ' +
                'You can find this by:\n' +
                '1. Log into Eventbrite\n' +
                '2. Go to Organization Settings\n' +
                '3. Look at the URL - it should contain /organizations/XXXXXX\n' +
                '4. Use only the numeric portion'
            );
        }

        console.log('Initializing Eventbrite Manager with:', {
            tokenPrefix: this.apiToken.substring(0, 5) + '...',
            organizationId: this.organizationId,
            baseUrl: this.baseUrl
        });
    }

    async validateOrganization() {
        try {
            const response = await axios.get(
                `${this.baseUrl}/organizations/${this.organizationId}/`,
                { 
                    headers: await this.getHeaders(),
                    validateStatus: null
                }
            );

            if (response.status === 404) {
                throw new Error(
                    'Organization not found. ' +
                    'Please verify your Organization ID in Eventbrite settings. ' +
                    'Current ID: ' + this.organizationId
                );
            }

            if (response.status !== 200) {
                throw new Error(
                    `Failed to validate organization: ${response.data.error_description || 'Unknown error'}`
                );
            }

            console.log('Successfully validated organization:', {
                name: response.data.name,
                id: response.data.id
            });

            return true;
        } catch (error) {
            console.error('Organization validation failed:', error);
            throw error;
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
                start: event.start,
                end: event.end,
                timezone: event.start?.timezone
            });
            
            if (!event.start?.utc || !event.end?.utc) {
                throw new Error('Event start or end time is missing');
            }

            // Log raw date values
            console.log('Raw start date:', event.start.utc);
            console.log('Raw end date:', event.end.utc);
            
            // Convert Eventbrite UTC dates to local time (America/New_York)
            const startDate = new Date(event.start.utc);
            const endDate = new Date(event.end.utc);
            
            console.log('Parsed dates:', {
                startDate: startDate.toString(),
                endDate: endDate.toString()
            });
            
            // Format date as YYYY-MM-DD
            const formattedDate = startDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).split('/').reverse().join('-');
            
            console.log('Formatted date:', formattedDate);
            
            // Format time as HH:MM AM/PM
            const formatTimeString = (date) => {
                const timeStr = date.toLocaleTimeString('en-US', { 
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                });
                console.log('Formatted time string:', timeStr);
                return timeStr;
            };
            
            const timeStr = `${formatTimeString(startDate)} - ${formatTimeString(endDate)}`;
            console.log('Final time string:', timeStr);
            
            // Extract venue information safely
            const location = event.venue 
                ? `${event.venue.name}${event.venue.address ? `, ${event.venue.address.localized_address_display}` : ''}`
                : (event.online_event ? 'Online' : 'TBA');
            
            const meetupData = {
                title: event.name.text,
                description: event.description?.text || '',
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
            // Add more context to the error
            if (error.message === 'Invalid time value') {
                throw new Error('Failed to process event times. Please ensure the event has valid start and end times.');
            }
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
            console.log('Validating organization before fetching events');
            await this.validateOrganization();
            
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
                throw new Error(
                    'Failed to list events: ' +
                    (response.data.error_description || 'Unknown error') +
                    '\n\nPlease verify:\n' +
                    '1. Your Organization ID is correct\n' +
                    '2. Your API token has permission to view this organization\n' +
                    '3. The organization is active and accessible'
                );
            }

            return response.data.events;
        } catch (error) {
            console.error('Failed to list organization events:', error.response?.data || error);
            throw new Error(
                `Failed to list organization events: ${error.response?.data?.error_description || error.message}`
            );
        }
    }

    async listAccessibleOrganizations() {
        try {
            console.log('Fetching all accessible organizations');
            const url = `${this.baseUrl}/users/me/organizations/`;
            console.log('Request URL:', url);

            const response = await axios.get(url, {
                headers: await this.getHeaders(),
                validateStatus: null
            });

            console.log('Response status:', response.status);

            if (response.status === 401) {
                throw new Error('Invalid or expired API token. Please check your token.');
            }

            if (response.status !== 200) {
                console.error('Error response:', response.data);
                throw new Error(
                    'Failed to list organizations: ' +
                    (response.data.error_description || 'Unknown error')
                );
            }

            return response.data.organizations;
        } catch (error) {
            console.error('Failed to list organizations:', error.response?.data || error);
            throw error;
        }
    }

    async testConnection() {
        try {
            // Test 1: Check environment variables
            const configStatus = [];
            if (this.apiToken) {
                configStatus.push('✅ API Token is set');
            } else {
                configStatus.push('❌ API Token is missing');
            }
            if (this.organizationId) {
                configStatus.push('✅ Organization ID is set');
            } else {
                configStatus.push('❌ Organization ID is missing');
            }

            // Test 2: List accessible organizations
            const organizations = await this.listAccessibleOrganizations();
            configStatus.push('✅ Successfully connected to Eventbrite API');
            
            if (organizations.length === 0) {
                configStatus.push('⚠️ No organizations found for this API token');
            } else {
                configStatus.push(`✅ Found ${organizations.length} accessible organization(s)`);
                
                // Check if configured org ID is in the list
                const configuredOrgExists = organizations.some(org => org.id === this.organizationId);
                if (configuredOrgExists) {
                    configStatus.push('✅ Configured Organization ID is valid');
                } else {
                    configStatus.push('❌ Configured Organization ID not found in accessible organizations');
                }
            }

            return {
                status: configStatus,
                organizations: organizations.map(org => ({
                    id: org.id,
                    name: org.name,
                    isCurrent: org.id === this.organizationId
                }))
            };

        } catch (error) {
            console.error('Connection test failed:', error);
            throw error;
        }
    }
}

module.exports = new EventbriteManager(); 
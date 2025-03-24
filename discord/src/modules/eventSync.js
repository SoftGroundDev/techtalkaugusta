const { EventEmitter } = require('events');
const { MeetupAPI } = require('./platforms/meetup');
const { EventbriteAPI } = require('./platforms/eventbrite');
const { FacebookAPI } = require('./platforms/facebook');
const { logger } = require('../utils/logger');

class EventSyncManager extends EventEmitter {
    constructor() {
        super();
        this.platforms = {
            meetup: new MeetupAPI(),
            eventbrite: new EventbriteAPI(),
            facebook: new FacebookAPI()
        };
        this.eventCache = new Map();
    }

    async createEvent(eventData) {
        try {
            // Create event on all platforms
            const platformEvents = await Promise.allSettled([
                this.platforms.meetup.createEvent(eventData),
                this.platforms.eventbrite.createEvent(eventData),
                this.platforms.facebook.createEvent(eventData)
            ]);

            // Store event IDs for sync
            const eventIds = {
                meetup: platformEvents[0].status === 'fulfilled' ? platformEvents[0].value : null,
                eventbrite: platformEvents[1].status === 'fulfilled' ? platformEvents[1].value : null,
                facebook: platformEvents[2].status === 'fulfilled' ? platformEvents[2].value : null
            };

            // Store in cache
            this.eventCache.set(eventData.id, eventIds);

            return {
                success: true,
                platformIds: eventIds
            };
        } catch (error) {
            logger.error('Error creating event:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async updateEvent(eventId, updates) {
        try {
            const platformIds = this.eventCache.get(eventId);
            if (!platformIds) {
                throw new Error('Event not found in cache');
            }

            // Update event on all platforms
            const updatePromises = [];
            for (const [platform, id] of Object.entries(platformIds)) {
                if (id) {
                    updatePromises.push(
                        this.platforms[platform].updateEvent(id, updates)
                    );
                }
            }

            await Promise.allSettled(updatePromises);
            return { success: true };
        } catch (error) {
            logger.error('Error updating event:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async deleteEvent(eventId) {
        try {
            const platformIds = this.eventCache.get(eventId);
            if (!platformIds) {
                throw new Error('Event not found in cache');
            }

            // Delete event from all platforms
            const deletePromises = [];
            for (const [platform, id] of Object.entries(platformIds)) {
                if (id) {
                    deletePromises.push(
                        this.platforms[platform].deleteEvent(id)
                    );
                }
            }

            await Promise.allSettled(deletePromises);
            this.eventCache.delete(eventId);
            return { success: true };
        } catch (error) {
            logger.error('Error deleting event:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async syncRSVPs(eventId) {
        try {
            const platformIds = this.eventCache.get(eventId);
            if (!platformIds) {
                throw new Error('Event not found in cache');
            }

            // Get RSVPs from all platforms
            const rsvpPromises = [];
            for (const [platform, id] of Object.entries(platformIds)) {
                if (id) {
                    rsvpPromises.push(
                        this.platforms[platform].getRSVPs(id)
                    );
                }
            }

            const rsvpResults = await Promise.allSettled(rsvpPromises);
            
            // Combine and deduplicate RSVPs
            const allRSVPs = new Map();
            rsvpResults.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    result.value.forEach(rsvp => {
                        allRSVPs.set(rsvp.userId, rsvp);
                    });
                }
            });

            return {
                success: true,
                rsvps: Array.from(allRSVPs.values())
            };
        } catch (error) {
            logger.error('Error syncing RSVPs:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

module.exports = new EventSyncManager(); 
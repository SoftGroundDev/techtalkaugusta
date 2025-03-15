const { EmbedBuilder } = require('discord.js');
const cron = require('node-cron');
const db = require('./database');
const eventbrite = require('./eventbrite');

class MeetupManager {
    constructor(client) {
        this.client = client;
        this.meetups = new Map();
        this.setupCronJobs();
        this.loadMeetupsFromDB();
    }

    async isDbConnected() {
        try {
            return db.isConnected;
        } catch (error) {
            console.error('Error checking database connection:', error);
            return false;
        }
    }

    async loadMeetupsFromDB() {
        try {
            const Meetup = db.getModel('Meetup');
            const meetups = await Meetup.find({
                date: { $gte: new Date() }
            });

            meetups.forEach(meetup => {
                this.meetups.set(meetup.id, {
                    ...meetup.toObject(),
                    attendees: new Set(meetup.attendees),
                    maybes: new Set(meetup.maybes),
                    declined: new Set(meetup.declined)
                });
            });

            console.log(`Loaded ${meetups.length} meetups from database`);
        } catch (error) {
            console.error('Failed to load meetups from database:', error);
        }
    }

    setupCronJobs() {
        // Daily reminder check at 9:00 AM
        cron.schedule('0 9 * * *', () => this.checkUpcomingMeetups());
        
        // Weekly schedule update on Mondays at 10:00 AM
        cron.schedule('0 10 * * 1', () => this.updateScheduleMessage());
    }

    async createMeetup(data) {
        const meetup = {
            id: Date.now().toString(),
            title: data.title,
            date: new Date(data.date),
            time: data.time,
            location: data.location,
            topic: data.topic,
            speaker: data.speaker,
            description: data.description,
            attendees: new Set(),
            maybes: new Set(),
            declined: new Set(),
            created: new Date(),
            lastUpdated: new Date(),
            eventbriteId: data.eventbriteId || null,
            eventbriteUrl: data.eventbriteUrl || null,
            eventbriteSynced: false
        };

        try {
            // If eventbriteId is provided, link to existing event
            if (data.eventbriteId) {
                const eventbriteData = await eventbrite.linkExistingEvent(data.eventbriteId);
                
                // Parse the date string into a Date object
                const eventDate = new Date(eventbriteData.date);
                if (isNaN(eventDate.getTime())) {
                    throw new Error('Invalid date format from Eventbrite');
                }

                Object.assign(meetup, {
                    title: eventbriteData.title,
                    description: eventbriteData.description,
                    date: eventDate,
                    time: eventbriteData.time,
                    location: eventbriteData.location,
                    topic: eventbriteData.topic,
                    eventbriteId: eventbriteData.eventbriteId,
                    eventbriteUrl: eventbriteData.eventbriteUrl,
                    eventbriteSynced: true
                });
            }

            // Save to database
            const Meetup = db.getModel('Meetup');
            await new Meetup({
                ...meetup,
                attendees: Array.from(meetup.attendees),
                maybes: Array.from(meetup.maybes),
                declined: Array.from(meetup.declined)
            }).save();

            this.meetups.set(meetup.id, meetup);
            await this.updateScheduleMessage();
            return meetup;
        } catch (error) {
            console.error('Failed to create meetup:', error);
            throw error;
        }
    }

    async updateScheduleMessage() {
        const channel = await this.getScheduleChannel();
        if (!channel) return;

        const embed = this.createScheduleEmbed();
        
        // Find pinned schedule message or create new one
        const messages = await channel.messages.fetchPinned();
        const scheduleMessage = messages.find(m => m.author.id === this.client.user.id && 
            m.embeds[0]?.title === 'Tech Talk Augusta - Upcoming Meetups');

        if (scheduleMessage) {
            await scheduleMessage.edit({ embeds: [embed] });
        } else {
            const message = await channel.send({ embeds: [embed] });
            await message.pin();
        }
    }

    createScheduleEmbed() {
        const embed = new EmbedBuilder()
            .setTitle('Tech Talk Augusta - Upcoming Meetups')
            .setColor('#0099ff')
            .setTimestamp();

        const sortedMeetups = Array.from(this.meetups.values())
            .sort((a, b) => a.date - b.date)
            .filter(m => m.date >= new Date());

        if (sortedMeetups.length === 0) {
            embed.setDescription('No upcoming meetups scheduled. Stay tuned!');
        } else {
            sortedMeetups.forEach(meetup => {
                embed.addFields({
                    name: `${meetup.title} - ${meetup.date.toLocaleDateString()}`,
                    value: `
                        🎯 Topic: ${meetup.topic}
                        👤 Speaker: ${meetup.speaker}
                        📍 Location: ${meetup.location}
                        ⏰ Time: ${meetup.time}
                        👥 Attendees: ${meetup.attendees.size}
                        
                        ${meetup.eventbriteUrl ? `🎟️ [Register on Eventbrite](${meetup.eventbriteUrl})` : ''}
                        Use \`!rsvp ${meetup.id}\` to attend!
                    `.trim()
                });
            });
        }

        return embed;
    }

    async checkUpcomingMeetups() {
        const now = new Date();
        this.meetups.forEach(async meetup => {
            const meetupDate = new Date(meetup.date);
            const daysDiff = Math.floor((meetupDate - now) / (1000 * 60 * 60 * 24));

            if (daysDiff === 7 || daysDiff === 1) {
                await this.sendReminders(meetup, daysDiff);
            }
        });
    }

    async sendReminders(meetup, daysUntil) {
        const channel = await this.getScheduleChannel();
        if (!channel) return;

        const reminder = new EmbedBuilder()
            .setTitle(`Meetup Reminder: ${meetup.title}`)
            .setColor(daysUntil === 1 ? '#ff9900' : '#0099ff')
            .setDescription(`
                🗓️ **${meetup.title}** is ${daysUntil === 1 ? 'tomorrow' : 'in one week'}!
                
                📅 Date: ${meetup.date.toLocaleDateString()}
                ⏰ Time: ${meetup.time}
                📍 Location: ${meetup.location}
                🎯 Topic: ${meetup.topic}
                👤 Speaker: ${meetup.speaker}
                
                Don't forget to RSVP if you haven't already!
                Use \`!rsvp ${meetup.id}\` to confirm your attendance.
            `.trim());

        await channel.send({ embeds: [reminder] });
    }

    async handleRSVP(userId, meetupId, status) {
        const meetup = this.meetups.get(meetupId);
        if (!meetup) return false;

        // Remove from all status sets first
        meetup.attendees.delete(userId);
        meetup.maybes.delete(userId);
        meetup.declined.delete(userId);

        // Add to appropriate set
        switch (status) {
            case 'yes':
                meetup.attendees.add(userId);
                break;
            case 'maybe':
                meetup.maybes.add(userId);
                break;
            case 'no':
                meetup.declined.add(userId);
                break;
        }

        try {
            const Meetup = db.getModel('Meetup');
            await Meetup.findOneAndUpdate(
                { id: meetupId },
                {
                    attendees: Array.from(meetup.attendees),
                    maybes: Array.from(meetup.maybes),
                    declined: Array.from(meetup.declined),
                    lastUpdated: new Date()
                }
            );

            await this.updateScheduleMessage();
            return true;
        } catch (error) {
            console.error('Failed to update RSVP in database:', error);
            return false;
        }
    }

    async getScheduleChannel() {
        return this.client.channels.cache.find(
            channel => channel.name === 'meetup-schedule'
        );
    }

    async cancel(meetupId) {
        const meetup = this.meetups.get(meetupId);
        if (!meetup) return false;

        try {
            // Cancel Eventbrite event if it exists
            if (meetup.eventbriteId) {
                await eventbrite.cancelEvent(meetup.eventbriteId);
            }

            // Delete from database
            const Meetup = db.getModel('Meetup');
            await Meetup.deleteOne({ id: meetupId });

            // Remove from local cache
            this.meetups.delete(meetupId);
            await this.updateScheduleMessage();
            return true;
        } catch (error) {
            console.error('Failed to cancel meetup:', error);
            throw error;
        }
    }
}

module.exports = MeetupManager; 
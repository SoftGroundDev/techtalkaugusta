const { EmbedBuilder } = require('discord.js');
const cron = require('node-cron');

class MeetupManager {
    constructor(client) {
        this.client = client;
        this.meetups = new Map();
        this.setupCronJobs();
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
            lastUpdated: new Date()
        };

        this.meetups.set(meetup.id, meetup);
        await this.updateScheduleMessage();
        return meetup;
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

        await this.updateScheduleMessage();
        return true;
    }

    async getScheduleChannel() {
        return this.client.channels.cache.find(
            channel => channel.name === 'meetup-schedule'
        );
    }
}

module.exports = MeetupManager; 
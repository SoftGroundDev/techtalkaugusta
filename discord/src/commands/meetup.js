const { EmbedBuilder } = require('discord.js');

const commands = {
    async schedule(message) {
        const meetupManager = message.client.meetupManager;
        const embed = meetupManager.createScheduleEmbed();
        await message.reply({ embeds: [embed] });
    },

    async create(message, args) {
        // Check if user has permission to create meetups
        if (!message.member.roles.cache.some(role => 
            ['Admin', 'Moderator', 'Event Organizer'].includes(role.name))) {
            return message.reply('You do not have permission to create meetups.');
        }

        // Example: !meetup create "Title" "2024-04-15" "18:00" "Location" "Topic" "Speaker"
        const [title, date, time, location, topic, speaker] = args.join(' ').match(/"([^"]*)"/g)
            ?.map(arg => arg.replace(/"/g, '')) || [];

        if (!title || !date || !time || !location || !topic) {
            return message.reply(
                'Please provide all required information:\n' +
                '`!meetup create "Title" "YYYY-MM-DD" "HH:MM" "Location" "Topic" "Speaker"`'
            );
        }

        try {
            const meetup = await message.client.meetupManager.createMeetup({
                title,
                date,
                time,
                location,
                topic,
                speaker: speaker || 'TBA',
                description: ''
            });

            const embed = new EmbedBuilder()
                .setTitle('New Meetup Created!')
                .setColor('#00ff00')
                .setDescription(`
                    Successfully created meetup: ${meetup.title}
                    ID: ${meetup.id}
                    Date: ${meetup.date.toLocaleDateString()}
                    Time: ${meetup.time}
                    Location: ${meetup.location}
                    Topic: ${meetup.topic}
                    Speaker: ${meetup.speaker}
                `.trim());

            await message.reply({ embeds: [embed] });
        } catch (error) {
            await message.reply('Failed to create meetup. Please check the date format and try again.');
        }
    },

    async rsvp(message, args) {
        const [meetupId, status = 'yes'] = args;
        
        if (!meetupId) {
            return message.reply('Please provide a meetup ID: `!rsvp <meetup_id> [yes/no/maybe]`');
        }

        if (!['yes', 'no', 'maybe'].includes(status.toLowerCase())) {
            return message.reply('Invalid RSVP status. Use: yes, no, or maybe');
        }

        const success = await message.client.meetupManager.handleRSVP(
            message.author.id,
            meetupId,
            status.toLowerCase()
        );

        if (success) {
            await message.reply(`You have successfully RSVP'd "${status}" to the meetup!`);
        } else {
            await message.reply('Meetup not found. Please check the ID and try again.');
        }
    },

    async cancel(message, args) {
        // Check if user has permission to cancel meetups
        if (!message.member.roles.cache.some(role => 
            ['Admin', 'Moderator', 'Event Organizer'].includes(role.name))) {
            return message.reply('You do not have permission to cancel meetups.');
        }

        const [meetupId] = args;
        if (!meetupId) {
            return message.reply('Please provide a meetup ID: `!meetup cancel <meetup_id>`');
        }

        const meetup = message.client.meetupManager.meetups.get(meetupId);
        if (!meetup) {
            return message.reply('Meetup not found.');
        }

        message.client.meetupManager.meetups.delete(meetupId);
        await message.client.meetupManager.updateScheduleMessage();
        
        // Notify all attendees
        const attendeesList = Array.from(meetup.attendees);
        if (attendeesList.length > 0) {
            const channel = await message.client.meetupManager.getScheduleChannel();
            const cancelEmbed = new EmbedBuilder()
                .setTitle('Meetup Cancelled')
                .setColor('#ff0000')
                .setDescription(`
                    The following meetup has been cancelled:
                    
                    ${meetup.title}
                    Date: ${meetup.date.toLocaleDateString()}
                    Time: ${meetup.time}
                    
                    We apologize for any inconvenience.
                `.trim());
            
            await channel.send({ 
                content: `Attention ${attendeesList.map(id => `<@${id}>`).join(', ')}`,
                embeds: [cancelEmbed]
            });
        }

        await message.reply('Meetup has been cancelled successfully.');
    }
};

module.exports = {
    name: 'meetup',
    description: 'Manage meetups',
    async execute(message, args) {
        const subcommand = args.shift();
        
        if (!subcommand || !commands[subcommand]) {
            return message.reply(
                'Available commands:\n' +
                '`!meetup schedule` - View upcoming meetups\n' +
                '`!meetup create "Title" "YYYY-MM-DD" "HH:MM" "Location" "Topic" "Speaker"` - Create a new meetup\n' +
                '`!meetup rsvp <meetup_id> [yes/no/maybe]` - RSVP to a meetup\n' +
                '`!meetup cancel <meetup_id>` - Cancel a meetup'
            );
        }

        await commands[subcommand](message, args);
    }
}; 
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

// Helper function to check admin permissions
function hasAdminPermission(member) {
    // Check for Discord administrator permission
    if (member.permissions.has(PermissionFlagsBits.Administrator)) {
        return true;
    }
    
    // Check for specific roles
    return member.roles.cache.some(role => 
        ['Admin', 'Moderator', 'Event Organizer'].includes(role.name)
    );
}

// Helper function to log admin actions
async function logAdminAction(message, action, details) {
    const logChannel = message.guild.channels.cache.find(
        channel => channel.name === 'admin-logs'
    );

    if (logChannel) {
        const logEmbed = new EmbedBuilder()
            .setTitle('Admin Action Log')
            .setColor('#0099ff')
            .setDescription(`
                👤 **Admin:** ${message.author.tag}
                📋 **Action:** ${action}
                ⏰ **Time:** ${new Date().toLocaleString()}
                ${details ? `\n📝 **Details:**\n${details}` : ''}
            `)
            .setFooter({ text: `Admin ID: ${message.author.id}` });

        await logChannel.send({ embeds: [logEmbed] });
    }
}

const commands = {
    async schedule(message) {
        const meetupManager = message.client.meetupManager;
        const embed = meetupManager.createScheduleEmbed();
        await message.reply({ embeds: [embed] });
    },

    async create(message, args) {
        // Enhanced permission check
        if (!hasAdminPermission(message.member)) {
            const embed = new EmbedBuilder()
                .setTitle('Permission Denied')
                .setColor('#ff0000')
                .setDescription(
                    '❌ You do not have permission to create meetups.\n\n' +
                    'Required permissions:\n' +
                    '• Discord Administrator, OR\n' +
                    '• One of these roles: Admin, Moderator, Event Organizer'
                );
            return message.reply({ embeds: [embed] });
        }

        // Example: !meetup create "Title" "2024-04-15" "18:00" "Location" "Topic" "Speaker"
        const [title, date, time, location, topic, speaker] = args.join(' ').match(/"([^"]*)"/g)
            ?.map(arg => arg.replace(/"/g, '')) || [];

        if (!title || !date || !time || !location || !topic) {
            const embed = new EmbedBuilder()
                .setTitle('Invalid Command Format')
                .setColor('#ff9900')
                .setDescription(
                    'Please provide all required information:\n' +
                    '```\n!meetup create "Title" "YYYY-MM-DD" "HH:MM" "Location" "Topic" "Speaker"\n```\n' +
                    '**Example:**\n' +
                    '```\n!meetup create "Tech Talk #42" "2024-04-15" "18:00" "Innovation Center" "AI Development" "John Doe"\n```'
                );
            return message.reply({ embeds: [embed] });
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
                .setTitle('New Meetup Created! 🎉')
                .setColor('#00ff00')
                .setDescription(`
                    Successfully created meetup: ${meetup.title}
                    
                    📋 Details:
                    • ID: ${meetup.id}
                    • Date: ${meetup.date.toLocaleDateString()}
                    • Time: ${meetup.time}
                    • Location: ${meetup.location}
                    • Topic: ${meetup.topic}
                    • Speaker: ${meetup.speaker}

                    Members can RSVP using:
                    \`!meetup rsvp ${meetup.id} [yes/no/maybe]\`
                `.trim());

            await message.reply({ embeds: [embed] });
        } catch (error) {
            const embed = new EmbedBuilder()
                .setTitle('Error Creating Meetup')
                .setColor('#ff0000')
                .setDescription('Failed to create meetup. Please check the date format and try again.');
            await message.reply({ embeds: [embed] });
        }
    },

    async rsvp(message, args) {
        const [meetupId, status = 'yes'] = args;
        
        if (!meetupId) {
            const embed = new EmbedBuilder()
                .setTitle('Invalid Command Format')
                .setColor('#ff9900')
                .setDescription(
                    'Please provide a meetup ID and status:\n' +
                    '```\n!meetup rsvp <meetup_id> [yes/no/maybe]\n```\n' +
                    '**Example:**\n' +
                    '```\n!meetup rsvp 123456789 yes\n```'
                );
            return message.reply({ embeds: [embed] });
        }

        if (!['yes', 'no', 'maybe'].includes(status.toLowerCase())) {
            const embed = new EmbedBuilder()
                .setTitle('Invalid RSVP Status')
                .setColor('#ff9900')
                .setDescription(
                    '❌ Invalid RSVP status.\n\n' +
                    'Please use one of these options:\n' +
                    '• `yes` - Confirm attendance\n' +
                    '• `no` - Cannot attend\n' +
                    '• `maybe` - Might attend'
                );
            return message.reply({ embeds: [embed] });
        }

        const success = await message.client.meetupManager.handleRSVP(
            message.author.id,
            meetupId,
            status.toLowerCase()
        );

        if (success) {
            const embed = new EmbedBuilder()
                .setTitle('RSVP Updated ✅')
                .setColor('#00ff00')
                .setDescription(`
                    You have successfully RSVP'd "${status}" to the meetup!
                    
                    You can change your RSVP at any time using:
                    \`!meetup rsvp ${meetupId} [yes/no/maybe]\`
                `);
            await message.reply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setTitle('RSVP Failed')
                .setColor('#ff0000')
                .setDescription('❌ Meetup not found. Please check the ID and try again.');
            await message.reply({ embeds: [embed] });
        }
    },

    async cancel(message, args) {
        // Enhanced permission check
        if (!hasAdminPermission(message.member)) {
            const embed = new EmbedBuilder()
                .setTitle('Permission Denied')
                .setColor('#ff0000')
                .setDescription(
                    '❌ You do not have permission to cancel meetups.\n\n' +
                    'Required permissions:\n' +
                    '• Discord Administrator, OR\n' +
                    '• One of these roles: Admin, Moderator, Event Organizer'
                );
            return message.reply({ embeds: [embed] });
        }

        const [meetupId] = args;
        if (!meetupId) {
            const embed = new EmbedBuilder()
                .setTitle('Invalid Command Format')
                .setColor('#ff9900')
                .setDescription(
                    'Please provide a meetup ID:\n' +
                    '```\n!meetup cancel <meetup_id>\n```'
                );
            return message.reply({ embeds: [embed] });
        }

        const meetup = message.client.meetupManager.meetups.get(meetupId);
        if (!meetup) {
            const embed = new EmbedBuilder()
                .setTitle('Meetup Not Found')
                .setColor('#ff0000')
                .setDescription('❌ Could not find a meetup with that ID.');
            return message.reply({ embeds: [embed] });
        }

        // Log the cancellation before executing it
        await logAdminAction(message, 'Meetup Cancelled', `
            • Meetup ID: ${meetupId}
            • Title: ${meetup.title}
            • Date: ${meetup.date.toLocaleDateString()}
            • Attendees: ${meetup.attendees.size}
        `);

        message.client.meetupManager.meetups.delete(meetupId);
        await message.client.meetupManager.updateScheduleMessage();
        
        // Notify all attendees
        const attendeesList = Array.from(meetup.attendees);
        if (attendeesList.length > 0) {
            const channel = await message.client.meetupManager.getScheduleChannel();
            const cancelEmbed = new EmbedBuilder()
                .setTitle('⚠️ Meetup Cancelled')
                .setColor('#ff0000')
                .setDescription(`
                    The following meetup has been cancelled:
                    
                    📋 **${meetup.title}**
                    • Date: ${meetup.date.toLocaleDateString()}
                    • Time: ${meetup.time}
                    • Location: ${meetup.location}
                    
                    We apologize for any inconvenience.
                    
                    A new meetup will be scheduled soon!
                `.trim());
            
            await channel.send({ 
                content: `Attention ${attendeesList.map(id => `<@${id}>`).join(', ')}`,
                embeds: [cancelEmbed]
            });
        }

        const confirmEmbed = new EmbedBuilder()
            .setTitle('Meetup Cancelled Successfully')
            .setColor('#00ff00')
            .setDescription(`
                ✅ The meetup "${meetup.title}" has been cancelled.
                
                • ${meetup.attendees.size} attendees have been notified
                • The meetup schedule has been updated
                • The cancellation has been logged
            `);
        await message.reply({ embeds: [confirmEmbed] });
    }
};

module.exports = {
    name: 'meetup',
    description: 'Manage meetups',
    async execute(message, args) {
        const subcommand = args.shift();
        
        if (!subcommand || !commands[subcommand]) {
            const embed = new EmbedBuilder()
                .setTitle('Meetup Commands')
                .setColor('#0099ff')
                .setDescription(`
                    Available commands:
                    
                    📅 **View Schedule**
                    \`!meetup schedule\` - View upcoming meetups
                    
                    ✨ **Create Meetup** (Admin only)
                    \`!meetup create "Title" "YYYY-MM-DD" "HH:MM" "Location" "Topic" "Speaker"\`
                    
                    👥 **RSVP to Meetup**
                    \`!meetup rsvp <meetup_id> [yes/no/maybe]\`
                    
                    ❌ **Cancel Meetup** (Admin only)
                    \`!meetup cancel <meetup_id>\`
                `.trim());
            return message.reply({ embeds: [embed] });
        }

        await commands[subcommand](message, args);
    }
}; 
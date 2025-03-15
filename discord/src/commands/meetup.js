const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { createHelpEmbed } = require('../utils/helpFormatter');

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
    },

    async link(message, args) {
        // Enhanced permission check
        if (!hasAdminPermission(message.member)) {
            const embed = new EmbedBuilder()
                .setTitle('Permission Denied')
                .setColor('#ff0000')
                .setDescription(
                    '❌ You do not have permission to link meetups.\n\n' +
                    'Required permissions:\n' +
                    '• Discord Administrator, OR\n' +
                    '• One of these roles: Admin, Moderator, Event Organizer'
                );
            return message.reply({ embeds: [embed] });
        }

        const [eventbriteId] = args;
        if (!eventbriteId) {
            const embed = new EmbedBuilder()
                .setTitle('Invalid Command Format')
                .setColor('#ff9900')
                .setDescription(
                    'Please provide an Eventbrite event ID:\n' +
                    '```\n!meetup link <eventbrite_event_id>\n```\n' +
                    'You can find the event ID in the Eventbrite URL:\n' +
                    'https://www.eventbrite.com/e/your-event-name-**event_id**'
                );
            return message.reply({ embeds: [embed] });
        }

        try {
            // Check if Eventbrite token is configured
            if (!process.env.EVENTBRITE_TOKEN) {
                const embed = new EmbedBuilder()
                    .setTitle('Configuration Error')
                    .setColor('#ff0000')
                    .setDescription(
                        '❌ Eventbrite integration is not properly configured.\n\n' +
                        'Please make sure the EVENTBRITE_TOKEN environment variable is set.\n\n' +
                        'Contact the bot administrator for assistance.'
                    );
                return message.reply({ embeds: [embed] });
            }

            // Get event details from Eventbrite
            let eventbrite;
            try {
                eventbrite = require('../modules/eventbrite');
            } catch (error) {
                console.error('Failed to load Eventbrite module:', error);
                const embed = new EmbedBuilder()
                    .setTitle('Module Error')
                    .setColor('#ff0000')
                    .setDescription(
                        '❌ Failed to load Eventbrite integration module.\n\n' +
                        'This might be due to:\n' +
                        '• Missing module files\n' +
                        '• Configuration issues\n\n' +
                        'Please contact the bot administrator.'
                    );
                return message.reply({ embeds: [embed] });
            }

            const meetupData = await eventbrite.linkExistingEvent(eventbriteId);
            if (!meetupData) {
                const embed = new EmbedBuilder()
                    .setTitle('Event Not Found')
                    .setColor('#ff0000')
                    .setDescription(
                        '❌ Could not find the Eventbrite event.\n\n' +
                        'Please verify:\n' +
                        '• The event ID is correct\n' +
                        '• The event exists and is public\n' +
                        '• You have access to this event\n\n' +
                        `Event ID provided: ${eventbriteId}`
                    );
                return message.reply({ embeds: [embed] });
            }

            // Create the meetup using the meetup manager
            const meetup = await message.client.meetupManager.createMeetup({
                title: meetupData.title,
                date: meetupData.date,
                time: meetupData.time,
                location: meetupData.location,
                topic: meetupData.topic,
                speaker: meetupData.speaker,
                description: meetupData.description,
                eventbriteId: meetupData.eventbriteId,
                eventbriteUrl: meetupData.eventbriteUrl,
                capacity: meetupData.capacity,
                isFree: meetupData.isFree,
                eventbriteSynced: true
            });

            const embed = new EmbedBuilder()
                .setTitle('Eventbrite Event Linked! 🔗')
                .setColor('#00ff00')
                .setDescription(`
                    Successfully linked Eventbrite event to Discord meetup!
                    
                    📋 Details:
                    • Discord Meetup ID: ${meetup.id}
                    • Title: ${meetup.title}
                    • Date: ${meetup.date}
                    • Time: ${meetup.time}
                    • Location: ${meetup.location}
                    • Topic: ${meetup.topic}
                    
                    🎟️ [View on Eventbrite](${meetup.eventbriteUrl})
                    
                    Members can RSVP using:
                    \`!meetup rsvp ${meetup.id} [yes/no/maybe]\`
                `.trim());

            await message.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Failed to link Eventbrite event:', error);
            const embed = new EmbedBuilder()
                .setTitle('Error Linking Event')
                .setColor('#ff0000')
                .setDescription(
                    '❌ Failed to link Eventbrite event.\n\n' +
                    'Error details:\n' +
                    `\`\`\`\n${error.message}\n\`\`\`\n\n` +
                    'Please check:\n' +
                    '• Your Eventbrite API token is valid\n' +
                    '• The event exists and is accessible\n' +
                    '• You have permission to access this event'
                );
            await message.reply({ embeds: [embed] });
        }
    },

    async testEventbrite(message) {
        // Enhanced permission check
        if (!hasAdminPermission(message.member)) {
            const embed = new EmbedBuilder()
                .setTitle('Permission Denied')
                .setColor('#ff0000')
                .setDescription(
                    '❌ You do not have permission to test Eventbrite integration.\n\n' +
                    'Required permissions:\n' +
                    '• Discord Administrator, OR\n' +
                    '• One of these roles: Admin, Moderator, Event Organizer'
                );
            return message.reply({ embeds: [embed] });
        }

        const embed = new EmbedBuilder()
            .setTitle('Testing Eventbrite Connection')
            .setColor('#0099ff')
            .setDescription('🔄 Testing Eventbrite integration...');
        
        const statusMessage = await message.reply({ embeds: [embed] });

        try {
            const eventbrite = require('../modules/eventbrite');
            const testResults = await eventbrite.testConnection();
            
            const resultEmbed = new EmbedBuilder()
                .setTitle('Eventbrite Connection Test Results')
                .setColor('#00ff00')
                .setDescription(testResults.status.join('\n'))
                .addFields([
                    {
                        name: 'Authentication',
                        value: `Logged in as: ${testResults.user.email}\nUser ID: ${testResults.user.id}`
                    },
                    {
                        name: 'Configuration',
                        value: `API Token: ${process.env.EVENTBRITE_TOKEN ? '****' + process.env.EVENTBRITE_TOKEN.slice(-4) : 'Not set'}`
                    },
                    {
                        name: 'Next Steps',
                        value: 'To link an event:\n1. Go to your event on Eventbrite\n2. Copy the event ID from the URL (the number after /e/)\n3. Use `!meetup link <event_id>`'
                    }
                ]);

            await statusMessage.edit({ embeds: [resultEmbed] });
        } catch (error) {
            console.error('Failed to test Eventbrite connection:', error);
            const errorEmbed = new EmbedBuilder()
                .setTitle('Eventbrite Connection Test Failed')
                .setColor('#ff0000')
                .setDescription(`
                    ❌ Failed to test Eventbrite connection
                    
                    Error details:
                    \`\`\`
                    ${error.message}
                    \`\`\`
                    
                    Please check:
                    • Your Eventbrite API token is valid
                    • You have the necessary permissions
                `.trim());
            
            await statusMessage.edit({ embeds: [errorEmbed] });
        }
    },

    async help(message) {
        const helpEmbed = createHelpEmbed({
            title: 'Meetup Commands Help',
            description: 'Manage Tech Talk Augusta meetups, including scheduling, RSVPs, and Eventbrite integration.',
            emoji: '📅',
            commands: [
                // Schedule Commands
                { 
                    name: '!meetup schedule', 
                    value: 'View all upcoming meetups'
                },
                { 
                    name: '!meetup rsvp <id> <response>', 
                    value: 'RSVP to a meetup (yes/no/maybe)'
                },
                
                // Admin Commands
                { 
                    name: '!meetup create', 
                    value: 'Create a new meetup event',
                    admin: true
                },
                { 
                    name: '!meetup link <eventbrite_id>', 
                    value: 'Link existing Eventbrite event',
                    admin: true
                },
                { 
                    name: '!meetup cancel <id>', 
                    value: 'Cancel an existing meetup',
                    admin: true
                },
                { 
                    name: '!meetup testEventbrite', 
                    value: 'Test Eventbrite integration',
                    admin: true
                }
            ],
            examples: [
                { 
                    name: 'Create a Meetup',
                    value: '!meetup create "Tech Talk #42" "2024-04-15" "18:00" "Innovation Center" "AI Development" "John Doe"'
                },
                {
                    name: 'Link Eventbrite Event',
                    value: '!meetup link 123456789\n\n# The Eventbrite ID can be found in your event URL:\nhttps://www.eventbrite.com/e/event-name-123456789'
                },
                {
                    name: 'RSVP to Event',
                    value: '!meetup rsvp 987654321 yes'
                }
            ],
            notes: [
                {
                    name: 'Eventbrite Setup',
                    value: 'Make sure your Eventbrite API token and Organization ID are set in the bot\'s environment variables'
                },
                {
                    name: 'Finding Eventbrite ID',
                    value: 'The event ID is the number at the end of your Eventbrite event URL'
                },
                {
                    name: 'RSVP Options',
                    value: 'Use "yes", "no", or "maybe" when RSVPing to events'
                },
                {
                    name: 'Admin Access',
                    value: 'Creating, linking, and canceling events requires Admin, Moderator, or Event Organizer role'
                },
                {
                    name: 'Troubleshooting',
                    value: 'If linking fails, verify:\n• The event ID is correct\n• The event exists and is public\n• Your Eventbrite API token has correct permissions\n• The event belongs to your organization'
                }
            ]
        });
        
        await message.reply({ embeds: [helpEmbed] });
    }
};

module.exports = {
    name: 'meetup',
    description: 'Manage meetups',
    async execute(message, args) {
        const subcommand = args.shift();
        
        if (!subcommand || !commands[subcommand]) {
            await commands.help(message);
            return;
        }

        await commands[subcommand](message, args);
    }
}; 
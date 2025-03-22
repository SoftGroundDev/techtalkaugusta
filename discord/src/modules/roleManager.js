const { EmbedBuilder } = require('discord.js');

class RoleManager {
    constructor(client) {
        this.client = client;
        this.setupEventHandlers();
    }

    checkBotPermissions(guild) {
        const requiredPermissions = [
            'ManageRoles',
            'ManageChannels',
            'ManageMessages',
            'SendMessages',
            'ViewChannel',
            'AddReactions',
            'UseExternalEmojis',
            'ReadMessageHistory',
            'MentionEveryone'
        ];

        const botMember = guild.members.cache.get(this.client.user.id);
        const missingPermissions = requiredPermissions.filter(perm => !botMember.permissions.has(perm));

        return {
            hasPermissions: missingPermissions.length === 0,
            missing: missingPermissions
        };
    }

    setupEventHandlers() {
        // Handle reaction adds
        this.client.on('messageReactionAdd', async (reaction, user) => {
            if (user.bot) return;
            
            const channel = reaction.message.channel;
            if (channel.name !== 'role-assignment') return;
            
            try {
                await this.handleRoleReaction(reaction, user, 'add');
            } catch (error) {
                console.error('Error handling role reaction add:', error);
            }
        });

        // Handle reaction removes
        this.client.on('messageReactionRemove', async (reaction, user) => {
            if (user.bot) return;
            
            const channel = reaction.message.channel;
            if (channel.name !== 'role-assignment') return;
            
            try {
                await this.handleRoleReaction(reaction, user, 'remove');
            } catch (error) {
                console.error('Error handling role reaction remove:', error);
            }
        });
    }

    async handleRoleReaction(reaction, user, action) {
        const message = reaction.message;
        const guild = message.guild;

        // Check permissions first
        const permCheck = this.checkBotPermissions(guild);
        if (!permCheck.hasPermissions) {
            console.error(`Missing permissions for role management: ${permCheck.missing.join(', ')}`);
            return;
        }

        const member = await guild.members.fetch(user.id);
        
        // Get the role name from the reaction
        const emoji = reaction.emoji.name;
        const roleMatch = message.embeds[0]?.description?.match(new RegExp(`${emoji} - \\*\\*(.*?)\\*\\*`));
        
        if (!roleMatch) return;
        
        const roleName = roleMatch[1].toLowerCase();
        let role = guild.roles.cache.find(r => r.name.toLowerCase() === roleName);
        
        if (!role) {
            // Create the role if it doesn't exist
            try {
                role = await guild.roles.create({
                    name: roleName,
                    color: this.getRoleColor(roleName),
                    reason: 'Auto-created for reaction role assignment'
                });
            } catch (error) {
                console.error(`Failed to create role ${roleName}:`, error);
                return;
            }
        }
        
        try {
            if (action === 'add') {
                await member.roles.add(role);
            } else {
                await member.roles.remove(role);
            }
        } catch (error) {
            console.error(`Failed to ${action} role ${roleName}:`, error);
        }
    }

    getRoleColor(roleName) {
        // Define colors for different role categories
        const colors = {
            // Languages
            javascript: '#F7DF1E',
            python: '#3776AB',
            java: '#007396',
            csharp: '#239120',
            
            // Frontend
            react: '#61DAFB',
            angular: '#DD0031',
            vue: '#4FC08D',
            
            // Backend
            nodejs: '#339933',
            dotnet: '#512BD4',
            spring: '#6DB33F',
            
            // DevOps
            docker: '#2496ED',
            kubernetes: '#326CE5',
            aws: '#FF9900',
            azure: '#0078D4',
            
            // Database
            mongodb: '#47A248',
            postgresql: '#336791',
            mysql: '#4479A1',
            
            // Mobile
            ios: '#000000',
            android: '#3DDC84',
            flutter: '#02569B',
            
            // Other
            design: '#FF7F50',
            security: '#FF0000',
            ai: '#00FFFF'
        };
        
        return colors[roleName] || '#99AAB5'; // Default Discord role color
    }

    async createRoleMessage(channel) {
        // Check permissions first
        const permCheck = this.checkBotPermissions(channel.guild);
        if (!permCheck.hasPermissions) {
            throw new Error(`Missing required permissions: ${permCheck.missing.join(', ')}. Please update bot permissions and try again.`);
        }

        const categories = {
            'Languages 💻': ['javascript', 'python', 'java', 'csharp'],
            'Frontend 🎨': ['react', 'angular', 'vue'],
            'Backend 🔧': ['nodejs', 'dotnet', 'spring'],
            'DevOps 🚀': ['docker', 'kubernetes', 'aws', 'azure'],
            'Database 💾': ['mongodb', 'postgresql', 'mysql'],
            'Mobile 📱': ['ios', 'android', 'flutter'],
            'Other 🔮': ['design', 'security', 'ai']
        };

        const embed = new EmbedBuilder()
            .setTitle('Tech Talk Augusta Role Assignment')
            .setDescription('React to get roles that match your interests and expertise!\n\n' +
                'Remove your reaction to remove the role.\n\n' +
                Object.entries(categories).map(([category, roles]) => {
                    return `**${category}**\n${roles.map(role => 
                        `${this.getEmojiForRole(role)} - **${role}**`
                    ).join('\n')}\n`;
                }).join('\n'));

        const message = await channel.send({ embeds: [embed] });

        // Add reactions for each role
        for (const categoryRoles of Object.values(categories)) {
            for (const role of categoryRoles) {
                await message.react(this.getEmojiForRole(role));
            }
        }

        return message;
    }

    getEmojiForRole(role) {
        // Map roles to emojis
        const emojiMap = {
            // Languages
            javascript: '🟡',
            python: '🐍',
            java: '☕',
            csharp: '🔷',
            
            // Frontend
            react: '⚛️',
            angular: '🅰️',
            vue: '🟢',
            
            // Backend
            nodejs: '💚',
            dotnet: '🔵',
            spring: '🍃',
            
            // DevOps
            docker: '🐳',
            kubernetes: '⎈',
            aws: '☁️',
            azure: '📊',
            
            // Database
            mongodb: '🍃',
            postgresql: '🐘',
            mysql: '🐬',
            
            // Mobile
            ios: '🍎',
            android: '🤖',
            flutter: '🦋',
            
            // Other
            design: '🎨',
            security: '🔒',
            ai: '🧠'
        };
        
        return emojiMap[role] || '❓';
    }
}

module.exports = RoleManager; 
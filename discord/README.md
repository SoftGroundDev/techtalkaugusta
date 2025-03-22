# Tech Talk Augusta Discord Bot

A Discord bot for managing the Tech Talk Augusta community, handling meetups, resources, and community engagement.

## Features

- 👋 Automatic welcome messages for new members
- 📅 Meetup scheduling and reminders
- 📚 Tech resource sharing
- 📊 Polls for meetup topics
- 🏷️ Automated role assignment

## 🚀 Deployment Guide

### Prerequisites

1. **Azure CLI**
   ```bash
   # Install on macOS
   brew install azure-cli
   
   # Other platforms: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
   ```

2. **Node.js 18.x or higher**
   ```bash
   # Check version
   node --version
   ```

3. **MongoDB Atlas Account**
   - Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Set up a free cluster
   - Get your connection string

### Initial Deployment

1. **Login to Azure**
   ```bash
   az login
   ```

2. **Deploy the Bot**
   ```bash
   # From the discord directory
   npm run deploy:azure
   ```

3. **Configure Environment Variables**
   ```bash
   # Set Discord Token
   az webapp config appsettings set \
     --name tech-talk-augusta-bot \
     --resource-group tech-talk-augusta \
     --settings DISCORD_TOKEN="your_token"

   # Set MongoDB URI
   az webapp config appsettings set \
     --name tech-talk-augusta-bot \
     --resource-group tech-talk-augusta \
     --settings MONGODB_URI="your_mongodb_uri"
   ```

## 🔗 Connecting to Discord

### How It Works

The connection between your Azure web app and Discord works through these steps:

1. **Authentication Flow**
   ```
   Azure Web App → Discord.js → Discord Gateway → Discord Server
   ```
   - Your bot token is the key that authenticates the connection
   - No direct URL or endpoint needed from Discord to Azure
   - Discord.js handles the WebSocket connection automatically

2. **Connection Process**
   - Azure app starts up and loads the bot token
   - Discord.js establishes WebSocket connection to Discord Gateway
   - Bot receives real-time events from your Discord server
   - Commands and responses flow through this WebSocket connection

3. **Why No URL Needed**
   - The connection is outbound from Azure to Discord
   - Discord identifies your bot by its token, not its location
   - This allows the bot to run anywhere with internet access

### 1. Update Discord Application Settings

1. **Go to Discord Developer Portal**
   - Visit [Discord Developer Portal](https://discord.com/developers/applications)
   - Select your bot application

2. **Update Bot Settings**
   ```bash
   # Get your Azure web app URL
   az webapp show \
     --name tech-talk-augusta-bot \
     --resource-group tech-talk-augusta \
     --query defaultHostName \
     --output tsv
   ```
   
   In the Discord Developer Portal:
   - Under "Bot" section, ensure these settings are enabled:
     - ✅ Presence Intent
     - ✅ Server Members Intent
     - ✅ Message Content Intent
   - Save Changes
   
   > **Note**: Do not set an Interactions Endpoint URL. This bot uses WebSocket connections through Discord.js for traditional prefix commands (`!help`, etc.). Interactions Endpoint URLs are only needed if you implement slash commands, which this bot currently doesn't use.

3. **Reset Bot Token (if needed)**
   - Click "Reset Token" in the Bot section
   - Copy the new token
   - Update Azure environment variable:
   ```bash
   az webapp config appsettings set \
     --name tech-talk-augusta-bot \
     --resource-group tech-talk-augusta \
     --settings DISCORD_TOKEN="your_new_token"
   ```

### 2. Verify Bot Permissions

1. **Check OAuth2 Settings**
   - Go to OAuth2 → URL Generator
   - Select required scopes:
     - `bot`
     - `applications.commands`
   - Select bot permissions:
     - Send Messages
     - Read Messages/View Channels
     - Manage Roles
     - Manage Messages
     - Add Reactions

2. **Update Bot in Server (if needed)**
   - Generate new invite URL
   - Remove bot from server
   - Re-invite bot using new URL

### 3. Verify Connection

1. **Check Bot Status**
   ```bash
   # View bot logs
   az webapp log tail \
     --name tech-talk-augusta-bot \
     --resource-group tech-talk-augusta
   ```

2. **Test Bot Commands**
   - Try `!help` in Discord
   - Check bot's online status
   - Verify bot responds to commands

### 4. Troubleshooting Connection

If the bot doesn't connect:

1. **Verify Environment**
   ```bash
   # List all settings
   az webapp config appsettings list \
     --name tech-talk-augusta-bot \
     --resource-group tech-talk-augusta
   ```

2. **Check Application Logs**
   ```bash
   # View detailed logs
   az webapp log download \
     --name tech-talk-augusta-bot \
     --resource-group tech-talk-augusta
   ```

3. **Common Solutions**
   - Restart the web app
   - Verify token is correctly set
   - Check Discord Developer Portal for any warnings
   - Ensure all required intents are enabled

## 🤖 Installing Bot on Your Server

### 1. Generate Invite Link

1. **Go to Discord Developer Portal**
   - Visit [Discord Developer Portal](https://discord.com/developers/applications)
   - Select your bot application
   - Go to "OAuth2" → "URL Generator"

2. **Select Required Scopes**
   - ✅ `bot` (required for bot functionality)
   - ✅ `applications.commands` (for future slash commands)

3. **Select Bot Permissions**
   Required permissions:
   - ✅ Send Messages
   - ✅ Read Messages/View Channels
   - ✅ Manage Roles
   - ✅ Manage Messages
   - ✅ Add Reactions
   - ✅ Embed Links
   - ✅ Attach Files
   - ✅ Read Message History
   - ✅ View Channels

4. **Copy Generated URL**
   - The URL will appear at the bottom of the page
   - This is your bot's invite link

### 2. Invite Bot to Server

1. **Open Invite Link**
   - Open the generated URL in your browser
   - You must have "Manage Server" permission on the target Discord server

2. **Select Server**
   - Choose the server where you want to add the bot
   - Click "Continue"
   - Review permissions
   - Click "Authorize"
   - Complete the CAPTCHA if prompted

3. **Verify Bot Joined**
   - Check your server's member list
   - The bot should appear as a new member
   - Bot should show as "Online" after a few seconds

### 3. Set Up Channels

Create these required channels (if they don't exist):
```
#welcome            - For welcome messages
#rules             - Community guidelines
#announcements     - Important updates
#meetup-schedule   - Automated meetup updates
#role-assignment   - For user roles
```

### 4. Test Bot

1. **Basic Test**
   ```
   !help            - Should show available commands
   !ping            - Should respond with "pong"
   ```

2. **Feature Tests**
   ```
   !meetup schedule - Should show upcoming meetups
   !resources       - Should show available resources
   ```

### 5. Troubleshooting

If the bot doesn't respond:
1. Check if bot is online in your server
2. Verify bot has correct permissions in each channel
3. Check Azure logs for errors:
   ```bash
   az webapp log tail \
     --name tech-talk-augusta-bot \
     --resource-group tech-talk-augusta
   ```

### 6. Post-Installation

1. **Set Up Roles**
   Create these roles if needed:
   - Admin
   - Moderator
   - Event Organizer
   - Member

2. **Configure Welcome Message**
   - Bot will automatically send welcome messages in #welcome
   - Make sure bot has permission to send messages there

3. **Schedule Updates**
   - Bot will auto-update meetup schedule every 12 hours
   - First update happens when bot joins server

## 📊 Monitoring & Management

### View Logs
```bash
# Stream logs in real-time
az webapp log tail \
  --name tech-talk-augusta-bot \
  --resource-group tech-talk-augusta

# Download logs
az webapp log download \
  --name tech-talk-augusta-bot \
  --resource-group tech-talk-augusta
```

### Check Status
```bash
# View app status
az webapp show \
  --name tech-talk-augusta-bot \
  --resource-group tech-talk-augusta \
  --query state

# View detailed info
az webapp show \
  --name tech-talk-augusta-bot \
  --resource-group tech-talk-augusta
```

### Restart the Bot
```bash
az webapp restart \
  --name tech-talk-augusta-bot \
  --resource-group tech-talk-augusta
```

### Update Environment Variables
```bash
az webapp config appsettings set \
  --name tech-talk-augusta-bot \
  --resource-group tech-talk-augusta \
  --settings KEY="value"
```

## ⚠️ Free Tier Limitations

- **Compute Time**: 60 minutes per day
- **Memory**: 1GB RAM
- **Storage**: 1GB
- **Always On**: Disabled (bot sleeps after inactivity)
- **Shared Infrastructure**: Performance may vary

### Maximizing Free Tier

1. **Auto-Restart Schedule**
   - Bot restarts every 12 hours automatically
   - Helps manage compute time limits
   - Configured in `.azure/config.yml`

2. **Resource Usage**
   - Minimal memory footprint
   - Efficient database queries
   - Caching when possible

3. **Handling Disconnections**
   - Auto-reconnect to Discord
   - Database connection recovery
   - Error logging and monitoring

## 🔧 Troubleshooting

### Common Issues

1. **Bot Offline**
   ```bash
   # Check status
   az webapp show --name tech-talk-augusta-bot --resource-group tech-talk-augusta --query state

   # View recent logs
   az webapp log tail --name tech-talk-augusta-bot --resource-group tech-talk-augusta
   ```

2. **Database Connection Issues**
   - Check MongoDB Atlas status
   - Verify connection string in Azure settings
   - Check network access rules

3. **High Resource Usage**
   ```bash
   # View metrics
   az monitor metrics list \
     --resource tech-talk-augusta-bot \
     --resource-group tech-talk-augusta \
     --metric "CpuPercentage"
   ```

### Quick Fixes

1. **Restart the App**
   ```bash
   az webapp restart \
     --name tech-talk-augusta-bot \
     --resource-group tech-talk-augusta
   ```

2. **Clear Temp Files**
   ```bash
   az webapp delete-temp-files \
     --name tech-talk-augusta-bot \
     --resource-group tech-talk-augusta
   ```

## 📈 Upgrading

To improve reliability, consider:

1. **Upgrade to Basic B1 ($13/month)**
   ```bash
   az webapp up \
     --name tech-talk-augusta-bot \
     --resource-group tech-talk-augusta \
     --sku B1
   ```

2. **Add a Ping Service**
   - Use UptimeRobot (free)
   - Set 5-minute interval pings
   - Keep the bot active

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - See LICENSE file for details

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Add your Discord bot token
   - (Optional) Add MongoDB URI if using database features

3. **Create a Discord Application**
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a new application
   - Add a bot to your application
   - Copy the bot token to your `.env` file
   - Enable necessary intents:
     - Server Members Intent
     - Message Content Intent
     - Guild Messages Intent
     - Reactions Intent

4. **Invite the Bot**
   - Go to OAuth2 → URL Generator
   - Select scopes:
     - `bot`
     - `applications.commands`
   - Select bot permissions:
     - Manage Roles
     - Manage Channels
     - Manage Messages
     - Send Messages
     - Read Messages/View Channels
     - Add Reactions
     - Use External Emojis
     - Read Message History
     - Mention Everyone
   - Use the generated URL to invite the bot

5. **Run the Bot**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## Available Commands

- `!help` - Display available commands
- `!schedule` - View upcoming meetups
- `!suggest <topic>` - Suggest a meetup topic
- `!resources` - Share or view tech resources
- `!poll` - Create a poll (admin only)

## Recommended Discord Channel Structure

- #welcome
- #rules
- #announcements
- #introductions
- #general
- #meetup-schedule
- #resources
- #project-showcase
- #job-board
- #tech-help
- #role-assignment

## Contributing

Feel free to submit issues and enhancement requests!

## Eventbrite Integration

The bot can automatically sync meetups with Eventbrite. To set this up:

1. Log in to your Eventbrite account
2. Go to Account Settings > Developer Links > API Keys
3. Create a Private Token and copy it
4. Find your Organization ID from your Eventbrite dashboard URL (format: /organizations/{id})
5. (Optional) Get your Venue ID if you have a default venue for in-person events

Add these values to your `.env` file:
```env
EVENTBRITE_TOKEN=your_private_token
EVENTBRITE_ORGANIZATION_ID=your_organization_id
EVENTBRITE_VENUE_ID=your_venue_id  # Optional
```

When you create a meetup using the `/meetup create` command, the bot will:
1. Create a corresponding event on Eventbrite
2. Add the Eventbrite registration link to the meetup announcement
3. Sync RSVPs between Discord and Eventbrite
4. Handle cancellations on both platforms

Note: Make sure your Eventbrite API token has the necessary permissions (event creation, modification, and deletion). 
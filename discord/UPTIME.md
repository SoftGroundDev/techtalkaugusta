# Keeping the Bot Alive

Since we're using Azure's free tier (F1), the bot will go to sleep after 20 minutes of inactivity. Here's how to keep it alive:

## Setting up UptimeRobot (Free Method)

1. Go to [UptimeRobot](https://uptimerobot.com/) and create a free account

2. After logging in:
   - Click "Add New Monitor"
   - Select "HTTP(s)" as the monitor type
   - Set a friendly name (e.g., "Tech Talk Augusta Bot")
   - Enter your bot's health check URL:
     ```
     https://tech-talk-augusta-bot.azurewebsites.net/health
     ```
   - Set monitoring interval to 5 minutes
   - Click "Create Monitor"

## Alternative Services
- [Pingdom](https://www.pingdom.com/) (Paid, more features)
- [StatusCake](https://www.statuscake.com/) (Free tier available)
- [Better Stack](https://betterstack.com/uptime) (Free tier available)

## Bot Health Check Endpoints

The bot exposes two endpoints:
- `/` - Simple landing page showing the bot is running
- `/health` - JSON endpoint with detailed health information:
  ```json
  {
    "status": "healthy",
    "uptime": 123456,
    "timestamp": "2024-03-14T12:00:00Z"
  }
  ```

## Troubleshooting

If the bot still goes to sleep:
1. Check UptimeRobot dashboard for any failed pings
2. Verify the Azure web app is running
3. Check the bot's logs for any errors:
   ```bash
   az webapp log tail \
     --name tech-talk-augusta-bot \
     --resource-group tech-talk-augusta
   ```

## Azure Configuration

Make sure your Azure Web App has "Always On" disabled (this is automatic for free tier) and the correct Node.js version:
```bash
az webapp config set \
  --name tech-talk-augusta-bot \
  --resource-group tech-talk-augusta \
  --linux-fx-version "NODE|18-lts"
``` 
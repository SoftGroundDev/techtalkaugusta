# Simple Monthly Eventbrite Event Creator

## Goal
Create a static Eventbrite event automatically every month without unnecessary complexity.

## Recommended Architecture

### **Option 1: Serverless Cron Job (Recommended)**

**Stack:**
- **GitHub Actions** (free, built-in)
- **Eventbrite API** (direct calls)
- **No database required**

**How it works:**
```yaml
# .github/workflows/create-monthly-event.yml
name: Create Monthly Event
on:
  schedule:
    - cron: '0 9 1 * *'  # 9 AM on 1st of every month
  workflow_dispatch:     # Manual trigger option

jobs:
  create-event:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: node scripts/create-eventbrite-event.js
    env:
      EVENTBRITE_TOKEN: ${{ secrets.EVENTBRITE_TOKEN }}
      EVENTBRITE_ORG_ID: ${{ secrets.EVENTBRITE_ORG_ID }}
```

**Single Script (`scripts/create-eventbrite-event.js`):**
```javascript
const axios = require('axios');

const event = {
  name: { html: `Tech Talk Augusta - ${getNextMonthName()}` },
  start: { timezone: 'America/New_York', utc: getNextMeetupDate() },
  end: { timezone: 'America/New_York', utc: getNextMeetupEnd() },
  currency: 'USD',
  online_event: false,
  organizer_id: process.env.EVENTBRITE_ORG_ID,
  listed: true,
  shareable: true,
  venue_id: 'your_venue_id'
};

axios.post('https://www.eventbriteapi.com/v3/events/', 
  { event }, 
  { headers: { Authorization: `Bearer ${process.env.EVENTBRITE_TOKEN}` }}
);
```

**Pros:**
- Zero infrastructure costs
- No servers to maintain
- No database needed
- Built-in logging and notifications
- Version controlled
- Manual trigger available

**Cons:**
- GitHub required
- Limited customization per month (but can edit in Eventbrite after creation)

---

### **Option 2: Cloud Function**

**Stack:**
- **Vercel Cron** or **Cloudflare Workers Cron**
- **Eventbrite API**
- **No database required**

**How it works:**
```javascript
// api/cron/create-event.js
export default async function handler(req, res) {
  // Verify cron secret
  if (req.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const event = {
    name: { html: `Tech Talk Augusta - ${getNextMonthName()}` },
    start: { timezone: 'America/New_York', utc: getNextMeetupDate() },
    end: { timezone: 'America/New_York', utc: getNextMeetupEnd() },
    currency: 'USD'
  };

  const response = await fetch('https://www.eventbriteapi.com/v3/events/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.EVENTBRITE_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ event })
  });

  return res.json({ success: true, eventId: response.data.id });
}
```

**Vercel cron configuration (`vercel.json`):**
```json
{
  "crons": [{
    "path": "/api/cron/create-event",
    "schedule": "0 9 1 * *"
  }]
}
```

**Pros:**
- Free tier available
- Simple deployment
- Web dashboard
- Easy manual triggers

**Cons:**
- Requires Vercel/Cloudflare account
- Slightly more setup than GitHub Actions

---

### **Option 3: Local Script + Task Scheduler**

**Stack:**
- **Single Node.js script**
- **macOS/Windows Task Scheduler** or **crontab**
- **Your local machine**

**Crontab entry (macOS/Linux):**
```bash
0 9 1 * * cd /path/to/script && node create-event.js
```

**Windows Task Scheduler:**
- Trigger: Monthly, 1st day, 9:00 AM
- Action: Run `node create-event.js`

**Pros:**
- No external dependencies
- Complete control
- Instant execution

**Cons:**
- Machine must be running
- No automatic logging
- Manual setup per machine

---

## Comparison Table

| Factor | GitHub Actions | Cloud Function | Local Script |
|--------|----------------|----------------|--------------|
| **Cost** | Free | Free tier | Free |
| **Reliability** | High | High | Depends on uptime |
| **Setup Time** | 5 minutes | 10 minutes | 2 minutes |
| **Maintenance** | None | Minimal | Manual |
| **Logs** | Built-in | Dashboard | DIY |
| **Manual Trigger** | Easy | Easy | Run anytime |

---

## Recommended: GitHub Actions

**Why:**
1. Zero infrastructure
2. Built-in notifications (email on failure)
3. Version controlled configuration
4. Free for public/private repos
5. No server required
6. Easy to test and modify

**Total files needed:**
```
.github/
  workflows/
    create-monthly-event.yml
scripts/
  create-eventbrite-event.js
  package.json (axios only)
```

**Total setup time:** ~10 minutes

---

## Event Template

Store your event template as JSON for easy customization:

```json
{
  "event": {
    "name": {
      "html": "Tech Talk Augusta - {{MONTH}} {{YEAR}}"
    },
    "description": {
      "html": "Join us for our monthly tech meetup..."
    },
    "start": {
      "timezone": "America/New_York",
      "utc": "{{CALCULATED}}"
    },
    "end": {
      "timezone": "America/New_York",
      "utc": "{{CALCULATED}}"
    },
    "currency": "USD",
    "online_event": false,
    "listed": true,
    "shareable": true,
    "venue_id": "{{YOUR_VENUE_ID}}"
  }
}
```

---

## What You DON'T Need

- ❌ MongoDB
- ❌ Discord bot
- ❌ Web server
- ❌ Express/Fastify
- ❌ Docker
- ❌ Kubernetes
- ❌ Load balancer
- ❌ Message queue
- ❌ Authentication system
- ❌ Admin panel

---

## Next Steps

1. Get Eventbrite API token
2. Get Organization ID
3. Get Venue ID (or create venue via API)
4. Choose architecture (GitHub Actions recommended)
5. Write 50-line script
6. Test with manual trigger
7. Set and forget

**Total complexity:** One YAML file + one JavaScript file = Done.

# Tech Talk Augusta - Project Overview

## What is Tech Talk Augusta?

Tech Talk Augusta is a community-driven initiative focused on building a thriving technology ecosystem in Augusta, Georgia. The project encompasses both a web presence and community management tools to support monthly tech meetups, foster innovation, and promote technological growth in the Augusta area.

## Mission & Vision

### Core Mission
Building a thriving tech community in Augusta, Georgia through innovation, connection, and equity.

### Vision
Augusta is uniquely positioned to become a hub for technological growth and innovation. As the home of:
- The Army Cyber Center of Excellence
- The Augusta National
- Georgia Cyber Center
- Savannah River Nuclear Site

The city has world-class resources and expertise. Tech Talk Augusta aims to bridge the gap by:

- **Entrepreneurship in Tech**: Encouraging small businesses to thrive in downtown Augusta
- **Community Investment**: Tech professionals supporting the arts, education, and local equity initiatives
- **Educational Growth**: Integrating tech curricula into schools to empower the next generation
- **Inclusivity and Opportunity**: Using technology to reduce poverty and increase equality across the city

## Project Components

### 1. Web Platform (SvelteKit Application)

**Technology Stack**:
- **Framework**: SvelteKit 2.0 with Svelte 5.0
- **Styling**: TailwindCSS with typography and container queries
- **Build Tools**: Vite 5.0
- **Deployment**: Netlify (adapter-netlify)
- **Testing**: Playwright for E2E, Vitest for unit tests
- **Language**: TypeScript

**Key Features**:
- Homepage with community vision and mission
- Event calendar and upcoming meetups
- Blog for tech articles and community updates
- Contact forms and speaker submission system
- Resource library
- Privacy policy and compliance
- Carousel for community photos
- Integration with Eventbrite for event management

**Routes & Pages**:
- `/` - Homepage with hero and about sections
- `/about` - Detailed information about the organization
- `/blog` - Tech articles and community updates
- `/calendar` - Event calendar and schedule
- `/events` - Event listings and details
- `/forms/*` - Various forms (contact, speaker submissions, event creation)
- `/resources` - Tech resources and learning materials
- `/contact` - Contact information
- `/privacy` - Privacy policy

### 2. Discord Bot (Community Management)

**Technology Stack**:
- **Runtime**: Node.js 18.x+
- **Database**: MongoDB Atlas
- **Deployment**: Azure (with deployment scripts)
- **APIs**: Discord.js, Eventbrite API, Meetup.com API, Facebook Graph API

**Key Features**:
- Automated welcome messages for new members
- Meetup scheduling and reminders
- Tech resource sharing
- Polls for meetup topics
- Automated role assignment
- Event management commands (`!meetup`)
- User tracking and engagement metrics
- Health check endpoint for uptime monitoring
- Cross-platform event synchronization (Discord, Eventbrite, Meetup, Facebook)

**Commands**:
- `!meetup` - Event management commands
- `!help` - Display available commands
- `!ping` - Bot health check
- `!event` - Create/manage events
- `!role` - Role management
- `!setup-roles` - Initial role configuration
- `!status` - Bot and system status
- `!uptime` - Uptime statistics

**Integrations**:
- Eventbrite for ticket management
- Meetup.com for community events
- Facebook Events for social reach
- MongoDB for data persistence
- Event synchronization across all platforms

### 3. Event Management System

The project includes a sophisticated cross-platform event management system that:
- Creates events simultaneously on Discord, Eventbrite, Meetup.com, and Facebook
- Synchronizes RSVPs and attendance across platforms
- Manages event updates and cancellations
- Tracks analytics and engagement metrics
- Provides unified event templates
- Handles platform-specific features (tickets, privacy settings, etc.)

## Community Impact

Tech Talk Augusta is more than a monthly meetup—it's a movement to:
- Support local software developers and small tech businesses
- Invest in downtown Augusta's vibrant community
- Bridge the gap between large institutions and local entrepreneurs
- Create opportunities for education and skill development
- Promote diversity and inclusion in tech
- Build a self-sustaining tech ecosystem

## Repository Structure

```
techtalkaugusta/
├── src/                    # SvelteKit web application
│   ├── routes/            # Page routes and API endpoints
│   ├── lib/               # Shared components and utilities
│   └── app.html           # HTML template
├── discord/               # Discord bot application
│   ├── src/              # Bot source code
│   │   ├── commands/     # Slash commands
│   │   ├── handlers/     # Event handlers
│   │   ├── modules/      # Feature modules
│   │   └── utils/        # Utilities
│   └── templates/        # Message templates
├── static/               # Static assets
├── e2e/                  # End-to-end tests
├── presentation/         # Project documentation and planning
└── build/                # Production build output
```

## Development Workflow

**Web Development**:
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build
npm run test         # Run all tests
npm run test:e2e     # Run Playwright tests
```

**Discord Bot**:
```bash
npm run deploy:azure # Deploy to Azure
```

## Target Audience

- Local software developers and tech professionals
- Tech entrepreneurs and small business owners
- Students interested in technology careers
- Community members seeking tech education
- Organizations supporting downtown Augusta
- Anyone passionate about tech equity and inclusion

## Current Status

The project is actively maintained and deployed with:
- Live website at techtalkaugusta.com
- Active Discord community
- Regular monthly meetups
- Integration with major event platforms
- Continuous development and feature additions

## Contributing

Contributions are welcome! The project follows standard Git workflow:
1. Fork the repository
2. Create feature branches (`feature/specifics` or `fix/specifics`)
3. Make changes with passing E2E tests
4. Submit pull requests with test proof

## Key Technologies & Dependencies

**Frontend**:
- Svelte 5.0, SvelteKit 2.0
- TailwindCSS, Autoprefixer
- Font Awesome icons
- TypeScript, ESLint, Prettier

**Backend/Bot**:
- Node.js, Discord.js
- MongoDB Atlas
- Platform APIs (Eventbrite, Meetup, Facebook)

**DevOps**:
- Netlify for web hosting
- Azure for bot hosting
- GitHub for version control
- Playwright + Vitest for testing

---

*Tech Talk Augusta: Building tomorrow's tech community, today.*

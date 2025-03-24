<script lang="ts">
	import transparentLogo from '$lib/images/logo-transparent.png';
	import { onMount } from 'svelte';

	interface Event {
		id: string;
		title: string;
		date: string;
		time: string;
		location: string;
		description: string;
		registrationUrl: string;
		createdAt: string;
	}

	let events: Event[] = [];
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			// For now, we'll use static data since the API is not ready
			events = [{
				id: '1',
				title: 'April 1st Third Tech Talk Augusta Meetup',
				date: '2024-04-01',
				time: '7:00 PM',
				location: 'Savannah River Brewing Company',
				description: 'Join us for our third Tech Talk Augusta meetup! Connect with local tech enthusiasts, share ideas, and learn about the latest trends in technology.',
				registrationUrl: 'https://www.eventbrite.com/e/april-1st-third-tech-talk-augusta-meetup-tickets-1285325586429',
				createdAt: new Date().toISOString()
			}];
			loading = false;
		} catch (e) {
			error = 'Failed to load events. Please try again later.';
			console.error('Error loading events:', e);
			loading = false;
		}
	});

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}

	function formatTime(timeString: string) {
		return timeString || 'TBD';
	}
</script>

<svelte:head>
	<title>Events - Tech Talk Augusta</title>
	<meta name="description" content="Join our upcoming tech events in Augusta, Georgia. Monthly meetups, workshops, and networking opportunities for the local tech community." />
	<meta name="keywords" content="Tech Events, Augusta Georgia, Technology Meetups, Networking Events, Tech Workshops" />
	<meta name="author" content="Tech Talk Augusta" />
	<meta property="og:title" content="Tech Events - Tech Talk Augusta" />
	<meta property="og:description" content="Join our upcoming tech events in Augusta, Georgia. Monthly meetups, workshops, and networking opportunities for the local tech community." />
	<meta property="og:image" content="https://techtalkaugusta.com/images/og-image.jpg" />
	<meta property="og:url" content="https://techtalkaugusta.com/events" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Tech Events - Tech Talk Augusta" />
	<meta name="twitter:description" content="Join our upcoming tech events in Augusta, Georgia. Monthly meetups, workshops, and networking opportunities for the local tech community." />
	<meta name="twitter:image" content="https://techtalkaugusta.com/images/twitter-image.jpg" />
</svelte:head>

<section class="hero">
	<div class="container">
		<div class="hero-content">
			<img src={transparentLogo} alt="Tech Talk Augusta Logo" class="hero-logo" />
			<h1>Upcoming Events</h1>
			<p class="hero-text">
				Join us for exciting tech events, workshops, and networking opportunities in Augusta.
			</p>
		</div>
	</div>
</section>

<section class="events-section">
	<div class="container">
		{#if loading}
			<div class="loading">
				<p>Loading events...</p>
			</div>
		{:else if error}
			<div class="error">
				<p>{error}</p>
			</div>
		{:else if events.length === 0}
			<div class="no-events">
				<p>No upcoming events at the moment. Check back soon!</p>
			</div>
		{:else}
			<div class="events-grid">
				{#each events as event}
					<div class="event-card">
						<div class="event-date">
							<span class="month">{formatDate(event.date).split(' ')[0]}</span>
							<span class="day">{formatDate(event.date).split(' ')[1]}</span>
						</div>
						<div class="event-content">
							<h3>{event.title}</h3>
							<p class="event-time">{formatTime(event.time)}</p>
							<p class="event-location">{event.location}</p>
							<p class="event-description">{event.description}</p>
							{#if event.registrationUrl}
								<a
									href={event.registrationUrl}
									class="btn btn-primary"
									target="_blank"
									rel="noopener noreferrer"
								>
									Register on Eventbrite
								</a>
							{:else}
								<button class="btn btn-secondary" disabled>Registration Coming Soon</button>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<div class="past-events">
			<h2>Past Events</h2>
			<p class="lead">
				Missed an event? Check out our past talks and presentations on our blog.
			</p>
			<a href="https://dev.to/techtalkaugusta" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
				View Past Events
			</a>
		</div>
	</div>
</section>

<style>
	.hero {
		background-color: var(--color-surface);
		padding: var(--spacing-16) 0;
		text-align: center;
	}

	.hero-content {
		max-width: 800px;
		margin: 0 auto;
	}

	.hero-logo {
		width: 200px;
		height: auto;
		margin-bottom: var(--spacing-8);
	}

	.hero-text {
		font-size: var(--font-size-xl);
		color: var(--color-text-light);
		margin-top: var(--spacing-4);
	}

	.events-section {
		padding: var(--spacing-16) 0;
	}

	.events-grid {
		display: grid;
		gap: var(--spacing-8);
		margin-bottom: var(--spacing-16);
	}

	.event-card {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: var(--spacing-6);
		background: white;
		padding: var(--spacing-6);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
	}

	.event-date {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: var(--color-primary);
		color: white;
		padding: var(--spacing-4);
		border-radius: var(--radius-md);
		min-width: 80px;
	}

	.event-date .month {
		font-size: var(--font-size-lg);
		font-weight: bold;
	}

	.event-date .day {
		font-size: var(--font-size-xl);
		font-weight: bold;
	}

	.event-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	.event-time {
		color: var(--color-primary);
		font-weight: 500;
	}

	.event-location {
		color: var(--color-text-light);
	}

	.event-description {
		margin: var(--spacing-4) 0;
	}

	.past-events {
		text-align: center;
		padding-top: var(--spacing-8);
		border-top: 1px solid var(--color-border);
	}

	.lead {
		font-size: var(--font-size-xl);
		color: var(--color-text-light);
		margin-bottom: var(--spacing-8);
	}

	.loading, .error, .no-events {
		text-align: center;
		padding: var(--spacing-8);
		background: white;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
	}

	.error {
		color: var(--color-error);
	}

	.no-events {
		color: var(--color-text-light);
	}

	@media (max-width: 768px) {
		.event-card {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.event-date {
			margin: 0 auto;
		}

		.hero {
			padding: var(--spacing-8) 0;
		}

		.hero-text {
			font-size: var(--font-size-lg);
		}
	}
</style> 
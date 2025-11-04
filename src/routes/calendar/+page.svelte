<script lang="ts">
	import transparentLogo from '$lib/images/logo-transparent.png';
	import stockEvent from '$lib/images/stock-event.jpg';

	// Sample event data - in a real app, this would come from an API or database
	const events = [
		{
			id: 1,
			title: 'April 1st Third Tech Talk Augusta Meetup',
			date: '2024-04-01',
			time: '6:00 PM',
			location: 'Augusta Tech Hub',
			description:
				'Join us for our third Tech Talk Augusta meetup! Connect with local tech enthusiasts, share ideas, and learn about the latest trends in technology.',
			type: 'meetup',
			image: stockEvent,
			registrationUrl: 'https://www.eventbrite.com/o/softground-103977616831'
		}
	];

	let selectedType = 'all';
	$: filteredEvents =
		selectedType === 'all' ? events : events.filter((event) => event.type === selectedType);
</script>

<svelte:head>
	<title>Calendar - Tech Talk Augusta</title>
	<meta
		name="description"
		content="View upcoming tech events, workshops, and meetups in Augusta, Georgia. Join our community for knowledge sharing and networking."
	/>
	<meta
		name="keywords"
		content="Augusta Tech Events, Tech Meetups, Workshops, Calendar, Georgia Tech Community"
	/>
	<meta property="og:title" content="Calendar - Tech Talk Augusta" />
	<meta
		property="og:description"
		content="View upcoming tech events, workshops, and meetups in Augusta, Georgia. Join our community for knowledge sharing and networking."
	/>
	<meta property="og:image" content="https://techtalkaugusta.com/images/og-image.jpg" />
	<meta property="og:url" content="https://techtalkaugusta.com/calendar" />
</svelte:head>

<section class="hero">
	<div class="container">
		<div class="hero-content">
			<img src={transparentLogo} alt="Tech Talk Augusta Logo" class="hero-logo" />
			<h1>Upcoming Events</h1>
			<p class="lead">
				Join us for exciting tech talks, workshops, and networking events in Augusta.
			</p>
			<div class="hero-cta">
				<a
					href="https://www.eventbrite.com/o/softground-103977616831"
					class="btn btn-primary btn-large"
					target="_blank"
					rel="noopener noreferrer"
				>
					View All Events on Eventbrite
				</a>
			</div>
		</div>
	</div>
</section>

<section class="calendar">
	<div class="container">
		<div class="event-types">
			<h2>Event Types</h2>
			<div class="event-types-grid">
				<div class="event-type-card">
					<div class="card-icon">🎯</div>
					<h3>Tech Talks</h3>
					<p>Monthly presentations on cutting-edge technology topics</p>
				</div>
				<div class="event-type-card">
					<div class="card-icon">💻</div>
					<h3>Workshops</h3>
					<p>Hands-on learning sessions for practical skills</p>
				</div>
				<div class="event-type-card">
					<div class="card-icon">🤝</div>
					<h3>Networking</h3>
					<p>Connect with local tech professionals</p>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="cta">
	<div class="container">
		<div class="cta-content">
			<h2>Want to Stay Updated?</h2>
			<p>
				Subscribe to our newsletter to receive updates about upcoming events and community news.
			</p>
			<a
				href="https://techtalkaugusta.beehiiv.com/"
				class="btn btn-secondary"
				target="_blank"
				rel="noopener noreferrer">Subscribe to Newsletter</a
			>
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
		width: 150px;
		height: auto;
		margin-bottom: var(--spacing-4);
	}

	.lead {
		font-size: var(--font-size-xl);
		color: var(--color-text-light);
		margin-top: var(--spacing-4);
	}

	.calendar {
		padding: var(--spacing-16) 0;
	}

	.filters {
		display: flex;
		gap: var(--spacing-4);
		margin-bottom: var(--spacing-8);
		flex-wrap: wrap;
		justify-content: center;
	}

	.filter-btn {
		padding: var(--spacing-2) var(--spacing-4);
		border: 2px solid var(--color-primary);
		border-radius: var(--radius-full);
		background: transparent;
		color: var(--color-primary);
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.filter-btn:hover {
		background: var(--color-primary-light);
	}

	.filter-btn.active {
		background: var(--color-primary);
		color: white;
	}

	.events-grid {
		display: grid;
		gap: var(--spacing-8);
	}

	.event-card {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: var(--spacing-6);
		background: white;
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-md);
	}

	.event-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.event-content {
		padding: var(--spacing-6);
	}

	.event-date {
		display: flex;
		gap: var(--spacing-4);
		margin-bottom: var(--spacing-4);
		color: var(--color-text-light);
	}

	.location {
		color: var(--color-primary);
		font-weight: 500;
		margin: var(--spacing-2) 0;
	}

	.description {
		margin: var(--spacing-4) 0;
		color: var(--color-text-light);
	}

	.cta {
		background-color: var(--color-surface);
		padding: var(--spacing-16) 0;
		text-align: center;
	}

	.cta-content {
		max-width: 600px;
		margin: 0 auto;
	}

	.no-events {
		text-align: center;
		padding: var(--spacing-8);
		color: var(--color-text-light);
	}

	.hero-cta {
		margin-top: var(--spacing-8);
	}

	.btn-large {
		font-size: var(--font-size-lg);
		padding: var(--spacing-4) var(--spacing-8);
	}

	.event-types {
		padding: var(--spacing-16) 0;
	}

	.event-types-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-8);
		margin-top: var(--spacing-8);
	}

	.event-type-card {
		background: white;
		padding: var(--spacing-6);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
		text-align: center;
		transition: transform 0.2s ease;
	}

	.event-type-card:hover {
		transform: translateY(-4px);
	}

	.card-icon {
		font-size: 2.5rem;
		margin-bottom: var(--spacing-4);
	}

	.event-type-card h3 {
		color: var(--color-text);
		margin-bottom: var(--spacing-4);
	}

	.event-type-card p {
		color: var(--color-text-light);
	}

	@media (max-width: 768px) {
		.event-card {
			grid-template-columns: 1fr;
		}

		.event-image {
			height: 200px;
		}

		.hero {
			padding: var(--spacing-8) 0;
		}

		.lead {
			font-size: var(--font-size-lg);
		}

		.filters {
			flex-direction: column;
			align-items: stretch;
		}

		.filter-btn {
			width: 100%;
		}

		.event-types-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

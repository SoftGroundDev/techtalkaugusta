<script lang="ts">
	import transparentLogo from '$lib/images/logo-transparent.png';
	import stockEvent from '$lib/images/stock-event.jpg';

	// Sample event data - in a real app, this would come from an API or database
	const events = [
		{
			id: 1,
			title: 'Web Development Workshop',
			date: '2024-04-15',
			time: '6:00 PM',
			location: 'Augusta Tech Hub',
			description: 'Join us for a hands-on workshop on modern web development techniques.',
			type: 'workshop',
			image: stockEvent
		},
		{
			id: 2,
			title: 'AI & Machine Learning Meetup',
			date: '2024-04-22',
			time: '7:00 PM',
			location: 'Virtual Event',
			description: 'Discussion on the latest developments in AI and machine learning.',
			type: 'meetup',
			image: stockEvent
		},
		{
			id: 3,
			title: 'Cybersecurity Panel',
			date: '2024-05-01',
			time: '6:30 PM',
			location: 'Augusta University',
			description: 'Expert panel discussion on current cybersecurity challenges and solutions.',
			type: 'panel',
			image: stockEvent
		}
	];

	let selectedType = 'all';
	$: filteredEvents = selectedType === 'all' 
		? events 
		: events.filter(event => event.type === selectedType);
</script>

<svelte:head>
	<title>Calendar - Tech Talk Augusta</title>
	<meta name="description" content="View upcoming tech events, workshops, and meetups in Augusta, Georgia. Join our community for knowledge sharing and networking." />
	<meta name="keywords" content="Augusta Tech Events, Tech Meetups, Workshops, Calendar, Georgia Tech Community" />
	<meta property="og:title" content="Calendar - Tech Talk Augusta" />
	<meta property="og:description" content="View upcoming tech events, workshops, and meetups in Augusta, Georgia. Join our community for knowledge sharing and networking." />
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
		</div>
	</div>
</section>

<section class="calendar">
	<div class="container">
		<div class="filters">
			<button 
				class="filter-btn {selectedType === 'all' ? 'active' : ''}" 
				on:click={() => selectedType = 'all'}
			>
				All Events
			</button>
			<button 
				class="filter-btn {selectedType === 'meetup' ? 'active' : ''}" 
				on:click={() => selectedType = 'meetup'}
			>
				Meetups
			</button>
			<button 
				class="filter-btn {selectedType === 'workshop' ? 'active' : ''}" 
				on:click={() => selectedType = 'workshop'}
			>
				Workshops
			</button>
			<button 
				class="filter-btn {selectedType === 'panel' ? 'active' : ''}" 
				on:click={() => selectedType = 'panel'}
			>
				Panels
			</button>
		</div>

		<div class="events-grid">
			{#each filteredEvents as event}
				<div class="event-card">
					<div class="event-image">
						<img src={event.image} alt={event.title} />
					</div>
					<div class="event-content">
						<div class="event-date">
							<span class="date">{new Date(event.date).toLocaleDateString('en-US', { 
								month: 'long', 
								day: 'numeric', 
								year: 'numeric' 
							})}</span>
							<span class="time">{event.time}</span>
						</div>
						<h3>{event.title}</h3>
						<p class="location">{event.location}</p>
						<p class="description">{event.description}</p>
						<a href="/forms/event-registration" class="btn btn-primary">Register</a>
					</div>
				</div>
			{/each}
		</div>

		{#if filteredEvents.length === 0}
			<div class="no-events">
				<p>No events found for the selected category.</p>
			</div>
		{/if}
	</div>
</section>

<section class="cta">
	<div class="container">
		<div class="cta-content">
			<h2>Want to Stay Updated?</h2>
			<p>
				Subscribe to our newsletter to receive updates about upcoming events and community news.
			</p>
			<a href="/forms/newsletter" class="btn btn-secondary">Subscribe to Newsletter</a>
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
	}
</style>
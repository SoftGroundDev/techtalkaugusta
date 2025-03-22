<script lang="ts">
	import transparentLogo from '$lib/images/logo-transparent.png';
	import stockTeam from '$lib/images/stock-team.jpg';
	import stockCommunity from '$lib/images/stock-community.jpg';
</script>

<svelte:head>
	<title>About Us - Tech Talk Augusta</title>
	<meta name="description" content="Learn about Tech Talk Augusta's mission to build a thriving tech community in Augusta, Georgia through innovation, connection, and equity." />
	<meta name="keywords" content="About Tech Talk Augusta, Augusta Tech Community, Tech Meetup Mission, Georgia Tech Events" />
	<meta property="og:title" content="About Us - Tech Talk Augusta" />
	<meta property="og:description" content="Learn about Tech Talk Augusta's mission to build a thriving tech community in Augusta, Georgia through innovation, connection, and equity." />
	<meta property="og:image" content="https://techtalkaugusta.com/images/og-image.jpg" />
	<meta property="og:url" content="https://techtalkaugusta.com/about" />
</svelte:head>

<section class="hero">
	<div class="container">
		<div class="hero-content">
			<img src={transparentLogo} alt="Tech Talk Augusta Logo" class="hero-logo" />
			<h1>About Tech Talk Augusta</h1>
			<p class="lead">
				Building a thriving tech community in Augusta, Georgia through innovation, connection, and equity.
			</p>
		</div>
	</div>
</section>

<section class="mission">
	<div class="container">
		<div class="mission-grid">
			<div class="mission-content">
				<h2>Our Mission</h2>
				<p>
					Tech Talk Augusta is dedicated to fostering a vibrant tech ecosystem in Augusta, Georgia. We believe in the power of community to drive innovation, create opportunities, and make technology accessible to everyone.
				</p>
				<p>
					Our monthly meetups serve as a platform for knowledge sharing, networking, and collaboration among local tech professionals, students, and enthusiasts. We're committed to building a diverse and inclusive community that supports growth and innovation in Augusta's tech scene.
				</p>
			</div>
			<div class="mission-image">
				<img src={stockTeam} alt="Tech Talk Augusta team members collaborating" />
			</div>
		</div>
	</div>
</section>

<section class="values">
	<div class="container">
		<h2>Our Values</h2>
		<div class="values-grid">
			<div class="value-card">
				<h3>Innovation</h3>
				<p>Fostering creativity and pushing the boundaries of what's possible in technology.</p>
			</div>
			<div class="value-card">
				<h3>Connection</h3>
				<p>Building meaningful relationships within the tech community and beyond.</p>
			</div>
			<div class="value-card">
				<h3>Equity</h3>
				<p>Ensuring technology and opportunities are accessible to everyone in our community.</p>
			</div>
		</div>
	</div>
</section>

<section class="impact">
	<div class="container">
		<div class="impact-grid">
			<div class="impact-image">
				<img src={stockCommunity} alt="Community members at a Tech Talk Augusta event" />
			</div>
			<div class="impact-content">
				<h2>Community Impact</h2>
				<p>
					Since our inception, Tech Talk Augusta has been working to strengthen Augusta's tech ecosystem. We've:
				</p>
				<ul class="impact-list">
					<li>Organized monthly tech talks featuring local and national speakers</li>
					<li>Connected tech professionals with local businesses and opportunities</li>
					<li>Supported educational initiatives in technology and programming</li>
					<li>Created a platform for knowledge sharing and collaboration</li>
					<li>Fostered partnerships with local organizations and institutions</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="cta">
	<div class="container">
		<div class="cta-content">
			<h2>Join Our Community</h2>
			<p>
				Whether you're a seasoned tech professional, a student, or just curious about technology, there's a place for you in our community.
			</p>
			<div class="cta-buttons">
				<a href="/calendar" class="btn btn-primary">View Upcoming Events</a>
				<a href="/forms/contact" class="btn btn-secondary">Get in Touch</a>
			</div>
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

	.mission {
		padding: var(--spacing-16) 0;
	}

	.mission-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-8);
		align-items: center;
	}

	.mission-content {
		padding-right: var(--spacing-8);
	}

	.mission-image img {
		width: 100%;
		height: auto;
		border-radius: var(--radius-lg);
	}

	.values {
		background-color: var(--color-surface);
		padding: var(--spacing-16) 0;
	}

	.values-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-8);
		margin-top: var(--spacing-8);
	}

	.value-card {
		background: white;
		padding: var(--spacing-6);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
	}

	.impact {
		padding: var(--spacing-16) 0;
	}

	.impact-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-8);
		align-items: center;
	}

	.impact-image img {
		width: 100%;
		height: auto;
		border-radius: var(--radius-lg);
	}

	.impact-list {
		list-style: none;
		padding: 0;
		margin: var(--spacing-6) 0;
	}

	.impact-list li {
		margin-bottom: var(--spacing-4);
		padding-left: var(--spacing-6);
		position: relative;
	}

	.impact-list li::before {
		content: "•";
		color: var(--color-primary);
		position: absolute;
		left: 0;
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

	.cta-buttons {
		display: flex;
		gap: var(--spacing-4);
		justify-content: center;
		margin-top: var(--spacing-8);
	}

	@media (max-width: 768px) {
		.mission-grid,
		.impact-grid {
			grid-template-columns: 1fr;
		}

		.mission-content {
			padding-right: 0;
		}

		.cta-buttons {
			flex-direction: column;
		}

		.hero {
			padding: var(--spacing-8) 0;
		}

		.lead {
			font-size: var(--font-size-lg);
		}
	}
</style>

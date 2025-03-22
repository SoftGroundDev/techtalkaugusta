<script lang="ts">
	import transparentLogo from '$lib/images/logo-transparent.png';
	import stockCommunity from '$lib/images/stock-community.jpg';
	import stockBlog from '$lib/images/stock-blog.jpg';
	import stockFriends from '$lib/images/stock-friends.jpg';
</script>

<svelte:head>
	<title>Tech Talk Augusta</title>
	<meta name="description" content="Join our monthly tech meetup in Augusta, Georgia. Connect with local tech enthusiasts, share ideas, and learn about the latest trends in technology." />
	<meta name="keywords" content="Tech Meetup, Augusta Georgia, Technology Community, Networking, Monthly Events" />
	<meta name="author" content="Tech Talk Augusta" />
	<meta property="og:title" content="Augusta Tech Meetup" />
	<meta property="og:description" content="Join our monthly tech meetup in Augusta, Georgia. Connect with local tech enthusiasts and learn about the latest trends in technology." />
	<meta property="og:image" content="https://techtalkaugusta.com/images/og-image.jpg" />
	<meta property="og:url" content="https://techtalkaugusta.com" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Augusta Tech Meetup" />
	<meta name="twitter:description" content="Join our monthly tech meetup in Augusta, Georgia. Connect with local tech enthusiasts and learn about the latest trends in technology." />
	<meta name="twitter:image" content="https://techtalkaugusta.com/images/twitter-image.jpg" />
</svelte:head>

<section class="hero">
	<div class="container">
		<div class="hero-content">
			<img src={transparentLogo} alt="Tech Talk Augusta Logo" class="hero-logo" />
			<h1>Tech Talk Augusta</h1>
			<h2>Building a Thriving Tech Community in Augusta</h2>
			<p class="hero-text">
				Join us in fostering innovation, connection, and equity in Augusta's tech scene.
			</p>
		</div>
	</div>
</section>

<section class="features">
	<div class="container">
		<div class="feature-grid">
			<div class="feature-card">
				<img src={stockCommunity} alt="Community members sharing a meal" class="feature-image" />
				<div class="feature-content">
					<h3>Community Calendar</h3>
					<p>Stay updated with all tech events in Augusta.</p>
					<a href="/events" class="btn btn-primary">View Events</a>
				</div>
			</div>

			<div class="feature-card">
				<div class="feature-content">
					<h3>Event Archive</h3>
					<p>Access previous talks, events, and presentations.</p>
					<a href="https://dev.to/techtalkaugusta" class="btn btn-primary">View Past Events</a>
				</div>
				<img src={stockBlog} alt="Person working on computer" class="feature-image" />
			</div>

			<div class="feature-card">
				<img src={stockFriends} alt="Group of friends" class="feature-image" />
				<div class="feature-content">
					<h3>Tech Directory</h3>
					<p>Connect with local tech professionals and companies.</p>
					<button class="btn btn-primary" disabled>Coming Soon</button>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="cta-section">
	<div class="container">
		<div class="cta-grid">
			<div class="cta-card">
				<h3>Call For Speakers</h3>
				<p>
					Share your expertise and inspire others in our community. We're always looking for
					passionate speakers to share their knowledge and experiences.
				</p>
				<a href="/forms/call-for-speakers" class="btn btn-secondary">Apply to Speak</a>
			</div>

			<div class="cta-card">
				<h3>Get in Touch</h3>
				<p>
					Have questions or suggestions? We'd love to hear from you!
				</p>
				<a href="/forms/contact" class="btn btn-secondary">Contact Us</a>
			</div>
		</div>
	</div>
</section>

<section class="about-section">
	<div class="container">
		<h2>Why Augusta?</h2>
		<p class="lead">
			Augusta is a city with a rich history and a bright future, uniquely positioned to become a hub
			for technological growth and innovation.
		</p>

		<div class="about-grid">
			<div class="about-content">
				<p>
					As the home of the Army Cyber Center of Excellence, the Augusta National, Georgia Cyber Center, and
					the Savannah River Nuclear Site, our city is no stranger to world-class projects and cutting-edge
					expertise. Yet, while these institutions bring incredible resources and talent, there's a missing
					piece: support for small businesses, local software developers, and the vibrant downtown community.
				</p>

				<h3>Our Vision</h3>
				<ul class="feature-list">
					<li>
						<strong>Entrepreneurship in Tech:</strong> Encouraging small businesses to thrive in our
						downtown.
					</li>
					<li>
						<strong>Community Investment:</strong> Tech professionals supporting the arts, education, and local
						equity initiatives.
					</li>
					<li>
						<strong>Educational Growth:</strong> Integrating tech curricula into schools to empower the next
						generation of innovators.
					</li>
					<li>
						<strong>Inclusivity and Opportunity:</strong> Using technology to reduce poverty and increase equality
						across our city.
					</li>
				</ul>

				<p>
					Augusta has the talent, the drive, and the resources to stand on its own two feet as a tech leader—not
					just for government contractors but for everyone who calls this city home. Together, we can build
					a community where technology uplifts every corner of Augusta. Join us in making it happen.
				</p>
			</div>
		</div>
	</div>
</section>

<section class="discord-section">
	<div class="container">
		<div class="discord-grid">
			<div class="discord-content">
				<h2>Join Our Discord Community</h2>
				<p class="lead">
					Connect with tech enthusiasts, share resources, and stay updated with the latest events.
				</p>
				<ul class="discord-features">
					<li>Real-time discussions and networking</li>
					<li>Automated event reminders</li>
					<li>Tech resource sharing</li>
					<li>Community polls and feedback</li>
					<li>Role-based channels and access</li>
				</ul>
				<div class="discord-cta">
					<a href="https://discord.gg/techtalkaugusta" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
						Join Discord Server
					</a>
				</div>
			</div>
			<div class="discord-image">
				<img src={stockCommunity} alt="Discord community members" />
			</div>
		</div>
	</div>
</section>

<section class="whats-next-section">
	<div class="container">
		<h2>What's Next</h2>
		<p class="lead">
			Stay tuned for exciting events and initiatives coming to Augusta's tech community.
		</p>

		<div class="whats-next-grid">
			<div class="whats-next-card">
				<div class="card-icon">🎯</div>
				<h3>Monthly Tech Talks</h3>
				<p>
					Join us every month for engaging presentations on cutting-edge technology topics,
					from AI to cybersecurity.
				</p>
				<a href="/calendar" class="btn btn-secondary">View Schedule</a>
			</div>

			<div class="whats-next-card">
				<div class="card-icon">💻</div>
				<h3>Code & Coffee</h3>
				<p>
					Weekly casual meetups where developers can work on projects together,
					share knowledge, and network.
				</p>
				<button class="btn btn-secondary" disabled>Coming Soon</button>
			</div>

			<div class="whats-next-card">
				<div class="card-icon">🤝</div>
				<h3>Tech Career Fair</h3>
				<p>
					Connect with local tech companies and discover career opportunities
					in Augusta's growing tech sector.
				</p>
				<button class="btn btn-secondary" disabled>Coming Soon</button>
			</div>

			<div class="whats-next-card">
				<div class="card-icon">🎓</div>
				<h3>Student Mentorship</h3>
				<p>
					Bridging the gap between education and industry through mentorship
					programs and workshops.
				</p>
				<button class="btn btn-secondary" disabled>Coming Soon</button>
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
		width: 200px;
		height: auto;
		margin-bottom: var(--spacing-8);
	}

	.hero-text {
		font-size: var(--font-size-xl);
		color: var(--color-text-light);
		margin-top: var(--spacing-4);
	}

	.features {
		padding: var(--spacing-16) 0;
	}

	.feature-grid {
		display: grid;
		gap: var(--spacing-8);
	}

	.feature-card {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-8);
		align-items: center;
		background: var(--color-surface);
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-md);
	}

	.feature-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.feature-content {
		padding: var(--spacing-6);
	}

	.cta-section {
		background-color: var(--color-surface);
		padding: var(--spacing-16) 0;
	}

	.cta-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--spacing-8);
	}

	.cta-card {
		background: white;
		padding: var(--spacing-6);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
		text-align: center;
	}

	.about-section {
		padding: var(--spacing-16) 0;
	}

	.lead {
		font-size: var(--font-size-xl);
		color: var(--color-text-light);
		margin-bottom: var(--spacing-8);
	}

	.about-grid {
		max-width: 800px;
		margin: 0 auto;
	}

	.feature-list {
		list-style: none;
		padding: 0;
		margin: var(--spacing-6) 0;
	}

	.feature-list li {
		margin-bottom: var(--spacing-4);
		padding-left: var(--spacing-6);
		position: relative;
	}

	.feature-list li::before {
		content: "•";
		color: var(--color-primary);
		position: absolute;
		left: 0;
	}

	.discord-section {
		background-color: var(--color-surface);
		padding: var(--spacing-16) 0;
	}

	.discord-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-8);
		align-items: center;
	}

	.discord-content {
		padding-right: var(--spacing-8);
	}

	.discord-features {
		list-style: none;
		padding: 0;
		margin: var(--spacing-6) 0;
	}

	.discord-features li {
		margin-bottom: var(--spacing-4);
		padding-left: var(--spacing-6);
		position: relative;
	}

	.discord-features li::before {
		content: "•";
		color: var(--color-primary);
		position: absolute;
		left: 0;
	}

	.discord-cta {
		margin-top: var(--spacing-8);
	}

	.discord-image img {
		width: 100%;
		height: auto;
		border-radius: var(--radius-lg);
	}

	.member-count {
		margin-top: var(--spacing-4);
	}

	@media (max-width: 768px) {
		.feature-card {
			grid-template-columns: 1fr;
		}

		.feature-image {
			height: 200px;
		}

		.hero {
			padding: var(--spacing-8) 0;
		}

		.hero-text {
			font-size: var(--font-size-lg);
		}

		.discord-grid {
			grid-template-columns: 1fr;
		}

		.discord-content {
			padding-right: 0;
		}

		.member-count iframe {
			width: 100%;
			height: 400px;
		}
	}

	.whats-next-section {
		padding: var(--spacing-16) 0;
		background-color: var(--color-surface);
	}

	.whats-next-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-8);
		margin-top: var(--spacing-8);
	}

	.whats-next-card {
		background: white;
		padding: var(--spacing-6);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
		text-align: center;
		transition: transform 0.2s ease;
	}

	.whats-next-card:hover {
		transform: translateY(-4px);
	}

	.card-icon {
		font-size: 2.5rem;
		margin-bottom: var(--spacing-4);
	}

	.whats-next-card h3 {
		color: var(--color-text);
		margin-bottom: var(--spacing-4);
	}

	.whats-next-card p {
		color: var(--color-text-light);
		margin-bottom: var(--spacing-6);
	}

	@media (max-width: 768px) {
		.whats-next-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

<svelte:head>
	<title>Speaker Information - Tech Talk Augusta</title>
	<meta
		name="description"
		content="Everything you need to know before speaking at Tech Talk Augusta — venue, tech setup, audience, and logistics."
	/>
</svelte:head>

<section class="page-section">
	<div class="container">
		<h1>Speaker Information</h1>
		<p class="lead">
			Thanks for speaking at Tech Talk Augusta! Here's everything you need to know to have a great
			talk. Please also fill out the <a href="#speaker-form">speaker info form</a> below so we can prepare
			for your presentation.
		</p>

		<div class="info-card">
			<h2>Venue</h2>
			<p>
				Talks are held at the <strong>Jessye Norman School of the Arts</strong>, located at
				<a
					href="https://www.google.com/maps/search/?api=1&query=Jessye+Norman+School+of+the+Arts+739+Greene+Street+Augusta+GA+30901"
					target="_blank"
					rel="noopener noreferrer"
				>
					739 Greene Street, Augusta, GA 30901</a
				>.
			</p>
		</div>

		<div class="info-card">
			<h2>Arrival &amp; Setup</h2>
			<p>
				We recommend arriving by <strong>6:45 PM</strong> so you have time to get set up and confirm
				your tech is working before the talk begins. We're happy to help you get connected and do a quick
				test.
			</p>
		</div>

		<div class="info-card">
			<h2>A/V Equipment</h2>
			<ul class="info-list">
				<li>
					<strong>Screen &amp; Projector:</strong> We have a screen and projector set up and ready
					to go. Connection is via <strong>HDMI</strong> — please bring any adapters your laptop may
					need (USB-C to HDMI, etc.).
				</li>
				<li>
					<strong>Microphone:</strong> We use a <strong>handheld microphone</strong>. This can make
					live demos a bit tricky since one hand is occupied, but we've made it work in the past
					with a mic holder. Let us know ahead of time if you plan to do a live demo and we'll make
					sure it's set up for you.
				</li>
				<li>
					<strong>WiFi:</strong> Internet access is available at the venue, but we recommend having any
					demos or materials saved locally as a backup.
				</li>
			</ul>
		</div>

		<div class="info-card">
			<h2>Audience</h2>
			<p>
				On average, we get around <strong>20 attendees</strong> per event. Attendance has ranged from
				10 to 50 — it really depends on the crowd that the speaker and topic bring in.
			</p>
			<p>
				The audience is mostly <strong>tech professionals</strong> — developers, engineers, and other
				folks working in the industry. We also occasionally get business owners and entrepreneurs looking
				for tech guidance. Talks of all levels are welcome, from introductory overviews to deep technical
				dives.
			</p>
		</div>

		<div class="info-card">
			<h2>Food &amp; Drinks</h2>
			<p>
				We provide catering from <strong>Boll Weevil</strong>, which typically includes sandwiches,
				pasta, and chip dip. Drinks and games are also available — it's a relaxed, social
				atmosphere.
			</p>
		</div>

		<div class="info-card">
			<h2>Promoting Your Talk</h2>
			<p>
				We announce all upcoming talks on our social media channels. If you'd like to see previous
				talks or help spread the word about yours, follow us:
			</p>
			<ul class="social-list">
				<li>
					<a
						href="https://www.facebook.com/techtalkaugusta"
						target="_blank"
						rel="noopener noreferrer">Facebook</a
					>
				</li>
				<li>
					<a
						href="https://www.instagram.com/techtalkaugusta"
						target="_blank"
						rel="noopener noreferrer">Instagram</a
					>
				</li>
				<li>
					<a
						href="https://linkedin.com/company/techtalkaugusta"
						target="_blank"
						rel="noopener noreferrer">LinkedIn</a
					>
				</li>
			</ul>
		</div>

		<div class="info-card" id="speaker-form">
			<h2>Speaker Info Form</h2>
			<p>
				Please fill out the form below with your bio, headshot, and any special A/V needs so we can
				promote your talk and prepare for your presentation.
			</p>
			<div class="form-container">
				<iframe
					src="https://wax-warbler-fff.notion.site/ebd//2ddbc6eec56680298cd2f4e1fe568df0"
					width="100%"
					title="Speaker Information Form"
					height="800"
					frameborder="0"
					allowfullscreen
				></iframe>
			</div>
		</div>

		<div class="info-card">
			<h2>Questions?</h2>
			<p>
				If you have any questions about the venue, equipment, or anything else, reach out to us at <a
					href="mailto:hi@techtalkaugusta.com">hi@techtalkaugusta.com</a
				>
				or drop us a message on our <a href="/forms/contact">contact page</a>.
			</p>
		</div>
	</div>
</section>

<style>
	.page-section {
		padding: var(--spacing-16) 0;
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 var(--spacing-4);
	}

	.lead {
		font-size: var(--font-size-xl);
		color: var(--color-text-light);
		margin-bottom: var(--spacing-8);
	}

	.info-card {
		margin-bottom: var(--spacing-8);
		padding: var(--spacing-6);
		background: var(--color-surface);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
	}

	.info-card h2 {
		margin-top: 0;
		margin-bottom: var(--spacing-4);
	}

	.info-card p {
		color: var(--color-text-light);
		line-height: 1.7;
		margin-bottom: var(--spacing-2);
	}

	.info-card p:last-child {
		margin-bottom: 0;
	}

	.info-list {
		list-style: none;
		padding: 0;
		margin: var(--spacing-4) 0 0;
	}

	.info-list li {
		margin-bottom: var(--spacing-4);
		padding-left: var(--spacing-6);
		position: relative;
		line-height: 1.7;
		color: var(--color-text-light);
	}

	.info-list li::before {
		content: '•';
		color: var(--color-primary);
		position: absolute;
		left: 0;
	}

	.social-list {
		list-style: none;
		padding: 0;
		margin: var(--spacing-4) 0 0;
		display: flex;
		gap: var(--spacing-4);
		flex-wrap: wrap;
	}

	.social-list li a {
		display: inline-block;
		padding: var(--spacing-2) var(--spacing-4);
		background: var(--color-primary);
		color: #fff;
		border-radius: var(--radius-md);
		text-decoration: none;
		font-weight: 500;
		transition: opacity 0.2s;
	}

	.social-list li a:hover {
		opacity: 0.85;
	}

	.form-container {
		margin-top: var(--spacing-4);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	@media (max-width: 768px) {
		.page-section {
			padding: var(--spacing-8) 0;
		}

		.lead {
			font-size: var(--font-size-lg);
		}

		.social-list {
			flex-direction: column;
			gap: var(--spacing-2);
		}
	}
</style>

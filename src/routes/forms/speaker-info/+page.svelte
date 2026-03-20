<svelte:head>
	<title>Speaker Information - Tech Talk Augusta</title>
	<meta
		name="description"
		content="Complete your speaker profile for Tech Talk Augusta. Share your bio, headshot, and technical requirements."
	/>
</svelte:head>

<section class="form-section">
	<div class="container">
		<h1>Speaker Information Form</h1>
		<p class="lead">
			Help us prepare for your presentation! Please provide your speaker details, bio, and any
			technical requirements you may have.
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

		<div class="speaker-info">
			<h2>What to Include</h2>
			<ul class="info-list">
				<li>
					<strong>Bio:</strong> A brief professional biography (2-3 paragraphs) highlighting your expertise
					and background
				</li>
				<li>
					<strong>Headshot:</strong> A professional photo for promotional materials (max 5 MB)
				</li>
				<li>
					<strong>A/V Needs:</strong> Any technical requirements beyond our standard setup (HDMI adapter,
					projector, microphone)
				</li>
			</ul>

			<h2>Standard Equipment Available</h2>
			<ul class="info-list">
				<li>Projector with HDMI connection</li>
				<li>HDMI adapter for various devices</li>
				<li>Wireless microphone</li>
				<li>WiFi internet access</li>
			</ul>

			<h2>Questions?</h2>
			<p>
				If you have any questions about technical requirements or need special accommodations,
				please include details in the Notes section of the form, or contact us directly.
			</p>
		</div>
	</div>
</section>

<style>
	.form-section {
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

	.form-container {
		margin: var(--spacing-8) 0;
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-md);
	}

	.speaker-info {
		margin-top: var(--spacing-12);
	}

	.speaker-info p {
		color: var(--color-text-light);
		line-height: 1.6;
	}

	.info-list {
		list-style: none;
		padding: 0;
		margin: var(--spacing-6) 0;
	}

	.info-list li {
		margin-bottom: var(--spacing-4);
		padding-left: var(--spacing-6);
		position: relative;
	}

	.info-list li::before {
		content: '•';
		color: var(--color-primary);
		position: absolute;
		left: 0;
	}

	h2 {
		margin-top: var(--spacing-8);
		margin-bottom: var(--spacing-4);
	}

	@media (max-width: 768px) {
		.form-section {
			padding: var(--spacing-8) 0;
		}

		.lead {
			font-size: var(--font-size-lg);
		}
	}
</style>

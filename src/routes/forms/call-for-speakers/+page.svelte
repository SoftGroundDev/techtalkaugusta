<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Call for Speakers - Tech Talk Augusta</title>
	<meta
		name="description"
		content="Share your expertise with Augusta's tech community. Apply to speak at our monthly tech talks and workshops."
	/>
</svelte:head>

<section class="form-section">
	<div class="container">
		<h1>Call for Speakers</h1>
		<p class="lead">
			Share your expertise and inspire others in our community. We're always looking for passionate
			speakers to share their knowledge and experiences.
		</p>
		<div class="form-container">
			<iframe
				src="https://wax-warbler-fff.notion.site/ebd//194bc6eec566802e8557f2ce3ca6ac2f"
				width="100%"
				title="Call For Speakers"
				height="600"
				frameborder="0"
				allowfullscreen
			></iframe>
		</div>

		<div class="speaker-info">
			<h2>What We're Looking For</h2>
			<ul class="info-list">
				<li>
					<strong>Technical Talks:</strong> Deep dives into programming languages, frameworks, tools,
					or technologies
				</li>
				<li>
					<strong>Industry Insights:</strong> Trends, best practices, and lessons learned from real-world
					projects
				</li>
				<li>
					<strong>Career Development:</strong> Tips for career growth, skill development, and professional
					advancement
				</li>
				<li>
					<strong>Innovation & Future Tech:</strong> Emerging technologies, research, and forward-thinking
					ideas
				</li>
			</ul>

			<h2>Speaker Benefits</h2>
			<ul class="info-list">
				<li>Share your expertise with Augusta's growing tech community</li>
				<li>Build your professional network and personal brand</li>
				<li>Receive feedback and engage in meaningful discussions</li>
				<li>Contribute to the growth of Augusta's tech ecosystem</li>
			</ul>
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

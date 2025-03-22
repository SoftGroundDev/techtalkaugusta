<script lang="ts">
	import transparentLogo from '$lib/images/logo-transparent.png';
</script>

<svelte:head>
	<title>Contact - Tech Talk Augusta</title>
	<meta name="description" content="Get in touch with Tech Talk Augusta. We'd love to hear from you about events, partnerships, or any questions you may have." />
	<meta name="keywords" content="Contact Us, Tech Talk Augusta, Get in Touch, Augusta Tech Community" />
	<meta property="og:title" content="Contact - Tech Talk Augusta" />
	<meta property="og:description" content="Get in touch with Tech Talk Augusta. We'd love to hear from you about events, partnerships, or any questions you may have." />
	<meta property="og:image" content="https://techtalkaugusta.com/images/og-image.jpg" />
	<meta property="og:url" content="https://techtalkaugusta.com/contact" />
</svelte:head>

<section class="hero">
	<div class="container">
		<div class="hero-content">
			<img src={transparentLogo} alt="Tech Talk Augusta Logo" class="hero-logo" />
			<h1>Get in Touch</h1>
			<p class="lead">
				Have questions about our events, want to partner with us, or just want to say hello? We'd love to hear from you!
			</p>
		</div>
	</div>
</section>

<section class="contact-section">
	<div class="container">
		<div class="contact-grid">
			<div class="contact-info">
				<h2>Other Ways to Connect</h2>
				<div class="contact-methods">
					<div class="contact-method">
						<h3>Discord Community</h3>
						<p>Join our Discord server to connect with other members of the Augusta tech community.</p>
						<a href="https://discord.gg/techtalkaugusta" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
							Join Discord
						</a>
					</div>
					<div class="contact-method">
						<h3>Social Media</h3>
						<p>Follow us on social media for updates and community highlights.</p>
						<div class="social-links">
							<a href="https://twitter.com/techtalkaugusta" target="_blank" rel="noopener noreferrer">Twitter</a>
							<a href="https://linkedin.com/company/techtalkaugusta" target="_blank" rel="noopener noreferrer">LinkedIn</a>
							<a href="https://github.com/techtalkaugusta" target="_blank" rel="noopener noreferrer">GitHub</a>
						</div>
					</div>
					<div class="contact-method">
						<h3>Email</h3>
						<p>For direct inquiries, you can reach us at:</p>
						<a href="mailto:hello@techtalkaugusta.com" class="email-link">hello@techtalkaugusta.com</a>
					</div>
				</div>
			</div>
			<div class="contact-form">
				<h2>Send Us a Message</h2>
				<p>Fill out the form below and we'll get back to you as soon as possible.</p>
				<div class="notion-form">
					<iframe
						src="https://wax-warbler-fff.notion.site/ebd/14ebc6eec56680febb3fcd6d10e1cd94"
						width="100%"
						height="600"
						frameborder="0"
						allowfullscreen
						title="Contact form"
					></iframe>
				</div>
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

	.contact-section {
		padding: var(--spacing-16) 0;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-8);
	}

	.contact-info {
		background: white;
		padding: var(--spacing-8);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
	}

	.contact-methods {
		display: grid;
		gap: var(--spacing-8);
		margin-top: var(--spacing-8);
	}

	.contact-method h3 {
		margin-bottom: var(--spacing-2);
	}

	.contact-method p {
		color: var(--color-text-light);
		margin-bottom: var(--spacing-4);
	}

	.social-links {
		display: flex;
		gap: var(--spacing-4);
	}

	.social-links a {
		color: var(--color-primary);
		text-decoration: none;
	}

	.social-links a:hover {
		text-decoration: underline;
	}

	.email-link {
		color: var(--color-primary);
		text-decoration: none;
		font-size: var(--font-size-lg);
	}

	.email-link:hover {
		text-decoration: underline;
	}

	.contact-form {
		background: white;
		padding: var(--spacing-8);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
	}

	.contact-form h2 {
		margin-bottom: var(--spacing-4);
	}

	.contact-form p {
		color: var(--color-text-light);
		margin-bottom: var(--spacing-6);
	}

	.notion-form {
		border-radius: var(--radius-md);
		overflow: hidden;
		box-shadow: var(--shadow-sm);
	}

	@media (max-width: 768px) {
		.hero {
			padding: var(--spacing-8) 0;
		}

		.lead {
			font-size: var(--font-size-lg);
		}

		.contact-grid {
			grid-template-columns: 1fr;
		}

		.social-links {
			flex-direction: column;
			gap: var(--spacing-2);
		}
	}
</style> 
<script lang="ts">
	import { transparentLogo } from '$lib/images';
</script>

<svelte:head>
	<title>Blog - Tech Talk Augusta</title>
	<meta
		name="description"
		content="Stay updated with the latest tech news, tutorials, and community stories from Tech Talk Augusta."
	/>
	<meta
		name="keywords"
		content="Tech Blog, Augusta Tech News, Technology Articles, Community Stories"
	/>
	<meta property="og:title" content="Blog - Tech Talk Augusta" />
	<meta
		property="og:description"
		content="Stay updated with the latest tech news, tutorials, and community stories from Tech Talk Augusta."
	/>
	<meta property="og:type" content="website" />
</svelte:head>

<section class="hero">
	<div class="container">
		<div class="hero-content">
			<img src={transparentLogo} alt="Tech Talk Augusta Logo" class="hero-logo" />
			<h1>Tech Talk Blog</h1>
			<p class="lead">Stay updated with the latest tech news, tutorials, and community stories.</p>
		</div>
	</div>
</section>

<section class="coming-soon">
	<div class="container">
		<div class="content">
			<h2>Coming Soon!</h2>
			<p>
				We're working on bringing you insightful articles, tutorials, and stories from our tech
				community. In the meantime, join us on Discord to participate in discussions and stay
				updated.
			</p>
			<div class="cta">
				<a
					href="https://discord.gg/Wju9NncCwA"
					class="btn btn-primary"
					target="_blank"
					rel="noopener noreferrer"
				>
					Join Our Discord
				</a>
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
		margin-bottom: var(--spacing-8);
	}

	.lead {
		font-size: var(--font-size-xl);
		color: var(--color-text-light);
		margin-top: var(--spacing-4);
	}

	.coming-soon {
		padding: var(--spacing-16) 0;
	}

	.content {
		max-width: 600px;
		margin: 0 auto;
		text-align: center;
	}

	.content h2 {
		font-size: var(--font-size-3xl);
		color: var(--color-text);
		margin-bottom: var(--spacing-4);
	}

	.content p {
		font-size: var(--font-size-lg);
		color: var(--color-text-light);
		margin-bottom: var(--spacing-8);
	}

	.cta {
		margin-top: var(--spacing-8);
	}

	@media (max-width: 768px) {
		.hero {
			padding: var(--spacing-8) 0;
		}

		.hero-logo {
			width: 120px;
		}

		.lead {
			font-size: var(--font-size-lg);
		}

		.content h2 {
			font-size: var(--font-size-2xl);
		}

		.content p {
			font-size: var(--font-size-base);
		}
	}
</style>

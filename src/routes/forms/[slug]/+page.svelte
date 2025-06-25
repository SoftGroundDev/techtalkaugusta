<script lang="ts">
	import type { GoogleForm } from '$lib/forms.js';
	
	export let data: { form: GoogleForm };
	
	const { form } = data;
</script>

<svelte:head>
	<title>{form.title} - Tech Talk Augusta</title>
	<meta name="description" content={form.description} />
</svelte:head>

<section class="form-section">
	<div class="container">
		<header class="form-header">
			<nav class="breadcrumb">
				<a href="/forms" class="breadcrumb-link">Forms</a>
				<span class="breadcrumb-separator">→</span>
				<span class="breadcrumb-current">{form.title}</span>
			</nav>
			
			<h1 class="form-title">{form.title}</h1>
			<p class="form-description">{form.description}</p>
			
			{#if form.category}
				<div class="form-meta">
					<span class="category-badge">{form.category}</span>
				</div>
			{/if}
		</header>

		<div class="form-container">
			<iframe
				src={form.googleFormUrl}
				width="100%"
				height="800"
				frameborder="0"
				allowfullscreen
				title={form.title}
				loading="lazy"
			/>
		</div>

		<div class="form-actions">
			<a href={form.googleFormUrl} target="_blank" rel="noopener noreferrer" class="btn btn-primary">
				Open in Google Forms
			</a>
			<a href="/forms" class="btn btn-secondary">
				← Back to All Forms
			</a>
		</div>
	</div>
</section>

<style>
	.form-section {
		padding: var(--spacing-8) 0 var(--spacing-16);
		min-height: 80vh;
	}

	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 0 var(--spacing-4);
	}

	.form-header {
		margin-bottom: var(--spacing-8);
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		margin-bottom: var(--spacing-4);
		font-size: var(--font-size-sm);
		color: var(--color-text-light);
	}

	.breadcrumb-link {
		color: var(--color-primary);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.breadcrumb-link:hover {
		color: var(--color-primary-dark);
		text-decoration: underline;
	}

	.breadcrumb-separator {
		margin: 0 var(--spacing-2);
		color: var(--color-text-light);
	}

	.breadcrumb-current {
		color: var(--color-text-light);
	}

	.form-title {
		font-size: var(--font-size-3xl);
		margin: 0 0 var(--spacing-4) 0;
		color: var(--color-text-primary);
	}

	.form-description {
		font-size: var(--font-size-lg);
		color: var(--color-text-light);
		line-height: 1.6;
		margin: 0 0 var(--spacing-4) 0;
		max-width: 700px;
	}

	.form-meta {
		margin-bottom: var(--spacing-4);
	}

	.category-badge {
		display: inline-block;
		background: var(--color-primary);
		color: white;
		padding: var(--spacing-1) var(--spacing-3);
		border-radius: var(--radius-full);
		font-size: var(--font-size-sm);
		font-weight: 500;
	}

	.form-container {
		margin: var(--spacing-8) 0;
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-lg);
		background: white;
	}

	.form-container iframe {
		display: block;
		width: 100%;
		height: 800px;
		border: none;
	}

	.form-actions {
		display: flex;
		gap: var(--spacing-4);
		justify-content: center;
		flex-wrap: wrap;
		margin-top: var(--spacing-8);
	}

	.btn {
		padding: var(--spacing-3) var(--spacing-6);
		border-radius: var(--radius-md);
		text-decoration: none;
		font-weight: 500;
		transition: all 0.2s ease;
		text-align: center;
		min-width: 160px;
	}

	.btn-primary {
		background: var(--color-primary);
		color: white;
		border: 2px solid var(--color-primary);
	}

	.btn-primary:hover {
		background: var(--color-primary-dark);
		border-color: var(--color-primary-dark);
	}

	.btn-secondary {
		background: transparent;
		color: var(--color-primary);
		border: 2px solid var(--color-primary);
	}

	.btn-secondary:hover {
		background: var(--color-primary);
		color: white;
	}

	@media (max-width: 768px) {
		.form-section {
			padding: var(--spacing-4) 0 var(--spacing-8);
		}

		.form-title {
			font-size: var(--font-size-2xl);
		}

		.form-description {
			font-size: var(--font-size-base);
		}

		.form-container iframe {
			height: 600px;
		}

		.form-actions {
			flex-direction: column;
			align-items: center;
		}

		.btn {
			min-width: auto;
			width: 100%;
			max-width: 300px;
		}
	}
</style> 
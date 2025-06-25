<script lang="ts">
	import { getActiveGoogleForms, type GoogleForm } from '$lib/forms.js';

	const forms = getActiveGoogleForms();
	
	// Group forms by category
	const formsByCategory = forms.reduce((acc, form) => {
		const category = form.category || 'Other';
		if (!acc[category]) {
			acc[category] = [];
		}
		acc[category].push(form);
		return acc;
	}, {} as Record<string, GoogleForm[]>);
</script>

<svelte:head>
	<title>Forms - Tech Talk Augusta</title>
	<meta
		name="description"
		content="Access all our community forms - from speaker applications to event feedback and volunteer signups."
	/>
</svelte:head>

<section class="forms-section">
	<div class="container">
		<header class="section-header">
			<h1>Community Forms</h1>
			<p class="lead">
				Complete various forms to engage with our community - apply to speak, provide feedback, volunteer, and more.
			</p>
		</header>

		{#each Object.entries(formsByCategory) as [category, categoryForms]}
			<div class="category-section">
				<h2 class="category-title">{category}</h2>
				<div class="forms-grid">
					{#each categoryForms as form}
						<div class="form-card">
							<div class="form-content">
								<h3 class="form-title">
									<a href="/forms/{form.id}" class="form-link">
										{form.title}
									</a>
								</h3>
								<p class="form-description">{form.description}</p>
								<div class="form-actions">
									<a href="/forms/{form.id}" class="btn btn-primary">
										View Form
									</a>
									<a href={form.googleFormUrl} target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
										Open in Google Forms
									</a>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}

		{#if forms.length === 0}
			<div class="empty-state">
				<h2>No Active Forms</h2>
				<p>There are currently no active forms available. Please check back later.</p>
			</div>
		{/if}
	</div>
</section>

<style>
	.forms-section {
		padding: var(--spacing-16) 0;
		min-height: 60vh;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--spacing-4);
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--spacing-12);
	}

	.lead {
		font-size: var(--font-size-xl);
		color: var(--color-text-light);
		max-width: 600px;
		margin: 0 auto;
	}

	.category-section {
		margin-bottom: var(--spacing-12);
	}

	.category-title {
		font-size: var(--font-size-2xl);
		margin-bottom: var(--spacing-6);
		color: var(--color-primary);
		border-bottom: 2px solid var(--color-primary);
		padding-bottom: var(--spacing-2);
	}

	.forms-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: var(--spacing-6);
	}

	.form-card {
		background: var(--color-surface);
		border-radius: var(--radius-lg);
		padding: var(--spacing-6);
		box-shadow: var(--shadow-md);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		border: 1px solid var(--color-border);
	}

	.form-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
	}

	.form-content {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.form-title {
		margin: 0 0 var(--spacing-3) 0;
		font-size: var(--font-size-xl);
	}

	.form-link {
		color: var(--color-primary);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.form-link:hover {
		color: var(--color-primary-dark);
		text-decoration: underline;
	}

	.form-description {
		color: var(--color-text-light);
		margin-bottom: var(--spacing-6);
		flex-grow: 1;
		line-height: 1.6;
	}

	.form-actions {
		display: flex;
		gap: var(--spacing-3);
		flex-wrap: wrap;
	}

	.btn {
		padding: var(--spacing-3) var(--spacing-4);
		border-radius: var(--radius-md);
		text-decoration: none;
		font-weight: 500;
		transition: all 0.2s ease;
		text-align: center;
		flex: 1;
		min-width: 140px;
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

	.empty-state {
		text-align: center;
		padding: var(--spacing-16) var(--spacing-4);
		color: var(--color-text-light);
	}

	@media (max-width: 768px) {
		.forms-section {
			padding: var(--spacing-8) 0;
		}

		.forms-grid {
			grid-template-columns: 1fr;
		}

		.form-actions {
			flex-direction: column;
		}

		.btn {
			min-width: auto;
		}

		.lead {
			font-size: var(--font-size-lg);
		}
	}
</style> 
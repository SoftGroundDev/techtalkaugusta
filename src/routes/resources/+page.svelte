<script lang="ts">
	import transparentLogo from '$lib/images/logo-transparent.png';
	import stockLearning from '$lib/images/stock-learning.jpg';
	import stockTools from '$lib/images/stock-tools.jpg';
	import stockCommunity from '$lib/images/stock-community.jpg';

	interface Resource {
		title: string;
		type: string;
		topic: string;
		url: string;
		description: string;
		sharedBy: string;
		sharedDate: string;
		likes: number;
		tags: string[];
	}

	let resources: Resource[] = [];
	let loading = true;
	let error: string | null = null;
	let selectedCategory = 'all';
	let searchQuery = '';

	$: filteredResources = resources.filter(resource => {
		const matchesCategory = selectedCategory === 'all' || resource.type.toLowerCase() === selectedCategory;
		const matchesSearch = searchQuery === '' || 
			resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
		return matchesCategory && matchesSearch;
	});
</script>

<svelte:head>
	<title>Resources - Tech Talk Augusta</title>
	<meta name="description" content="Access curated tech resources, tutorials, and tools shared by the Augusta tech community. Learn, grow, and connect with fellow developers." />
	<meta name="keywords" content="Tech Resources, Learning Materials, Development Tools, Tutorials, Augusta Tech Community" />
	<meta property="og:title" content="Resources - Tech Talk Augusta" />
	<meta property="og:description" content="Access curated tech resources, tutorials, and tools shared by the Augusta tech community." />
	<meta property="og:image" content="https://techtalkaugusta.com/images/og-image.jpg" />
	<meta property="og:url" content="https://techtalkaugusta.com/resources" />
</svelte:head>

<section class="hero">
	<div class="container">
		<div class="hero-content">
			<img src={transparentLogo} alt="Tech Talk Augusta Logo" class="hero-logo" />
			<h1>Community Resources</h1>
			<p class="lead">
				Access curated tech resources, tutorials, and tools shared by our community.
			</p>
		</div>
	</div>
</section>

<section class="resources-section">
	<div class="container">
		<div class="filters">
			<div class="search-box">
				<input
					type="text"
					placeholder="Search resources..."
					bind:value={searchQuery}
				/>
			</div>
			<div class="category-filters">
				<button 
					class="filter-btn {selectedCategory === 'all' ? 'active' : ''}" 
					on:click={() => selectedCategory = 'all'}
				>
					All Resources
				</button>
				<button 
					class="filter-btn {selectedCategory === 'article' ? 'active' : ''}" 
					on:click={() => selectedCategory = 'article'}
				>
					Articles
				</button>
				<button 
					class="filter-btn {selectedCategory === 'video' ? 'active' : ''}" 
					on:click={() => selectedCategory = 'video'}
				>
					Videos
				</button>
				<button 
					class="filter-btn {selectedCategory === 'tool' ? 'active' : ''}" 
					on:click={() => selectedCategory = 'tool'}
				>
					Tools
				</button>
				<button 
					class="filter-btn {selectedCategory === 'tutorial' ? 'active' : ''}" 
					on:click={() => selectedCategory = 'tutorial'}
				>
					Tutorials
				</button>
			</div>
		</div>

		<div class="resources-grid">

			<div class="resource-card">
				<img src={stockCommunity} alt="Community Resources" />
				<div class="resource-content">
					<h3>Community Resources</h3>
					<ul>
						<li><a href="https://dev.to/techtalkaugusta" target="_blank" rel="noopener noreferrer">Dev.to</a></li>
						<li><a href="https://github.com/SoftGroundDev/techtalkaugusta" target="_blank" rel="noopener noreferrer">GitHub</a></li>
						<li><a href="https://discord.gg/2y7D3d7g3x" target="_blank" rel="noopener noreferrer">Discord</a></li>
					</ul>
				</div>
			</div>

			<div class="resource-card">
				<img src={stockCommunity} alt="Talent Roster" />
				<div class="resource-content">
					<h3>Local Opportunities</h3>
					<ul>
						<li class="resource-list-item">
							<a href="https://forms.gle/e4ZK5AwG4dQmTtQ56" target="_blank" rel="noopener noreferrer">
								Join the Talent Roster
							</a>
							<p class="resource-description">
								Share your skills and availability for freelance and contract work in Augusta.
							</p>
						</li>
						<li class="resource-list-item">
							<a href="https://forms.gle/FiiuirrJn1YPTFLm6" target="_blank" rel="noopener noreferrer">
								Submit a Project
							</a>
							<p class="resource-description">
								Looking for help with a tech, design, or marketing project? Connect with skilled local professionals from our community.
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>

		{#if loading}
			<div class="loading">
				<p>Loading resources...</p>
			</div>
		{:else if error}
			<div class="error">
				<p>{error}</p>
			</div>
		{:else if filteredResources.length === 0}
			<div class="no-resources">
				<p>No resources found matching your criteria.</p>
			</div>
		{:else}
			<div class="community-resources">
				<h2>Community-Shared Resources</h2>
				<div class="resources-list">
					{#each filteredResources as resource}
						<div class="resource-item">
							<div class="resource-header">
								<h3>{resource.title}</h3>
								<span class="resource-type">{resource.type}</span>
							</div>
							<p class="resource-description">{resource.description}</p>
							<div class="resource-meta">
								<span class="resource-topic">{resource.topic}</span>
								<span class="resource-shared">Shared by {resource.sharedBy}</span>
								<span class="resource-date">{new Date(resource.sharedDate).toLocaleDateString()}</span>
							</div>
							<div class="resource-tags">
								{#each resource.tags as tag}
									<span class="tag">#{tag}</span>
								{/each}
							</div>
							<a href={resource.url} class="btn btn-primary" target="_blank" rel="noopener noreferrer">
								View Resource
							</a>
						</div>
					{/each}
				</div>
			</div>
		{/if}
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

	.resources-section {
		padding: var(--spacing-16) 0;
	}

	.filters {
		margin-bottom: var(--spacing-8);
	}

	.search-box {
		margin-bottom: var(--spacing-4);
	}

	.search-box input {
		width: 100%;
		padding: var(--spacing-3);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: var(--font-size-base);
	}

	.category-filters {
		display: flex;
		gap: var(--spacing-4);
		flex-wrap: wrap;
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

	.resources-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--spacing-8);
		margin-bottom: var(--spacing-16);
	}

	.resource-card {
		background: white;
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-md);
	}

	.resource-card img {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	.resource-content {
		padding: var(--spacing-6);
	}

	.resource-content h3 {
		margin-bottom: var(--spacing-4);
	}

	.resource-content ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.resource-content li {
		margin-bottom: var(--spacing-2);
	}

	.resource-content a {
		color: var(--color-primary);
		text-decoration: none;
	}

	.resource-content a:hover {
		text-decoration: underline;
	}

	.community-resources {
		margin-top: var(--spacing-16);
	}

	.resources-list {
		display: grid;
		gap: var(--spacing-6);
		margin-top: var(--spacing-8);
	}

	.resource-item {
		background: white;
		padding: var(--spacing-6);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
	}

	.resource-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-4);
	}

	.resource-type {
		background: var(--color-primary-light);
		color: var(--color-primary);
		padding: var(--spacing-1) var(--spacing-3);
		border-radius: var(--radius-full);
		font-size: var(--font-size-sm);
	}

	.resource-description {
		color: var(--color-text-light);
		margin-bottom: var(--spacing-4);
	}

	.resource-meta {
		display: flex;
		gap: var(--spacing-4);
		margin-bottom: var(--spacing-4);
		color: var(--color-text-light);
		font-size: var(--font-size-sm);
	}

	.resource-tags {
		display: flex;
		gap: var(--spacing-2);
		flex-wrap: wrap;
		margin-bottom: var(--spacing-4);
	}

	.tag {
		background: var(--color-surface);
		color: var(--color-text-light);
		padding: var(--spacing-1) var(--spacing-3);
		border-radius: var(--radius-full);
		font-size: var(--font-size-sm);
	}

	.loading, .error, .no-resources {
		text-align: center;
		padding: var(--spacing-8);
		background: white;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
	}

	.error {
		color: var(--color-error);
	}

	.no-resources {
		color: var(--color-text-light);
	}

	.resource-list-item {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
		margin-bottom: var(--spacing-4);
	}

	.resource-list-item .resource-description {
		font-size: var(--font-size-sm);
		color: var(--color-text-light);
		margin: 0;
		padding-left: var(--spacing-2);
	}

	.resource-list-item a {
		color: var(--color-primary);
		text-decoration: none;
		font-weight: 500;
	}

	.resource-list-item a:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.hero {
			padding: var(--spacing-8) 0;
		}

		.lead {
			font-size: var(--font-size-lg);
		}

		.category-filters {
			flex-direction: column;
		}

		.filter-btn {
			width: 100%;
		}

		.resource-meta {
			flex-direction: column;
			gap: var(--spacing-2);
		}
	}
</style> 
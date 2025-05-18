<script lang="ts">
	import { transparentLogo } from '$lib/images';
	import { onMount } from 'svelte';

	interface BlogPost {
		id: number;
		title: string;
		description: string;
		cover_image: string;
		url: string;
		published_at: string;
		reading_time_minutes: number;
		tag_list: string[];
	}

	let posts: BlogPost[] = [];
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			const response = await fetch('/api/blog');
			if (!response.ok) {
				throw new Error('Failed to fetch blog posts');
			}
			posts = await response.json();
		} catch (e) {
			error = 'Failed to load blog posts. Please try again later.';
			console.error('Error loading blog posts:', e);
		} finally {
			loading = false;
		}
	});

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
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
			<h1>Tech Talk Blog</h1>
			<p class="lead">Stay updated with the latest tech news, tutorials, and community stories.</p>
		</div>
	</div>
</section>

<section class="blog-posts">
	<div class="container">
		{#if loading}
			<div class="loading">Loading posts...</div>
		{:else if error}
			<div class="error">{error}</div>
		{:else if posts.length === 0}
			<div class="no-posts">
				<h2>No Posts Yet</h2>
				<p>Check back soon for new content!</p>
			</div>
		{:else}
			<div class="posts-grid">
				{#each posts as post}
					<article class="post-card">
						{#if post.cover_image}
							<a href={post.url} target="_blank" rel="noopener noreferrer" class="post-image">
								<img src={post.cover_image} alt={post.title} />
							</a>
						{/if}
						<div class="post-content">
							<h2>
								<a href={post.url} target="_blank" rel="noopener noreferrer">{post.title}</a>
							</h2>
							<p class="post-description">{post.description}</p>
							<div class="post-meta">
								<span class="post-date">{formatDate(post.published_at)}</span>
								<span class="post-reading-time">{post.reading_time_minutes} min read</span>
							</div>
							{#if post.tag_list.length > 0}
								<div class="post-tags">
									{#each post.tag_list as tag}
										<span class="tag">{tag}</span>
									{/each}
								</div>
							{/if}
						</div>
					</article>
				{/each}
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
		margin-bottom: var(--spacing-8);
	}

	.lead {
		font-size: var(--font-size-xl);
		color: var(--color-text-light);
		margin-top: var(--spacing-4);
	}

	.blog-posts {
		padding: var(--spacing-16) 0;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--spacing-4);
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--spacing-8);
		margin-top: var(--spacing-8);
	}

	.post-card {
		background: var(--color-surface);
		border-radius: var(--border-radius-lg);
		overflow: hidden;
		transition: transform 0.2s ease-in-out;
		box-shadow: var(--shadow-md);
	}

	.post-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
	}

	.post-image {
		display: block;
		width: 100%;
		height: 200px;
		overflow: hidden;
	}

	.post-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.post-content {
		padding: var(--spacing-6);
	}

	.post-content h2 {
		font-size: var(--font-size-xl);
		margin-bottom: var(--spacing-4);
		line-height: 1.3;
	}

	.post-content h2 a {
		color: var(--color-text);
		text-decoration: none;
	}

	.post-content h2 a:hover {
		color: var(--color-primary);
	}

	.post-description {
		color: var(--color-text-light);
		font-size: var(--font-size-base);
		margin-bottom: var(--spacing-4);
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.post-meta {
		display: flex;
		justify-content: space-between;
		color: var(--color-text-light);
		font-size: var(--font-size-sm);
		margin-bottom: var(--spacing-4);
	}

	.post-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-2);
	}

	.tag {
		background: var(--color-primary-light);
		color: var(--color-primary);
		padding: var(--spacing-1) var(--spacing-2);
		border-radius: var(--border-radius-full);
		font-size: var(--font-size-sm);
	}

	.loading,
	.error,
	.no-posts {
		text-align: center;
		padding: var(--spacing-16);
		color: var(--color-text-light);
	}

	.error {
		color: var(--color-error);
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

		.posts-grid {
			grid-template-columns: 1fr;
		}

		.post-image {
			height: 180px;
		}
	}
</style>

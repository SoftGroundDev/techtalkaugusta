<script lang="ts">
	let selectedImage = $state(0);

	const images = [
		{ src: '/shop/shirt.png', alt: 'Tech Talk Augusta T-Shirt' },
		{ src: '/shop/front-models.png', alt: 'Tech Talk Augusta T-Shirt - Front View' },
		{ src: '/shop/back-models.png', alt: 'Tech Talk Augusta T-Shirt - Back View' }
	];
</script>

<svelte:head>
	<title>Shop - Tech Talk Augusta</title>
	<meta name="description" content="Shop official Tech Talk Augusta merchandise. Support your local tech community!" />
	<meta name="keywords" content="Tech Talk Augusta, merchandise, t-shirt, tech community, Augusta Georgia" />
	<meta property="og:title" content="Shop - Tech Talk Augusta" />
	<meta property="og:description" content="Shop official Tech Talk Augusta merchandise. Support your local tech community!" />
	<meta property="og:url" content="https://techtalkaugusta.com/shop" />
</svelte:head>

<section class="shop-hero">
	<div class="container">
		<h1>Shop</h1>
		<p class="lead">Support your local tech community with official Tech Talk Augusta merchandise!</p>
	</div>
</section>

<section class="product">
	<div class="container">
		<div class="product-grid">
			<div class="product-gallery">
				<div class="main-image">
					<img src={images[selectedImage].src} alt={images[selectedImage].alt} />
				</div>
				<div class="thumbnail-grid">
					{#each images as image, index}
						<button
							class="thumbnail"
							class:active={selectedImage === index}
							onclick={() => selectedImage = index}
						>
							<img src={image.src} alt={image.alt} />
						</button>
					{/each}
				</div>
			</div>

			<div class="product-info">
				<h2>Tech Talk Augusta T-Shirt</h2>
				<p class="price">$25.00</p>
				<p class="description">
					Show your support for Augusta's tech community with this comfortable, high-quality t-shirt.
					Perfect for meetups, conferences, or everyday wear.
				</p>
				<ul class="features">
					<li>Premium cotton blend</li>
					<li>Comfortable fit</li>
					<li>Official Tech Talk Augusta design</li>
				</ul>
				<a
					href="https://buy.stripe.com/aFadR99YrgK7ftd0Wm04800"
					class="btn btn-primary buy-btn"
					target="_blank"
					rel="noopener noreferrer"
				>
					Buy Now
				</a>
				<p class="secure-note">Secure checkout powered by Stripe</p>
			</div>
		</div>
	</div>
</section>

<style>
	.shop-hero {
		background-color: var(--color-surface);
		padding: var(--spacing-12) 0;
		text-align: center;
	}

	.lead {
		font-size: var(--font-size-xl);
		color: var(--color-text-light);
		margin-top: var(--spacing-4);
	}

	.product {
		padding: var(--spacing-12) 0;
	}

	.product-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-12);
		align-items: start;
	}

	.product-gallery {
		position: sticky;
		top: 100px;
	}

	.main-image {
		background: var(--color-surface);
		border-radius: var(--radius-lg);
		overflow: hidden;
		margin-bottom: var(--spacing-4);
	}

	.main-image img {
		width: 100%;
		height: auto;
		display: block;
	}

	.thumbnail-grid {
		display: flex;
		gap: var(--spacing-3);
	}

	.thumbnail {
		width: 80px;
		height: 80px;
		border: 2px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
		cursor: pointer;
		padding: 0;
		background: var(--color-surface);
		transition: border-color var(--transition-fast);
	}

	.thumbnail:hover {
		border-color: var(--color-primary-light);
	}

	.thumbnail.active {
		border-color: var(--color-primary);
	}

	.thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.product-info h2 {
		font-size: var(--font-size-3xl);
		margin-bottom: var(--spacing-4);
	}

	.price {
		font-size: var(--font-size-2xl);
		font-weight: 600;
		color: var(--color-primary);
		margin-bottom: var(--spacing-6);
	}

	.description {
		color: var(--color-text-light);
		line-height: var(--line-height-relaxed);
		margin-bottom: var(--spacing-6);
	}

	.features {
		list-style: none;
		padding: 0;
		margin-bottom: var(--spacing-8);
	}

	.features li {
		padding: var(--spacing-2) 0;
		padding-left: var(--spacing-6);
		position: relative;
		color: var(--color-text);
	}

	.features li::before {
		content: "✓";
		color: var(--color-secondary);
		position: absolute;
		left: 0;
		font-weight: bold;
	}

	.buy-btn {
		width: 100%;
		padding: var(--spacing-4) var(--spacing-8);
		font-size: var(--font-size-lg);
	}

	.secure-note {
		text-align: center;
		font-size: var(--font-size-sm);
		color: var(--color-text-light);
		margin-top: var(--spacing-4);
		margin-bottom: 0;
	}

	@media (max-width: 768px) {
		.product-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-8);
		}

		.product-gallery {
			position: static;
		}

		.thumbnail {
			width: 60px;
			height: 60px;
		}

		.shop-hero {
			padding: var(--spacing-8) 0;
		}

		.lead {
			font-size: var(--font-size-lg);
		}
	}
</style>

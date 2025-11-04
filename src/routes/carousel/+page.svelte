<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// You can replace these placeholder images with your PNGs
	let images: string[] = [
		// Add your PNG paths here, for example:
		// '/path/to/your/image1.png',
		// '/path/to/your/image2.png',
		// '/path/to/your/image3.png',
		'/carousel-images/carousel-1.png',
		'/carousel-images/carousel-2.png'
	];

	let currentIndex = 0;
	let isAutoPlaying = true;
	let autoPlayInterval: NodeJS.Timeout;

	// Auto-play functionality
	function startAutoPlay() {
		if (autoPlayInterval) clearInterval(autoPlayInterval);
		autoPlayInterval = setInterval(() => {
			if (isAutoPlaying) {
				nextImage();
			}
		}, 45000); // Change image every 45 seconds
	}

	function stopAutoPlay() {
		isAutoPlaying = false;
		if (autoPlayInterval) clearInterval(autoPlayInterval);
	}

	function resumeAutoPlay() {
		isAutoPlaying = true;
		startAutoPlay();
	}

	function nextImage() {
		currentIndex = (currentIndex + 1) % images.length;
	}

	function prevImage() {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}

	function goToImage(index: number) {
		currentIndex = index;
	}

	// Keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft') {
			prevImage();
			stopAutoPlay();
		} else if (event.key === 'ArrowRight') {
			nextImage();
			stopAutoPlay();
		} else if (event.key === 'Escape') {
			// Navigate back or close carousel
			window.history.back();
		} else if (event.key === ' ') {
			event.preventDefault();
			if (isAutoPlaying) {
				stopAutoPlay();
			} else {
				resumeAutoPlay();
			}
		}
	}

	onMount(() => {
		if (browser && images.length > 1) {
			startAutoPlay();
		}

		return () => {
			if (autoPlayInterval) clearInterval(autoPlayInterval);
		};
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<svelte:head>
	<title>Image Carousel - Tech Talk Augusta</title>
	<meta name="description" content="Full-screen image carousel" />
</svelte:head>

<div class="carousel-container">
	{#if images.length === 0}
		<!-- Placeholder content when no images are provided -->
		<div class="placeholder">
			<div class="placeholder-content">
				<h1>Full-Screen Carousel</h1>
				<p>Upload your PNG images to see them here</p>
				<div class="upload-instructions">
					<h3>To add images:</h3>
					<ol>
						<li>Place your PNG files in the <code>static</code> folder</li>
						<li>Update the <code>images</code> array in this component</li>
						<li>Add the paths like: <code>'/your-image.png'</code></li>
					</ol>
				</div>
			</div>
		</div>
	{:else}
		<!-- Image display -->
		<div class="image-container">
			<img
				src={images[currentIndex]}
				alt="Carousel image {currentIndex + 1}"
				class="carousel-image"
			/>
		</div>

		<!-- Navigation arrows -->
		{#if images.length > 1}
			<button class="nav-arrow nav-arrow-left" on:click={prevImage} aria-label="Previous image">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15 18L9 12L15 6"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>

			<button class="nav-arrow nav-arrow-right" on:click={nextImage} aria-label="Next image">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9 18L15 12L9 6"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		{/if}

		<!-- Dots indicator -->
		{#if images.length > 1}
			<div class="dots-container">
				{#each images as _, index}
					<button
						class="dot {index === currentIndex ? 'active' : ''}"
						on:click={() => goToImage(index)}
						aria-label="Go to image {index + 1}"
					></button>
				{/each}
			</div>
		{/if}

		<!-- Control panel -->
		<div class="controls">
			<button
				class="control-btn"
				on:click={isAutoPlaying ? stopAutoPlay : resumeAutoPlay}
				aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
			>
				{#if isAutoPlaying}
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill="currentColor" />
					</svg>
				{:else}
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
					</svg>
				{/if}
			</button>

			<button
				class="control-btn close-btn"
				on:click={() => window.history.back()}
				aria-label="Close carousel"
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M18 6L6 18M6 6L18 18"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>
	{/if}

	<!-- Instructions overlay -->
	<div class="instructions">
		<p>Use ← → arrow keys to navigate, spacebar to pause/play, ESC to exit</p>
	</div>
</div>

<style>
	.carousel-container {
		position: relative;
		width: 100vw;
		height: 100vh;
		background: #000;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	/* Placeholder styles */
	.placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: white;
		text-align: center;
		padding: 2rem;
	}

	.placeholder-content h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
		color: #60a5fa;
	}

	.placeholder-content p {
		font-size: 1.25rem;
		margin-bottom: 2rem;
		color: #e2e8f0;
	}

	.upload-instructions {
		background: rgba(255, 255, 255, 0.1);
		padding: 2rem;
		border-radius: 0.5rem;
		max-width: 600px;
	}

	.upload-instructions h3 {
		margin-bottom: 1rem;
		color: #fbbf24;
	}

	.upload-instructions ol {
		text-align: left;
		margin-left: 1rem;
	}

	.upload-instructions li {
		margin-bottom: 0.5rem;
		color: #e2e8f0;
	}

	.upload-instructions code {
		background: rgba(0, 0, 0, 0.3);
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		color: #fbbf24;
		font-family: 'Fira Mono', monospace;
	}

	/* Image styles */
	.image-container {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.carousel-image {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		transition: opacity 0.5s ease-in-out;
	}

	/* Navigation arrows */
	.nav-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(0, 0, 0, 0.5);
		border: none;
		color: white;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		z-index: 10;
	}

	.nav-arrow:hover {
		background: rgba(0, 0, 0, 0.8);
		transform: translateY(-50%) scale(1.1);
	}

	.nav-arrow-left {
		left: 2rem;
	}

	.nav-arrow-right {
		right: 2rem;
	}

	/* Dots indicator */
	.dots-container {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 0.75rem;
		z-index: 10;
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.5);
		background: transparent;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.dot:hover {
		border-color: rgba(255, 255, 255, 0.8);
	}

	.dot.active {
		background: white;
		border-color: white;
	}

	/* Controls */
	.controls {
		position: absolute;
		top: 2rem;
		right: 2rem;
		display: flex;
		gap: 1rem;
		z-index: 10;
	}

	.control-btn {
		width: 40px;
		height: 40px;
		background: rgba(0, 0, 0, 0.5);
		border: none;
		color: white;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
	}

	.control-btn:hover {
		background: rgba(0, 0, 0, 0.8);
		transform: scale(1.1);
	}

	/* Instructions */
	.instructions {
		position: absolute;
		bottom: 1rem;
		right: 2rem;
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.875rem;
		z-index: 10;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.nav-arrow {
			width: 50px;
			height: 50px;
		}

		.nav-arrow-left {
			left: 1rem;
		}

		.nav-arrow-right {
			right: 1rem;
		}

		.controls {
			top: 1rem;
			right: 1rem;
		}

		.instructions {
			display: none;
		}

		.placeholder-content h1 {
			font-size: 2rem;
		}

		.upload-instructions {
			padding: 1.5rem;
		}
	}
</style>

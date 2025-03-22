<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { page } from '$app/stores';
	import '../app.css';

	let { children } = $props();
</script>

<div class="app">
	<Header />

	<main>
		<div class="content-wrapper">
			{@render children()}
		</div>
	</main>

	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: var(--color-background);
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding-top: 80px; /* Account for fixed header */
		width: 100%;
	}

	.content-wrapper {
		flex: 1;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
		box-sizing: border-box;
	}

	/* Add smooth transitions for page changes */
	:global(.page-transition) {
		animation: fadeIn 0.3s ease-in-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		main {
			padding-top: 60px; /* Smaller padding for mobile */
		}

		.content-wrapper {
			padding: 1rem;
		}
	}
</style>

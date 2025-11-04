<script lang="ts">
	import '../../app.css';

	let { children } = $props();
</script>

<!-- Full screen layout without header/footer -->
<div class="carousel-layout">
	{@render children()}
</div>

<style>
	.carousel-layout {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #000;
		z-index: 1000;
	}
</style>
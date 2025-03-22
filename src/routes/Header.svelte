<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import transparentLogo from '$lib/images/logo-transparent.png';

	let isMenuOpen = false;
	let isScrolled = false;

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	const closeMenu = () => {
		isMenuOpen = false;
	};
</script>

<header class:scrolled={isScrolled}>
	<div class="container">
		<a href="/" class="logo">
			<img src={transparentLogo} alt="Tech Talk Augusta Logo" />
		</a>

		<button class="menu-toggle" on:click={toggleMenu} aria-label="Toggle menu">
			<span class="hamburger" class:open={isMenuOpen}></span>
		</button>

		<nav class:open={isMenuOpen}>
			<ul>
				<li>
					<a href="/" class:active={$page.url.pathname === '/'} on:click={closeMenu}>Home</a>
				</li>
				<li>
					<a href="/about" class:active={$page.url.pathname === '/about'} on:click={closeMenu}>About</a>
				</li>
				<li>
					<a href="/events" class:active={$page.url.pathname === '/events'} on:click={closeMenu}>Events</a>
				</li>
				<li>
					<a href="/blog" class:active={$page.url.pathname === '/blog'} on:click={closeMenu}>Blog</a>
				</li>
				<li>
					<a href="/resources" class:active={$page.url.pathname === '/resources'} on:click={closeMenu}>Resources</a>
				</li>
				<li>
					<a href="/contact" class:active={$page.url.pathname === '/contact'} on:click={closeMenu}>Contact</a>
				</li>
			</ul>
		</nav>
	</div>
</header>

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background: transparent;
		transition: all 0.3s ease;
		padding: 1rem 0;
	}

	header.scrolled {
		background: rgba(255, 255, 255, 0.95);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		padding: 0.5rem 0;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		display: flex;
		align-items: center;
	}

	.logo img {
		height: 40px;
		width: auto;
	}

	nav {
		display: flex;
		align-items: center;
	}

	nav ul {
		display: flex;
		gap: 2rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	nav a {
		color: var(--color-text);
		text-decoration: none;
		font-weight: 500;
		font-size: 1rem;
		transition: color 0.2s ease;
		padding: 0.5rem 0;
		position: relative;
	}

	nav a:hover {
		color: var(--color-theme-1);
	}

	nav a.active {
		color: var(--color-theme-1);
	}

	nav a.active::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: var(--color-theme-1);
	}

	.menu-toggle {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
	}

	.hamburger {
		display: block;
		width: 24px;
		height: 2px;
		background: var(--color-text);
		position: relative;
		transition: all 0.3s ease;
	}

	.hamburger::before,
	.hamburger::after {
		content: '';
		position: absolute;
		width: 24px;
		height: 2px;
		background: var(--color-text);
		transition: all 0.3s ease;
	}

	.hamburger::before {
		top: -8px;
	}

	.hamburger::after {
		bottom: -8px;
	}

	.hamburger.open {
		background: transparent;
	}

	.hamburger.open::before {
		transform: rotate(45deg);
		top: 0;
	}

	.hamburger.open::after {
		transform: rotate(-45deg);
		bottom: 0;
	}

	@media (max-width: 768px) {
		.menu-toggle {
			display: block;
		}

		nav {
			position: fixed;
			top: 0;
			right: -100%;
			width: 80%;
			height: 100vh;
			background: white;
			padding: 5rem 2rem 2rem;
			transition: right 0.3s ease;
			box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
		}

		nav.open {
			right: 0;
		}

		nav ul {
			flex-direction: column;
			gap: 1.5rem;
		}

		nav a {
			font-size: 1.2rem;
		}
	}
</style>

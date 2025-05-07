<script lang="ts">
	import { onMount } from 'svelte';
	import transparentLogo from '$lib/images/logo-transparent.png';

	let currentYear = new Date().getFullYear();
</script>

<footer>
	<div class="container">
		<div class="footer-grid">
			<div class="footer-brand">
				<img src={transparentLogo} alt="Tech Talk Augusta Logo" class="footer-logo" />
				<p>
					Building a thriving tech community in Augusta, Georgia through innovation, connection, and
					equity.
				</p>
			</div>

			<div class="footer-links">
				<h3>Quick Links</h3>
				<ul>
					<li><a href="/about">About Us</a></li>
					<li><a href="/events">Events</a></li>
					<li><a href="/blog">Blog</a></li>
					<li><a href="/resources">Resources</a></li>
					<li><a href="/forms/contact">Contact</a></li>
				</ul>
			</div>

			<div class="footer-social">
				<h3>Connect With Us</h3>
				<div class="social-links">
					<a
						href="https://discord.gg/Wju9NncCwA"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Join our Discord"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
							/>
						</svg>
					</a>
					<a
						href="https://twitter.com/techtalkaugusta"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Follow us on Twitter"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
							/>
						</svg>
					</a>
					<a
						href="https://github.com/techtalkaugusta"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Follow us on GitHub"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
							/>
						</svg>
					</a>
					<a href="/venmo" aria-label="Donate to Tech Talk Augusta">
						<svg
							fill="currentColor"
							width="24"
							height="24"
							viewBox="0 0 512 512"
							id="Layer_1"
							data-name="Layer 1"
							xmlns="http://www.w3.org/2000/svg"
							><path
								d="M444.17,32H70.28C49.85,32,32,46.7,32,66.89V441.6C32,461.91,49.85,480,70.28,480H444.06C464.6,480,480,461.8,480,441.61V66.89C480.12,46.7,464.6,32,444.17,32ZM278,387H174.32L132.75,138.44l90.75-8.62,22,176.87c20.53-33.45,45.88-86,45.88-121.87,0-19.62-3.36-33-8.61-44L365.4,124.1c9.56,15.78,13.86,32,13.86,52.57C379.25,242.17,323.34,327.26,278,387Z"
							/></svg
						>
					</a>
				</div>
			</div>
		</div>

		<div class="footer-bottom">
			<p>&copy; {currentYear} Tech Talk Augusta. All rights reserved.</p>
		</div>
	</div>
</footer>

<style>
	footer {
		background-color: var(--color-surface);
		padding: var(--spacing-12) 0 var(--spacing-4);
		margin-top: var(--spacing-16);
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		gap: var(--spacing-8);
		margin-bottom: var(--spacing-8);
	}

	.footer-brand {
		max-width: 400px;
	}

	.footer-logo {
		width: 150px;
		height: auto;
		margin-bottom: var(--spacing-4);
	}

	.footer-brand p {
		color: var(--color-text-light);
		font-size: var(--font-size-sm);
	}

	.footer-links h3,
	.footer-social h3 {
		font-size: var(--font-size-lg);
		margin-bottom: var(--spacing-4);
	}

	.footer-links ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.footer-links li {
		margin-bottom: var(--spacing-2);
	}

	.footer-links a {
		color: var(--color-text-light);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.footer-links a:hover {
		color: var(--color-primary);
	}

	.social-links {
		display: flex;
		gap: var(--spacing-4);
	}

	.social-links a {
		color: var(--color-text-light);
		transition: color var(--transition-fast);
	}

	.social-links a:hover {
		color: var(--color-primary);
	}

	.footer-bottom {
		padding-top: var(--spacing-4);
		border-top: 1px solid var(--color-border);
		text-align: center;
		color: var(--color-text-light);
		font-size: var(--font-size-sm);
	}

	@media (max-width: 768px) {
		.footer-grid {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.footer-brand {
			max-width: 100%;
		}

		.social-links {
			justify-content: center;
		}
	}
</style>

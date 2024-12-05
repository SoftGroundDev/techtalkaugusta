<script>
	import instgram from '$lib/images/instagram.svg';
	import facebook from '$lib/images/facebook.svg';
	import dev from '$lib/images/dev-to.svg';
</script>

<footer>
	<p>Connect with us</p>
	<ul class="space-between flex flex-row">
		<li>
			<a
				target="_blank"
				aria-label="instagram"
				rel="noreferrer noopener"
				href="https://www.instagram.com/techtalkaugusta/"
				><img src={instgram} alt="instagram logo" /></a
			>
		</li>
		<li>
			<a href="https://www.facebook.com/TechTalkAugusta">
				<img src={facebook} alt="facebook logo" />
			</a>
		</li>
		<li>
			<a href="https://dev.to/techtalkaugusta"> <img src={dev} alt="dev to blog" /></a>
		</li>
	</ul>
	<p>Tech Talk Augusta is run by Soft Ground LLC</p>
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer li {
		padding: 10px;
	}

	footer img {
		width: 50px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>

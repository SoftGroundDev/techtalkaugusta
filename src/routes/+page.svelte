<script lang="ts">
	import Counter from './Counter.svelte';
	import transparentLogo from '$lib/images/logo-transparent.png';
</script>

<svelte:head>
	<title>Tech Talk Augusta</title>
	<meta name="description" content="Tech Talk Augusta, " />
</svelte:head>

<section>
	<h1>
		<span class="welcome place-content-center">
			<picture>
				<img src={transparentLogo} alt="Logo" />
			</picture>
		</span>
		Tech Talk Augusta
	</h1>

	<h2>
		<strong>Building a Thriving Tech Community in Augusta</strong>
	</h2>

	<h3 class="pt-5">
		Join us in fostering innovation, connection, and equity in Augusta's tech scene.
	</h3>
</section>

<section>
	<button class="primary">Check out the Community Calendar</button>
</section>

<section>
	<button class="primary">Check out previous events</button>
</section>

<section>
	<button class="primary">Check out our Tech Directory</button>
</section>

<section>
	<h3 class="text-xl mb-3">Why Augusta?</h3>
	<p>
		Augusta is a city with a rich history and a bright future, uniquely positioned to become a hub
		for technological growth and innovation.
		<br /><br />
		As the home of the Army Cyber Center of Excellence, the Augusta National, Georgia Cyber Center, and
		the Savannah River Nuclear Site, our city is no stranger to world-class projects and cutting-edge
		expertise. Yet, while these institutions bring incredible resources and talent, there’s a missing
		piece: support for small businesses, local software developers, and the vibrant downtown community.
		<br /><br />
		At Tech Talk Augusta, we believe in the power of technology to shape a better future for everyone
		in our city. We see a need for:
	</p>
	<ul class="list-disc">
		<li>
			<strong>Entrepreneurship in Tech:</strong>Encouraging small businesses to thrive in our
			downtown.
		</li>
		<li>
			<strong>Community Investment:</strong> Tech professionals supporting the arts, education, and local
			equity initiatives.
		</li>
		<li>
			<strong>Educational Growth:</strong> Integrating tech curricula into schools to empower the next
			generation of innovators.
		</li>
		<li>
			<strong>Inclusivity and Opportunity:</strong> Using technology to reduce poverty and increase equality
			across our city.
		</li>
	</ul>
	<p>
		<br /><br />
		Augusta has the talent, the drive, and the resources to stand on its own two feet as a tech leader—not just for government contractors but for everyone who calls this city home. Together, we can build a community where technology uplifts every corner of Augusta. Join us in making it happen.
	</p>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		padding: 30px 0;
	}

	.welcome img {
		width: 100%;
		max-width: 300px;
		display: inline-block;
	}
</style>

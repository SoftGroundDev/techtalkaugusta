<script lang="ts">
	import transparentLogo from '$lib/images/logo-transparent.png';
	import stockCommunity from '$lib/images/stock-community.jpg';
	import stockBlog from '$lib/images/stock-blog.jpg';
	import stockFriends from '$lib/images/stock-friends.jpg';
</script>

<svelte:head>
	<title>Tech Talk Augusta</title>
	<meta name="description" content="Tech Talk Augusta, " />
</svelte:head>

<section class="mb-10">
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

<section class="feature bg-amber-50">
	<div>
		<img src={stockCommunity} alt="generic group of folks sharing a meal" />
	</div>
	<div class="content">
		<p>Check out our community calendar where we post tech events.</p>
		<br />
		<div class="">
			<a class="btn-primary mx-auto" href="/calendar">Community Calendar</a>
		</div>
	</div>
</section>

<section class="feature bg-lime-50">
	<div>
		<div class="content">
			<p>Check out our blog where we post links to previous talks, events and presentations.</p>
			<br />
			<a class="btn-primary" href="https://dev.to/techtalkaugusta">Check out previous events</a>
		</div>
	</div>
	<div>
		<img src={stockBlog} alt="generic person and computer" />
	</div>
</section>

<section class="feature bg-rose-50">
	<div>
		<img src={stockFriends} alt="generic friends" />
	</div>
	<div class="content">
		<div>
			<p>
				(Under Construction) <br /><br />Check out our directory of tech professionals, projects,
				and local companies.
			</p>
			<button class="btn-primary">Check out our Tech Directory</button>
		</div>
	</div>
</section>

<section class="my-5">
	<h3 class="mb-3 text-xl">Call For Speakers</h3>
	<p class="mb-3">
		Volunteering to speak at tech meetups is crucial because it fosters knowledge sharing and
		community growth. Without speakers, there's no content, no learning, and no opportunity for
		networking or collaboration. By sharing your expertise, you inspire others, spark innovation,
		and help build a stronger, more connected tech community. Plus, it's a chance to give back and
		elevate the industry as a whole!
	</p>
	<a href="/forms/call-for-speakers">Apply to be a Speaker!</a>
</section>

<section>
	<h3 class="mb-3 text-xl">Contact Us</h3>
	<p class="mb-3">
		We'd love to hear from you! Whether you have questions, suggestions, or just want to say hello,
		feel free to reach out.
	</p>
	<a class="btn-primary" href="/forms/contact">Contact Us</a>
</section>

<section class="mt-5">
	<h3 class="mb-3 text-xl">Why Augusta?</h3>
	<p>
		Augusta is a city with a rich history and a bright future, uniquely positioned to become a hub
		for technological growth and innovation.
		<br /><br />
		As the home of the Army Cyber Center of Excellence, the Augusta National, Georgia Cyber Center, and
		the Savannah River Nuclear Site, our city is no stranger to world-class projects and cutting-edge
		expertise. Yet, while these institutions bring incredible resources and talent, there's a missing
		piece, support for: small businesses, local software developers, and the vibrant downtown community.
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
		Augusta has the talent, the drive, and the resources to stand on its own two feet as a tech leader—not
		just for government contractors but for everyone who calls this city home. Together, we can build
		a community where technology uplifts every corner of Augusta. Join us in making it happen.
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

	.feature {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.feature > * {
		flex: 50%;
		display: flex;
		flex-direction: column;
	}

	.feature .content {
		padding: 20px;
	}
	.feature .content p {
		padding: 10px;
	}

	.feature img {
		max-width: 100%;
		min-width: 200px;
	}

	.welcome {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 30px 0;
	}

	.welcome img {
		width: 100%;
		max-width: 300px;
		display: block;
	}
</style>

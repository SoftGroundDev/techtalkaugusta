<script lang="ts">
	import { enhance } from '$app/forms';
	import transparentLogo from '$lib/images/logo-transparent.png';

	let title = '';
	let date = '';
	let time = '';
	let location = '';
	let description = '';
	let registrationUrl = '';
	let enableReminder = true;
	let reminderTime = '1'; // Default to 1 hour before
	let submitting = false;
	let success = false;
	let error = '';

	async function handleSubmit() {
		submitting = true;
		error = '';
		success = false;

		try {
			// Create event in Discord
			const eventResponse = await fetch('/api/discord', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title,
					date,
					time,
					location,
					description,
					registrationUrl
				})
			});

			if (!eventResponse.ok) {
				throw new Error('Failed to create event');
			}

			// Schedule reminder if enabled
			if (enableReminder) {
				const eventDate = new Date(`${date}T${time}`);
				const reminderDate = new Date(eventDate.getTime() - parseInt(reminderTime) * 60 * 60 * 1000);

				const reminderResponse = await fetch('/api/discord/reminder', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						event: {
							title,
							date,
							time,
							location,
							description,
							registrationUrl
						},
						reminderTime: reminderDate.toISOString()
					})
				});

				if (!reminderResponse.ok) {
					console.error('Failed to schedule reminder');
				}
			}

			success = true;
			// Reset form
			title = '';
			date = '';
			time = '';
			location = '';
			description = '';
			registrationUrl = '';
			enableReminder = true;
			reminderTime = '1';
		} catch (e: unknown) {
			error = e instanceof Error ? e.message : 'An unexpected error occurred';
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Create Event - Tech Talk Augusta</title>
	<meta name="description" content="Create a new tech event in Augusta. Your event will be shared on our website and Discord community." />
	<meta property="og:title" content="Create Event - Tech Talk Augusta" />
	<meta property="og:description" content="Create a new tech event in Augusta. Your event will be shared on our website and Discord community." />
	<meta property="og:url" content="https://techtalkaugusta.com/forms/create-event" />
</svelte:head>

<section class="hero">
	<div class="container">
		<div class="hero-content">
			<img src={transparentLogo} alt="Tech Talk Augusta Logo" class="hero-logo" />
			<h1>Create an Event</h1>
			<p class="lead">
				Share your tech event with the Augusta community. Your event will be posted on our website and Discord server.
			</p>
		</div>
	</div>
</section>

<section class="form-section">
	<div class="container">
		<form on:submit|preventDefault={handleSubmit} class="event-form">
			{#if success}
				<div class="success-message">
					<p>Event created successfully! It will be posted to Discord shortly.</p>
				</div>
			{/if}

			{#if error}
				<div class="error-message">
					<p>{error}</p>
				</div>
			{/if}

			<div class="form-group">
				<label for="title">Event Title</label>
				<input
					type="text"
					id="title"
					bind:value={title}
					required
					placeholder="e.g., Web Development Workshop"
				/>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label for="date">Date</label>
					<input
						type="date"
						id="date"
						bind:value={date}
						required
						min={new Date().toISOString().split('T')[0]}
					/>
				</div>

				<div class="form-group">
					<label for="time">Time</label>
					<input
						type="time"
						id="time"
						bind:value={time}
						required
					/>
				</div>
			</div>

			<div class="form-group">
				<label for="location">Location</label>
				<input
					type="text"
					id="location"
					bind:value={location}
					required
					placeholder="e.g., Augusta Tech Hub"
				/>
			</div>

			<div class="form-group">
				<label for="description">Event Description</label>
				<textarea
					id="description"
					bind:value={description}
					required
					rows="4"
					placeholder="Describe your event..."
				></textarea>
			</div>

			<div class="form-group">
				<label for="registrationUrl">Registration URL (Optional)</label>
				<input
					type="url"
					id="registrationUrl"
					bind:value={registrationUrl}
					placeholder="https://..."
				/>
			</div>

			<div class="form-group reminder-section">
				<label class="checkbox-label">
					<input
						type="checkbox"
						bind:checked={enableReminder}
					/>
					Enable Discord Reminder
				</label>
				{#if enableReminder}
					<div class="reminder-time">
						<label for="reminderTime">Remind before event:</label>
						<select id="reminderTime" bind:value={reminderTime}>
							<option value="0.5">30 minutes</option>
							<option value="1">1 hour</option>
							<option value="2">2 hours</option>
							<option value="4">4 hours</option>
							<option value="24">1 day</option>
						</select>
					</div>
				{/if}
			</div>

			<button type="submit" class="btn btn-primary" disabled={submitting}>
				{submitting ? 'Creating Event...' : 'Create Event'}
			</button>
		</form>
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
		margin-bottom: var(--spacing-4);
	}

	.lead {
		font-size: var(--font-size-xl);
		color: var(--color-text-light);
		margin-top: var(--spacing-4);
	}

	.form-section {
		padding: var(--spacing-16) 0;
	}

	.event-form {
		max-width: 600px;
		margin: 0 auto;
		background: white;
		padding: var(--spacing-8);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
	}

	.form-group {
		margin-bottom: var(--spacing-6);
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-4);
	}

	label {
		display: block;
		margin-bottom: var(--spacing-2);
		font-weight: 500;
	}

	input, textarea {
		width: 100%;
		padding: var(--spacing-3);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: var(--font-size-base);
	}

	textarea {
		resize: vertical;
	}

	.success-message {
		background-color: var(--color-success-light);
		color: var(--color-success);
		padding: var(--spacing-4);
		border-radius: var(--radius-md);
		margin-bottom: var(--spacing-6);
	}

	.error-message {
		background-color: var(--color-error-light);
		color: var(--color-error);
		padding: var(--spacing-4);
		border-radius: var(--radius-md);
		margin-bottom: var(--spacing-6);
	}

	button {
		width: 100%;
		padding: var(--spacing-4);
	}

	button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	@media (max-width: 768px) {
		.form-row {
			grid-template-columns: 1fr;
		}

		.hero {
			padding: var(--spacing-8) 0;
		}

		.lead {
			font-size: var(--font-size-lg);
		}
	}

	.reminder-section {
		margin-top: var(--spacing-6);
		padding-top: var(--spacing-4);
		border-top: 1px solid var(--color-border);
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		cursor: pointer;
	}

	.checkbox-label input[type="checkbox"] {
		width: auto;
	}

	.reminder-time {
		margin-top: var(--spacing-4);
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
	}

	.reminder-time select {
		padding: var(--spacing-2) var(--spacing-4);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: var(--font-size-base);
	}
</style> 
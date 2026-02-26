<script lang="ts">
	import { onMount } from 'svelte';
	import TeamMemberCard from '$blocks/TeamMemberCard.svelte';
	import { title as siteTitle } from '$lib/data/meta';
	import type { TeamSection } from '$lib/data/team';

	interface Props {
		data: { sections?: TeamSection[] };
	}

	let { data }: Props = $props();

	const sections = $derived(data?.sections ?? []);

	// CSS animation runs after hydration (Svelte transitions don't fire on SSR)
	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Team — {siteTitle}</title>
	<meta name="description" content="Meet the team behind the Bleach-inspired RPG for Hytale." />
</svelte:head>

<div class="container team-page">
	<header class="team-header">
		<h1 class="title">Our Team</h1>
	</header>

	{#each sections as section}
		<section class="team-section" id={section.id}>
			<h2 class="section-title">{section.title}</h2>
			<div class="cards-grid" class:mounted>
				{#each section.members as member, i}
					<div
						class="card-item"
						style="--i: {i}"
					>
						<TeamMemberCard member={member} />
					</div>
				{/each}
			</div>
		</section>
	{/each}
</div>

<style lang="scss">
	@use '$lib/scss/breakpoints' as *;
	@use '$lib/scss/fluid' as *;

	.team-header {
		text-align: center;
		margin-bottom: 48px;

		.title {
			font-family: var(--font--title);
			margin: 0 0 16px;
			color: var(--color--text);
			@include fluid-text(1.75rem, 2.25rem);
		}
	}

	.team-section {
		margin-bottom: 48px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.section-title {
		@include fluid-text(1.125rem, 1.25rem);
		font-weight: 600;
		color: var(--color--text);
		margin: 0 0 20px;
		padding-bottom: 8px;
		border-bottom: 3px solid var(--color--primary);
		display: inline-block;
	}

	.cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 20px;

		@include for-phone-only {
			grid-template-columns: repeat(2, 1fr);
		}

		.card-item {
			opacity: 0;
		}

		&.mounted .card-item {
			animation: card-fade-in 0.4s ease-out forwards;
			animation-delay: calc(var(--i) * 90ms);
		}
	}

	@keyframes card-fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>

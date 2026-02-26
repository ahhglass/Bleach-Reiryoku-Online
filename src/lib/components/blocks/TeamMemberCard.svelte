<script lang="ts">
	import ImageWithSkeleton from '$ui/ImageWithSkeleton.svelte';
	import type { TeamMember } from '$lib/data/team';

	interface Props {
		member: TeamMember;
	}

	let { member }: Props = $props();

	const initials = $derived(
		member.name
			.split(/\s+/)
			.map((w) => w[0])
			.join('')
			.toUpperCase()
			.slice(0, 2)
	);
</script>

<article class="team-card">
	<div class="avatar-wrap">
		{#if member.avatar}
			<ImageWithSkeleton
				src={member.avatar}
				alt="{member.name} — profile"
				aspectRatio="1"
				loading="lazy"
				decoding="async"
				class="avatar-img"
			/>
		{:else}
			<div class="avatar-placeholder" title={member.name}>{initials}</div>
		{/if}
	</div>
	<h3 class="name">{member.name}</h3>
	<p class="role">{member.role}</p>
	{#if member.description}
		<p class="description">{member.description}</p>
	{/if}
	{#if member.tags?.length}
		<div class="tags" role="list">
			{#each member.tags as tag}
				<span class="badge" role="listitem">{tag}</span>
			{/each}
		</div>
	{/if}
</article>

<style lang="scss">
	.team-card {
		background: var(--color--team-card-bg);
		color: var(--color--text);
		border-radius: 10px;
		padding: 0 0 14px;
		overflow: hidden;
		box-shadow: var(--card-shadow);
		transition: box-shadow 0.2s ease;
	}

	.avatar-wrap {
		width: 100%;
		aspect-ratio: 1;
		background: var(--color--team-card-avatar-bg);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.avatar-wrap :global(.image-with-skeleton) {
		width: 100%;
		height: 100%;
		aspect-ratio: 1;
	}

	.avatar-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color--text-shade);
		background: var(--color--team-card-avatar-bg);
	}

	.name {
		margin: 10px 14px 2px;
		font-size: 1rem;
		font-weight: 700;
		color: var(--color--text);
	}

	.role {
		margin: 0 14px 6px;
		font-size: 0.8rem;
		color: var(--color--primary);
		font-weight: 500;
	}

	.description {
		margin: 0 14px 8px;
		font-size: 0.8rem;
		color: var(--color--text-shade);
		font-style: italic;
		line-height: 1.35;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 0 14px;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 4px 10px;
		border-radius: 8px;
		font-size: clamp(0.65rem, 2vw, 0.75rem);
		font-weight: 500;
		white-space: nowrap;
		background: var(--color--team-badge-bg);
		color: var(--color--team-badge-text);
	}
</style>

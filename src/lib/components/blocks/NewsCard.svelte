<script lang="ts">
	import ImageWithSkeleton from '$ui/ImageWithSkeleton.svelte';
	import { sound } from '$lib/utils/sound';

	interface Props {
		title: string;
		excerpt: string;
		slug: string;
		readingTime?: string;
		tags?: string[];
		coverImage?: string;
		showImage?: boolean;
	}

	let {
		title,
		excerpt,
		slug,
		readingTime = '',
		tags = [],
		coverImage,
		showImage = true
	}: Props = $props();

	const href = $derived(`/news/${slug}`);
</script>

<a href={href} class="news-card" data-sveltekit-preload-data use:sound>
	{#if showImage && coverImage}
		<div class="image">
			<ImageWithSkeleton
				src={coverImage}
				alt={title}
				aspectRatio="16/10"
				loading="lazy"
				decoding="async"
			/>
		</div>
	{/if}
	<div class="body">
		<h3 class="title">{title}</h3>
		<span class="spacer" aria-hidden="true"></span>
		{#if readingTime}
			<span class="meta">{readingTime}</span>
		{/if}
		{#if excerpt}
			<p class="excerpt">{excerpt}</p>
		{/if}
		{#if tags?.length}
			<div class="tags">
				{#each tags.slice(0, 3) as tag}
					<span class="tag">{tag}</span>
				{/each}
			</div>
		{/if}
	</div>
</a>

<style lang="scss">
	@use '$lib/scss/breakpoints' as *;
	@use '$lib/scss/fluid' as *;

	.news-card {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
		background: var(--color--card-background);
		border-radius: 10px;
		overflow: hidden;
		box-shadow: none;
		text-decoration: none;
		color: inherit;
		transition: box-shadow 0.3s var(--ease-elastic-4), transform 0.3s var(--ease-elastic-4);

		&:hover {
			transform: translateY(-2px) scale(1.01);
		}
		&:active {
			transform: translateY(0px) scale(0.98);
		}
	}

	.image {
		overflow: hidden;
		:global(.image-with-skeleton) {
			width: 100%;
		}
	}

	.body {
		padding: 1rem 1.25rem;
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
		min-height: 0;
		gap: 0.5rem;

		@include for-phone-only {
			padding: 0.5rem 0.5rem 0.6rem;
			gap: 0.25rem;
		}
	}

	.spacer {
		flex: 1 1 0;
		min-height: 0.35rem;
		display: block;
	}

	.title {
		font-family: var(--font--title);
		@include fluid-text(1rem, 1.1rem);
		font-weight: 700;
		line-height: 1.3;
		margin: 0;
		word-break: break-word;
		overflow-wrap: break-word;

		@include for-phone-only {
			font-size: 0.8125rem;
			line-height: 1.25;
		}
	}

	.meta {
		@include fluid-text(0.75rem, 0.8rem);
		color: var(--color--text-shade);

		@include for-phone-only {
			font-size: 0.6875rem;
		}
	}

	.excerpt {
		@include fluid-text(0.85rem, 0.9rem);
		margin: 0;
		line-height: 1.4;
		color: var(--color--text-shade);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-break: break-word;
		overflow-wrap: break-word;

		@include for-phone-only {
			font-size: 0.75rem;
			line-height: 1.3;
			-webkit-line-clamp: 2;
			line-clamp: 2;
		}
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-top: 0.25rem;

		@include for-phone-only {
			gap: 0.2rem;
			margin-top: 0.15rem;
		}
	}

	.tag {
		padding: 0.2rem 0.5rem;
		border-radius: 6px;
		@include fluid-text(0.7rem, 0.75rem);
		background: var(--color--team-badge-bg);
		color: var(--color--team-badge-text);

		@include for-phone-only {
			padding: 0.15rem 0.35rem;
			font-size: 0.625rem;
		}
	}
</style>

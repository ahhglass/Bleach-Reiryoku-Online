<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import dateformat from 'dateformat';
	import { keywords, siteBaseUrl, title as siteTitle } from '$lib/data/meta';
	import type { NewsPost } from '$lib/utils/types';
	import ImageWithSkeleton from '$ui/ImageWithSkeleton.svelte';
	import NewsCard from '$blocks/NewsCard.svelte';
	import ArrowLeftIcon from '$lib/icons/arrow-left.svelte';

	interface Props {
		post: NewsPost;
		children: import('svelte').Snippet;
	}

	let { post, children }: Props = $props();

	let mounted = $state(false);

	function goBack() {
		if (typeof window !== 'undefined' && window.history.length > 1) {
			window.history.back();
		} else {
			goto('/news');
		}
	}

	onMount(() => {
		mounted = true;
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				goBack();
			}
		};
		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	});

	const metaKeywords = $derived(
		[
			...(post.tags ?? []),
			...(post.keywords ?? []),
			...keywords
		]
	);
</script>

<svelte:head>
	<meta name="keywords" content={metaKeywords.join(', ')} />
	<meta name="description" content={post.excerpt} />
	<meta property="og:description" content={post.excerpt} />
	<meta name="twitter:description" content={post.excerpt} />
	<title>{post.title} — {siteTitle}</title>
	<meta property="og:title" content="{post.title} — {siteTitle}" />
	<meta name="twitter:title" content="{post.title} — {siteTitle}" />
	{#if post.coverImage}
		<meta property="og:image" content="{post.coverImage.startsWith('http') ? post.coverImage : siteBaseUrl.replace(/\/$/, '') + (post.coverImage.startsWith('/') ? post.coverImage : '/' + post.coverImage)}" />
		<meta name="twitter:image" content="{post.coverImage.startsWith('http') ? post.coverImage : siteBaseUrl.replace(/\/$/, '') + (post.coverImage.startsWith('/') ? post.coverImage : '/' + post.coverImage)}" />
	{/if}
</svelte:head>

<div class="article-layout">
	<div class="article-layout-inner" class:mounted>
		<nav class="back-bar" aria-label="Back to news">
			<button type="button" class="back-button" onclick={goBack} title="Back to news (Esc)">
				<span class="back-icon" aria-hidden="true">
					<ArrowLeftIcon />
				</span>
				Back
			</button>
		</nav>
		<article id="article-content">
			<div class="header">
				<h1>{post.title}</h1>
				<div class="note">Published on {dateformat(post.date, 'UTC:dd mmmm yyyy')}</div>
				{#if post.updated}
					<div class="note">Updated on {dateformat(post.updated, 'UTC:dd mmmm yyyy')}</div>
				{/if}
				{#if post.readingTime}
					<div class="note">{post.readingTime}</div>
				{/if}
				{#if post.tags?.length}
					<div class="tags">
						{#each post.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				{/if}
			</div>
			{#if post.coverImage}
				<div class="cover-image">
					<ImageWithSkeleton
						src={post.coverImage}
						alt={post.title}
						aspectRatio="16/9"
						loading="eager"
						decoding="async"
						fetchpriority="high"
						class="cover-img"
					/>
				</div>
			{/if}
			<div class="content">
				{@render children()}
			</div>
		</article>

		{#if post.relatedPosts?.length}
			<aside class="related">
				<h2>Related news</h2>
				<div class="related-grid" class:mounted>
					{#each post.relatedPosts as related, i}
						<div class="card-item" style="--i: {i}">
							<NewsCard
								title={related.title}
								excerpt={related.excerpt}
								slug={related.slug}
								readingTime={related.readingTime}
								tags={related.tags}
								coverImage={related.coverImage}
								showImage={true}
							/>
						</div>
					{/each}
				</div>
			</aside>
		{/if}
	</div>
</div>

<style lang="scss">
	@use '$lib/scss/mixins' as *;
	@use '$lib/scss/fluid' as *;

	.article-layout {
		--body-background-color: var(--color--post-page-background);
	}

	.article-layout-inner {
		opacity: 0;
		border-radius: 1em;
		background-color: var(--color--post-page-background);
		transform: scale(0.96) translateY(-20px);

		@include for-phone-only {
			width: 100vw;
			max-width: 100vw;
			margin-left: calc(50% - 50vw);
			margin-right: calc(50% - 50vw);
			box-sizing: border-box;
			border-radius: 0;
		}
	}

	.article-layout-inner.mounted {
		animation: post-open 0.4s cubic-bezier(0.33, 1, 0.68, 1) forwards;
	}

	@keyframes post-open {
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.back-bar {
		padding: 12px 0px 0px 12px;

		@include for-phone-only {
			padding: 10px 12px 0;
		}

		@include for-iphone-se {
			padding: 8px 10px 0;
		}

		@include for-tablet-landscape-up {
			padding-right: 30px;
			padding-top: 14px;
		}
	}

	.back-button {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.4rem 0.75rem;
		font-size: 0.9375rem;
		font-family: inherit;
		color: var(--color--primary);
		background: transparent;
		border: 1px solid var(--color--primary);
		border-radius: 8px;
		cursor: pointer;
		transition: background 0.2s ease, color 0.2s ease;

		&:hover {
			background: rgba(var(--color--primary-rgb), 0.1);
		}

		&:focus-visible {
			outline: 2px solid var(--color--primary);
			outline-offset: 2px;
		}

		.back-icon {
			display: inline-flex;
			width: 1em;
			height: 1em;
		}
	}

	#article-content {
		--main-column-width: 65ch;
		position: relative;
		padding-top: 40px;
		padding-bottom: 80px;
		padding-right: 15px;
		padding-left: 15px;

		@include for-phone-only {
			padding-left: 12px;
			padding-right: 12px;
		}

		@include for-iphone-se {
			padding-left: 10px;
			padding-right: 10px;
		}

		@include for-tablet-portrait-up {
			padding-right: 20px;
			padding-left: 20px;
		}

		@include for-tablet-landscape-up {
			padding-right: 30px;
			padding-left: 30px;
		}

		display: flex;
		flex-direction: column;
		gap: 30px;

		.header {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
			gap: 10px;
			width: min(var(--main-column-width), 100%);
			margin: 0 auto;

			h1 {
				@include fluid-text(1.5rem, 2.25rem);
			}

			.note {
				@include fluid-text(0.8125rem, 0.9rem);
				color: rgba(var(--color--text-rgb), 0.8);
			}
		}

		.cover-image {
			width: min(var(--main-column-width), 100%);
			margin: 0 auto;
			max-height: 400px;
			box-shadow: var(--image-shadow);
			border-radius: 6px;

			:global(.image-with-skeleton.cover-img) {
				max-height: 400px;
				border-radius: 6px;
			}

			:global(.image-with-skeleton img) {
				max-height: 400px;
				object-fit: cover;
			}
		}

		.content {
			display: grid;
			grid-template-columns:
				1fr
				min(var(--main-column-width), 100%)
				1fr;

			:global(> *) {
				grid-column: 2;
			}

			:global(> .full-bleed) {
				grid-column: 1 / 4;
				width: 100%;
				max-width: 1600px;
				margin-left: auto;
				margin-right: auto;
			}
		}

		.tags {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 5px;
			flex-wrap: wrap;
		}

		.tag {
			padding: 4px 10px;
			border-radius: 8px;
			@include fluid-text(0.6875rem, 0.8125rem);
			background: var(--color--team-badge-bg);
			color: var(--color--team-badge-text);
		}
	}

	.related {
		margin-top: 2rem;
		padding: 0 15px 30px;

		@include for-phone-only {
			padding-left: 12px;
			padding-right: 12px;
		}

		@include for-tablet-portrait-up {
			padding-left: 20px;
			padding-right: 20px;
		}

		@include for-tablet-landscape-up {
			padding-left: 30px;
			padding-right: 30px;
		}

		h2 {
			font-family: var(--font--title);
			@include fluid-text(1.125rem, 1.25rem);
			margin-bottom: 1rem;
		}
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 1rem;

		@include for-phone-only {
			grid-template-columns: repeat(2, 1fr);
		}

		.card-item {
			opacity: 0;
		}

		&.mounted .card-item {
			animation: card-fade-in 0.4s ease-out forwards;
			animation-delay: calc(var(--i) * 60ms);
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

<script lang="ts">
	import { onMount } from 'svelte';
	import NewsCard from '$blocks/NewsCard.svelte';
	import type { SiteSettings } from '../+layout.server';
	import NavArrowLeft from '$lib/icons/nav-arrow-left.svelte';
	import NavArrowRight from '$lib/icons/nav-arrow-right.svelte';
	import type { NewsPost } from '$lib/utils/types';

	interface Props {
		data: {
			settings?: SiteSettings | null;
			posts?: NewsPost[];
			totalPages?: number;
			currentPage?: number;
		};
	}

	let { data }: Props = $props();

	const siteTitle = $derived(data?.settings?.site_title ?? '');

	const posts = $derived(data?.posts ?? []);
	const totalPages = $derived(data?.totalPages ?? 1);
	const currentPage = $derived(data?.currentPage ?? 1);

	// CSS animation runs after hydration (Svelte transitions don't fire on SSR)
	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});

	function pageUrl(page: number): string {
		return page === 1 ? '/news' : `/news?page=${page}`;
	}

	// Show at most 4 page numbers in each block: 1 2 3 4 … 10 or 1 … 7 8 9 10
	function visiblePages(): number[] {
		const total = totalPages;
		if (total <= 4) {
			return Array.from({ length: total }, (_, i) => i + 1);
		}
		const cur = currentPage;
		const show: number[] = [];
		if (cur <= 3) {
			for (let i = 1; i <= 4; i++) show.push(i);
			show.push(-1); // ellipsis
			show.push(total);
		} else if (cur >= total - 2) {
			show.push(1);
			show.push(-1);
			for (let i = total - 3; i <= total; i++) show.push(i);
		} else {
			show.push(1);
			show.push(-1);
			for (let i = cur - 1; i <= cur + 1; i++) show.push(i);
			show.push(-1);
			show.push(total);
		}
		return show;
	}
</script>

<svelte:head>
	<title>News — {siteTitle}</title>
</svelte:head>

<div class="news-page">
	<h1 class="page-title">News</h1>
	{#if posts.length}
		<div class="news-grid" class:mounted>
			{#each posts as post, i}
				<div class="card-item" style="--i: {i}">
					<NewsCard
						title={post.title}
						excerpt={post.excerpt}
						slug={post.slug}
						readingTime={post.readingTime}
						tags={post.tags}
						coverImage={post.coverImage}
						showImage={true}
					/>
				</div>
			{/each}
		</div>
		{#if totalPages > 1}
			<nav class="pagination" aria-label="Pagination">
				{#if currentPage > 1}
					<a class="pagination-link prev" href={pageUrl(currentPage - 1)} aria-label="Previous page">
						<span class="pagination-icon"><NavArrowLeft /></span>
					</a>
				{:else}
					<span class="pagination-link prev disabled" aria-disabled="true" aria-label="Previous page">
						<span class="pagination-icon"><NavArrowLeft /></span>
					</span>
				{/if}
				<span class="pagination-pages">
					{#each visiblePages() as p}
						{#if p === -1}
							<span class="pagination-ellipsis" aria-hidden="true">…</span>
						{:else if p === currentPage}
							<span class="pagination-link current" aria-current="page">{p}</span>
						{:else}
							<a class="pagination-link" href={pageUrl(p)}>{p}</a>
						{/if}
					{/each}
				</span>
				{#if currentPage < totalPages}
					<a class="pagination-link next" href={pageUrl(currentPage + 1)} aria-label="Next page">
						<span class="pagination-icon"><NavArrowRight /></span>
					</a>
				{:else}
					<span class="pagination-link next disabled" aria-disabled="true" aria-label="Next page">
						<span class="pagination-icon"><NavArrowRight /></span>
					</span>
				{/if}
			</nav>
		{/if}
	{:else}
		<p class="empty">No news yet.</p>
	{/if}
</div>

<style lang="scss">
	@use '$lib/scss/breakpoints' as *;
	@use '$lib/scss/fluid' as *;

	.news-page {
		width: 100%;
	}

	.page-title {
		font-family: var(--font--title);
		@include fluid-text(1.5rem, 2rem);
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.news-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;

		@include for-phone-only {
			grid-template-columns: repeat(2, 1fr);
			gap: 0.5rem;
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

	.empty {
		@include fluid-text(0.9375rem, 1.0625rem);
		text-align: center;
		color: var(--color--text-shade);
		padding: 2rem;
	}

	.pagination {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.5rem 1rem;
		margin-top: 2.5rem;
		padding: 1rem 0;
	}

	.pagination-pages {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.pagination-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.25rem;
		height: 1.25rem;
	}

	.pagination-link {
		@include fluid-text(0.875rem, 1rem);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 2.25rem;
		height: 2.25rem;
		padding: 0 0.5rem;
		color: var(--color--text);
		text-decoration: none;
		border-radius: 6px;
		transition: background-color 0.2s, color 0.2s;

		&:hover:not(.current):not(.disabled) {
			background-color: var(--color--primary-shade);
			color: var(--color--page-background);
		}

		&.current {
			background-color: var(--color--primary);
			color: var(--color--page-background);
			font-weight: 600;
			cursor: default;
		}

		&.disabled {
			color: var(--color--text-shade);
			cursor: not-allowed;
			opacity: 0.7;
		}
	}

	.pagination-ellipsis {
		@include fluid-text(0.875rem, 1rem);
		color: var(--color--text-shade);
		padding: 0 0.25rem;
		user-select: none;
	}
</style>

<script lang="ts">
	import FaqAccordion from '$blocks/FaqAccordion.svelte';
	import SearchIcon from '$lib/icons/search.svelte';
	import { title as siteTitle } from '$lib/data/meta';
	import type { FaqItem } from '$lib/data/faq';

	interface Props {
		data: { items?: FaqItem[]; tags?: string[] };
	}

	let { data }: Props = $props();

	const items = $derived(data?.items ?? []);
	const tags = $derived(data?.tags ?? []);

	let search = $state('');
	let searchFocused = $state(false);
	let activeTag = $state('');
	let openIds = $state<Set<string>>(new Set());

	const labelFloating = $derived(search.length > 0 || searchFocused);

	const filteredItems = $derived(
		items.filter((item) => {
			const matchSearch =
				!search ||
				item.question.toLowerCase().includes(search.toLowerCase()) ||
				item.answer.toLowerCase().includes(search.toLowerCase());
			const matchTag = !activeTag || item.tag === activeTag;
			return matchSearch && matchTag;
		})
	);

	const resultsCount = $derived(filteredItems.length);

	function toggle(id: string) {
		openIds = new Set(openIds);
		if (openIds.has(id)) openIds.delete(id);
		else openIds.add(id);
	}

	function expandAll() {
		openIds = new Set(filteredItems.map((i) => i.id));
	}

	function collapseAll() {
		openIds = new Set();
	}

	function setTag(tag: string) {
		activeTag = activeTag === tag ? '' : tag;
	}
</script>

<svelte:head>
	<title>FAQ — {siteTitle}</title>
	<meta name="description" content="Frequently asked questions about Bleach Reiryoku Online (BRO) and development." />
</svelte:head>

<div class="container faq-page">
	<p class="label">KNOWLEDGE BASE</p>
	<h1 class="title">Frequently Asked Questions</h1>

	<section class="find-section">
		<h2 class="find-title">Find your answer fast</h2>
		<p class="find-desc">Explore information and stay up to date with the project's development.</p>

		<div class="search-wrap group">
			<span class="search-icon" aria-hidden="true">
				<SearchIcon />
			</span>
			<input
				id="faq-search"
				type="search"
				class="search-input"
				bind:value={search}
				onfocus={() => (searchFocused = true)}
				onblur={() => (searchFocused = false)}
				aria-label="Search FAQ"
				autocomplete="off"
			/>
			<label for="faq-search" class="search-label" class:floating={labelFloating}>
				Search questions or keywords
			</label>
		</div>

		<div class="controls">
			<div class="filters">
				{#each tags as tag}
					<button
						type="button"
						class="filter-btn"
						class:active={activeTag === tag}
						onclick={() => setTag(tag)}
					>
						{tag}
					</button>
				{/each}
			</div>
			<div class="actions">
				<button type="button" class="action-btn" onclick={expandAll}>Expand all</button>
				<button type="button" class="action-btn" onclick={collapseAll}>Collapse all</button>
			</div>
		</div>

		<p class="results-count">{resultsCount} RESULTS</p>
	</section>

	<div class="accordion-list">
		{#each filteredItems as item (item.id)}
			<FaqAccordion item={item} open={openIds.has(item.id)} onToggle={() => toggle(item.id)} />
		{/each}
	</div>

	{#if filteredItems.length === 0}
		<p class="no-results">No questions match your search or filter.</p>
	{/if}
</div>

<style lang="scss">
	@use '$lib/scss/breakpoints' as *;
	@use '$lib/scss/fluid' as *;

	.faq-page {
		@include for-phone-only {
			padding: 0 0.25rem;
		}
	}

	.label {
		text-align: center;
		@include fluid-text(0.75rem, 0.875rem);
		letter-spacing: 0.15em;
		color: var(--color--text-shade);
		margin: 0 0 8px;

		@include for-phone-only {
			font-size: 0.6875rem;
			letter-spacing: 0.1em;
			margin-bottom: 4px;
		}
	}

	.title {
		text-align: center;
		font-family: var(--font--title);
		font-weight: 700;
		color: var(--color--text);
		margin: 0 0 40px;
		@include fluid-text(1.75rem, 2.25rem);

		@include for-phone-only {
			font-size: 1.5rem;
			margin-bottom: 24px;
		}

		@include for-iphone-se {
			font-size: 1.25rem;
			margin-bottom: 20px;
		}
	}

	.find-section {
		margin-bottom: 32px;

		@include for-phone-only {
			margin-bottom: 24px;
		}
	}

	.find-title {
		@include fluid-text(1rem, 1.125rem);
		font-weight: 600;
		color: var(--color--text);
		margin: 0 0 6px;

		@include for-phone-only {
			font-size: 0.9375rem;
		}
	}

	.find-desc {
		@include fluid-text(0.875rem, 1rem);
		color: var(--color--text-shade);
		margin: 0 0 20px;

		@include for-phone-only {
			font-size: 0.8125rem;
			margin-bottom: 14px;
		}
	}

	.search-wrap {
		position: relative;
		max-width: 480px;
		margin-bottom: 16px;

		@include for-phone-only {
			margin-bottom: 12px;
		}
	}

	.search-icon {
		position: absolute;
		left: 14px;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.25rem;
		height: 1.25rem;
		color: var(--color--text-shade);
		pointer-events: none;
		transition: color 0.2s ease;
		z-index: 1;

		@include for-phone-only {
			left: 12px;
			width: 1.125rem;
			height: 1.125rem;
		}

		.group:focus-within & {
			color: var(--color--primary);
		}

		:global(svg) {
			width: 100%;
			height: 100%;
		}
	}

	.search-input {
		width: 100%;
		padding: 18px 16px 10px 44px;
		font-size: 1rem;
		border: none;
		border-radius: 10px;
		background: var(--color--team-card-bg);
		color: var(--color--text);
		font-family: inherit;
		transition: box-shadow 0.2s ease;

		&:focus {
			outline: none;
			box-shadow: 0 0 0 2px rgba(var(--color--primary-rgb), 0.2);
		}

		@include for-phone-only {
			padding: 14px 12px 8px 40px;
			font-size: 0.9375rem;
			border-radius: 8px;
		}
	}

	.search-label {
		position: absolute;
		left: 44px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 1rem;
		color: var(--color--text-shade);
		pointer-events: none;
		transition: 0.2s ease all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: calc(100% - 60px);

		@include for-phone-only {
			left: 40px;
			font-size: 0.875rem;
			max-width: calc(100% - 52px);
		}
	}

	.search-label.floating {
		// top: -19.5px; не трогать
		top: -8px;
		transform: none;
		padding: 0px 4px;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		background: var(--color--team-card-bg);
		font-size: 0.75rem;
		// box-shadow: 0 0 0 2px rgba(var(--color--primary-rgb), 0.2);
	}

	.controls {
		display: flex;
		gap: 12px;
		margin-bottom: 12px;
		justify-content: center;
		align-items: flex-start;

		@include for-phone-only {
			flex-direction: column;
			align-items: stretch;
			gap: 10px;
			margin-bottom: 10px;
		}
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;

		@include for-phone-only {
			gap: 6px;
		}
	}

	.filter-btn {
		padding: 4px 8px;
		font-size: 0.75rem;
		font-weight: 500;
		border-radius: 8px;
		border: none;
		background: var(--color--team-card-bg);
		color: var(--color--text);
		cursor: pointer;
		font-family: inherit;
		transition:
			background 0.35s var(--ease-4),
			border-color 0.35s var(--ease-4),
			color 0.35s var(--ease-4),
			transform 0.2s var(--ease-out-3);

		&:hover {
			background: var(--color--team-badge-bg);
			border-color: var(--color--team-badge-text);
		}

		&:active {
			transform: scale(0.97);
		}

		&.active {
			background: var(--color--team-badge-bg);
			color: var(--color--team-badge-text);
			border-color: var(--color--team-badge-text);
		}

		@include for-phone-only {
			padding: 6px 10px;
			font-size: 0.8125rem;
		}
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-left: auto;

		@include for-phone-only {
			margin-left: 0;
			gap: 6px;
		}
	}

	.action-btn {
		padding: 4px 8px;
		font-size: 0.75rem;
		font-weight: 500;
		border-radius: 8px;
		border: none;
		background: var(--color--team-card-bg);
		color: var(--color--text);
		cursor: pointer;
		font-family: inherit;
		transition:
			background 0.35s var(--ease-4),
			border-color 0.35s var(--ease-4),
			color 0.35s var(--ease-4),
			transform 0.2s var(--ease-out-3);

		&:hover {
			background: var(--color--team-badge-bg);
			color: var(--color--team-badge-text);
		}

		&:active {
			transform: scale(0.97);
		}

		@include for-phone-only {
			padding: 6px 10px;
			font-size: 0.8125rem;
		}
	}

	.results-count {
		font-size: 0.85rem;
		color: var(--color--text-shade);
		margin: 0;

		@include for-phone-only {
			font-size: 0.75rem;
		}
	}

	.accordion-list {
		margin-top: 8px;

		@include for-phone-only {
			margin-top: 4px;
		}
	}

	.no-results {
		text-align: center;
		color: var(--color--text-shade);
		padding: 40px 20px;

		@include for-phone-only {
			padding: 24px 12px;
			font-size: 0.875rem;
		}
	}
</style>

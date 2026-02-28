<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { FaqItem } from '$lib/data/faq';
	import { sound } from '$lib/utils/sound';
	import { ArrowDown as ArrowDownIcon, ArrowUp as ArrowUpIcon } from '$lib/icons';

	interface Props {
		item: FaqItem;
		open?: boolean;
		onToggle?: () => void;
	}

	let { item, open = false, onToggle }: Props = $props();
</script>

<div class="accordion" class:open>
	<button
		type="button"
		class="trigger"
		aria-expanded={open}
		aria-controls="faq-{item.id}"
		id="faq-trigger-{item.id}"
		onclick={onToggle}
		use:sound
	>
		<span class="question">{item.question}</span>
		<span class="meta">
			<span class="tag">{item.tag}</span>
			<span class="icon" aria-hidden="true">
				{#if open}
					<ArrowUpIcon />
				{:else}
					<ArrowDownIcon />
				{/if}
			</span>
		</span>
	</button>
	{#if open}
		<div
			id="faq-{item.id}"
			role="region"
			aria-labelledby="faq-trigger-{item.id}"
			class="content"
			transition:slide={{ duration: 280, easing: (t) => t * (2 - t) }}
		>
			<p class="answer">{item.answer}</p>
		</div>
	{/if}
</div>

<style lang="scss">
	@use '$lib/scss/breakpoints' as *;

	.accordion {
		background: var(--color--team-card-bg);
		border: 1px solid var(--color--team-card-border);
		border-radius: 10px;
		overflow: hidden;
		margin-bottom: 10px;
		transition: all 0.2s ease;

		&:hover {
			transform: scale(1.01);
		}

		@include for-phone-only {
			border-radius: 8px;
			margin-bottom: 8px;

			&:hover {
				transform: none;
			}
		}
	}

	.trigger {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 16px 20px;
		background: none;
		border: none;
		color: var(--color--text);
		font-size: 1rem;
		font-weight: 600;
		text-align: left;
		cursor: pointer;
		font-family: inherit;
		transition:
			background-color 0.35s var(--ease-4),
			color 0.35s var(--ease-4),
			transform 0.2s var(--ease-out-3);

		&:hover {
			background: rgba(var(--color--primary-rgb), 0.06);
		}

		&:active {
			transform: scale(0.995);
		}

		@include for-phone-only {
			padding: 12px 14px;
			gap: 8px;
			font-size: 0.9375rem;
		}

		@include for-iphone-se {
			padding: 10px 12px;
			font-size: 0.875rem;
		}
	}

	.question {
		flex: 1;
		min-width: 0;
		word-break: break-word;
		overflow-wrap: break-word;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-shrink: 0;

		@include for-phone-only {
			gap: 8px;
		}
	}

	.tag {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		padding: 4px 8px;
		border-radius: 6px;
		background: var(--color--team-badge-bg);
		color: var(--color--team-badge-text);

		@include for-phone-only {
			font-size: 0.625rem;
			padding: 3px 6px;
			border-radius: 4px;
		}
	}

	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1rem;
		height: 1rem;
		color: var(--color--text-shade);

		:global(svg) {
			width: 100%;
			height: 100%;
		}

		@include for-phone-only {
			width: 0.9rem;
			height: 0.9rem;
		}
	}

	.content {
		padding: 0 20px 16px;
		overflow: hidden;

		@include for-phone-only {
			padding: 0 14px 12px;
		}

		@include for-iphone-se {
			padding: 0 12px 10px;
		}
	}

	.answer {
		margin: 0;
		padding-top: 4px;
		font-size: 0.9rem;
		line-height: 1.5;
		color: var(--color--text-shade);
		word-break: break-word;
		overflow-wrap: break-word;

		@include for-phone-only {
			font-size: 0.8125rem;
			line-height: 1.45;
		}

		@include for-iphone-se {
			font-size: 0.75rem;
		}
	}
</style>

<script lang="ts">
	import FooterWave from '$lib/icons/footer-wave.svelte';
	import Socials from '$blocks/Socials.svelte';
	import ThemeToggle from '$blocks/ThemeToggle.svelte';
	import RssLink from '$ui/RssLink.svelte';
	import VolumeControl from '$ui/VolumeControl.svelte';
	import { sound } from '$lib/utils/sound';

	import type { SocialLinkItem } from '$lib/utils/types';

	interface Props {
		teamLabel?: string;
		teamUrl?: string;
		/** Second line of copyright (after team link). */
		slogan?: string;
		disclaimer?: string;
		socialLinks?: SocialLinkItem[];
	}
	let { teamLabel = '', teamUrl = '', slogan = '', disclaimer = '', socialLinks = [] }: Props = $props();

	const currentYear = new Date().getFullYear();
	const hasTeamLink = $derived(teamUrl?.trim().length > 0);
	const teamText = $derived(teamLabel?.trim() || 'Team');
	const sloganText = $derived(
		slogan?.trim() || 'Fan-made site. Not affiliated with rights holders.'
	);
	const disclaimerText = $derived(
		disclaimer?.trim() || 'Bleach © Tite Kubo / Shueisha. Hytale © Hypixel Studios. We do not claim ownership.'
	);
</script>

<footer>
	<div class="wave">
		<FooterWave />
	</div>
	<div class="content">
		<div class="col col-left">
			<p class="copyright">
				© {currentYear}
				{#if hasTeamLink}
					<a href={teamUrl} target="_blank" rel="noopener noreferrer" use:sound>{teamText}</a>
				{:else}
					{teamText}
				{/if}
				{#if sloganText}
					<br>{sloganText}
				{/if}
			</p>
			<p class="disclaimer">
				{disclaimerText}
			</p>
		</div>
		<div class="col col-right">
			<p class="credits">
				Site built with
				<a href="https://kit.svelte.dev/" target="_blank" rel="noopener noreferrer" use:sound>SvelteKit</a>
				Icons by
				<a href="https://iconoir.com/" target="_blank" rel="noopener noreferrer" use:sound>Iconoir</a>
			</p>
			<div id="socials" class="socials">
				<Socials items={socialLinks} />
				<RssLink />
				<VolumeControl />
				<ThemeToggle />
			</div>
		</div>
	</div>
</footer>

<style lang="scss">
	@use '$lib/scss/breakpoints' as *;
	@use '$lib/scss/fluid' as *;

	footer {
		position: relative;
		z-index: 2;
		min-height: 280px;
		width: 100%;
		background: linear-gradient(60deg, var(--color--waves-start) 0%, var(--color--waves-end) 100%);
		display: grid;
		grid-template-rows: 120px 1fr;

		a {
			&:hover {
				filter: drop-shadow(0px 0px 3px var(--color--primary));
			}
		}

		@include for-phone-only {
			min-height: 240px;
			grid-template-rows: 80px 1fr;
		}

		@include for-iphone-se {
			min-height: 220px;
			grid-template-rows: 70px 1fr;
		}
	}

	.wave {
		overflow: hidden;	
	}

	.content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: start;
		justify-content: space-between;
		gap: 1.5rem 2rem;
		font-weight: 600;
		padding: 0.5em 1.25rem 0.75rem;
		max-width: 1080px;
		margin: 0 auto;
		box-sizing: border-box;

		@include for-phone-only {
			grid-template-columns: 1fr;
			gap: 1.25rem;
			padding: 0.5em 0.75rem 1.25rem;
		}

		@include for-iphone-se {
			gap: 1rem;
			padding: 0 0.5rem 1rem;
		}
	}

	.col {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-width: 0;
	}

	.col-left {
		text-align: left;

		@include for-phone-only {
			text-align: center;
		}
	}

	.col-right {
		text-align: right;

		@include for-phone-only {
			text-align: center;
			border-top: 1px solid rgba(var(--color--primary-rgb), 0.15);
			padding-top: 1rem;
		}
	}

	.copyright,
	.disclaimer,
	.credits {
		max-width: 100%;
		margin: 0;
		word-break: break-word;
		overflow-wrap: break-word;
		line-height: 1.5;
		@include fluid-text(0.875rem, 1rem);
	}

	.copyright {
		font-weight: 600;

		@include for-phone-only {
			font-size: 0.8125rem;
		}

		@include for-iphone-se {
			font-size: 0.75rem;
		}
	}

	.disclaimer {
		font-weight: 400;
		font-size: 0.8125rem;
		color: var(--color--text-shade);

		@include for-phone-only {
			font-size: 0.75rem;
		}

		@include for-iphone-se {
			font-size: 0.6875rem;
		}
	}

	.credits {
		font-weight: 400;
		font-size: 0.875rem;
		color: var(--color--text-shade);

		@include for-phone-only {
			font-size: 0.8125rem;
		}

		@include for-iphone-se {
			font-size: 0.75rem;
		}
	}

	.socials {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 20px;

		@include for-phone-only {
			justify-content: center;
			gap: 14px;
		}

		@include for-iphone-se {
			gap: 12px;
		}
	}

	.col-right .socials {
		justify-content: flex-end;

		@include for-phone-only {
			justify-content: center;
		}
	}
</style>

<script lang="ts">
	import PlayNowIcon from '$lib/icons/playnow.svelte';
	import DiscordIcon from '$lib/icons/discord.svelte';
	import Button from '$ui/Button.svelte';
	import Sparkles from '$ui/Sparkles.svelte';
	import { serverModalOpen } from '$lib/stores/serverModal';

	interface Props {
		heroTitle?: string;
		heroSubtitle?: string;
	}

	let {
		heroTitle = 'A Bleach-inspired RPG built for Hytale',
		heroSubtitle = 'In Development - Reiryoku Team Bleach RPG for launch'
	}: Props = $props();
</script>

<section id="hero">
	<h1 class="hello">{heroTitle}</h1>
	<p class="intro">
		<span>{heroSubtitle}</span>
	</p>
	<div class="ctas">
		<Sparkles>
			<Button href="https://discord.gg/wstpy5Dc3Y">
				{#snippet icon()}
					<DiscordIcon />
				{/snippet}
				Discord
			</Button>
		</Sparkles>
		<Button color="primary" onclick={() => serverModalOpen.set(true)}>
			{#snippet icon()}
				<PlayNowIcon />
			{/snippet}
			Play Now
		</Button>
	</div>
</section>

<style lang="scss">
	@use '$lib/scss/breakpoints' as *;
	@use '$lib/scss/fluid' as *;

	#hero {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 15px;
		position: relative;
		@include fluid-size(padding-bottom, 2.5rem, 5rem);
	}

	.hello {
		font-family: var(--font--title);
		font-weight: 900;
		text-align: center;
		text-shadow: 2px 2px 0px rgba(199, 21, 83, 1), -2px -1px 0px rgba(71, 172, 255, 1);
		@include fluid-text(1.5rem, 3rem);
	}

	.intro {
		font-weight: 500;
		@include fluid-text(1rem, 1.25rem);
		width: min(100%, 440px);
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	.ctas {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 10px;
		width: 100%;

		@include for-phone-only {
			flex-wrap: nowrap;
			gap: 8px;
		}
	}
</style>

<script lang="ts">
	import { title as siteTitle } from '$lib/data/meta';
	import Hero from '$layout/Hero.svelte';
	import About from '$layout/About.svelte';
	import type { SiteSettings } from './+layout.server';

	interface Props {
		data: { settings?: SiteSettings | null };
	}

	let { data }: Props = $props();

	const title = $derived(data?.settings?.site_title ?? siteTitle);
	const heroTitle = $derived(data?.settings?.hero_title ?? '');
	const heroSubtitle = $derived(data?.settings?.hero_subtitle ?? '');
</script>

<svelte:head>
	<title>Home — {title}</title>
</svelte:head>

<div class="container">
	<Hero heroTitle={heroTitle || undefined} heroSubtitle={heroSubtitle || undefined} />
	<About />
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
</style>

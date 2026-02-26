<script lang="ts">
	import { onMount } from 'svelte';
	import '$lib/scss/global.scss';
	import '@fontsource/inter';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import '@fontsource/merriweather';
	import '@fontsource/merriweather/900.css';
	import '@fontsource/ubuntu-mono';
	import { page } from '$app/stores';
	import { description, image, keywords, title, siteBaseUrl } from '$lib/data/meta';

	// Base URL without trailing slash (for canonical and og:url)
	const baseUrl = siteBaseUrl.replace(/\/$/, '');
	import Header from '$layout/Header.svelte';
	import Waves from '$layout/Waves.svelte';
	import Footer from '$layout/Footer.svelte';
	import Modal from '$blocks/Modal.svelte';
	import ServerAddressPopup from '$blocks/ServerAddressPopup.svelte';
	import { serverModalOpen } from '$lib/stores/serverModal';
	import { initSound, soundManager } from '$lib/utils/sound';

	let { children } = $props();

	onMount(() => {
		initSound();
	});

	let open = $state(false);
	let prevOpen = $state(false);
	$effect(() => {
		const unsub = serverModalOpen.subscribe((v) => {
			open = v;
		});
		return unsub;
	});
	$effect(() => {
		if (open && !prevOpen) soundManager.playSound('popupOpen');
		prevOpen = open;
	});
</script>

<div class="layout-wrap">
	<Waves />
	<Header
		showBackground
		links={[
			{ href: '/', label: 'Home' },
			{ href: '/news', label: 'News' },
			{ href: '/team', label: 'Team' },
			{ href: '/faq', label: 'FAQ' }
		]}
	/>
	<main class="main-content">
		{@render children()}
	</main>
	<div class="footer-wrap">
		<Footer />
	</div>

	<Modal open={open} onclose={() => serverModalOpen.set(false)}>
		<ServerAddressPopup onClose={() => serverModalOpen.set(false)} />
	</Modal>
</div>

<svelte:head>
	{#if true}
		{@const pathname = $page.url.pathname || '/'}
		{@const canonicalUrl = pathname === '/' ? `${baseUrl}/` : `${baseUrl}${pathname}`}
		<link rel="canonical" href={canonicalUrl} />
		<meta name="keywords" content={keywords.join(', ')} />
		<meta name="description" content={description} />
		<meta property="og:description" content={description} />
		<meta property="og:url" content={canonicalUrl} />
		<meta property="og:type" content="website" />
		<meta property="og:site_name" content={title} />
		<meta name="twitter:description" content={description} />
		<title>{title}</title>
		<meta property="og:title" content={title} />
		<meta name="twitter:title" content={title} />
		<meta property="og:image" content={image} />
		<meta name="twitter:image" content={image} />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
</svelte:head>

<style lang="scss">
	@use '$lib/scss/breakpoints' as *;

	.layout-wrap {
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.main-content {
		position: relative;
		z-index: 1;
		flex: 1 0 auto;
		max-width: 1080px;
		width: 100%;
		margin: 0 auto;
		padding: 2rem 1rem;

		@include for-phone-only {
			padding-left: 0.75rem;
			padding-right: 0.75rem;
		}
	}

	.footer-wrap {
		flex-shrink: 0;
	}
</style>

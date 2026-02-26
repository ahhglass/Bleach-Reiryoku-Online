<script lang="ts">
	import { title as siteTitle } from '$lib/data/meta';
	import Hero from '$layout/Hero.svelte';
	import About from '$layout/About.svelte';
</script>

<svelte:head>
	<title>Home — {siteTitle}</title>
</svelte:head>

<div class="container">
	<Hero />
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

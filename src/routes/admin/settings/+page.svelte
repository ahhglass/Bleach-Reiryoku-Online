<script lang="ts">
	import { enhance } from '$app/forms';
	import { sound } from '$lib/utils/sound';
	import type { SiteSettings } from '../../+layout.server';

	interface Props {
		data: {
			admin: { id: string; login: string };
			settings: SiteSettings | null;
		};
		form?: { saveSuccess?: boolean; saveError?: string };
	}

	let { data, form }: Props = $props();

	const s = $derived(data?.settings);
	const site_base_url = $derived(s?.site_base_url ?? 'https://bleach-reiryoku-online.vercel.app/');
	const site_title = $derived(s?.site_title ?? 'BRO');
	const site_description = $derived(s?.site_description ?? 'Bleach Reiryoku Online (BRO) — a Bleach-inspired RPG for Hytale. Soul Reapers, Zanpakuto, and the world of Bleach in your hands.');
	const site_keywords = $derived(s?.site_keywords ?? '["Bleach","Reiryoku","BRO","Hytale","RPG","Bleach Reiryoku Online","Soul Reaper","Zanpakuto"]');
	const site_image = $derived(s?.site_image ?? '');
	const server_ip = $derived(s?.server_ip ?? '76.164.196.197:25565');
	const hero_title = $derived(s?.hero_title ?? 'A Bleach-inspired RPG built for Hytale');
	const hero_subtitle = $derived(s?.hero_subtitle ?? 'In Development - Reiryoku Team Bleach RPG for launch');
</script>

<svelte:head>
	<title>Settings — Admin</title>
</svelte:head>

<div class="page-header">
	<h1>Settings</h1>
	<p class="sub">Site meta, hero text, server IP. Used on the main site when set.</p>
	<a href="/admin" class="back-link" use:sound>← Dashboard</a>
</div>

{#if form?.saveSuccess}
	<p class="msg success">Settings saved.</p>
{/if}
{#if form?.saveError}
	<p class="msg error">{form.saveError}</p>
{/if}

<section class="section">
	<form method="POST" action="?/save" class="form" use:enhance>
	<section class="block">
		<h2>Meta</h2>
		<div class="row">
			<label for="site_base_url">Site base URL</label>
			<input id="site_base_url" name="site_base_url" type="url" value={site_base_url} />
		</div>
		<div class="row">
			<label for="site_title">Site title (e.g. BRO)</label>
			<input id="site_title" name="site_title" type="text" value={site_title} />
		</div>
		<div class="row">
			<label for="site_description">Meta description</label>
			<textarea id="site_description" name="site_description" rows="2">{site_description}</textarea>
		</div>
		<div class="row">
			<label for="site_keywords">Keywords (JSON array)</label>
			<textarea id="site_keywords" name="site_keywords" rows="2">{site_keywords}</textarea>
		</div>
		<div class="row">
			<label for="site_image">Default og:image URL</label>
			<input id="site_image" name="site_image" type="text" value={site_image} placeholder="https://... or /images/site-preview.png" />
		</div>
	</section>
	<section class="block">
		<h2>Server</h2>
		<div class="row">
			<label for="server_ip">Server IP (Play Now modal)</label>
			<input id="server_ip" name="server_ip" type="text" value={server_ip} placeholder="76.164.196.197:25565" />
		</div>
	</section>
	<section class="block">
		<h2>Hero (home page)</h2>
		<div class="row">
			<label for="hero_title">Hero title</label>
			<input id="hero_title" name="hero_title" type="text" value={hero_title} />
		</div>
		<div class="row">
			<label for="hero_subtitle">Hero subtitle</label>
			<input id="hero_subtitle" name="hero_subtitle" type="text" value={hero_subtitle} />
		</div>
	</section>
	<button type="submit" class="btn primary" use:sound>Save settings</button>
	</form>
</section>

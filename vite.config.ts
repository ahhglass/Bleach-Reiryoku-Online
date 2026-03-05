import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		// Allow Rollup to resolve @vercel/analytics/sveltekit (package exports only "svelte" condition)
		conditions: ['svelte', 'import', 'module', 'browser', 'default']
	}
});

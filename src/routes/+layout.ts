import { dev, browser } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit';

if (browser) {
	injectAnalytics({ mode: dev ? 'development' : 'production' });
}

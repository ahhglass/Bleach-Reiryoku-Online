import { siteBaseUrl } from '$lib/data/meta';

export const prerender = true;

export async function GET() {
	const base = siteBaseUrl.replace(/\/$/, '');
	const body = `# Allow crawling everything by default
User-agent: *
Allow: /

# Sitemap
Sitemap: ${base}/sitemap.xml
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=86400'
		}
	});
}

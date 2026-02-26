import { filteredNews } from '$lib/data/news-posts';
import { siteBaseUrl } from '$lib/data/meta';

export const prerender = true;

function escapeXml(unsafe: string): string {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export async function GET() {
	const base = siteBaseUrl.replace(/\/$/, '');
	const staticPages = [
		{ url: `${base}/`, priority: '1.0', changefreq: 'weekly' as const },
		{ url: `${base}/news`, priority: '0.9', changefreq: 'daily' as const },
		{ url: `${base}/team`, priority: '0.8', changefreq: 'monthly' as const },
		{ url: `${base}/faq`, priority: '0.8', changefreq: 'monthly' as const }
	];
	const newsPages = filteredNews.map((p) => ({
		url: `${base}/news/${escapeXml(p.slug)}`,
		priority: '0.7',
		changefreq: 'monthly' as const,
		lastmod: p.updated ?? p.date
	}));

	const urls = [
		...staticPages.map(
			(u) =>
				`  <url>\n    <loc>${escapeXml(u.url)}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
		),
		...newsPages.map(
			(u) =>
				`  <url>\n    <loc>${escapeXml(u.url)}</loc>\n    <lastmod>${new Date(u.lastmod).toISOString().slice(0, 10)}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
		)
	].join('\n');

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}

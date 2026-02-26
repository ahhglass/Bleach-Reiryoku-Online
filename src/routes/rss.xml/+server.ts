import { filteredNews } from '$lib/data/news-posts';
import { siteBaseUrl, title as siteTitle, description } from '$lib/data/meta';

function escapeXml(unsafe: string): string {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function toRfc822Date(dateStr: string): string {
	const d = new Date(dateStr);
	return d.toUTCString();
}

export async function GET() {
	const base = siteBaseUrl.replace(/\/$/, '');
	const posts = filteredNews.slice(0, 20);

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)} — News</title>
    <link>${base}/news</link>
    <description>${escapeXml(description)}</description>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml"/>
${posts
	.map(
		(p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${base}/news/${escapeXml(p.slug)}</link>
      <description>${escapeXml(p.excerpt || '')}</description>
      <pubDate>${toRfc822Date(p.date)}</pubDate>
      <guid isPermaLink="true">${base}/news/${escapeXml(p.slug)}</guid>
    </item>`
	)
	.join('\n')}
  </channel>
</rss>`;

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}

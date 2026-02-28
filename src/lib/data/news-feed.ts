/**
 * Minimal Supabase query for RSS/sitemap. Server-only.
 * Needs: PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (e.g. Vercel env).
 */
import { getSupabaseServer } from '$lib/supabaseServer';

export type NewsFeedItem = { slug: string; title: string; date: string; excerpt: string; updated?: string | null };

export async function getNewsFeedItems(limit = 50): Promise<NewsFeedItem[]> {
	try {
		const supabase = getSupabaseServer();
		const { data, error } = await supabase
			.from('news_posts')
			.select('slug, title, date, updated, excerpt')
			.eq('hidden', false)
			.order('date', { ascending: false })
			.limit(limit);
		if (error || !data?.length) return [];
		return data as NewsFeedItem[];
	} catch {
		return [];
	}
}

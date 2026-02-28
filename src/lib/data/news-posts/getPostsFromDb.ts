import { getSupabaseServer } from '$lib/supabaseServer';
import { rowToPost, getRelatedFromRows, type NewsRow } from '$lib/data/news-posts/fromSupabase';
import type { NewsPost } from '$lib/utils/types';

/** Fetch public news posts from Supabase (non-hidden, newest first). Returns null on error or empty. */
export async function getPostsFromDb(): Promise<NewsPost[] | null> {
	try {
		const supabase = getSupabaseServer();
		const { data, error } = await supabase
			.from('news_posts')
			.select('slug, title, date, updated, excerpt, body, cover_image, tags, hidden')
			.eq('hidden', false)
			.order('date', { ascending: false });
		if (error || !data?.length) return null;
		const rows = data as NewsRow[];
		return rows.map((r) => rowToPost(r, getRelatedFromRows(rows, r)));
	} catch {
		return null;
	}
}

import { error, redirect } from '@sveltejs/kit';
import { filteredNews, getPostsFromDb } from '$lib/data/news-posts';
import type { NewsPost } from '$lib/utils/types';

const PER_PAGE = 6;

export async function load({ url }: { url: URL }) {
	const pathname = url.pathname.replace(/\/$/, '');
	const segment = pathname === '/news' ? '' : pathname.replace(/^\/news\/?/, '').split('/')[0] ?? '';

	if (segment) {
		const dbPosts = await getPostsFromDb();
		if (dbPosts) {
			const post = dbPosts.find((p) => p.slug === segment);
			if (post) return { post, posts: undefined as NewsPost[] | undefined };
		}
		const post = filteredNews.find((p) => p.slug === segment);
		if (!post) throw error(404, 'News not found');
		return { post, posts: undefined as NewsPost[] | undefined };
	}

	// List: try DB first, then file-based
	let posts: NewsPost[];
	const dbPosts = await getPostsFromDb();
	if (dbPosts?.length) {
		posts = dbPosts;
	} else {
		posts = filteredNews;
	}

	const pageParam = url.searchParams.get('page');
	const rawPage = parseInt(pageParam ?? '1', 10);
	const currentPage = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
	const totalPosts = posts.length;
	const totalPages = Math.max(1, Math.ceil(totalPosts / PER_PAGE));

	if (currentPage > totalPages && totalPages >= 1) {
		const target = totalPages === 1 ? '/news' : `/news?page=${totalPages}`;
		throw redirect(302, target);
	}

	const start = (currentPage - 1) * PER_PAGE;
	const pagePosts = posts.slice(start, start + PER_PAGE);

	return {
		post: undefined,
		posts: pagePosts,
		totalPosts,
		totalPages,
		currentPage
	};
}

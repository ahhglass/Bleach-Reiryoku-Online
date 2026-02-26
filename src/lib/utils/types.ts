export type NewsPost = {
	slug: string;
	title: string;
	date: string;
	updated?: string;
	excerpt: string;
	html: string | undefined;
	readingTime: string;
	relatedPosts: NewsPost[];
	coverImage?: string;
	tags?: string[];
	keywords?: string[];
	hidden?: boolean;
};

import type { PageServerLoad } from './$types';
import { faqItems, faqTags } from '$lib/data/faq';

export const load: PageServerLoad = async () => {
	return {
		items: faqItems,
		tags: faqTags
	};
};

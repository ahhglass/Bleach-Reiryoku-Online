import type { PageServerLoad } from './$types';
import { teamSections } from '$lib/data/team';

export const load: PageServerLoad = async () => {
	return {
		sections: teamSections
	};
};

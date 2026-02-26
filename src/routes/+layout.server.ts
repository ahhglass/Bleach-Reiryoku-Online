import type { LayoutServerLoad } from './$types';
import { getSupabaseServer } from '$lib/supabaseServer';

export type SiteSettings = {
	site_base_url: string;
	site_title: string;
	site_description: string;
	site_keywords: string;
	site_image: string;
	server_ip: string;
	hero_title: string;
	hero_subtitle: string;
};

export const load: LayoutServerLoad = async () => {
	try {
		const supabase = getSupabaseServer();
		const { data, error } = await supabase.from('site_settings').select('key, value');
		if (error || !data?.length) {
			return { settings: null };
		}
		const map = Object.fromEntries((data as { key: string; value: string }[]).map((r) => [r.key, r.value]));
		const settings: SiteSettings = {
			site_base_url: map.site_base_url ?? '',
			site_title: map.site_title ?? '',
			site_description: map.site_description ?? '',
			site_keywords: map.site_keywords ?? '[]',
			site_image: map.site_image ?? '',
			server_ip: map.server_ip ?? '',
			hero_title: map.hero_title ?? '',
			hero_subtitle: map.hero_subtitle ?? ''
		};
		return { settings };
	} catch {
		return { settings: null };
	}
};

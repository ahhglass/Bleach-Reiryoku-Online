import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getSupabaseServer } from '$lib/supabaseServer';
import type { SiteSettings } from '../../+layout.server';

export const load: PageServerLoad = async () => {
	try {
		const supabase = getSupabaseServer();
		const { data, error } = await supabase.from('site_settings').select('key, value');
		if (error || !data?.length) {
			return { settings: null as SiteSettings | null };
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

export const actions: Actions = {
	save: async ({ request }) => {
		const form = await request.formData();
		const supabase = getSupabaseServer();
		const keys = [
			'site_base_url',
			'site_title',
			'site_description',
			'site_keywords',
			'site_image',
			'server_ip',
			'hero_title',
			'hero_subtitle'
		] as const;
		const now = new Date().toISOString();
		for (const key of keys) {
			const value = String(form.get(key) ?? '').trim();
			const { error } = await supabase
				.from('site_settings')
				.upsert({ key, value, updated_at: now }, { onConflict: 'key' });
			if (error) {
				return fail(500, { saveError: error.message });
			}
		}
		return { saveSuccess: true };
	}
};

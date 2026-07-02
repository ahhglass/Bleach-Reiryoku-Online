import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env as publicEnv } from '$env/dynamic/public';
import { env } from '$env/dynamic/private';

/** Lightweight Supabase ping so the free-tier project stays active (Vercel Cron). */
export const GET: RequestHandler = async ({ request }) => {
	const cronSecret = env.CRON_SECRET?.trim();
	if (cronSecret) {
		const auth = request.headers.get('authorization');
		if (auth !== `Bearer ${cronSecret}`) {
			return json({ error: 'Unauthorized' }, { status: 401 });
		}
	}

	const rawUrl =
		publicEnv.PUBLIC_SUPABASE_URL ||
		env.SUPABASE_URL ||
		env.NEXT_PUBLIC_SUPABASE_URL;
	const url = rawUrl?.trim().replace(/\s+/g, '').replace(/\/+$/, '') || '';

	const key = (
		publicEnv.PUBLIC_SUPABASE_ANON_KEY ||
		publicEnv.PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
		env.SUPABASE_ANON_KEY ||
		env.SUPABASE_PUBLISHABLE_KEY ||
		env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
		env.NEXT_PUBLIC_PUBLISHABLE_KEY ||
		''
	).trim();

	if (!url || !key) {
		return json(
			{
				error:
					'Missing Supabase URL/key env. Set SUPABASE_URL + SUPABASE_ANON_KEY (or PUBLIC_SUPABASE_* / NEXT_PUBLIC_SUPABASE_*) in Vercel.'
			},
			{ status: 500 }
		);
	}

	try {
		const res = await fetch(`${url}/rest/v1/site_settings?select=key&limit=1`, {
			headers: {
				apikey: key,
				Authorization: `Bearer ${key}`
			}
		});

		if (!res.ok) {
			return json({ ok: false, supabaseStatus: res.status }, { status: 502 });
		}

		return json({ ok: true, at: new Date().toISOString() });
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		return json({ ok: false, error: message }, { status: 502 });
	}
};

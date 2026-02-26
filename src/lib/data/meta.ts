// Base values for meta tags and dynamic <title>.
// Used in +layout.svelte and in pages via <svelte:head>.

export const siteBaseUrl = 'https://bleach-reiryoku-online.vercel.app/';

export const keywords = [
	'Bleach',
	'Reiryoku',
	'BRO',
	'Hytale',
	'RPG',
	'Bleach Reiryoku Online',
	'Soul Reaper',
	'Zanpakuto'
];

export const description =
	'Bleach Reiryoku Online (BRO) — a Bleach-inspired RPG for Hytale. Soul Reapers, Zanpakuto, and the world of Bleach in your hands.';

/** Site name (used as suffix in page titles, e.g. "Home — BRO") */
export const title = 'BRO';

export const image = `${siteBaseUrl}images/site-preview.png`;

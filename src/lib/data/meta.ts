// Fallbacks when site_settings from DB are empty. Prefer DB (Admin → Settings).
/** Base URL when DB site_base_url is empty (canonical, og:url, sitemap). */
export const siteBaseUrl = 'https://bleach-reiryoku-online.vercel.app/';

// export const keywords = ['Bleach','Reiryoku','BRO','Hytale','RPG','Bleach Reiryoku Online','Soul Reaper','Zanpakuto'];
export const keywords: string[] = [];

// export const description = 'Bleach Reiryoku Online (BRO) — a Bleach-inspired RPG for Hytale. Soul Reapers, Zanpakuto, and the world of Bleach in your hands.';
export const description = '';

/** Site name (used as suffix in page titles when no DB) */
// export const title = 'BRO';
export const title = '';

// export const image = `${siteBaseUrl}images/site-preview.png`;
export const image = '';

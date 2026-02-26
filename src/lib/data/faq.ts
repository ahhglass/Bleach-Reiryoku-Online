/**
 * FAQ page data.
 * Edit this file to add or change questions and answers.
 */

export interface FaqItem {
	id: string;
	question: string;
	answer: string;
	tag: string;
}

export const faqItems: FaqItem[] = [
	{
		id: 'what-is',
		question: 'What is Bleach: Reiryoku?',
		answer:
			'Bleach: Reiryoku is a content mod that brings the Bleach universe to Hytale. Become a Soul Reaper: awaken Zanpakuto, craft Shinigami gear, and decorate your world with the spirit of the Gotei 13. Path of the Shinigami is the first path implemented — you wield an Asauchi and evolve it to Shikai and Bankai.',
		tag: 'ABOUT'
	},
	{
		id: 'install',
		question: 'How do I install the mod?',
		answer:
			'Download the mod from CurseForge, place the file in Hytale\'s "mods" folder, then enable the mod in your world settings. After that, start the game and look for new crafting stations and items in the world.',
		tag: 'INSTALLATION'
	},
	{
		id: 'released',
		question: 'Is the mod released yet?',
		answer:
			'The mod is in Early Access and actively developed. New weapons, abilities, and content are added over time. Follow our Discord for updates and playtest opportunities.',
		tag: 'DEVELOPMENT'
	},
	{
		id: 'official',
		question: 'Is this official Bleach or Hytale content?',
		answer:
			'No. This is a fan-made project. Bleach © Tite Kubo, Hytale © Hypixel Studios. We are not affiliated with the license holders.',
		tag: 'ABOUT'
	},
	{
		id: 'zanpakuto',
		question: 'What Zanpakuto or weapons are in the mod?',
		answer:
			'Currently: Asauchi, sealed Zangetsu, sealed Nozarashi (Kenpachi\'s blade), Shikai Zangetsu (Getsuga Tensho), Bankai Tensa Zangetsu, Sode no Shirayuki, Wabisuke, Hozukimaru (WIP), and the Quincy bow Kojaku. More are planned.',
		tag: 'WEAPONS'
	},
	{
		id: 'combat',
		question: 'What combat abilities are there?',
		answer:
			'Getsuga Tensho (Zangetsu), Hakuren (Sode no Shirayuki), Shunpo (Guard + F with Zanpakuto in Shikai/Bankai), Wabisuke weight-doubling, Skull Crusher and Battle Trance (Nozarashi), guard/parry, Hirenkyaku and Ōkami Ya for Quincy. More signature moves are planned.',
		tag: 'COMBAT'
	},
	{
		id: 'crafting',
		question: 'How do I awaken or evolve my Zanpakuto?',
		answer:
			'Use the Soul Imprinting Altar to merge your soul with an Asauchi. Reiryoku Crystals and Resonating Reishi Cores are used to awaken and evolve blades (e.g. to Shikai and Bankai). Transcendent Essence is for ultimate forms.',
		tag: 'CRAFTING'
	},
	{
		id: 'future',
		question: 'What is planned for the future?',
		answer:
			'More Zanpakuto and signature attacks, additional weapon types (Quincy, Arrancar), Kido system, more armor and clothing, custom mobs and encounters, improved animations and VFX, and more furniture and decorations.',
		tag: 'UPDATES'
	}
];

/** All unique tags for the FAQ filter */
export const faqTags = [...new Set(faqItems.map((item) => item.tag))].sort();

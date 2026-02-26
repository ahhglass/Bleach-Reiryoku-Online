/**
 * Team page data.
 *
 * How to edit:
 * - Add/remove member: edit the members array in the desired section.
 * - Add section: copy an object with id, title and members into teamSections.
 * - Avatar: place image in static/images/team/ and set avatar: '/images/team/filename.png'.
 *   If avatar is omitted, name initials are shown.
 */

/** Social link type for icon selection */
export type TeamMemberSocialType = 'telegram' | 'github' | 'x' | 'discord' | 'email' | 'linkedin';

export interface TeamMemberSocial {
	url: string;
	type: TeamMemberSocialType;
	label?: string;
}

export interface TeamMember {
	name: string;
	role: string;
	description?: string;
	avatar?: string;
	tags: string[];
	/** Optional social links; icons appear on card hover */
	socials?: TeamMemberSocial[];
}

export interface TeamSection {
	id: string;
	title: string;
	members: TeamMember[];
}

export const teamSections: TeamSection[] = [
	{
		id: 'leadership',
		title: 'Leadership',
		members: [
			{
				name: 'Sora',
				role: 'Project Lead & Developer',
				description: 'Placeholder',
				tags: ['Lead', 'Development', 'Vision'],
				avatar: '/images/posts/placeholder-1.webp',
				// avatar: '/images/team/sora.webp'
				socials: [
					{ url: 'https://t.me/example', type: 'telegram', label: 'Telegram' },
					{ url: 'https://github.com/example', type: 'github', label: 'GitHub' },
					{ url: 'https://x.com/example', type: 'x', label: 'X' }
				]
			},
			{
				name: 'Tsu',
				role: 'Community & Marketing Lead',
				description: 'Placeholder',
				tags: ['Lead', 'Marketing', 'Management'],
				avatar: '/images/posts/placeholder-1.webp',
				// avatar: '/images/team/tsu.webp'
				socials: [
					{ url: 'https://t.me/example', type: 'telegram', label: 'Telegram' },
					{ url: 'https://github.com/example', type: 'github', label: 'GitHub' },
					{ url: 'https://x.com/example', type: 'x', label: 'X' }
				]
			},
			{
				name: 'Myst',
				role: 'Operations & Manager',
				description: 'Placeholder',
				tags: ['Lead', 'Finance', 'Development'],
				avatar: '/images/posts/placeholder-1.webp',
				// avatar: '/images/team/myst.webp'
				socials: [
					{ url: 'https://t.me/example', type: 'telegram', label: 'Telegram' },
					{ url: 'https://github.com/example', type: 'github', label: 'GitHub' },
					{ url: 'https://x.com/example', type: 'x', label: 'X' }
				]
			}
		]
	},
	{
		id: 'administration',
		title: 'Administration',
		members: [
			{
				name: 'Placeholder',
				role: 'Administrator',
				tags: ['Admin'],
				avatar: '/images/posts/placeholder-1.webp',
				// avatar: '/images/team/avatar.webp',
				socials: [
					{ url: 'https://t.me/example', type: 'telegram', label: 'Telegram' },
					{ url: 'https://github.com/example', type: 'github', label: 'GitHub' },
					{ url: 'https://x.com/example', type: 'x', label: 'X' }
				]
			}
		]
	},
	{
		id: 'development',
		title: 'Development',
		members: [
			{
				name: 'Jaykov',
				role: 'Software Engineer',
				description: 'Development',
				tags: ['Developer', 'Systems'],
				avatar: '/images/posts/placeholder-1.webp',
				// avatar: '/images/team/jaykov.webp',
				socials: [
					{ url: 'https://t.me/example', type: 'telegram', label: 'Telegram' },
					{ url: 'https://github.com/example', type: 'github', label: 'GitHub' },
					{ url: 'https://x.com/example', type: 'x', label: 'X' }
				]
			},
			{
				name: 'Shunsui',
				role: 'Development',
				description: 'Development website',
				tags: ['Developer', 'Backend'],
				// avatar: '/images/posts/placeholder-1.webp',
				avatar: '/images/team/shunsui.webp',
				socials: [
					{ url: 'https://t.me/example', type: 'telegram', label: 'Telegram' },
					{ url: 'https://github.com/example', type: 'github', label: 'GitHub' }
				]
			}
		]
	},
	{
		id: 'early-supporters',
		title: 'Early Supporters',
		members: [
			{
				name: 'Alba',
				role: 'Assets',
				description: 'Shinigami',
				tags: ['Assets', '3D Models'],
				avatar: '/images/posts/placeholder-1.webp',
				// avatar: '/images/team/alba.webp',
				socials: [
					{ url: 'https://t.me/example', type: 'telegram', label: 'Telegram' },
					{ url: 'https://github.com/example', type: 'github', label: 'GitHub' },
					{ url: 'https://x.com/example', type: 'x', label: 'X' }
				]
			},
			{
				name: 'BenSmash',
				role: 'Assets',
				description: 'The blind Shinigami',
				tags: ['Assets', '3D Models'],
				avatar: '/images/posts/placeholder-1.webp',
				// avatar: '/images/team/bensmash.webp',
				socials: [
					{ url: 'https://t.me/example', type: 'telegram', label: 'Telegram' },
					{ url: 'https://github.com/example', type: 'github', label: 'GitHub' },
					{ url: 'https://x.com/example', type: 'x', label: 'X' }
				]
			},
			{
				name: 'Gourmet',
				role: 'Assets',
				description: 'Fuck Ichigo',
				tags: ['Assets', '3D Models'],
				avatar: '/images/posts/placeholder-1.webp',
				// avatar: '/images/team/gourmet.webp',
				socials: [
					{ url: 'https://t.me/example', type: 'telegram', label: 'Telegram' },
					{ url: 'https://github.com/example', type: 'github', label: 'GitHub' },
					{ url: 'https://x.com/example', type: 'x', label: 'X' }
				]
			},
			{
				name: 'Placeholder',
				role: 'Assets',
				description: 'The Wandering Shinigami',
				tags: ['Assets', '3D Models'],
				avatar: '/images/posts/placeholder-1.webp',
				// avatar: '/images/team/avatar.webp',
				socials: [
					{ url: 'https://t.me/example', type: 'telegram', label: 'Telegram' },
					{ url: 'https://github.com/example', type: 'github', label: 'GitHub' },
					{ url: 'https://x.com/example', type: 'x', label: 'X' }
				]
			}
		]
	}
];

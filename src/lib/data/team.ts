/**
 * Team page data.
 *
 * How to edit:
 * - Add/remove member: edit the members array in the desired section.
 * - Add section: copy an object with id, title and members into teamSections.
 * - Avatar: place image in static/images/team/ and set avatar: '/images/team/filename.png'.
 *   If avatar is omitted, name initials are shown.
 */

export interface TeamMember {
	name: string;
	role: string;
	description?: string;
	avatar?: string;
	tags: string[];
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
				avatar: '/images/posts/placeholder-1.webp'
				// avatar: '/images/team/sora.webp'
			},
			{
				name: 'Tsu',
				role: 'Community & Marketing Lead',
				description: 'Placeholder',
				tags: ['Lead', 'Marketing', 'Management'],
				avatar: '/images/posts/placeholder-1.webp'
				// avatar: '/images/team/tsu.webp'
			},
			{
				name: 'Myst',
				role: 'Operations & Manager',
				description: 'Placeholder',
				tags: ['Lead', 'Finance', 'Development'],
				avatar: '/images/posts/placeholder-1.webp'
				// avatar: '/images/team/myst.webp'
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
				avatar: '/images/posts/placeholder-1.webp'
				// avatar: '/images/team/avatar.webp'
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
				avatar: '/images/posts/placeholder-1.webp'
				// avatar: '/images/team/jaykov.webp'
			},
			{
				name: 'Shunsui',
				role: 'Development',
				description: 'Development website',
				tags: ['Developer', 'Backend'],
				avatar: '/images/posts/placeholder-1.webp'
				// avatar: '/images/team/shunsui.webp'
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
				avatar: '/images/posts/placeholder-1.webp'
				// avatar: '/images/team/alba.webp'
			},
			{
				name: 'BenSmash',
				role: 'Assets',
				description: 'The blind Shinigami',
				tags: ['Assets', '3D Models'],
				avatar: '/images/posts/placeholder-1.webp'
				// avatar: '/images/team/bensmash.webp'
			},
			{
				name: 'Gourmet',
				role: 'Assets',
				description: 'Fuck Ichigo',
				tags: ['Assets', '3D Models'],
				avatar: '/images/posts/placeholder-1.webp'
				// avatar: '/images/team/gourmet.webp'
			},
			{
				name: 'Placeholder',
				role: 'Assets',
				description: 'The Wandering Shinigami',
				tags: ['Assets', '3D Models'],
				avatar: '/images/posts/placeholder-1.webp'
				// avatar: '/images/team/avatar.webp'
			}
		]
	}
];

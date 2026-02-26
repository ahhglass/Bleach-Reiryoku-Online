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
				avatar: 'https://placehold.co/400x600/b0b0b0/ffffff.webp?text=400%20x%20600&font=inter'
			},
			{
				name: 'Tsu',
				role: 'Community & Marketing Lead',
				description: 'Placeholder',
				tags: ['Lead', 'Marketing', 'Management'],
				avatar: 'https://placehold.co/400x600/b0b0b0/ffffff.webp?text=400%20x%20600&font=inter'
			},
			{
				name: 'Myst',
				role: 'Operations & Manager',
				description: 'Placeholder',
				tags: ['Lead', 'Finance', 'Development'],
				avatar: 'https://placehold.co/400x600/b0b0b0/ffffff.webp?text=400%20x%20600&font=inter'
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
				avatar: 'https://placehold.co/400x600/b0b0b0/ffffff.webp?text=400%20x%20600&font=inter'
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
				avatar: 'https://placehold.co/400x600/b0b0b0/ffffff.webp?text=400%20x%20600&font=inter'
			},
			{
				name: 'Shunsui',
				role: 'Development',
				description: 'Development website',
				tags: ['Developer', 'Backend'],
				avatar: 'https://placehold.co/400x600/b0b0b0/ffffff.webp?text=400%20x%20600&font=inter'
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
				avatar: 'https://placehold.co/400x600/b0b0b0/ffffff.webp?text=400%20x%20600&font=inter'
			},
			{
				name: 'BenSmash',
				role: 'Assets',
				description: 'The blind Shinigami',
				tags: ['Assets', '3D Models'],
				avatar: 'https://placehold.co/400x600/b0b0b0/ffffff.webp?text=400%20x%20600&font=inter'
			},
			{
				name: 'Gourmet',
				role: 'Assets',
				description: 'Fuck Ichigo',
				tags: ['Assets', '3D Models'],
				avatar: 'https://placehold.co/400x600/b0b0b0/ffffff.webp?text=400%20x%20600&font=inter'
			},
			{
				name: 'Placeholder',
				role: 'Assets',
				description: 'The Wandering Shinigami',
				tags: ['Assets', '3D Models'],
				avatar: 'https://placehold.co/400x600/b0b0b0/ffffff.webp?text=400%20x%20600&font=inter'
			}
		]
	}
];

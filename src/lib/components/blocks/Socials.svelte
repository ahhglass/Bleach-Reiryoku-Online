<script lang="ts">
	import TelegramIcon from '$lib/icons/telegram.svelte';
	import GitHubIcon from '$lib/icons/github.svelte';
	import LinkedInIcon from '$lib/icons/linkedin.svelte';
	import EmailIcon from '$lib/icons/email.svelte';
	import X from '$lib/icons/x.svelte';
	import DiscordIcon from '$lib/icons/discord.svelte';
	import MastodonIcon from '$lib/icons/mastodon.svelte';
	import LinkIcon from '$lib/icons/link.svelte';
	import { sound } from '$lib/utils/sound';
	import type { SocialLinkItem } from '$lib/utils/types';

	interface Props {
		/** From Admin → Settings (social_links JSON). */
		items?: SocialLinkItem[];
	}
	let { items = [] }: Props = $props();

	const iconMap: Record<string, typeof TelegramIcon> = {
		telegram: TelegramIcon,
		x: X,
		github: GitHubIcon,
		email: EmailIcon,
		linkedin: LinkedInIcon,
		discord: DiscordIcon,
		mastodon: MastodonIcon,
		link: LinkIcon
	};
	function href(url: string): string {
		const u = url.trim();
		if (u.startsWith('mailto:')) return u;
		if (u && !/^https?:\/\//i.test(u)) return 'mailto:' + u;
		return u;
	}
</script>

<div class="socials">
	{#each items as item}
		{#if item.url?.trim()}
			{@const Icon = iconMap[item.icon] ?? LinkIcon}
			<a
				href={href(item.url)}
				target="_blank"
				rel="noopener noreferrer"
				title={item.label || item.icon}
				use:sound
			>
				<Icon />
			</a>
		{/if}
	{/each}
</div>

<style lang="scss">
	.socials {
		display: flex;
		align-items: center;
		gap: 20px;

		a {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 24px;
			height: 24px;
			transition: all 0.2s ease-in-out;
			color: var(--color--text);
			fill: var(--color--text);

			&:hover {
				color: var(--color--primary);
				fill: var(--color--primary);
				filter: drop-shadow(0px 0px 3px var(--color--primary));
			}
		}
	}
</style>

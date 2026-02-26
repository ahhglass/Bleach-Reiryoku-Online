<script lang="ts">
	import TelegramIcon from '$lib/icons/telegram.svelte';
	import GitHubIcon from '$lib/icons/github.svelte';
	import LinkedInIcon from '$lib/icons/linkedin.svelte';
	import EmailIcon from '$lib/icons/email.svelte';
	import X from '$lib/icons/x.svelte';
</script>

<div class="socials">
	<a href="#" target="_blank" rel="noopener noreferrer" title="Telegram">
		<TelegramIcon />
	</a>
	<a href="#" target="_blank" rel="me noreferrer" title="X">
		<X />
	</a>
	<a href="#" target="_blank" rel="noopener noreferrer" title="GitHub profile">
		<GitHubIcon />
	</a>
	<!-- <a href="#" target="_blank" rel="noopener noreferrer" title="Connect on LinkedIn">
		<LinkedInIcon />
	</a> -->
	<a href="#" target="_blank" rel="noopener noreferrer" title="Send an email">
		<EmailIcon />
	</a>
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

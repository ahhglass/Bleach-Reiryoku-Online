<script lang="ts">
	import FooterWave from '$lib/icons/footer-wave.svelte';
	import Socials from '$blocks/Socials.svelte';
	import ThemeToggle from '$blocks/ThemeToggle.svelte';
	import RssLink from '$ui/RssLink.svelte';
</script>

<footer>
	<div class="wave">
		<FooterWave />
	</div>
	<div class="content">
		<div class="copyright">
			This website was built by
			<a href="https://discord.gg/upnNsnvPyf" target="_blank" rel="noopener noreferrer"
				>Reiryoku Team</a
			>.
		</div>
		<div class="credits">
			Powered by
			<a href="https://kit.svelte.dev/" target="_blank" rel="noopener noreferrer">SvelteKit</a>. Icons
			by
			<a href="https://iconoir.com/" target="_blank" rel="noopener noreferrer">Iconoir</a>.
		</div>
		<div id="socials" class="socials">
			<Socials />
			<RssLink />
			<ThemeToggle />
		</div>
	</div>
</footer>

<style lang="scss">
	@use '$lib/scss/breakpoints' as *;
	@use '$lib/scss/fluid' as *;

	footer {
		position: relative;
		z-index: 2;
		min-height: 280px;
		width: 100%;
		background: linear-gradient(60deg, var(--color--waves-start) 0%, var(--color--waves-end) 100%);
		display: grid;
		grid-template-rows: 120px 1fr;

		a {
			&:hover {
				filter: drop-shadow(0px 0px 3px var(--color--primary));
			}
		}

		@include for-phone-only {
			min-height: 240px;
			grid-template-rows: 80px 1fr;
		}

		@include for-iphone-se {
			min-height: 220px;
			grid-template-rows: 70px 1fr;
		}
	}

	.wave {
		overflow: hidden;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 15px;
		font-weight: 600;
		text-align: center;
		padding: 0 1rem 1.5rem;
		box-sizing: border-box;

		@include for-phone-only {
			gap: 10px;
			padding: 0 0.75rem 1.25rem;
		}

		@include for-iphone-se {
			gap: 8px;
			padding: 0 0.5rem 1rem;
		}
	}

	.copyright,
	.credits {
		max-width: 100%;
		word-break: break-word;
		overflow-wrap: break-word;
		@include fluid-text(0.875rem, 1rem);
		line-height: 1.45;
	}

	.copyright {
		@include for-phone-only {
			font-size: 0.8125rem;
		}

		@include for-iphone-se {
			font-size: 0.75rem;
		}
	}

	.credits {
		font-weight: 400;
		font-size: 90%;
		color: var(--color--text-shade);

		@include for-phone-only {
			font-size: 0.8125rem;
		}

		@include for-iphone-se {
			font-size: 0.75rem;
		}
	}

	.socials {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 20px;

		@include for-phone-only {
			gap: 14px;
		}

		@include for-iphone-se {
			gap: 12px;
		}
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import Logo from '$ui/Logo.svelte';
	import ThemeToggle from '$blocks/ThemeToggle.svelte';

	interface NavLink {
		href: string;
		label: string;
	}

	interface Props {
		showBackground?: boolean;
		links?: NavLink[];
	}

	let { showBackground = false, links = [] }: Props = $props();

	const navLinks = $derived(links.length > 0 ? links : [{ href: '/', label: 'Home' }]);

	let mobileOpen = $state(false);

	function toggleMobile() {
		mobileOpen = !mobileOpen;
	}

	function closeMobile() {
		mobileOpen = false;
	}

	function handleMobileNavClick(e: MouseEvent, href: string) {
		e.preventDefault();
		goto(href);
		closeMobile();
	}

	onMount(() => {
		if (!browser) return;
		return () => {
			document.body.style.overflow = '';
		};
	});

	$effect(() => {
		if (!browser || typeof document === 'undefined') return;
		document.body.style.overflow = mobileOpen ? 'hidden' : '';
	});

	$effect(() => {
		if (!browser || !mobileOpen || typeof window === 'undefined') return;
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeMobile();
		};
		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	});
</script>

<header class="header" class:has-background={showBackground}>
	<nav class="container" aria-label="Main navigation">
		<a class="logo" href="/" aria-label="Site logo">
			<Logo />
		</a>

		<div class="links">
			{#each navLinks as item}
				<a href={item.href} onclick={closeMobile}>{item.label}</a>
			{/each}
			<ThemeToggle />
		</div>

		<button
			type="button"
			class="menu-toggle"
			aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={mobileOpen}
			onclick={toggleMobile}
		>
			<span class="menu-icon" class:open={mobileOpen} aria-hidden="true">
				<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5">
					<path d="M3 5H21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M3 12H21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M3 19H21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</span>
			<span class="close-icon" class:open={mobileOpen} aria-hidden="true">
				<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5">
					<path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</span>
		</button>
	</nav>

	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="mobile-overlay"
		class:open={mobileOpen}
		role="dialog"
		aria-modal="true"
		aria-label="Mobile menu"
		aria-hidden={!mobileOpen}
		onclick={(e) => e.target === e.currentTarget && closeMobile()}
	>
		<div class="mobile-panel" role="presentation" onclick={(e) => e.stopPropagation()}>
			<nav class="mobile-nav" aria-label="Mobile navigation">
				{#each navLinks as item}
					<a href={item.href} onclick={(e) => handleMobileNavClick(e, item.href)}>{item.label}</a>
				{/each}
				<div class="mobile-nav-theme">
					<ThemeToggle />
				</div>
			</nav>
		</div>
	</div>
</header>

<style lang="scss">
	@use '$lib/scss/breakpoints' as *;

	.header {
		color: var(--color--text);
		position: relative;
		padding: 30px 0;
		z-index: 100;

		@include for-phone-only {
			padding: 20px 0;
		}

		@include for-iphone-se {
			padding: 1rem 0;
		}

		a {
			color: var(--color--text);
		}

		.container {
			display: flex;
			align-items: center;
			gap: 30px;
			max-width: 1080px;
			margin: 0 auto;
			padding: 0 15px;

			@include for-phone-only {
				padding: 0 0.75rem;
			}

			@include for-iphone-se {
				padding: 0 0.5rem;
			}
		}

		.logo {
			height: 44px;
			flex: 1;
			display: block;

			:global(svg) {
				height: 100%;
				width: auto;
			}

			@include for-phone-only {
				height: 38px;
			}
		}

		.links {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			gap: 30px;

			@include for-phone-only {
				display: none !important;
			}

			a {
				text-decoration: none;
				transition: color 0.35s var(--ease-4), filter 0.35s var(--ease-4);

				&:hover {
					color: var(--color--primary);
					filter: drop-shadow(0px 0px 3px var(--color--primary));
				}

				&:active {
					opacity: 0.85;
				}
			}
		}

		.menu-toggle {
			display: none;
			align-items: center;
			justify-content: center;
			width: 2.75rem;
			height: 2.75rem;
			min-width: 2.75rem;
			min-height: 2.75rem;
			padding: 0;
			border: none;
			background: transparent;
			cursor: pointer;
			position: relative;
			color: var(--color--text);
			border-radius: 8px;
			transition: background-color 0.2s ease, color 0.2s ease;

			@include for-phone-only {
				display: flex !important;
			}

			&:hover {
				color: var(--color--primary);
				background: rgba(var(--color--primary-rgb, 199, 21, 83), 0.08);
			}

			&:active {
				background: rgba(var(--color--primary-rgb, 199, 21, 83), 0.12);
			}

			.menu-icon,
			.close-icon {
				position: absolute;
				inset: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: opacity 0.2s var(--ease-4), transform 0.2s var(--ease-4);

				svg {
					width: 1.5rem;
					height: 1.5rem;
				}
			}

			.menu-icon {
				opacity: 1;
				transform: scale(1) rotate(0deg);

				&.open {
					opacity: 0;
					transform: scale(0.8) rotate(-90deg);
					pointer-events: none;
				}
			}

			.close-icon {
				opacity: 0;
				transform: scale(0.8) rotate(90deg);
				pointer-events: none;

				&.open {
					opacity: 1;
					transform: scale(1) rotate(0deg);
					pointer-events: auto;
				}
			}
		}

		.mobile-overlay {
			position: fixed;
			inset: 0;
			z-index: 99;
			background: rgba(0, 0, 0, 0.4);
			backdrop-filter: blur(4px);
			-webkit-backdrop-filter: blur(4px);
			visibility: hidden;
			opacity: 0;
			transition: visibility 0.3s var(--ease-4), opacity 0.3s var(--ease-4);

			@include for-tablet-portrait-up {
				display: none !important;
			}

			&.open {
				visibility: visible;
				opacity: 1;
			}
		}

		.mobile-panel {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			width: min(280px, 85vw);
			background: var(--color--page-background);
			box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
			transform: translateX(100%);
			transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1);
		}

		.mobile-overlay.open .mobile-panel {
			transform: translateX(0);
		}

		.mobile-nav {
			display: flex;
			flex-direction: column;
			gap: 0;
			padding: 5rem 1.25rem 1.5rem;
			height: 100%;
			box-sizing: border-box;

			a {
				display: block;
				text-decoration: none;
				color: var(--color--text);
				font-size: 1.125rem;
				font-weight: 500;
				padding: 0.75rem 0;
				border-bottom: 1px solid var(--color--code-inline-background);
				transition: color 0.2s ease, background-color 0.15s ease;
				word-break: break-word;

				&:hover {
					color: var(--color--primary);
					background: rgba(var(--color--primary-rgb, 199, 21, 83), 0.06);
				}

				&:active {
					background: rgba(var(--color--primary-rgb, 199, 21, 83), 0.1);
				}
			}
		}

		.mobile-nav-theme {
			margin-top: auto;
			padding-top: 1.25rem;
			border-top: 1px solid var(--color--code-inline-background);
		}
	}
</style>

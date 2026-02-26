<script lang="ts">
	import { onMount } from 'svelte';
	import SparklingHighlight from '$blocks/SparklingHighlight.svelte';
	import Socials from '$blocks/Socials.svelte';

	interface Props {
		/** From DB (about_heading). Fallback when empty. */
		aboutHeading?: string;
		/** From DB (about_highlight). Phrase in heading to wrap in sparkle; must match exactly. */
		aboutHighlight?: string;
		/** From DB (about_text). Fallback when empty. */
		aboutText?: string;
		/** From DB (about_image). Fallback when empty. */
		aboutImage?: string;
		/** Legacy: from DB (site_title) when about_heading empty. */
		siteTitle?: string;
		/** Legacy: from DB (site_description) when about_text empty. */
		siteDescription?: string;
		/** From DB (social_links JSON). */
		socialLinks?: import('$lib/utils/types').SocialLinkItem[];
	}
	let {
		aboutHeading = '',
		aboutHighlight = '',
		aboutText = '',
		aboutImage = '',
		siteTitle = '',
		siteDescription = '',
		socialLinks = []
	}: Props = $props();

	const heading = $derived(aboutHeading?.trim() || siteTitle?.trim() || 'About');
	const highlightPhrase = $derived(aboutHighlight?.trim() || '');
	const headingParts = $derived(
		highlightPhrase && heading.includes(highlightPhrase)
			? (() => {
					const i = heading.indexOf(highlightPhrase);
					return [heading.slice(0, i), highlightPhrase, heading.slice(i + highlightPhrase.length)];
				})()
			: null
	);
	const text = $derived(aboutText?.trim() || siteDescription?.trim() || 'Site description is set in Admin → Settings.');
	const aboutImageSrc = $derived(aboutImage?.trim() || '/images/sample-image.webp');
	const aboutImageUrl = $derived(
		aboutImageSrc.startsWith('http') || aboutImageSrc.startsWith('/') ? aboutImageSrc : '/' + aboutImageSrc.replace(/^\//, '')
	);
	let imageRef: HTMLDivElement;
	let inView = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) inView = true;
			},
			{ threshold: 0.2, rootMargin: '0px' }
		);
		if (imageRef) observer.observe(imageRef);
		return () => observer.disconnect();
	});
</script>

<section id="about">
	<div class="info">
		<h2>
			{#if headingParts}
				{headingParts[0]}
				<SparklingHighlight color="secondary">{headingParts[1]}</SparklingHighlight>
				{headingParts[2]}
			{:else}
				<SparklingHighlight color="secondary">{heading}</SparklingHighlight>
			{/if}
		</h2>
		<p>
			{text}
		</p>
		<div class="socials">
			<span>Socials:</span>
			<Socials items={socialLinks} />
		</div>
	</div>
	<div
		class="image {inView ? 'in-view' : ''}"
		bind:this={imageRef}
		style="--about-img: url('{aboutImageUrl}')"
	>
		<div class="glitch-wrap">
			<img src={aboutImageUrl} alt="About" loading="lazy" decoding="async" />
			<span class="glitch glitch-r" aria-hidden="true"></span>
			<span class="glitch glitch-g" aria-hidden="true"></span>
		</div>
	</div>
</section>

<style lang="scss">
	@use '$lib/scss/mixins' as *;
	@use '$lib/scss/fluid' as *;

	#about {
		position: relative;
		display: grid;
		grid-template-columns: 500px 250px;
		align-items: center;
		justify-content: space-between;
		padding: 6em 0 3em 0;
		width: 100%;
		max-width: 1080px;
		margin: 0 auto;

		@include for-phone-only {
			grid-template-columns: 1fr;
			justify-items: center;
			gap: 20px;
		}
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 10px;

		h2 {
			font-family: var(--font--title);
			@include fluid-text(1.25rem, 1.8rem);
			font-weight: 600;
			margin: 0;
			color: var(--color--text);

			@include for-phone-only {
				text-align: center;
			}
		}

		p {
			margin: 0;
			line-height: 1.5;
			color: var(--color--text);
			@include fluid-text(0.9375rem, 1.125rem);

			@include for-phone-only {
				text-align: justify;
			}
		}

		@include for-phone-only {
			gap: 20px;
		}
	}

	.socials {
		display: flex;
		align-items: center;
		gap: 15px;

		@include for-phone-only {
			justify-content: center;
			margin-bottom: 10px;

			span {
				display: none;
			}
		}
	}

	.image {
		width: 220px;
		height: 220px;
		overflow: visible;
		border-radius: 6px;
		transform: translateX(120%);
		opacity: 0;

		&.in-view {
			animation: slide-in-bounce 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
		}

		.glitch-wrap {
			position: relative;
			width: 100%;
			height: 100%;
			overflow: hidden;
			border-radius: 6px;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			display: block;
			position: relative;
			z-index: 1;
			animation: glitch-photo 6s infinite;
		}

		.glitch {
			position: absolute;
			inset: 0;
			background-image: var(--about-img);
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
			pointer-events: none;
			z-index: 0;
			opacity: 0;
		}

		.glitch-r {
			animation: glitch-r 6s infinite;
			mix-blend-mode: screen;
			filter: hue-rotate(90deg);
		}

		.glitch-g {
			animation: glitch-g 6s infinite;
			mix-blend-mode: screen;
			filter: hue-rotate(-90deg);
		}
	}

	@keyframes slide-in-bounce {
		0% {
			transform: translateX(120%);
			opacity: 0;
		}
		60% {
			transform: translateX(-8%);
			opacity: 1;
		}
		80% {
			transform: translateX(4%);
		}
		100% {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes glitch-photo {
		0%, 88%, 92%, 100% {
			transform: translate(0, 0);
			filter: none;
		}
		89% {
			transform: translate(-3px, 1px);
			filter: contrast(1.1);
		}
		90% {
			transform: translate(2px, -2px);
			filter: contrast(1.1);
		}
		91% {
			transform: translate(0, 0);
			filter: none;
		}
	}

	@keyframes glitch-r {
		0%, 88%, 92%, 100% {
			opacity: 0;
			transform: translate(0, 0);
			clip-path: inset(0 0 0 0);
		}
		89% {
			opacity: 0.7;
			transform: translate(4px, -2px);
			clip-path: inset(0 60% 0 0);
		}
		90% {
			opacity: 0.5;
			transform: translate(-3px, 2px);
			clip-path: inset(0 0 0 60%);
		}
		91% {
			opacity: 0;
			transform: translate(0, 0);
			clip-path: inset(0 0 0 0);
		}
	}

	@keyframes glitch-g {
		0%, 88%, 92%, 100% {
			opacity: 0;
			transform: translate(0, 0);
			clip-path: inset(0 0 0 0);
		}
		89% {
			opacity: 0.5;
			transform: translate(-4px, 2px);
			clip-path: inset(0 0 60% 0);
		}
		90% {
			opacity: 0.7;
			transform: translate(3px, -1px);
			clip-path: inset(60% 0 0 0);
		}
		91% {
			opacity: 0;
			transform: translate(0, 0);
			clip-path: inset(0 0 0 0);
		}
	}
</style>

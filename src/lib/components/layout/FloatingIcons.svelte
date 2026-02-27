<script lang="ts">
	import { onMount } from 'svelte';

	// 17 Bleach-themed icons from static/images/floating-icons — icon-1.webp … icon-20.webp
	const ICON_COUNT = 20;
	const ICON_PATHS = Array.from(
		{ length: ICON_COUNT },
		(_, i) => `/images/floating-icons/icon-${i + 1}.webp`
	);

	// Viewport width: mobile 8, tablet 14, desktop 20 (matches _breakpoints.scss)
	const BREAKPOINT_PHONE = 767;
	const BREAKPOINT_DESKTOP = 1201;
	const ICONS_MOBILE = 8;
	const ICONS_TABLET = 14;
	const ICONS_DESKTOP = 20;

	const ICON_SIZE_PX = 64;
	const COLLISION_RADIUS = 28;
	const BOUNDS_PADDING = 24;
	const SPEED = 0.16;
	const LERP_POS = 0.08; // Lerp: 0.06–0.12 — smooth movement, visuals catch up with physics (less = softer)
	const LERP_ROT = 0.1;

	type IconState = {
		x: number;
		y: number;
		vx: number;
		vy: number;
		rotation: number;
		displayX: number;
		displayY: number;
		displayRotation: number;
	};

	function randomIn(min: number, max: number): number {
		return min + Math.random() * (max - min);
	}

	function lerp(a: number, b: number, t: number): number {
		return a + (b - a) * t;
	}

	function getIconCount(viewportWidth: number): number {
		if (viewportWidth <= BREAKPOINT_PHONE) return ICONS_MOBILE;
		if (viewportWidth < BREAKPOINT_DESKTOP) return ICONS_TABLET;
		return ICONS_DESKTOP;
	}

	/** Random set of icon paths (no duplicates), new each time on load/breakpoint change */
	function pickRandomPaths(count: number): string[] {
		const indices = Array.from({ length: ICON_COUNT }, (_, i) => i);
		for (let i = indices.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[indices[i], indices[j]] = [indices[j], indices[i]];
		}
		return indices.slice(0, count).map((i) => ICON_PATHS[i]);
	}

	function initIcons(width: number, height: number, count: number): IconState[] {
		return Array.from({ length: count }, () => {
			const x = randomIn(BOUNDS_PADDING, width - BOUNDS_PADDING);
			const y = randomIn(BOUNDS_PADDING, height - BOUNDS_PADDING);
			const rotation = randomIn(-180, 180);
			return {
				x,
				y,
				vx: randomIn(-SPEED, SPEED),
				vy: randomIn(-SPEED, SPEED),
				rotation,
				displayX: x,
				displayY: y,
				displayRotation: rotation
			};
		});
	}

	function distance(a: IconState, b: IconState): number {
		return Math.hypot(a.x - b.x, a.y - b.y);
	}

	function resolveCollision(a: IconState, b: IconState): void {
		const dx = b.x - a.x;
		const dy = b.y - a.y;
		const dist = Math.hypot(dx, dy);
		if (dist === 0) return;
		const overlap = 2 * COLLISION_RADIUS - dist;
		if (overlap <= 0) return;

		const nx = dx / dist;
		const ny = dy / dist;
		// Push apart
		const half = overlap / 2;
		a.x -= nx * half;
		a.y -= ny * half;
		b.x += nx * half;
		b.y += ny * half;

		// Exchange velocity component along normal (elastic bump)
		const va = a.vx * nx + a.vy * ny;
		const vb = b.vx * nx + b.vy * ny;
		a.vx += (vb - va) * nx;
		a.vy += (vb - va) * ny;
		b.vx += (va - vb) * nx;
		b.vy += (va - vb) * ny;
	}

	let containerEl: HTMLDivElement;
	let icons = $state<IconState[]>([]);
	let visiblePaths = $state<string[]>([]);
	let width = $state(800);
	let height = $state(400);

	onMount(() => {
		const el = containerEl;
		if (!el) return;

		const updateSize = () => {
			const rect = el.getBoundingClientRect();
			width = rect.width > 50 ? rect.width : 800;
			height = rect.height > 50 ? rect.height : 400;
			const vw = typeof window !== 'undefined' ? window.innerWidth : width;
			const count = getIconCount(vw);
			if (visiblePaths.length !== count) {
				visiblePaths = pickRandomPaths(count);
				icons = initIcons(width, height, count);
			}
		};

		updateSize();

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		const observer = new ResizeObserver(updateSize);
		observer.observe(el);

		let rafId = 0;
		const tick = () => {
			const next = icons.map((icon) => ({ ...icon }));

			for (let i = 0; i < next.length; i++) {
				next[i].x += next[i].vx;
				next[i].y += next[i].vy;
				next[i].rotation += next[i].vx * 2 + next[i].vy * 0.5;

				// Bounce off bounds
				if (next[i].x < COLLISION_RADIUS) {
					next[i].x = COLLISION_RADIUS;
					next[i].vx = Math.abs(next[i].vx) * 0.95;
				}
				if (next[i].x > width - COLLISION_RADIUS) {
					next[i].x = width - COLLISION_RADIUS;
					next[i].vx = -Math.abs(next[i].vx) * 0.95;
				}
				if (next[i].y < COLLISION_RADIUS) {
					next[i].y = COLLISION_RADIUS;
					next[i].vy = Math.abs(next[i].vy) * 0.95;
				}
				if (next[i].y > height - COLLISION_RADIUS) {
					next[i].y = height - COLLISION_RADIUS;
					next[i].vy = -Math.abs(next[i].vy) * 0.95;
				}
			}

			// Collisions (multiple passes to reduce overlap)
			for (let pass = 0; pass < 2; pass++) {
				for (let i = 0; i < next.length; i++) {
					for (let j = i + 1; j < next.length; j++) {
						if (distance(next[i], next[j]) < 2 * COLLISION_RADIUS) {
							resolveCollision(next[i], next[j]);
						}
					}
				}
			}

			for (let i = 0; i < next.length; i++) {
				next[i].displayX = lerp(next[i].displayX, next[i].x, LERP_POS);
				next[i].displayY = lerp(next[i].displayY, next[i].y, LERP_POS);
				next[i].displayRotation = lerp(next[i].displayRotation, next[i].rotation, LERP_ROT);
			}

			icons = next;
			rafId = requestAnimationFrame(tick);
		};

		rafId = requestAnimationFrame(tick);

		return () => {
			observer.disconnect();
			cancelAnimationFrame(rafId);
		};
	});
</script>

<div class="floating-icons" aria-hidden="true" bind:this={containerEl}>
	{#each visiblePaths as path, i}
		{@const icon = icons[i]}
		{#if icon}
			<div
				class="floating-icon"
				style="
					left: {icon.displayX}px;
					top: {icon.displayY}px;
					transform: translate(-50%, -50%) rotate({icon.displayRotation}deg);
					--enter-delay: {i * 55}ms;
				"
			>
				<div class="floating-icon-inner">
					<img src={path} alt="" width={ICON_SIZE_PX} height={ICON_SIZE_PX} loading="lazy" decoding="async" />
				</div>
			</div>
		{/if}
	{/each}
</div>

<style lang="scss">
	.floating-icons {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		overflow: hidden;
	}

	.floating-icon {
		position: absolute;
		width: 64px;
		height: 64px;
		opacity: 0.15;
		will-change: transform;
	}

	.floating-icon-inner {
		width: 100%;
		height: 100%;
		opacity: 0;
		transform: scale(0);
		animation: icon-enter 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
		animation-delay: var(--enter-delay, 0ms);
	}

	.floating-icon img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
	}

	@keyframes icon-enter {
		0% {
			opacity: 0;
			transform: scale(0);
		}
		65% {
			opacity: 1;
			transform: scale(1.18);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@media screen and (prefers-reduced-motion: reduce) {
		.floating-icon-inner {
			animation: none;
			opacity: 1;
			transform: scale(1);
		}
	}
</style>

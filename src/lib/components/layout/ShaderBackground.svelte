<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		/** Берёт цвета из --color--waves-start и --color--waves-end у родителя */
		useWaveColors?: boolean;
	}

	let { useWaveColors = false }: Props = $props();

	// Пресет (используется, если useWaveColors = false)
	const MINT = {
		color1: '#94ffd1',
		color2: '#6bf5ff',
		color3: '#ffffff',
		positionY: 0.9,
		positionZ: -0.3,
		rotationX: 45,
		cAzimuthAngle: 170,
		cPolarAngle: 70,
		cDistance: 4.4,
		brightness: 1.2,
		uSpeed: 0.2,
		uDensity: 1.2,
		uStrength: 3.4,
		reflection: 0.1
	};

	function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16) / 255,
					g: parseInt(result[2], 16) / 255,
					b: parseInt(result[3], 16) / 255
				}
			: null;
	}

	/** Парсит rgba(r,g,b,a) или rgb(r,g,b) в r,g,b 0..1 */
	function parseRgbFromCss(css: string): { r: number; g: number; b: number } | null {
		const rgba = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[\d.]+)?\s*\)/.exec(css);
		if (rgba) {
			return {
				r: parseInt(rgba[1], 10) / 255,
				g: parseInt(rgba[2], 10) / 255,
				b: parseInt(rgba[3], 10) / 255
			};
		}
		const hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(css.trim());
		if (hex) return hexToRgb(css.trim());
		return null;
	}

	function getWaveColorsFromParent(container: HTMLElement): { c1: { r: number; g: number; b: number }; c2: { r: number; g: number; b: number }; c3: { r: number; g: number; b: number } } | null {
		const parent = container.parentElement;
		if (!parent) return null;
		const style = getComputedStyle(parent);
		const start = style.getPropertyValue('--color--waves-start').trim();
		const end = style.getPropertyValue('--color--waves-end').trim();
		if (!start || !end) return null;
		const c1 = parseRgbFromCss(start);
		const c3 = parseRgbFromCss(end);
		if (!c1 || !c3) return null;
		const c2 = {
			r: (c1.r + c3.r) * 0.5,
			g: (c1.g + c3.g) * 0.5,
			b: (c1.b + c3.b) * 0.5
		};
		return { c1, c2, c3 };
	}

	function sphericalToCartesian(azimuthDeg: number, polarDeg: number, distance: number) {
		const az = (azimuthDeg * Math.PI) / 180;
		const pol = (polarDeg * Math.PI) / 180;
		const y = distance * Math.cos(pol);
		const r = distance * Math.sin(pol);
		return { x: r * Math.sin(az), y, z: r * Math.cos(az) };
	}

	let containerEl: HTMLDivElement;

	onMount(() => {
		let cleanup: (() => void) | null = null;

		(async () => {
			const threeModule = await import('three');
			const THREE = threeModule.default ?? threeModule;
			if (!THREE?.ShaderChunk) {
				console.error('ShaderBackground: Three.js failed to load');
				return;
			}

			// Shader chunk fix for Three.js 0.151+ (from shadergradient)
			const Chunk = THREE.ShaderChunk as Record<string, string>;
			if (Chunk) {
				Chunk['uv2_pars_vertex'] = Chunk['uv2_pars_vertex'] || '';
				Chunk['uv2_vertex'] = Chunk['uv2_vertex'] || '';
				Chunk['uv2_pars_fragment'] = Chunk['uv2_pars_fragment'] || '';
				Chunk['encodings_fragment'] = Chunk['encodings_fragment'] || '';
			}

			const vertex = (await import('$lib/shaders/mint/vertex.glsl?raw')).default;
			const fragment = (await import('$lib/shaders/mint/fragment.glsl?raw')).default;

			let c1: { r: number; g: number; b: number };
			let c2: { r: number; g: number; b: number };
			let c3: { r: number; g: number; b: number };
			if (useWaveColors) {
				const wave = getWaveColorsFromParent(containerEl);
				if (wave) {
					c1 = wave.c1;
					c2 = wave.c2;
					c3 = wave.c3;
				} else {
					c1 = hexToRgb(MINT.color1)!;
					c2 = hexToRgb(MINT.color2)!;
					c3 = hexToRgb(MINT.color3)!;
				}
			} else {
				c1 = hexToRgb(MINT.color1)!;
				c2 = hexToRgb(MINT.color2)!;
				c3 = hexToRgb(MINT.color3)!;
			}

			const uniformValues: Record<string, { value: number }> = {
				uTime: { value: 0 },
				uSpeed: { value: MINT.uSpeed },
				uNoiseDensity: { value: MINT.uDensity },
				uNoiseStrength: { value: MINT.uStrength },
				uLoop: { value: 0 },
				uLoopDuration: { value: 5 },
				uC1r: { value: c1.r },
				uC1g: { value: c1.g },
				uC1b: { value: c1.b },
				uC2r: { value: c2.r },
				uC2g: { value: c2.g },
				uC2b: { value: c2.b },
				uC3r: { value: c3.r },
				uC3g: { value: c3.g },
				uC3b: { value: c3.b }
			};

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
			const pos = sphericalToCartesian(MINT.cAzimuthAngle, MINT.cPolarAngle, MINT.cDistance);
			camera.position.set(pos.x, pos.y, pos.z);
			camera.lookAt(0, 0, 0);

			const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setClearColor(0x000000, 0);
			containerEl.appendChild(renderer.domElement);

			scene.add(new THREE.AmbientLight(0xffffff, MINT.brightness * Math.PI));

			const geometry = new THREE.PlaneGeometry(10, 10, 192, 192);
			const material = new THREE.MeshPhysicalMaterial({
				side: THREE.DoubleSide,
				metalness: 0.2,
				roughness: 1 - MINT.reflection,
				onBeforeCompile: (shader: { uniforms: Record<string, { value: number }>; vertexShader: string; fragmentShader: string }) => {
					shader.uniforms = { ...shader.uniforms, ...uniformValues };
					shader.vertexShader = vertex;
					shader.fragmentShader = fragment;
				}
			});

			const mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(0, MINT.positionY, MINT.positionZ);
			mesh.rotation.order = 'YXZ';
			mesh.rotation.x = (MINT.rotationX * Math.PI) / 180;
			scene.add(mesh);

			const resize = () => {
				const w = containerEl.clientWidth;
				const h = containerEl.clientHeight;
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				renderer.setSize(w, h);
			};
			resize();
			window.addEventListener('resize', resize);

			let rafId = 0;
			const clock = new THREE.Clock();
			const animate = () => {
				rafId = requestAnimationFrame(animate);
				uniformValues.uTime.value = clock.getElapsedTime();
				renderer.render(scene, camera);
			};
			animate();

			cleanup = () => {
				window.removeEventListener('resize', resize);
				cancelAnimationFrame(rafId);
				renderer.dispose();
				geometry.dispose();
				material.dispose();
				if (containerEl?.contains(renderer.domElement)) {
					containerEl.removeChild(renderer.domElement);
				}
			};
		})();

		return () => {
			cleanup?.();
		};
	});
</script>

<div class="shader-bg" bind:this={containerEl} aria-hidden="true"></div>

<style lang="scss">
	.shader-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.shader-bg canvas {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>

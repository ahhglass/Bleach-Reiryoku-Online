<script lang="ts">
	import Button from '$ui/Button.svelte';
	import { sound } from '$lib/utils/sound';

	interface Props {
		onClose?: () => void;
	}

	let { onClose }: Props = $props();

	const SERVER_IP = '76.164.196.197:25565';
	let copied = $state(false);
	let copyTimeout: ReturnType<typeof setTimeout> | undefined;

	function copyAddress() {
		navigator.clipboard.writeText(SERVER_IP).then(
			() => {
				copied = true;
				clearTimeout(copyTimeout);
				copyTimeout = setTimeout(() => {
					copied = false;
				}, 2000);
			},
			() => {
				const input = document.createElement('input');
				input.value = SERVER_IP;
				document.body.appendChild(input);
				input.select();
				document.execCommand('copy');
				document.body.removeChild(input);
				copied = true;
				clearTimeout(copyTimeout);
				copyTimeout = setTimeout(() => (copied = false), 2000);
			}
		);
	}
</script>

<div class="server-popup">
	<h2 class="title">Server</h2>
	<p class="hint">Connect at the address:</p>
	<Button
		color="primary"
		style="understated"
		additionalClass="copy-btn"
		onclick={copyAddress}
	>
		{copied ? 'Copied!' : SERVER_IP}
	</Button>
	<button
		class="close-btn"
		type="button"
		aria-label="Close"
		onclick={onClose}
		use:sound
	>✕</button>
</div>

<style lang="scss">
	.server-popup {
		position: relative;
		padding: 24px 32px;
		min-width: 280px;
	}

	.title {
		margin: 0 0 8px;
		font-size: 1.75rem;
		text-align: center;
		color: var(--color--text);
	}

	.hint {
		margin: 0 0 12px;
		font-size: 1.25rem;
		text-align: center;
		color: var(--color--text-shade);
	}

	:global(.copy-btn) {
		width: 100%;
		font-family: var(--font--mono);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.close-btn {
		position: absolute;
		top: 12px;
		right: 12px;
		width: 32px;
		height: 32px;
		padding: 0;
		border: none;
		background: transparent;
		color: var(--color--text-shade);
		font-size: 1.25rem;
		cursor: pointer;
		border-radius: 50%;
		line-height: 1;
		transition:
			color 0.35s var(--ease-4),
			background 0.35s var(--ease-4),
			transform 0.2s var(--ease-out-3);

		&:hover {
			color: var(--color--text);
			background: rgba(var(--color--primary-rgb), 0.1);
		}

		&:active {
			transform: scale(0.92);
		}
	}
</style>

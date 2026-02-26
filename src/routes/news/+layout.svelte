<script lang="ts">
	import type { NewsPost } from '$lib/utils/types';
	import NewsArticleLayout from '$layout/NewsArticleLayout.svelte';

	interface Props {
		data: { post?: NewsPost; posts?: NewsPost[] };
		children: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
</script>

{#if data.post}
	<NewsArticleLayout post={data.post}>
		{@render children()}
	</NewsArticleLayout>
{:else}
	{@render children()}
{/if}

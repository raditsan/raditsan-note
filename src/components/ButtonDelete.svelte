<script lang="ts">
	import type { FetchResult } from '$lib/utils/fetcher';

	export let id: string
	export let onSuccess: (value: boolean) => void;
	export let deleteFunc: (id: string) => Promise<FetchResult>;
	
	let loading = false
	
	async function deleteAction() {
		loading = true
		const response = await deleteFunc(id)
		if (response) {
			onSuccess(response.ok)
		} else {
			onSuccess(false)
		}
		loading = false
	}
</script>

{#if loading}
	<span>Please wait...</span>
{:else}
	<button on:click|stopPropagation={deleteAction}>Delete</button>
{/if}
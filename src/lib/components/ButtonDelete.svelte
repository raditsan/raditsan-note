<script lang="ts">
	import type { FetchResult } from '$lib/utils/fetcher';
	import ConfirmationDialog from '$lib/components/ConfirmationDialog.svelte';

	export let noteId: string
	export let onSuccess: (value: boolean) => void;
	export let deleteFunc: (id: string) => Promise<FetchResult>;
	
	let isShowConfirmModal = false
	let loading = false
	
	async function deleteAction() {
		togleConfirm()
		loading = true
		const response = await deleteFunc(noteId)
		if (response) {
			onSuccess(response.ok)
		} else {
			onSuccess(false)
		}
		loading = false
	}
	
	function togleConfirm() {
		isShowConfirmModal = !isShowConfirmModal
	}
</script>

{#if loading}
	<span>Please wait...</span>
{:else}
	<button on:click|stopPropagation={() => togleConfirm()}>Delete</button>
{/if}

<ConfirmationDialog
	bind:isShow={isShowConfirmModal}
	message="Are you sure you want to delete this item?"
	on:confirm={deleteAction}
	on:cancel={() => togleConfirm()}
/>
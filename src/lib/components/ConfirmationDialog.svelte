<!--lib/components/ConfirmationDialog.svelte-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	export let message = 'Are you sure?'; // Default message for the dialog

	const dispatch = createEventDispatcher();

	let dialogElement: HTMLDialogElement;
	export let isShow: boolean;
	$: if (dialogElement && isShow) {
		dialogElement.showModal()
	} else if (dialogElement && !isShow) {
		dialogElement.close()
	}

	// Handle confirmation action
	function handleConfirm() {
		dispatch('confirm');
	}

	// Handle cancellation action
	function handleCancel() {
		dispatch('cancel');
	}
</script>

<style>
    .dialog-delete {
        border: none;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 20px;
        max-width: 300px;
        text-align: center;
    }

    .button-container {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
    }

    button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .confirm-button {
        background-color: #4caf50;
        color: white;
    }

    .cancel-button {
        background-color: #f44336;
        color: white;
    }
</style>

<dialog bind:this={dialogElement} class="dialog-delete">
	<p>{message}</p>
	<div class="button-container">
		<button class="confirm-button" on:click={handleConfirm}>Confirm</button>
		<button class="cancel-button" on:click={handleCancel}>Cancel</button>
	</div>
</dialog>
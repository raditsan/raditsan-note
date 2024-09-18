<script lang="ts">
	export let showModal: boolean;
	export let onSave = () => {};
	export let disabledSaveButton = false;

	const closeModal = () => {
		showModal = false;
	};

	// Handle keyboard interaction (Enter or Space) to close modal
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			closeModal();
		}
	};
</script>

<div
	class="modal-backdrop"
	on:click={closeModal}
	role="button"
	class:hidden={!showModal}
>
	<div
		class="modal"
		on:click|stopPropagation
	>
		<div class="modal-header">
			<strong><slot name="header" /></strong>
			<button
				class="modal-close-button"
				on:click={closeModal}
				role="button"
				tabindex="0"
				aria-label="Close"
				on:keydown={handleKeyDown}
			/>
		</div>
		<hr />
		{#if showModal}
			<slot />
		{/if}
		<hr />
		<div class="confirm-footer">
			<button
				class="confirm-button"
				on:click={onSave}
				disabled={disabledSaveButton}
			>
				Save
			</button>
		</div>
	</div>
</div>

<style>
    /* Modal and backdrop styling */
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .hidden {
        display: none;
    }

    .modal {
        background: white;
        border-radius: 0.2em;
        width: 100%;
        max-width: 32em;
        padding: 1em;
        position: relative;
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
    }

    .modal-close-button {
        cursor: pointer;
        box-sizing: content-box;
        width: 1em;
        height: 1em;
        padding: 0.25em;
        background: transparent url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2016%2016'%20fill%3D'%23000'%3E%3Cpath%20d%3D'M.293.293a1%201%200%20011.414%200L8%206.586%2014.293.293a1%201%200%20111.414%201.414L9.414%208l6.293%206.293a1%201%200%2001-1.414%201.414L8%209.414l-6.293%206.293a1%201%200%2001-1.414-1.414L6.586%208%20.293%201.707a1%201%200%20010-1.414z'%2F%3E%3C%2Fsvg%3E") center / 1em no-repeat;
        border: 0;
        border-radius: 0.25rem;
        opacity: 0.5;
    }

    .confirm-footer {
        display: flex;
        justify-content: flex-end;
    }

    .confirm-button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        background-color: #4caf50;
        color: white;
        cursor: pointer;
    }

    .confirm-button:disabled {
        background-color: #575757;
        cursor: not-allowed;
    }

    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
</style>
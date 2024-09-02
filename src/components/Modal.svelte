<script lang="ts">
	export let showModal: boolean; // boolean
	let dialog: HTMLDialogElement; // HTMLDialogElement
	$: if (dialog && showModal) {
		dialog.showModal()
	} else if (dialog && !showModal) {
		dialog.close()
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<div class="modal-header">
			<strong><slot name="header" /></strong>
			<button class="modal-close-button" autofocus on:click={() => dialog.close()} />
		</div>
		<hr />
		<slot />
		<hr />
	</div>
</dialog>

<style>
    dialog {
        max-width: 32em;
        border-radius: 0.2em;
        border: none;
        padding: 0;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog > div {
        padding: 1em;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    .modal-header {
				display: flex;
				justify-content: space-between;
		}
		.modal-header .modal-close-button{
				cursor: pointer;
        box-sizing: content-box;
        width: 1em;
        height: 1em;
        padding: .25em .25em;
        color: #000;
        background: transparent url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2016%2016'%20fill%3D'%23000'%3E%3Cpath%20d%3D'M.293.293a1%201%200%20011.414%200L8%206.586%2014.293.293a1%201%200%20111.414%201.414L9.414%208l6.293%206.293a1%201%200%2001-1.414%201.414L8%209.414l-6.293%206.293a1%201%200%2001-1.414-1.414L6.586%208%20.293%201.707a1%201%200%20010-1.414z'%2F%3E%3C%2Fsvg%3E") center / 1em auto no-repeat;
        border: 0;
        border-radius: .25rem;
        opacity: .5
		}
</style>

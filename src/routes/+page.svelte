<script lang="ts">
	import { Fetcher, type FetchResult } from '$lib/utils/fetcher';
	import type { ApiResponse, Note } from '$lib/types/alltypes';
	import { onMount } from 'svelte';
	import ButtonDelete from '../components/ButtonDelete.svelte';
	import Modal from '../components/Modal.svelte';
	
	onMount(() => {
		getAction()
	})

	import type {ActionData } from './$types';
	export let form: ActionData;
	$: isLogin = form?.success || false

	const fetchGetNote = new Fetcher<ApiResponse<Note[]>>({
		url: '/api/note',
		method: 'GET',
	});
	const fetchGetNoteDetail = new Fetcher<ApiResponse<Note>>({
		method: 'GET',
	});
	const fetchInsertNote = new Fetcher<ApiResponse<never>>({
		url: '/api/note',
		method: 'POST',
	});
	const fetchDeleteNote = new Fetcher<ApiResponse<never>>({
		method: 'DELETE'
	});
	const fetchUpdateNote = new Fetcher<ApiResponse<never>>({
		method: 'PUT'
	});
	let storeGetNote = fetchGetNote.store;
	let storeInsertNote = fetchInsertNote.store;
	// let storeDeleteNote = fetchDeleteNote.store;
	let storeUpdateNote = fetchUpdateNote.store;
	let storeGetDetailNote = fetchGetNoteDetail.store;

	let selectedNote: Note | null
	$: if (selectedNote) {
		noteValue = selectedNote
	}

	// let notes: [Note] = data.notes
	$: notes = ($storeGetNote.data?.data || []) as Note[]

	let isShowModalCreate = false
	let noteValue: { name: string; content: string } = {
		name: '',
		content: ''
	}
	$: if (!isShowModalCreate) {
		noteValue.name = ''
		noteValue.content = ''
		selectedNote = null
		fetchGetNoteDetail.resetState()
		fetchUpdateNote.resetState()
		fetchDeleteNote.resetState()
	}
	async function saveAction() {
		const response = await fetchInsertNote.fetch({body: noteValue})
		if (!response) return
		isShowModalCreate = false
		const result = await response.json();
		storeGetNote.update((state) => ({
			...state,
			data: {
				...state.data,
				data: [result.data, ...notes]
			} as ApiResponse<Note[]>
		}))
		// await getAction()
	}

	async function getAction() {
		await fetchGetNote.fetch()
	}

	async function deleteAction(id: string): Promise<FetchResult> {
		return await fetchDeleteNote.fetch({url: `/api/note/${id}`})
	}

	async function updateAction() {
		let id = selectedNote?.id
		const response = await fetchUpdateNote.fetch({
			url: `/api/note/${id}`,
			body: noteValue
		})
		if (!response) return
		if (response.ok) {
			isShowModalCreate = false
			const result = await response.json();
			const index = notes.findIndex((el) => el.id == id)
			notes[index] = result.data
			storeGetNote.update((state) => ({
				...state,
				data: {
					...state.data,
					data: notes
				} as ApiResponse<Note[]>
			}))
			// await getAction()
		}
	}

	async function getDetailAction(id: string) {
		isShowModalCreate = true
		const response = await fetchGetNoteDetail.fetch({
			url: `/api/note/${id}`,
		})
		if (!response) return
		const result = await response.json();
		if (result.success) {
			selectedNote = result.data
		}
	}
</script>

{#if isLogin}
	<div>
		<button on:click={() => isShowModalCreate = true}>Create New</button>
		<button on:click={getAction}>Refresh</button>
		{#if $storeGetNote.isLoading}
			<p>Loading...</p>
		{:else if $storeGetNote.errorMessage}
			<p>Error: {$storeGetNote.errorMessage}</p>
		{:else}
			{#each notes as { id, name, created_date }, i (id)}
				<div>
					<div>{i + 1}). {name}
						<button on:click={() => getDetailAction(id)}>Edit</button> |
						<ButtonDelete
							bind:id={id}
							onSuccess={(isSuccess) => {
								if (isSuccess) {
										notes = notes.filter((a) => a.id !== id)
									} else {
										alert("Failed delete note")
									}
								}
							}
							deleteFunc={deleteAction}
						/>
					</div>
					<div>{created_date}</div>
					<hr />
				</div>
			{/each}
		{/if}

		<Modal bind:showModal={isShowModalCreate}>
			{#if $storeInsertNote.isLoading || $storeUpdateNote.isLoading}
				<p>Saving...</p>
			{:else if $storeGetDetailNote.isLoading}
				<p>Please wait...</p>
			{:else if $storeGetDetailNote.errorMessage}
				<p style="color: red">{$storeGetDetailNote.errorMessage}</p>
			{:else if $storeUpdateNote.errorMessage}
				<p style="color: red">{$storeUpdateNote.errorMessage}</p>
			{:else}
				<div class="form-group">
					<label for="name">Name</label>
					<input type="text" name="name" bind:value={noteValue.name} />
				</div>
				<div class="form-group">
					<label for="content">Content</label>
					<textarea name="content" bind:value={noteValue.content} />
				</div>
				<button on:click={() => {
				if (selectedNote) {
					updateAction()
				} else {
					saveAction()
				}
			}}>Save</button>
			{/if}
		</Modal>
	</div>
{:else}
	<form method="POST">
		{#if form?.missing}<p class="error">The username field is required</p>{/if}
		{#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}
		<label>
			Username
			<input name="username" type="text" value={form?.username ?? ''}>
		</label>
		<label>
			Password
			<input name="password" type="password">
		</label>
		<button>Log in</button>
	</form>
{/if}

<style>
    .error {
        color: red;
    }
</style>
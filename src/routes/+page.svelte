<script lang="ts">
	import { Fetcher, type FetchResult } from '$lib/utils/fetcher';
	import type { ApiResponse, Note } from '$lib/types/alltypes';
	import ButtonDelete from '../components/ButtonDelete.svelte';
	import Modal from '../components/Modal.svelte';
	import type {ActionData } from './$types';
	import { onMount } from 'svelte';
	import { getHljsLanguage, getListCategory, getListCode } from '$lib/data/all_data';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import hljsstyle from "svelte-highlight/styles/vs";
	
	export let form: ActionData;
	$: filter = {
		code: "all",
		search: ""
	}
	const listCode = getListCode()
	const listCategory = getListCategory()
	$: isLogin = form?.success || false
	$: isShowAllDetailNote = false

	onMount(() => {
		if (isLogin) {
			getAction()
		}
	})
	
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
	$: notes = (($storeGetNote.data?.data || []) as Note[]).filter(e => {
		const filterCode = filter.code.toLowerCase()
		const lang = e.lang.toLowerCase()

		let value = ""
		Object.keys(e).forEach((key) => {
			if (["lang", "name", "category_name", "content"].includes(key)) {
				value += ` ${(e as never)[key]}`
			}
		})
		value = value.trim()
		return (filterCode  == "all" ? true : 
			filterCode == lang) &&
			value.includes(filter.search.toLowerCase())
	})

	let isShowModalCreate = false
	const defaultNoteValue: Note = {
		id: '',
		name: '',
		content: '',
		category_name: 'other',
		lang: 'text',
	}
	let noteValue: Note = { ...defaultNoteValue }
	$: if (!isShowModalCreate) {
		noteValue = {...defaultNoteValue}
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
	
	async function showDetailNote(id: string) {
		storeGetNote.update((state) => {
			let notes = state.data?.data ?? []
			const index = notes.findIndex((el) => el.id == id)
			notes[index].isShowDetail = !notes[index].isShowDetail
			return {
				...state,
				data: {
					...state.data,
					data: notes
				} as ApiResponse<Note[]>
			}
		})
	}
	
	async function showAllDetailNote() {
		isShowAllDetailNote = !isShowAllDetailNote
		storeGetNote.update((state) => ({
			...state,
			data: {
				...state.data,
				data: notes.map((el) => {
					el.isShowDetail = isShowAllDetailNote
					return el
				})
			} as ApiResponse<Note[]>
		}))
	}
</script>
<!--<a href="/detail">to detail</a>-->
<svelte:head>
	{@html hljsstyle}
</svelte:head>

{#if isLogin}
	<div>
		<button on:click={() => isShowModalCreate = true}>Create New</button>
		<button on:click={getAction}>Refresh</button>
		<button on:click={showAllDetailNote}>{isShowAllDetailNote ? 'Hide' : 'Show'} All Detail</button>
		<select bind:value={filter.code}>
			{#each listCode as code}
				<option value="{code.value}">{code.name}</option>
			{/each}
		</select>
		<input bind:value={filter.search} type="search" name="search" placeholder="Search" />
		{#if $storeGetNote.isLoading}
			<p>Loading...</p>
		{:else if $storeGetNote.errorMessage}
			<p class="error">Error: {$storeGetNote.errorMessage}</p>
		{:else}
			{#if notes.length === 0}
				<div>Empty Note</div>
			{/if}
			{#each notes as { id, name, created_date, content, isShowDetail, lang }, i (id)}
				<div class="note-card">
					<div class="note-timestamp">{created_date}</div>
					<div class="note-header">
						<div>{i + 1}). <b>[{lang.toUpperCase()}]</b></div>
						<div>
							<a href="/{id}" target="_blank">{name}</a>
						</div>
						<div>
							<button on:click={() => showDetailNote(id)}> {isShowDetail ? 'Hide' : 'Show'} Detail</button> |
							<button on:click={() => getDetailAction(id)}>Edit</button> |
							<ButtonDelete
								bind:noteId={id}
								onSuccess={(isSuccess) => {
									if (isSuccess) {
										storeGetNote.update((state) => {
											let notes = (state.data?.data ?? []).filter((a) => a.id !== id)
											return {
												...state,
												data: {
													...state.data,
													data: notes
												}
											}
										})
									} else {
											alert("Failed delete note")
									}
								}
							}
								deleteFunc={deleteAction}
							/>
						</div>
					</div>
					{#if isShowDetail}
						<Highlight language={getHljsLanguage(lang)} code={content} let:highlighted>
							<LineNumbers {highlighted} />
						</Highlight>
					{/if}
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
				<table>
					<tr>
						<td>Name</td>
						<td><input type="text" name="name" bind:value={noteValue.name} required /></td>
					</tr>
					<tr>
						<td></td>
						<td></td>
					</tr>
					
					
					<tr>
						<td>Category</td>
						<td>
							<select name="category" bind:value={noteValue.category_name} required>
								{#each listCategory as category}
									<option value={category.value}>{category.name}</option>
								{/each}
							</select>

							<select name="lang" bind:value={noteValue.lang} required>
								{#each listCode as code}
									<option value="{code.value}">{code.name}</option>
								{/each}
							</select>
						</td>
					</tr>
					<tr>
						<td>Content</td>
						<td><textarea name="content" bind:value={noteValue.content} required /></td>
					</tr>
				</table>
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
		<div id="table">
			<div class="tr">
				<div class="td">Username</div>
				<div class="td"> : </div>
				<div class="td"><input name="username" type="text" value={form?.username ?? ''}></div>
			</div>
			<div class="tr">
				<div class="td">Password</div>
				<div class="td"> : </div>
				<div class="td"><input name="password" type="password"></div>
			</div>
			<div class="tr">
				<div class="td"></div>
				<div class="td"></div>
				<div class="td"><button style="width: 100%">Sign In</button></div>
			</div>
		</div>
		
	</form>
{/if}

<style>
    .error {
        color: red;
    }
		.note-content {
        white-space: pre;
				background: lightgray;
		}
		.note-card {
				border-bottom: 2px solid darkgray;
        width: max-content;
				margin: 10px 0;
				padding: 0 0 5px;
		}
		.note-card .note-header {
				display: inline-flex;
		}
		
		.note-header > div:not(:first-child) {
        padding-left: 5px;
		}
		.note-card .note-timestamp {
				font-size: 12px;
		}
    #table{
        display: table;
				border-spacing: 5px;
    }
    .tr{
        display: table-row;
    }
    .td{
        display: table-cell; }
</style>
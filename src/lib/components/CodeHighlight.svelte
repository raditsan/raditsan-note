<script lang="ts">
import hljsstyle from 'svelte-highlight/styles/vs';
// import Highlight, { HighlightAuto, LineNumbers } from 'svelte-highlight';
import type { Note } from '$lib/types/alltypes.js';
// import { getHljsLanguage } from '$lib/data/all_data';
import { page } from '$app/stores';
import AceEditor from '$lib/components/AceEditor.svelte';
export let isDetail = false;
export let note: Note;
const code = note.content;
// const lang = getHljsLanguage(note.lang)
// const isAuto = [
// 	"svelte"
// ].includes(note.lang)
</script>

<svelte:head>
	<!--	eslint-disable-next-line svelte/no-at-html-tags-->
	{@html hljsstyle}
	{#if !["/"].includes($page.url.pathname)}
		<title>{note.name}</title>
		<meta property="description" content="{note.name}" />
		<style>
			body {
					margin: 0 !important;
			}
      .editor {
          width: 100vw !important;
          height: 100vh !important;
      }
		</style>
	{/if}
</svelte:head>

<AceEditor
	readOnly={true}
	value={code}
	language={note.lang}
	isDetail={isDetail}
/>
<!--{#if isAuto}-->
<!--	<HighlightAuto {code} let:highlighted>-->
<!--		<LineNumbers {highlighted} />-->
<!--	</HighlightAuto>-->
<!--{:else}-->
<!--	<Highlight language={lang} {code} let:highlighted>-->
<!--		<LineNumbers {highlighted} />-->
<!--	</Highlight>-->
<!--{/if}-->
<script lang="ts">
import hljsstyle from 'svelte-highlight/styles/vs';
import Highlight, { HighlightAuto, LineNumbers } from 'svelte-highlight';
import type { Note } from '$lib/types/alltypes.js';
import { getHljsLanguage } from '$lib/data/all_data';
export let note: Note;
const code = note.content;
const lang = getHljsLanguage(note.lang)
const isAuto = [
	"svelte"
].includes(note.lang)
</script>

<svelte:head>
	<!--	eslint-disable-next-line svelte/no-at-html-tags-->
	{@html hljsstyle}
	<title>{note.name}</title>
	<meta property="description" content="{note.name}" />
</svelte:head>

{#if isAuto}
	<HighlightAuto {code} let:highlighted>
		<LineNumbers {highlighted} />
	</HighlightAuto>
{:else}
	<Highlight language={lang} {code} let:highlighted>
		<LineNumbers {highlighted} />
	</Highlight>
{/if}
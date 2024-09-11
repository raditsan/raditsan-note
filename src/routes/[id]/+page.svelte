<!--<script lang="ts">-->
<!--	import Highlight from 'svelte-highlight';-->

<!--	/** @type {import('./$types').PageData} */-->
<!--	export let data: import('./$types').PageData;-->
<!--</script>-->
<!--<svelte:head>-->
<!--	<title>{data.note.name}</title>-->
<!--	<meta property="description" content="{data.note.name}" />-->
<!--</svelte:head>-->
<!--<div style="white-space: pre">-->
<!--	{data.note.content}-->
<!--</div>-->
<!--<Highlight language={typescript} {code} />-->
<script lang="ts">
	import Highlight, { LineNumbers } from "svelte-highlight";
	// import typescript from "svelte-highlight/languages/typescript";
	import hljsstyle from "svelte-highlight/styles/vs";
	import { getHljsLanguage } from '$lib/data/all_data';
	export let data: import('./$types').PageData;
	const code = data.note.content;
	const lang = getHljsLanguage(data.note.lang)
</script>

<svelte:head>
	{@html hljsstyle}
	<title>{data.note.name}</title>
	<meta property="description" content="{data.note.name}" />
</svelte:head>

<Highlight language={lang} {code} let:highlighted>
	<LineNumbers {highlighted} />
</Highlight>
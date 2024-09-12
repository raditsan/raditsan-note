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
	import CodeHighlight from '$lib/components/CodeHighlight.svelte';
	export let data: import('./$types').PageData;
</script>

<CodeHighlight note={data.note} />

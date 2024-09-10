<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data: import('./$types').PageData;
</script>
<svelte:head>
	<title>{data.note.name}</title>
	<meta property="description" content="{data.note.name}" />
</svelte:head>
<div style="white-space: none">
	{data.note.content}
</div>
<!--routes/+error.svelte-->
<script>
	import { page } from '$app/stores';
</script>
<div>
	<b>Error {$page.status} </b> - {$page.error?.message}
</div>
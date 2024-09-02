<script lang="ts">
	import type {PageData, ActionData} from './$types';
	export let data: PageData; 
	export let form: ActionData;

	
</script>

{#if data.isLoggedIn}
	<!-- Logged-in content -->
	<div>
		<h2>Welcome, You are logged in!</h2>
		<form method="post" action="?/logout">
			<button>Logout</button>
		</form>
	</div>
{:else}
	<!-- Login Form -->
	<div>
		<h2>Login</h2>
		<form method="post" action="?/login">
			<input type="text" name="username" placeholder="Username" value={form?.username || ''} required />
			<input type="password" name="password" placeholder="Password" required />
			<button type="submit" name="login">Login</button>
		</form>

		{#if form?.error}
			<p style="color: red;">{form.error}</p>
		{/if}
	</div>
{/if}

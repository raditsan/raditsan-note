// src/hooks.server.js
import { decrypt } from '$lib/utils/utils';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const cookies = event.cookies;
	const encryptedUsername = cookies.get('session');
	if (encryptedUsername) {
		try {
			event.locals.username = decrypt(encryptedUsername); // Attach username or any other user data
			return await resolve(event);
		} catch (e: unknown) {
			console.error("error decrypt", e)
			cookies.delete('session', { path: '/' });
		}
	}

	// If session does not exist or is invalid, return an unauthorized response for API routes
	if (event.url.pathname.startsWith('/api')) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	// Continue as normal for non-API routes
	return await resolve(event);
}
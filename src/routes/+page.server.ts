import { redirect } from '@sveltejs/kit';

// In-memory store for active sessions
const sessionStore = new Map();

// Function to generate a random session ID
function generateSessionId() {
	return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Load function to check if the user is authenticated
export const load = ({ cookies }) => {
	const sessionId = cookies.get('session_id');
	const session = sessionStore.get(sessionId);
	return { isLoggedIn: !!session };
};

// Server actions to handle form submissions
export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		// Replace this with your actual authentication logic
		const isValidUser = username === 'user' && password === 'password';

		if (!isValidUser) {
			return { error: 'Invalid credentials', username };
		}

		// Generate a session ID and store it in memory
		const sessionId = generateSessionId();
		sessionStore.set(sessionId, { username });

		// Set a session cookie without an expiration time
		cookies.set('session_id', sessionId, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production' // Only send cookies over HTTPS in production
		});

		// Redirect to root to refresh page with logged-in state
		throw redirect(303, '/');
	},

	logout: ({ cookies }) => {
		// Clear the session cookie
		cookies.delete('session', { path: '/' });
		throw redirect(303, '/');
	}
};

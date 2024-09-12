import { fail } from '@sveltejs/kit';
import { encrypt2, hash } from '$lib/utils/utils';

const db = {
	getUser: async (username: string) => {
		const listUser = [
			{
				username: "raditsan",
				password: -178432948 //P@ssw0rd#224
			}
		]

		return listUser.find(e => e.username == username)
	}
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, url, locals }) {
	// console.log("locals in load", locals)
	return {
		loginProfile: {
			name: ""
		}
	}
}


/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		if (!username) {
			return fail(400, { username, missing: true });
		}
		const user = await db.getUser(`${username}`);
		if (!user || user.password !== hash(password as string)) {
			return fail(400, { username, incorrect: true });
		}

		const encryptedUsername = encrypt2(username as string);
		cookies.set('session', encryptedUsername, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 // 24 hours
		});
		
		return {success: true};
	}
};

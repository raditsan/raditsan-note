import { fail, json, redirect } from '@sveltejs/kit';

const hash = (s: string) =>
	s.split('').reduce((a: number, b: string) => {
		a = (a << 5) - a + b.charCodeAt(0)
		return a & a
	}, 0)

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
export async function load({ cookies, url }) {
	return {
		loginProfile: {
			name: ""
		}
	}
}


/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
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
		
		return {success: true};
	}
};

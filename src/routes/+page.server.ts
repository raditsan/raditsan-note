import { fail, json, redirect } from '@sveltejs/kit';

const db = {
	getUser: async (username: string) => {
		const listUser = [
			{
				username: "raditsan",
				password: "123456"
			}
		]

		return listUser.find(e => e.username == username)
	}
}

export async function load({ cookies, url }) {
	if (!cookies.get('sessionid')) {
		return {
			loginProfile: null
		}
	}

	return {
		loginProfile: {
			name: cookies.get('sessionid'),
			time: cookies.get('sessiontime'),
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
		if (!user || user.password !== password) {
			return fail(400, { username, incorrect: true });
		}
		
		return {success: true};
	}
};

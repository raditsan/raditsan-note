/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, locals }) {
	const user = "raditsan"
	return { user };
}
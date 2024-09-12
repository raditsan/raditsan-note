import type { Note } from '$lib/types/alltypes';
import { createPool, VercelPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';
import { error, type HttpError } from '@sveltejs/kit';
import { simpleDecrypt } from '$lib/utils/utils';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, locals, params }) {
	let note: Note
	let db: VercelPool | null = null;
	try {
		db = createPool({ connectionString: POSTGRES_URL });
		const { rows } = await db.query<Note>(
			`SELECT * from tbl_notes where id=$1`,
			[simpleDecrypt(params.id)]
		);
		// Check if a row was found, otherwise handle the empty result
		const data = rows[0] || null; 
		// Return a JSON response with the found data
		if (data) {
			if (data.is_deleted) {
				error(404, "Data has been deleted");
			}
			note = data
		} else {
			error(404, "Data not found");
		}
	} catch (e: unknown) {
		if (e as HttpError) {
			const err = e as HttpError
			throw error(err.status, err.body)
		} else {
			// Handle errors by returning a response with an error message
			const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
			throw error(500, errorMessage)
		}
	} finally {
		if (db) {
			await db.end();
		}
	}
	
	return { note };
}
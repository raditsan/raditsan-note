import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { createPool, VercelPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';
import { decrypt } from '$lib/utils/utils';

export const POST: RequestHandler = async ({ request, locals }) => {
	let db: VercelPool | null = null
	try {
		const data = await request.json()
		db = createPool({ connectionString: POSTGRES_URL })
		// Execute the INSERT query and return the inserted row using RETURNING
		const addUser = await db.query(
			`
      INSERT INTO tbl_notes ("name", "content", category_name, lang, created_by)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *; -- This returns the inserted row
    `,
			[
				data.name, 
				data.content,
				data.category_name,
				data.lang,
				locals.username
			]
		);
		// Check if the row was successfully inserted
		if (addUser.rowCount === 1) {
			// Return the inserted data in the response
			return json({ success: true, data: addUser.rows[0] }, { status: 200 });
		} else {
			// Handle cases where no rows were inserted
			return json({ success: false, error: 'Insertion failed' }, { status: 400 });
		}
	} catch (error: unknown) {
		// Handle errors by returning a response with an error message
		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
		return json({ success: false, error: errorMessage }, { status: 500 });
	} finally {
		if (db) {
			await db.end()
		}
	}
};

export const GET: RequestHandler = async ({ request, cookies, locals }) => {
	let db: VercelPool | null = null
	try {
		db = createPool({ connectionString: POSTGRES_URL })
		const {rows} = await db.query(
			
			`SELECT * from tbl_notes 
         WHERE created_by = $1 
         AND is_deleted = false
         ORDER BY created_date DESC`,
			[locals.username]
		)
		return json({ success: true, data: rows }, { status: 200 });
	} catch (error: unknown) {
		// Handle errors by returning a response with an error message
		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
		return json({ success: false, error: errorMessage }, { status: 500 });
	} finally {
		if (db) {
			await db.end()
		}
	}
}

// export const DELETE: RequestHandler = async ({ request }) => {
// 	console.log("DELETE", request)
// 	let db: VercelPool | null
// 	try {
// 		db = createPool({ connectionString: POSTGRES_URL })
// 		// const {rows} = await db.query(`SELECT * from tbl_notes`)
// 		await fakePromise()
// 		return json({ success: true, message: "delete" }, { status: 200 });
// 	} catch (error: unknown) {
// 		// Handle errors by returning a response with an error message
// 		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
// 		return json({ success: false, error: errorMessage }, { status: 500 });
// 	} finally {
// 		db && await db.end()
// 	}
// }

// export const PUT: RequestHandler = async ({ request }) => {
// 	let db: VercelPool | null
// 	try {
// 		db = createPool({ connectionString: POSTGRES_URL })
// 		// const {rows} = await db.query(`SELECT * from tbl_notes`)
// 		return json({ success: true, message: "put" }, { status: 200 });
// 	} catch (error: unknown) {
// 		// Handle errors by returning a response with an error message
// 		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
// 		return json({ success: false, error: errorMessage }, { status: 500 });
// 	} finally {
// 		db && await db.end()
// 	}
// }
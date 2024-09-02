import type { RequestHandler } from '@sveltejs/kit';
import { createPool, VercelPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async (props) => {
	const { params } = props
	let db: VercelPool | null = null
	try {
		db = createPool({ connectionString: POSTGRES_URL })
		const {rows} = await db.query(`SELECT * from tbl_notes where id='${params.id}'`)
		// Check if a row was found, otherwise handle the empty result
		const data = rows[0] || null; // Use rows[0] to get the first object or null if no result

		// Return a JSON response with the found data
		if (data) {
			return json({ success: true, data }, { status: 200 });
		} else {
			return json({ success: false, error: 'Data not found' }, { status: 404 });
		}
	} catch (error: unknown) {
		// Handle errors by returning a response with an error message
		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
		return json({ success: false, error: errorMessage }, { status: 500 });
	} finally {
		db && await db.end()
	}
}

export const DELETE: RequestHandler = async (props) => {
	const { params } = props
	let db: VercelPool | null = null
	try {
		db = createPool({ connectionString: POSTGRES_URL })
		const result = await db.query(`DELETE from tbl_notes where id='${params.id}'`)
		console.log("DELETE Result", result)
		return json({ success: true }, { status: 200 });
	} catch (error: unknown) {
		// Handle errors by returning a response with an error message
		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
		return json({ success: false, error: errorMessage }, { status: 500 });
	} finally {
		db && await db.end()
	}
}

export const PUT: RequestHandler = async (props) => {
	const { request, params } = props
	let db: VercelPool | null = null
	try {
		let data = await request.json()
		db = createPool({ connectionString: POSTGRES_URL })
		const {rows} = await db.query(`SELECT * from tbl_notes where id='${params.id}'`)
		if (rows.length == 0) {
			return json({ success: false, error: 'Data not found' }, { status: 404 });
		}
		
		const updateQuery = await db.query(
			`UPDATE tbl_notes SET 
      	name=$1,
        content=$2, 
        updated_date=CURRENT_TIMESTAMP 
        WHERE id=$3
        RETURNING *;`,
			[data.name, data.content, params.id]
		);
		if (updateQuery.rowCount === 1) {
			// Return the inserted data in the response
			return json({ success: true, data: updateQuery.rows[0] }, { status: 200 });
		} else {
			// Handle cases where no rows were inserted
			return json({ success: false, error: 'Update failed' }, { status: 400 });
		}
	} catch (error: unknown) {
		// Handle errors by returning a response with an error message
		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
		return json({ success: false, error: errorMessage }, { status: 500 });
	} finally {
		db && await db.end()
	}
}
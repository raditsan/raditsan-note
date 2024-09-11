import type { RequestHandler } from '@sveltejs/kit';
import { createPool, VercelPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { simpleDecrypt, simpleEncrypt } from '$lib/utils/utils';
import type { Note } from '$lib/types/alltypes';

export const GET: RequestHandler = async (props) => {
	const { params } = props
	let db: VercelPool | null = null
	try {
		db = createPool({ connectionString: POSTGRES_URL })
		const {rows} = await db.query<Note>(
			`SELECT * from tbl_notes where id=$1`,
			[simpleDecrypt(params.id)]
		)
		// Check if a row was found, otherwise handle the empty result
		let data = rows[0] || null; // Use rows[0] to get the first object or null if no result
		
		// Return a JSON response with the found data
		if (data) {
			data = {
				...data,
				id: simpleEncrypt(data?.id)
			}
			return json({ success: true, data }, { status: 200 });
		} else {
			return json({ success: false, error: 'Data not found' }, { status: 404 });
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
}

export const DELETE: RequestHandler = async (props) => {
	const { params } = props
	let db: VercelPool | null = null
	try {
		db = createPool({ connectionString: POSTGRES_URL })
		// await db.query(
		// 	`DELETE from tbl_notes where id=$1`,
		// 	[params.id]
		// )
		// return json({ success: true }, { status: 200 });

		const updateQuery = await db.query(
			`UPDATE tbl_notes SET 
        is_deleted=true,
        deleted_date=CURRENT_TIMESTAMP,
        deleted_by=$2
        WHERE id=$1
        RETURNING *;`,
			[simpleDecrypt(params.id), props.locals.username]
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
		if (db) {
			await db.end()
		}
	}
}

export const PUT: RequestHandler = async (props) => {
	const { request, params } = props
	let db: VercelPool | null = null
	try {
		const data = await request.json()
		if (
			data.content.trim() == '' ||
			data.name.trim() == '' ||
			data.category_name.trim() == '' ||
			data.lang.trim() == ''
		) {
			return json({ success: false, error: 'Value not valid' }, { status: 400 });
		}
		db = createPool({ connectionString: POSTGRES_URL })
		const {rows} = await db.query(
			`SELECT * from tbl_notes where id=$1`,
			[simpleDecrypt(params.id)]
		)
		if (rows.length == 0) {
			return json({ success: false, error: 'Data not found' }, { status: 404 });
		}
		
		const updateQuery = await db.query<Note>(
			`UPDATE tbl_notes SET 
      	name=$2,
        content=$3,
        category_name=$4, 
        lang=$5, 
        updated_date=CURRENT_TIMESTAMP,
        updated_by=$6
        WHERE id=$1
        RETURNING *;`,
			[
				simpleDecrypt(params.id),
				data.name, 
				data.content,
				data.category_name,
				data.lang,
				props.locals.username
			]
		);
		if (updateQuery.rowCount === 1) {
			let data = updateQuery.rows[0]
			data = {
				...data,
				id: simpleEncrypt(data?.id)
			}
			// Return the inserted data in the response
			return json({ success: true, data: data }, { status: 200 });
		} else {
			// Handle cases where no rows were inserted
			return json({ success: false, error: 'Update failed' }, { status: 400 });
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
}
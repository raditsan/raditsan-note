import { promises as fs } from 'fs';
import path from 'path';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const { code } = params; // Get the requested code mode

	// Construct the file path to the Ace mode file
	const modeFilePath = path.resolve(`node_modules/ace-builds/src-noconflict/mode-${code}.js`);

	try {
		// Read the file content
		const fileContent = await fs.readFile(modeFilePath, 'utf-8');

		// Return the file content as JavaScript
		return new Response(fileContent, {
			headers: {
				'Content-Type': 'application/javascript',
			},
		});
	} catch (error: unknown) {
		// // If file not found or error occurs, return 404 with a message
		// return new Response(`// Mode not found for ${code}`, {
		// 	status: 404,
		// 	headers: {
		// 		'Content-Type': 'text/plain',
		// 	},
		// });
		
		//LEMPAR MODE TEXT JIKA ERROR ATAU TIDAK ADA MODE DI ACE9
		const modeFilePath = path.resolve(`node_modules/ace-builds/src-noconflict/mode-text.js`);
		const fileContent = await fs.readFile(modeFilePath, 'utf-8');
		return new Response(fileContent, {
			headers: {
				'Content-Type': 'application/javascript',
			},
		});
	}
}
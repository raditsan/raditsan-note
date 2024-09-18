// //file ini untuk handle jika mode tidak tersedia di ace9 jadi gk return error
// import { promises as fs } from 'fs';
// import path from 'path';

/** @type {import('./$types').Actions} */
export async function GET({params}) {
	const {lang} = params
	// console.log("langnih", lang)
	// Construct the file path to the Ace mode file
	// const modeFilePath = path.resolve(`node_modules/ace-builds/src-noconflict/mode-text.js`);

	try {
		// Read the file content
		// const fileContent = await fs.readFile(modeFilePath, 'utf-8');

		const response = await fetch(`https://ajaxorg.github.io/ace-builds/src-min-noconflict/worker-${lang}`)
		if (response.status == 200) {
			const text = await response.text()
			// Return the file content as JavaScript
			return new Response(text, {
				headers: {
					'Content-Type': 'application/javascript',
				},
			});
		} else {
			const response = await fetch(`https://ajaxorg.github.io/ace-builds/src-min-noconflict/worker-text.js`)
			const text = await response.text()
			// Return the file content as JavaScript
			return new Response(text, {
				headers: {
					'Content-Type': 'application/javascript',
				},
			});
		}
	} catch (error: unknown) {
		console.log("error", error)
		return new Response(`// Lang not found`, {
			status: 500,
			headers: {
				'Content-Type': 'text/plain',
			},
		});
	}
}
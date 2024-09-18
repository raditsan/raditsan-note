<script lang="ts">
	import { onMount, afterUpdate, onDestroy } from 'svelte';
	import ace from 'ace-builds/src-noconflict/ace';
	import 'ace-builds/src-noconflict/theme-xcode';
	
	export let value = '';
	export let language: string = "text";
	export let theme = 'xcode';
	export let readOnly = false;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export let onValueChange = (value: string) => {};

	let prevLang = "text"
	let editorElement: HTMLDivElement;
	export let editor: any;

	onMount(() => {
		ace.config.set('basePath', '/'); //get for mode base path url
		editor = ace.edit(editorElement);
		editor.setTheme(`ace/theme/${theme}`);
		editor.setValue(value, 1);
		editor.setReadOnly(readOnly);
		editor.session.setUseWorker(false);
		// setLanguageMode(language); // Set initial language mode

		editor.session.on('change', () => {
			const newValue = editor.getValue();
			value = newValue
			onValueChange(newValue);
		});

		// return () => {
		// 	editor.destroy();
		// };
	});
	
	onDestroy(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		editor && editor.destroy();
	})

	afterUpdate(() => {
		if (language != prevLang) {
			setLanguageMode(language);
		}
		prevLang = language
	});

	async function setLanguageMode(lang: string) {
		try {
			if (language != "text") {
				// const response = await fetch('/mode-'+lang+'.js')
				// const script = await response.text()
				// eval(script);
				// editor.session.setMode(lang);
				editor.session.setMode(`ace/mode/${lang}`);
			}
		} catch (e) {
			console.log("eee", e)
		}
	}
</script>

<style>
    .editor {
        width: 100%;
        height: 400px;
    }
</style>

<div class="editor" bind:this={editorElement}></div>

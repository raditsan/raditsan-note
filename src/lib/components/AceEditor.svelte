<script lang="ts">
	import { onMount, afterUpdate, onDestroy, beforeUpdate } from 'svelte';
	import ace from 'ace-builds/src-noconflict/ace';
	import 'ace-builds/src-noconflict/theme-xcode';
	import('ace-builds/src-noconflict/mode-text')
	
	export let value = '';
	export let language: string = "text";
	export let theme = 'xcode';
	export let readOnly = false;
	export let onValueChange = () => {};

	let prevLang = "text"
	let editorElement: HTMLDivElement;
	export let editor: any;

	onMount(() => {
		ace.config.set('basePath', '/node_modules/ace-builds/src-min-noconflict');
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
		console.log("destroy")
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

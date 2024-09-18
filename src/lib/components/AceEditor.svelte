<script lang="ts">
	import ace from 'ace-builds/src-noconflict/ace';
	import 'ace-builds/src-noconflict/theme-xcode';
	import 'ace-builds/src-noconflict/ext-language_tools';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import type { Ace } from 'ace-builds';

	export let readOnly = false
	export let value: string = '';
	export let language: string = "text";
	let editor: Ace.Editor;
	let editorElement: HTMLDivElement;
	let prevLang = "text"



	onMount(() => {
		console.log("mount editor", value)
		ace.config.set('basePath', 'https://ajaxorg.github.io/ace-builds/src-min-noconflict/'); //get for mode base path url
		ace.require("ace/ext/language_tools");
		editor = ace.edit(editorElement);
		editor.setReadOnly(readOnly);
		editor.setTheme(`ace/theme/xcode`);
		editor.setValue(value, 1);
		// editor.session.setMode(`ace/mode/html`);
		editor.session.setUseWorker(true);
		editor.setOptions({
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: true,
		});
		// setLanguageMode(language); // Set initial language mode

		editor.session.on('change', () => {
			const newValue = editor.getValue();
			value = newValue
			console.log("newValue", newValue)

		});

		// return () => {
		// 	editor.destroy();
		// };
	});

	afterUpdate(() => {
		if (language != prevLang) {
			editor.session.setMode(`ace/mode/`+language);
		}
		prevLang = language
	});

	onDestroy(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		editor && editor.destroy();
	})
</script>

<style>
    .editor {
        width: 100%;
        height: 400px;
    }
</style>

<div class="editor" bind:this={editorElement}></div>
<script lang="ts">
	import ace from 'ace-builds/src-noconflict/ace';
	import 'ace-builds/src-noconflict/theme-xcode';
	import 'ace-builds/src-noconflict/ext-language_tools';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import type { Ace } from 'ace-builds';

	export let isDetail = false
	export let readOnly = false
	export let value: string = '';
	export let language: string = "text";
	let editor: Ace.Editor;
	let editorElement: HTMLDivElement;
	let prevLang = "text"



	onMount(() => {
		ace.config.set('basePath', 'https://ajaxorg.github.io/ace-builds/src-min-noconflict/'); //get for mode base path url
		// ace.config.set('basePath', '/ace-builds'); 
		ace.require("ace/ext/language_tools");
		editor = ace.edit(editorElement);
		editor.setReadOnly(readOnly);
		editor.setTheme(`ace/theme/xcode`);
		editor.setValue(value, 1);
		// editor.session.setMode(`ace/mode/html`);
		editor.session.setUseWorker(true);
		let addtionalOptions: {maxLines?: number, minLines?: number} = {
			maxLines: 30,
			minLines: 5
		}
		if (isDetail) {
			addtionalOptions = {}
		}
		editor.setOptions({
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: true,
			autoScrollEditorIntoView: true,
			...addtionalOptions
		});
		// setLanguageMode(language); // Set initial language mode

		editor.session.on('change', () => {
			const newValue = editor.getValue();
			value = newValue
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
        /*height: 400px;*/
    }
</style>

<div class="editor" bind:this={editorElement}></div>
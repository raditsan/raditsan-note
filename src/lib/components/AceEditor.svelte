<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import ace from 'ace-builds/src-noconflict/ace';
	import 'ace-builds/src-noconflict/theme-xcode';

	export let value = '';
	export let language = 'javascript'; // Default language mode
	export let theme = 'xcode'; // Default theme
	export let readOnly = false;
	export let onValueChange = () => {};

	let editorElement: HTMLDivElement;
	export let editor: any;

	onMount(() => {
		editor = ace.edit(editorElement);
		editor.setTheme(`ace/theme/${theme}`);
		editor.setValue(value, 1);
		editor.setReadOnly(readOnly);
		editor.session.setUseWorker(false);
		setLanguageMode(language); // Set initial language mode

		editor.session.on('change', () => {
			const newValue = editor.getValue();
			value = newValue
			onValueChange(newValue);
		});

		return () => {
			editor.destroy();
		};
	});

	// Update language mode dynamically when language prop changes
	afterUpdate(() => {
		setLanguageMode(language);
	});

	async function setLanguageMode(lang: string) {
		try {
			const response = await fetch('/code/'+lang)
			const script = await response.text()
			eval(script);
			editor.session.setMode("ace/mode/"+lang);
			// editor.session.setMode(`ace/mode/${lang}`);
		} catch (e: unknown) {
			console.log("e", e.message)
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

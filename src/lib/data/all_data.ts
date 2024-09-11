import {
	javascript,
	typescript,
	java,
	css,
	swift,
	plaintext, 
	php, 
	shell,
	csharp, 
	dart,
	awk,
	bash,
	kotlin,
	go,
	graphql,
	json,
	scss,
	perl,
	sql,
	xml,
	sas,
	dockerfile,
	objectivec,
	less,
	
} from 'svelte-highlight/languages';

const listCategory = [
	{
		value: "code",
		name: "CODE"
	},{
		value: "other",
		name: "OTHER"
	},
]
const listCode = [
	{
		value: "all",
		name: "All",
		hljsRegister: plaintext,
	},
	...[{
		value: "awk",
		name: "AWK",
		hljsRegister: awk,
	},{
		value: "dockerfile",
		name: "Docker File",
		hljsRegister: dockerfile,
	},{
		value: "objectivec",
		name: "Objective C",
		hljsRegister: objectivec,
	},{
		value: "less",
		name: "Less",
		hljsRegister: less,
	},{
		value: "xml",
		name: "XML",
		hljsRegister: xml,
	},{
		value: "sas",
		name: "SAS",
		hljsRegister: sas,
	},{
		value: "sql",
		name: "SQL",
		hljsRegister: sql,
	},{
		value: "perl",
		name: "PERL",
		hljsRegister: perl,
	},{
		value: "bash",
		name: "BASH",
		hljsRegister: bash,
	},{
		value: "swift",
		name: "Swift",
		hljsRegister: swift,
	},{
		value: "swiftui",
		name: "SwiftUI",
		hljsRegister: swift,
	},{
		value: "java",
		name: "Java",
		hljsRegister: java,
	},{
		value: "json",
		name: "JSON",
		hljsRegister: json,
	},{
		value: "kotlin",
		name: "Kotlin",
		hljsRegister: kotlin,
	},{
		value: "go",
		name: "GO",
		hljsRegister: go,
	},{
		value: "graphql",
		name: "GraphQL",
		hljsRegister: graphql,
	},{
		value: "javascript",
		name: "Javascript",
		hljsRegister: javascript,
	},{
		value: "typescript",
		name: "Typescript",
		hljsRegister: typescript,
	},{
		value: "php",
		name: "PHP",
		hljsRegister: php,
	},{
		value: "svelte",
		name: "Svelte",
		hljsRegister: typescript,
	},{
		value: "C#",
		name: "C#",
		hljsRegister: csharp,
	},{
		value: "html",
		name: "HTML",
		hljsRegister: plaintext,
	},{
		value: "css",
		name: "CSS",
		hljsRegister: css,
	},{
		value: "scss",
		name: "SCSS",
		hljsRegister: scss,
	},{
		value: "text",
		name: "TEXT",
		hljsRegister: plaintext,
	},{
		value: "shellscript",
		name: "ShellScript",
		hljsRegister: shell,
	},{
		value: "flutter",
		name: "Flutter",
		hljsRegister: dart,
	},{
		value: "dart",
		name: "Dart",
		hljsRegister: dart,
	}].sort((a, b) => a.name.localeCompare(b.name))
]
const getListCategory = () => listCategory
const getListCode = () => {
	
	return listCode.map((e) => ({
		name: e.name,
		value: e.value
	}))
}

const getHljsLanguage = (lang: string) => {
	return listCode.find((e) => e.value == lang)?.hljsRegister ?? plaintext
}

export {
	getHljsLanguage,
	getListCode,
	getListCategory,
}
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
	less, type LanguageType

} from 'svelte-highlight/languages';
import { hljsDefineSvelte } from '$lib/data/svelte-highlight';
// const { hljsDefineSvelte } = await import('./svelte-highlight');
const svelte: LanguageType<string> = {
	name: "svelte",
	register: hljsDefineSvelte
}
const listCategory = [
	{
		value: "code",
		name: "CODE"
	},{
		value: "other",
		name: "OTHER"
	},
]

// const listCode = [
// 	{
// 		value: "all",
// 		name: "All",
// 		hljsRegister: plaintext,
// 	},
// 	...[{
// 		value: "awk",
// 		name: "AWK",
// 		hljsRegister: awk,
// 	},{
// 		value: "dockerfile",
// 		name: "Docker File",
// 		hljsRegister: dockerfile,
// 	},{
// 		value: "git",
// 		name: "GIT",
// 		// hljsRegister: dockerfile,
// 	},{
// 		value: "node",
// 		name: "Node",
// 		// hljsRegister: dockerfile,
// 	},{
// 		value: "terminal",
// 		name: "Terminal",
// 		// hljsRegister: dockerfile,
// 	},{
// 		value: "figma",
// 		name: "Figma",
// 		hljsRegister: plaintext,
// 	},{
// 		value: "url",
// 		name: "URL",
// 		hljsRegister: plaintext,
// 	},{
// 		value: "objectivec",
// 		name: "Objective C",
// 		hljsRegister: objectivec,
// 	},{
// 		value: "less",
// 		name: "Less",
// 		hljsRegister: less,
// 	},{
// 		value: "xml",
// 		name: "XML",
// 		hljsRegister: xml,
// 	},{
// 		value: "sas",
// 		name: "SAS",
// 		hljsRegister: sas,
// 	},{
// 		value: "sql",
// 		name: "SQL",
// 		hljsRegister: sql,
// 	},{
// 		value: "perl",
// 		name: "PERL",
// 		hljsRegister: perl,
// 	},{
// 		value: "bash",
// 		name: "BASH",
// 		hljsRegister: bash,
// 	},{
// 		value: "swift",
// 		name: "Swift",
// 		hljsRegister: swift,
// 	},{
// 		value: "swiftui",
// 		name: "SwiftUI",
// 		hljsRegister: swift,
// 	},{
// 		value: "java",
// 		name: "Java",
// 		hljsRegister: java,
// 	},{
// 		value: "json",
// 		name: "JSON",
// 		hljsRegister: json,
// 	},{
// 		value: "kotlin",
// 		name: "Kotlin",
// 		hljsRegister: kotlin,
// 	},{
// 		value: "go",
// 		name: "GO",
// 		hljsRegister: go,
// 	},{
// 		value: "graphql",
// 		name: "GraphQL",
// 		hljsRegister: graphql,
// 	},{
// 		value: "javascript",
// 		name: "Javascript",
// 		hljsRegister: javascript,
// 	},{
// 		value: "typescript",
// 		name: "Typescript",
// 		hljsRegister: typescript,
// 	},{
// 		value: "php",
// 		name: "PHP",
// 		hljsRegister: php,
// 	},{
// 		value: "svelte",
// 		name: "Svelte",
// 		hljsRegister: svelte,
// 	},{
// 		value: "csharp",
// 		name: "C#",
// 		hljsRegister: csharp,
// 	},{
// 		value: "html",
// 		name: "HTML",
// 		hljsRegister: css,
// 	},{
// 		value: "css",
// 		name: "CSS",
// 		hljsRegister: css,
// 	},{
// 		value: "scss",
// 		name: "SCSS",
// 		hljsRegister: scss,
// 	},{
// 		value: "text",
// 		name: "TEXT",
// 		hljsRegister: plaintext,
// 	},{
// 		value: "shellscript",
// 		valueCodeAce: "sh.js",
// 		name: "ShellScript",
// 		hljsRegister: shell,
// 	},{
// 		value: "flutter",
// 		name: "Flutter",
// 		hljsRegister: dart,
// 	},{
// 		value: "dart",
// 		name: "Dart",
// 		hljsRegister: dart,
// 	}].sort((a, b) => a.name.localeCompare(b.name))
// ]

const listCode = [
	{
		"value": "all",
		"name": "All"
	},
	...[
		{
			"value": "svelte",
			"name": "Svelte"
		},
		{
			"value": "terminal",
			"name": "Terminal"
		},
		{
			"value": "figma",
			"name": "Figma"
		},
		{
			"value": "url",
			"name": "URL"
		},
		{
			"value": "abap",
			"name": "abap"
		},
		{
			"value": "abc",
			"name": "abc"
		},
		{
			"value": "actionscript",
			"name": "actionscript"
		},
		{
			"value": "ada",
			"name": "ada"
		},
		{
			"value": "alda",
			"name": "alda"
		},
		{
			"value": "apache_conf",
			"name": "apache_conf"
		},
		{
			"value": "apex",
			"name": "apex"
		},
		{
			"value": "applescript",
			"name": "applescript"
		},
		{
			"value": "aql",
			"name": "aql"
		},
		{
			"value": "asciidoc",
			"name": "asciidoc"
		},
		{
			"value": "asl",
			"name": "asl"
		},
		{
			"value": "assembly_arm32",
			"name": "assembly_arm32"
		},
		{
			"value": "assembly_x86",
			"name": "assembly_x86"
		},
		{
			"value": "astro",
			"name": "astro"
		},
		{
			"value": "autohotkey",
			"name": "autohotkey"
		},
		{
			"value": "batchfile",
			"name": "batchfile"
		},
		{
			"value": "bibtex",
			"name": "bibtex"
		},
		{
			"value": "c_cpp",
			"name": "c_cpp"
		},
		{
			"value": "c9search",
			"name": "c9search"
		},
		{
			"value": "cirru",
			"name": "cirru"
		},
		{
			"value": "clojure",
			"name": "clojure"
		},
		{
			"value": "cobol",
			"name": "cobol"
		},
		{
			"value": "coffee",
			"name": "coffee"
		},
		{
			"value": "coldfusion",
			"name": "coldfusion"
		},
		{
			"value": "crystal",
			"name": "crystal"
		},
		{
			"value": "csharp",
			"name": "csharp"
		},
		{
			"value": "csound_document",
			"name": "csound_document"
		},
		{
			"value": "csound_orchestra",
			"name": "csound_orchestra"
		},
		{
			"value": "csound_score",
			"name": "csound_score"
		},
		{
			"value": "csp",
			"name": "csp"
		},
		{
			"value": "css",
			"name": "css"
		},
		{
			"value": "curly",
			"name": "curly"
		},
		{
			"value": "cuttlefish",
			"name": "cuttlefish"
		},
		{
			"value": "d",
			"name": "d"
		},
		{
			"value": "dart",
			"name": "dart"
		},
		{
			"value": "diff",
			"name": "diff"
		},
		{
			"value": "django",
			"name": "django"
		},
		{
			"value": "dockerfile",
			"name": "dockerfile"
		},
		{
			"value": "dot",
			"name": "dot"
		},
		{
			"value": "drools",
			"name": "drools"
		},
		{
			"value": "edifact",
			"name": "edifact"
		},
		{
			"value": "eiffel",
			"name": "eiffel"
		},
		{
			"value": "ejs",
			"name": "ejs"
		},
		{
			"value": "elixir",
			"name": "elixir"
		},
		{
			"value": "elm",
			"name": "elm"
		},
		{
			"value": "erlang",
			"name": "erlang"
		},
		{
			"value": "flix",
			"name": "flix"
		},
		{
			"value": "forth",
			"name": "forth"
		},
		{
			"value": "fortran",
			"name": "fortran"
		},
		{
			"value": "fsharp",
			"name": "fsharp"
		},
		{
			"value": "fsl",
			"name": "fsl"
		},
		{
			"value": "ftl",
			"name": "ftl"
		},
		{
			"value": "gcode",
			"name": "gcode"
		},
		{
			"value": "gherkin",
			"name": "gherkin"
		},
		{
			"value": "gitignore",
			"name": "gitignore"
		},
		{
			"value": "glsl",
			"name": "glsl"
		},
		{
			"value": "gobstones",
			"name": "gobstones"
		},
		{
			"value": "golang",
			"name": "golang"
		},
		{
			"value": "graphqlschema",
			"name": "graphqlschema"
		},
		{
			"value": "groovy",
			"name": "groovy"
		},
		{
			"value": "haml",
			"name": "haml"
		},
		{
			"value": "handlebars",
			"name": "handlebars"
		},
		{
			"value": "haskell_cabal",
			"name": "haskell_cabal"
		},
		{
			"value": "haskell",
			"name": "haskell"
		},
		{
			"value": "haxe",
			"name": "haxe"
		},
		{
			"value": "hjson",
			"name": "hjson"
		},
		{
			"value": "html_elixir",
			"name": "html_elixir"
		},
		{
			"value": "html_ruby",
			"name": "html_ruby"
		},
		{
			"value": "html",
			"name": "html"
		},
		{
			"value": "ini",
			"name": "ini"
		},
		{
			"value": "io",
			"name": "io"
		},
		{
			"value": "ion",
			"name": "ion"
		},
		{
			"value": "jack",
			"name": "jack"
		},
		{
			"value": "jade",
			"name": "jade"
		},
		{
			"value": "java",
			"name": "java"
		},
		{
			"value": "javascript",
			"name": "javascript"
		},
		{
			"value": "jexl",
			"name": "jexl"
		},
		{
			"value": "json",
			"name": "json"
		},
		{
			"value": "json5",
			"name": "json5"
		},
		{
			"value": "jsoniq",
			"name": "jsoniq"
		},
		{
			"value": "jsp",
			"name": "jsp"
		},
		{
			"value": "jssm",
			"name": "jssm"
		},
		{
			"value": "jsx",
			"name": "jsx"
		},
		{
			"value": "julia",
			"name": "julia"
		},
		{
			"value": "kotlin",
			"name": "kotlin"
		},
		{
			"value": "latex",
			"name": "latex"
		},
		{
			"value": "latte",
			"name": "latte"
		},
		{
			"value": "less",
			"name": "less"
		},
		{
			"value": "liquid",
			"name": "liquid"
		},
		{
			"value": "lisp",
			"name": "lisp"
		},
		{
			"value": "livescript",
			"name": "livescript"
		},
		{
			"value": "logiql",
			"name": "logiql"
		},
		{
			"value": "logtalk",
			"name": "logtalk"
		},
		{
			"value": "lsl",
			"name": "lsl"
		},
		{
			"value": "lua",
			"name": "lua"
		},
		{
			"value": "luapage",
			"name": "luapage"
		},
		{
			"value": "lucene",
			"name": "lucene"
		},
		{
			"value": "makefile",
			"name": "makefile"
		},
		{
			"value": "markdown",
			"name": "markdown"
		},
		{
			"value": "mask",
			"name": "mask"
		},
		{
			"value": "matlab",
			"name": "matlab"
		},
		{
			"value": "maze",
			"name": "maze"
		},
		{
			"value": "mediawiki",
			"name": "mediawiki"
		},
		{
			"value": "mel",
			"name": "mel"
		},
		{
			"value": "mips",
			"name": "mips"
		},
		{
			"value": "mixal",
			"name": "mixal"
		},
		{
			"value": "mushcode",
			"name": "mushcode"
		},
		{
			"value": "mysql",
			"name": "mysql"
		},
		{
			"value": "nasal",
			"name": "nasal"
		},
		{
			"value": "nginx",
			"name": "nginx"
		},
		{
			"value": "nim",
			"name": "nim"
		},
		{
			"value": "nix",
			"name": "nix"
		},
		{
			"value": "nsis",
			"name": "nsis"
		},
		{
			"value": "nunjucks",
			"name": "nunjucks"
		},
		{
			"value": "objectivec",
			"name": "objectivec"
		},
		{
			"value": "ocaml",
			"name": "ocaml"
		},
		{
			"value": "odin",
			"name": "odin"
		},
		{
			"value": "partiql",
			"name": "partiql"
		},
		{
			"value": "pascal",
			"name": "pascal"
		},
		{
			"value": "perl",
			"name": "perl"
		},
		{
			"value": "pgsql",
			"name": "pgsql"
		},
		{
			"value": "php_laravel_blade",
			"name": "php_laravel_blade"
		},
		{
			"value": "php",
			"name": "php"
		},
		{
			"value": "pig",
			"name": "pig"
		},
		{
			"value": "plain_text",
			"name": "plain_text"
		},
		{
			"value": "plsql",
			"name": "plsql"
		},
		{
			"value": "powershell",
			"name": "powershell"
		},
		{
			"value": "praat",
			"name": "praat"
		},
		{
			"value": "prisma",
			"name": "prisma"
		},
		{
			"value": "prolog",
			"name": "prolog"
		},
		{
			"value": "properties",
			"name": "properties"
		},
		{
			"value": "protobuf",
			"name": "protobuf"
		},
		{
			"value": "prql",
			"name": "prql"
		},
		{
			"value": "puppet",
			"name": "puppet"
		},
		{
			"value": "python",
			"name": "python"
		},
		{
			"value": "qml",
			"name": "qml"
		},
		{
			"value": "r",
			"name": "r"
		},
		{
			"value": "raku",
			"name": "raku"
		},
		{
			"value": "razor",
			"name": "razor"
		},
		{
			"value": "rdoc",
			"name": "rdoc"
		},
		{
			"value": "red",
			"name": "red"
		},
		{
			"value": "redshift",
			"name": "redshift"
		},
		{
			"value": "rhtml",
			"name": "rhtml"
		},
		{
			"value": "robot",
			"name": "robot"
		},
		{
			"value": "rst",
			"name": "rst"
		},
		{
			"value": "ruby",
			"name": "ruby"
		},
		{
			"value": "rust",
			"name": "rust"
		},
		{
			"value": "sac",
			"name": "sac"
		},
		{
			"value": "sass",
			"name": "sass"
		},
		{
			"value": "scad",
			"name": "scad"
		},
		{
			"value": "scala",
			"name": "scala"
		},
		{
			"value": "scheme",
			"name": "scheme"
		},
		{
			"value": "scrypt",
			"name": "scrypt"
		},
		{
			"value": "scss",
			"name": "scss"
		},
		{
			"value": "sh",
			"name": "sh"
		},
		{
			"value": "sjs",
			"name": "sjs"
		},
		{
			"value": "slim",
			"name": "slim"
		},
		{
			"value": "smarty",
			"name": "smarty"
		},
		{
			"value": "smithy",
			"name": "smithy"
		},
		{
			"value": "snippets",
			"name": "snippets"
		},
		{
			"value": "soy_template",
			"name": "soy_template"
		},
		{
			"value": "space",
			"name": "space"
		},
		{
			"value": "sparql",
			"name": "sparql"
		},
		{
			"value": "sql",
			"name": "sql"
		},
		{
			"value": "sqlserver",
			"name": "sqlserver"
		},
		{
			"value": "stylus",
			"name": "stylus"
		},
		{
			"value": "svg",
			"name": "svg"
		},
		{
			"value": "swift",
			"name": "swift"
		},
		{
			"value": "tcl",
			"name": "tcl"
		},
		{
			"value": "terraform",
			"name": "terraform"
		},
		{
			"value": "tex",
			"name": "tex"
		},
		{
			"value": "text",
			"name": "text"
		},
		{
			"value": "textile",
			"name": "textile"
		},
		{
			"value": "toml",
			"name": "toml"
		},
		{
			"value": "tsx",
			"name": "tsx"
		},
		{
			"value": "turtle",
			"name": "turtle"
		},
		{
			"value": "twig",
			"name": "twig"
		},
		{
			"value": "typescript",
			"name": "typescript"
		},
		{
			"value": "vala",
			"name": "vala"
		},
		{
			"value": "vbscript",
			"name": "vbscript"
		},
		{
			"value": "velocity",
			"name": "velocity"
		},
		{
			"value": "verilog",
			"name": "verilog"
		},
		{
			"value": "vhdl",
			"name": "vhdl"
		},
		{
			"value": "visualforce",
			"name": "visualforce"
		},
		{
			"value": "vue",
			"name": "vue"
		},
		{
			"value": "wollok",
			"name": "wollok"
		},
		{
			"value": "xml",
			"name": "xml"
		},
		{
			"value": "xquery",
			"name": "xquery"
		},
		{
			"value": "yaml",
			"name": "yaml"
		},
		{
			"value": "zeek",
			"name": "zeek"
		},
		{
			"value": "zig",
			"name": "zig"
		}
	].sort((a, b) => a.name.localeCompare(b.name))
]

const getListCategory = () => listCategory
const getListCode = () => {
	
	return listCode.map((e) => ({
		name: e.name,
		value: e.value
	}))
}

// const getHljsLanguage = (lang: string) => {
// 	return listCode.find((e) => e.value == lang)?.hljsRegister ?? plaintext
// }

// const getAceLanguage = (lang: string) => {
// 	return listCode.find((e) => e.value == lang.replaceAll(".js", ""))?.valueCodeAce ?? lang
// }

export {
	// getHljsLanguage,
	getListCode,
	getListCategory,
	// getAceLanguage,
}
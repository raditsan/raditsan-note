/*
Language: Svelte.js
Requires: xml.js, javascript.js, css.js
Author: Alexey Schebelev
Description: Components of Svelte Framework
Link: https://github.com/AlexxNB/highlightjs-svelte/blob/master/src/svelte.js
*/

import type { HLJSApi } from "highlight.js";

export function hljsDefineSvelte(hljs: HLJSApi) {
  return {
    subLanguage: "xml",
    contains: [
      hljs.COMMENT("<!--", "-->", {
        relevance: 10,
      }),
      {
        begin: /^(\s*)(<script(\s*context="module")?>)/gm,
        end: /^(\s*)(<\/script>)/gm,
        subLanguage: "javascript",
        excludeBegin: true,
        excludeEnd: true,
        contains:[
          {
            begin: /^(\s*)(\$:)/gm,
            end: /(\s*)/gm,
            className: 'keyword'
          }
        ]
      },
      {
        begin: /^(\s*)(<style.*>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: "css",
        excludeBegin: true,
        excludeEnd: true,
      },
      {
        begin: /\{/gm,
        end: /\}/gm,
        subLanguage: "javascript",
        contains:[
          {
            begin: /[\{]/,
            end: /[\}]/,
            skip: true
          },
          {
            begin: /([#:\/@])(if|else|each|await|then|catch|debug|html)/gm,
            className:'keyword',
            relevance: 10,
          }
        ],
      },
    ]
  }
}
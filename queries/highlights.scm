; Comments
(comment) @comment

; Keywords
("pragma" @keyword)
("import" @keyword)
("export" @keyword)
("module" @keyword)
("ledger" @keyword)
("circuit" @keyword)
("witness" @keyword)
("contract" @keyword)
("struct" @keyword)
("enum" @keyword)
("constructor" @keyword.function)
("pure" @keyword.modifier)
("sealed" @keyword.modifier)
("prefix" @keyword.modifier)
("return" @keyword.return)
("if" @keyword.conditional)
("else" @keyword.conditional)
("for" @keyword.repeat)
("of" @keyword.repeat)
("assert" @keyword)
("const" @keyword)
("default" @keyword)
("map" @keyword)
("fold" @keyword)
("disclose" @keyword)
("pad" @keyword)

; Operators
("=" @operator)
("+=" @operator)
("-=" @operator)
("==" @operator)
("!=" @operator)
(">" @operator)
("<" @operator)
(">=" @operator)
("<=" @operator)
("!" @operator)
("&&" @operator)
("||" @operator)
("+" @operator)
("-" @operator)
("*" @operator)
(":" @operator)
("." @operator)
("as" @operator)
("=>" @operator)
("?" @operator)
(".." @operator)
("..." @operator)

; Identifiers
(id) @variable
(_module_name) @module
(_function_name) @function
(_struct_name) @type
(_enum_name) @type
(_contract_name) @type
(_tvar_name) @type.parameter

; Types
(tref (id) @type)
("Boolean" @type.builtin)
("Field" @type.builtin)
("Uint" @type.builtin)
("Bytes" @type.builtin)
("Opaque" @type.builtin)
("Vector" @type.builtin)

; Literals
(nat) @number
(str) @string
(file) @string
(version) @constant
("true" @boolean)
("false" @boolean)

; Punctuation
(";" @punctuation.delimiter)
("," @punctuation.delimiter)
("(" @punctuation.bracket)
(")" @punctuation.bracket)
("[" @punctuation.bracket)
("]" @punctuation.bracket)
("{" @punctuation.bracket)
("}" @punctuation.bracket)
("<" @punctuation.bracket)
(">" @punctuation.bracket)

; Special Constructs
(pragma (id) @property)
(import_name (id) @namespace)
(gargs (_) @type.parameter)
(struct_arg (id) @field)
(pattern_struct_elt (id) @field)
(term (_expr8 "." (id) @function.call (expr) @parameter))

; Function Definitions and Calls
(cdefn (_function_name) @function)
(edecl (_function_name) @function)
(wdecl (id) @function)
(ecdecl_circuit (id) @function)
(fun (id) @function)

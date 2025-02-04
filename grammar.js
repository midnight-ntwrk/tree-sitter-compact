/**
 * @file A zero-knowledge smart contract programming language
 * @author Lucas Rosa <lucas.rosa@shielded.io>
 * @license Apache
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "compact",

  rules: {
    // Compact (program)
    //
    // program 	→	  pelt … pelt  eof
    source_file: ($) => repeat($.pelt),

    // Program-element (pelt)
    //
    // pelt → pragma
    //  	  →	incld
    //  	  →	mdefn
    //  	  →	idecl
    //  	  →	xdecl
    //  	  →	ldecl
    //  	  →	lconstructor
    //  	  →	cdefn
    //  	  →	edecl
    //  	  →	wdecl
    //  	  →	ecdecl
    //  	  →	struct
    //  	  →	enumdef
    pelt: ($) =>
      choice(
        $.pragma,
        $.incld,
        $.mdefn,
        // $.idecl,
        // $.xdecl,
        // $.ldecl,
        // $.lconstructor,
        // $.cdefn,
        // $.edecl,
        // $.wdecl,
        // $.ecdecl,
        // $.struct,
        // $.enumdef,
      ),

    // Pragma rules
    //
    // pragma →	pragma id version-expr ;
    pragma: ($) => seq("pragma", $.id, $._version_expr, ";"),

    // Version-expression (version-expr)
    //
    // version-expr →	version-expr || version-expr0
    //  	          →	version-expr0
    _version_expr: ($) =>
      prec.left(
        1,
        choice(seq($._version_expr, $.or, $._version_expr0), $._version_expr0),
      ),

    // Version-expression0 (version-expr0)
    //
    // version-expr0 → version-expr0 && version-term
    //  	           → version-term
    _version_expr0: ($) =>
      prec.left(
        2,
        choice(seq($._version_expr0, $.and, $._version_term), $._version_term),
      ),

    // Version-Term (version-term)
    //
    // version-term →	version-atom
    //  	          →	! version-term
    //  	          →	< version-atom
    //  	          →	<= version-atom
    //  	          →	>= version-atom
    //  	          →	> version-atom
    //  	          →	( version-expr )
    _version_term: ($) =>
      choice(
        $._version_atom,
        seq($._version_op, $._version_atom),
        seq("(", $._version_expr, ")"),
      ),

    // Version-atom (version-atom)
    //
    // version-atom →	nat
    //  	          →	version
    _version_atom: ($) => choice($.nat, $.version),

    _version_op: ($) =>
      choice(
        $.not,
        $.greater_than,
        $.less_than,
        $.greater_than_or_equal,
        $.less_than_or_equal,
      ),

    // Include (incld)
    //
    // incld → include file ;
    incld: ($) => seq("include", $.file, ";"),

    // Module-definition (mdefn)
    //
    // mdefn → export^opt module module-name gparams^opt { pelt … pelt }
    mdefn: ($) =>
      seq(
        optional($.export),
        "module",
        $.module_name,
        optional($.gparams),
        "{",
        repeat($.pelt),
        "}",
      ),

    // Generic-parameter-list (gparams)
    //
    // gparams → < generic-param , … , generic-param >
    gparams: ($) => seq("<", commaSep1($.generic_param), ">"),

    // Generic-parameter (generic-param)
    //
    // generic-param → # tvar-name
    //               → tvar-name
    generic_param: ($) => choice(seq("#", $.tvar_name), $.tvar_name),

    // Export-modifier (export)
    //
    // export → export
    export: ($) => "export",

    // OPS
    greater_than: ($) => ">",
    less_than: ($) => "<",
    greater_than_or_equal: ($) => ">=",
    less_than_or_equal: ($) => "<=",
    not: ($) => "!",
    and: ($) => "&&",
    or: ($) => "||",

    // LITERALS

    // identifier (id, module-name, function-name, struct-name, enum-name, contract-name, tvar-name)
    //
    // identifiers have the same syntax as Typescript identifiers
    id: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    module_name: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    function_name: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    struct_name: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    enum_name: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    contract_name: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    tvar_name: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,

    // field-literal (nat)
    //
    // a field literal is 0 or a natural number formed from a sequence
    // of digits starting with 1-9, e.g. 723, whose value does not exceed
    // the maximum field value
    nat: ($) => choice("0", /[1-9][0-9]*/),

    // string-literal (str, file)
    //
    // The basic string-literal rule that matches TypeScript strings
    str: ($) => token(/"[^"]*"/),
    file: ($) => token(/"[^"]*"/),

    // version-literal (version)
    //
    // a version literal takes the form nat or nat.nat or nat.nat.nat,
    // e.g., 1.2 or 1.2.3, representing major, minor, and bugfix versions
    version: ($) => /[0-9]+(\.[0-9]+){0,2}/,
  },
});

/**
 * Creates a rule for one or more comma-separated occurrences of another rule
 * @param {Rule} rule - The rule to be repeated
 * @returns {SeqRule} A rule that matches one or more occurrences of the input rule separated by commas
 */
function commaSep1(rule) {
  return seq(
    rule,
    repeat(seq(",", rule)),
    optional(","), // Optional trailing comma
  );
}

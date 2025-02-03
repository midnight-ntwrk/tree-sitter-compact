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
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});

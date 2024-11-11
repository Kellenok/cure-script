# oniguruma-to-js

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Convert Oniguruma-flavor Regexp to JavaScript native RegExp.

Supported Oniguruma features:

- `[:alnum:]`, `[:alpha:]` etc. POSIX bracket expressions
- `(?x)` extended, free-spacing mode
- `(?i:..)` flags modifiers
- `(?>..)` atomic group via [`regex`](https://github.com/slevithan/regex)
- `..*+` possessive quantifiers via [`regex`](https://github.com/slevithan/regex)
- `\h` `\H` hex digit shorthands
- `\p{Blank}` `\p{Print}` etc. Oniguruma-flavored unicode property escapes

## Usage

```bash
npm i oniguruma-to-js
```

```ts
import { onigurumaToRegexp } from 'oniguruma-to-js'

const re = onigurumaToRegexp(`[[:alnum:]_]+`)
console.log(re) // /^[a-zA-Z0-9_]+$/
```

```ts
import { construct, syntaxLowering } from 'oniguruma-to-js'

const pattern = syntaxLowering(`(?x:
  \d+    # Match one or more digits
  \s*    # Match zero or more whitespace characters
  [A-Z]+ # Match one or more uppercase letters
)`)
console.log(pattern) // "\d+\s*[A-Z]+"

const re = construct(pattern)
console.log(re) // /\d+\s*[A-Z]+/
```

### Additional Features

#### Lowering TextMate Grammar

Traverse all the regex patterns in a TextMate grammar, and apply `syntaxLowering` to lower the syntax.

```ts
import { loweringTextmateGrammar } from 'oniguruma-to-js/textmate'
import grammar from '../path/to/grammars/json.json'

const lowered = loweringTextmateGrammar(grammar)
```

Note this function will not guarantee the correctness of the result, you may need to verify the result manually.

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2024-PRESENT [Anthony Fu](https://github.com/antfu)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/oniguruma-to-js?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/oniguruma-to-js
[npm-downloads-src]: https://img.shields.io/npm/dm/oniguruma-to-js?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/oniguruma-to-js
[bundle-src]: https://img.shields.io/bundlephobia/minzip/oniguruma-to-js?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=oniguruma-to-js
[license-src]: https://img.shields.io/github/license/antfu/oniguruma-to-js.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/antfu/oniguruma-to-js/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/oniguruma-to-js

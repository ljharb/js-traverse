# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.6.14](https://github.com/ljharb/js-traverse/compare/v0.6.13...v0.6.14) - 2026-10-05

### Commits

- [Fix] an `undefined` or `null` options argument is the same as none [`e3bb15c`](https://github.com/ljharb/js-traverse/commit/e3bb15c5094f4118b7ead5b2af9fecfda1e7af8d)
- [Fix] `get`, `has`: a null or undefined node along the path means the path does not exist [`eacd4ab`](https://github.com/ljharb/js-traverse/commit/eacd4ab2a62b8afaea2d844c567cf536bbc842bb)

## [v0.6.13](https://github.com/ljharb/js-traverse/compare/v0.6.12...v0.6.13) - 2026-10-05

### Commits

- [Fix] `set`: convert path segments with `es-to-primitive` [`c46f7e7`](https://github.com/ljharb/js-traverse/commit/c46f7e77abdc3dad8d390aef03454bd1e95de97e)

## [v0.6.12](https://github.com/ljharb/js-traverse/compare/v0.6.11...v0.6.12) - 2026-10-05

### Fixed

- [Fix] `remove`, `delete`: visit every remaining sibling exactly once [`#18`](https://github.com/ljharb/js-traverse/issues/18)

### Commits

- [Fix] `set`: only follow and create own properties; never write to a built-in prototype [`81ccab4`](https://github.com/ljharb/js-traverse/commit/81ccab43e379cf42eb2a5f689630f7f79b3d71b8)
- [Fix] `clone`, `map`, immutable `forEach`: copy an own `__proto__` key as an own property [`770d9fc`](https://github.com/ljharb/js-traverse/commit/770d9fc49bb07bc198b5b86308e48a894819a428)
- [Fix] `clone`, `map`, immutable `forEach`: copy boxed primitives instead of sharing them [`3e03610`](https://github.com/ljharb/js-traverse/commit/3e03610a3a0196317dedb887515bfde96c3bc6bf)
- [Dev Deps] update `eslint` [`dabef68`](https://github.com/ljharb/js-traverse/commit/dabef6872bcdb7d06c06fb022312f5d4cf6591f8)
- [Fix] `set`: do not descend into a property that could not be created as an own property [`37a9ebd`](https://github.com/ljharb/js-traverse/commit/37a9ebd103d2a259c824c29cdcc3f0dfe1acffce)
- [Fix] `remove`: a repeated `remove()` removes the element that took the node's place [`940f4d7`](https://github.com/ljharb/js-traverse/commit/940f4d7a6e12840f2e4fb6a47004816a9d16d6ec)
- [actions] update workflows [`95382f8`](https://github.com/ljharb/js-traverse/commit/95382f871388610ac2ce3cab7a7548f1736290b6)
- [Tests] `clone`, `map`: add a test for a Buffer [`3631118`](https://github.com/ljharb/js-traverse/commit/3631118625e00d25584f0688f9ad22f3e014ef89)
- [Dev Deps] update `@ljharb/eslint-config`, `eslint` [`5691345`](https://github.com/ljharb/js-traverse/commit/56913457796ec1a6bbd92e76448383a9b599d928)
- [Dev Deps] update `@ljharb/eslint-config`, `auto-changelog`, `es-value-fixtures`, `eslint`, `npmignore`, `tape` [`3a92419`](https://github.com/ljharb/js-traverse/commit/3a92419ef5bf38d301cc2bd90a46d22ab6840c61)
- [Tests] avoid an io.js 1.x bug with index-like keys in object literals [`ee21263`](https://github.com/ljharb/js-traverse/commit/ee212636aa6c38d78533acd31e3589f4736aa2f7)
- [Refactor] avoid use of a dep [`e07218c`](https://github.com/ljharb/js-traverse/commit/e07218cd2a91fcee203da917d97eb0001d4a39db)
- [meta] omit some files [`60be911`](https://github.com/ljharb/js-traverse/commit/60be911a8953fbe9f35fc7a1ec163949ba518870)
- [Dev Deps] update `auto-changelog`; remove `encoding` [`79fe607`](https://github.com/ljharb/js-traverse/commit/79fe6072532432871f8feb0ce12ff5330de3f17c)
- [Dev Deps] update `eslint` [`f131e8b`](https://github.com/ljharb/js-traverse/commit/f131e8b944e37a5854e8d9dbd42dad1083f5599c)
- [Deps] update `typedarray.prototype.slice` [`4b22169`](https://github.com/ljharb/js-traverse/commit/4b221693f200ed4ae557420468f757d2bbad483e)
- [Deps] update `which-typed-array` [`c287366`](https://github.com/ljharb/js-traverse/commit/c2873661a14c509c67bd6628f7f1393c0b26bbd1)
- [actions] set least-privilege `cache-mode` [`fb61e0e`](https://github.com/ljharb/js-traverse/commit/fb61e0e5ec818e526dd2661e7e19672105506195)

## [v0.6.11](https://github.com/ljharb/js-traverse/compare/v0.6.10...v0.6.11) - 2025-01-15

### Fixed

- [Fix] `.has` should not return true on a falsy node [`#20`](https://github.com/ljharb/js-traverse/issues/20)

### Commits

- [Deps] update `gopd`, `typedarray.prototype.slice`, `which-typed-array` [`cc24fd2`](https://github.com/ljharb/js-traverse/commit/cc24fd22dfab620238d60967d12a6416cbc73770)
- [Dev Deps] update `es-value-fixtures`, `tape` [`d26f1b4`](https://github.com/ljharb/js-traverse/commit/d26f1b4cf2176849ebb22a28d8072b503f66b694)

## [v0.6.10](https://github.com/ljharb/js-traverse/compare/v0.6.9...v0.6.10) - 2024-09-12

### Fixed

- [Fix] continue iterating properly when items are removed [`#18`](https://github.com/ljharb/js-traverse/issues/18)

### Commits

- [Robustness] minimize use of prototype methods [`14f3ef3`](https://github.com/ljharb/js-traverse/commit/14f3ef33c2f86dcc557e1978e102d3b274e83719)
- [Dev Deps] update `@ljharb/eslint-config`, `auto-changelog`, `tape` [`c232f79`](https://github.com/ljharb/js-traverse/commit/c232f79d7202eddfbad765532a24d260e3fac5ee)
- [Refactor] protect against an impossible bug [`368e82c`](https://github.com/ljharb/js-traverse/commit/368e82c5d8141e212ecaea1b3496c61af0e93bfe)
- [Tests] replace `aud` with `npm audit` [`343a68f`](https://github.com/ljharb/js-traverse/commit/343a68f0a73878150e42385434909ea60a2823e9)
- [Robustness] use a null object in `modifiers` [`8edc266`](https://github.com/ljharb/js-traverse/commit/8edc2669ba22e0112bb7f68bf8e3c99b018f0f51)
- [Dev Deps] add missing peer dep [`ecfc692`](https://github.com/ljharb/js-traverse/commit/ecfc6922eec7dde1dfd97d6048e638ef8de828d7)

## [v0.6.9](https://github.com/ljharb/js-traverse/compare/v0.6.8...v0.6.9) - 2024-04-08

### Commits

- [New] support cloning Typed Arrays [`18c32c5`](https://github.com/ljharb/js-traverse/commit/18c32c5ba8ebc84344925198bb29b6def97471fd)
- [New] [Fix] add `includeSymbols` option; partial revert of "[New] support enumerable Symbol properties" [`aab373f`](https://github.com/ljharb/js-traverse/commit/aab373f503f80f62ea958124c0cc9321f9fe0b78)
- [Fix] Add "isWritable" before writing to properties [`595d64e`](https://github.com/ljharb/js-traverse/commit/595d64e307452b805c4d209a6f77916e54c031ab)
- [actions] remove redundant finisher [`7539473`](https://github.com/ljharb/js-traverse/commit/7539473f969589ca19eee197d02b568b299cfebc)
- [Refactor] use an internal null options object instead of an `immutable` boolean [`0f1e6f1`](https://github.com/ljharb/js-traverse/commit/0f1e6f126a3d847864d3a80fc8227a2bb1f97c78)
- [Deps] update `typedarray.prototype.slice`, `which-typed-array` [`165f954`](https://github.com/ljharb/js-traverse/commit/165f954e540975b4a5db7f4b7134de2c0b48ee29)
- [Deps] update `typedarray.prototype.slice` [`ed483ed`](https://github.com/ljharb/js-traverse/commit/ed483ed7aa1cc85e8d7e25d2b2cd1e0881eb6522)
- [Dev Deps] update `tape` [`5ee670c`](https://github.com/ljharb/js-traverse/commit/5ee670cdc074026f087f18860d80a30c86921e46)

## [v0.6.8](https://github.com/ljharb/js-traverse/compare/v0.6.7...v0.6.8) - 2023-12-20

### Commits

- [New] support enumerable Symbol properties [`7d659e7`](https://github.com/ljharb/js-traverse/commit/7d659e78d43e69e6afc604e12b3ba3a5def0e46f)
- [actions] use reusable rebase action [`8a04a68`](https://github.com/ljharb/js-traverse/commit/8a04a68ea1b9651a4f07a2c87fb58c98633a9714)
- [meta] update license text so GitHub can identify it [`f94bda4`](https://github.com/ljharb/js-traverse/commit/f94bda4e5734f76891d8c3455b136ec615c9e6ce)
- [eslint] fix indentation [`7c907d6`](https://github.com/ljharb/js-traverse/commit/7c907d6d9cc476a02672c0b198e99205fca8e739)
- [Dev Deps] update `@ljharb/eslint-config`, `aud`, `npmignore`, `tape` [`8ca47dc`](https://github.com/ljharb/js-traverse/commit/8ca47dcbab9210716b0085f03771c8bb60a83c15)
- [Tests] Stop equal Dates from being flaky [`b5a9d3a`](https://github.com/ljharb/js-traverse/commit/b5a9d3a20ab64a3231b3ef5ac63b92f078d52946)
- [meta] add missing `engines.node` [`22952cf`](https://github.com/ljharb/js-traverse/commit/22952cf05165fc1ea1e148b2ddc2217ef1ecaa7e)
- [actions] update checkout action [`17d9faa`](https://github.com/ljharb/js-traverse/commit/17d9faa97c3b532d9b29ce44b13421c11e839629)
- [actions] update checkout action [`5462b41`](https://github.com/ljharb/js-traverse/commit/5462b4187387a625ce4efd564c4fb85e7d6c922f)

## [v0.6.7](https://github.com/ljharb/js-traverse/compare/v0.6.6...v0.6.7) - 2022-10-12

### Commits

- [eslint] fix indentation and whitespace [`89fc65c`](https://github.com/ljharb/js-traverse/commit/89fc65c5c9f2778cb63d583b1fcd83a31ca104f4)
- [eslint] cleanup [`1921966`](https://github.com/ljharb/js-traverse/commit/1921966fff1933e086d413acc44c2cf43a130fae)
- [meta] add `auto-changelog` [`c291ed2`](https://github.com/ljharb/js-traverse/commit/c291ed225c7b5257372a3d30951eaefc186107e7)
- [actions] add reusable workflows [`9a8fd34`](https://github.com/ljharb/js-traverse/commit/9a8fd34a6111f3f6dff43a7f22d272c46243d68f)
- [Dev Deps] update `tape` [`afd6a95`](https://github.com/ljharb/js-traverse/commit/afd6a95c5ab6b8ed2e29d044b5ff8724ed992c4d)
- [eslint] add eslint [`559372e`](https://github.com/ljharb/js-traverse/commit/559372ec96b460c45953c4c00f931f7fee36dce7)
- [readme] rename, add badges [`0e613fd`](https://github.com/ljharb/js-traverse/commit/0e613fdf7d3712e9b18a678d45cadd639233c79e)
- [meta] create FUNDING.yml; add `funding` in package.json [`26a9ae3`](https://github.com/ljharb/js-traverse/commit/26a9ae3a2e6ff06a3af9f1301ec4ef08ceb99bec)
- [meta] use `npmignore` to autogenerate an npmignore file [`0e09fe6`](https://github.com/ljharb/js-traverse/commit/0e09fe6105466f5e11ff4e1d12fa5cb77848b900)
- Only apps should have lockfiles [`e1ac253`](https://github.com/ljharb/js-traverse/commit/e1ac253acfa4917617c01b7d76d80741cbe379ce)
- [meta] update URLs [`035e2c0`](https://github.com/ljharb/js-traverse/commit/035e2c05c52acde26d5c13599748a901d1bbf237)
- [meta] add `safe-publish-latest` [`c2797ac`](https://github.com/ljharb/js-traverse/commit/c2797ac1218e9c8da1a9dd3863ecf3698e57878f)
- [Tests] add `aud` in `posttest` [`ff93f53`](https://github.com/ljharb/js-traverse/commit/ff93f5380201ccbd0bf22188ed4943b739174589)

## [v0.6.6](https://github.com/ljharb/js-traverse/compare/v0.6.5...v0.6.6) - 2013-09-23

### Commits

- remove tap as a dep to get around the cyclic library issues [`85e1b23`](https://github.com/ljharb/js-traverse/commit/85e1b23ea360b4e6918f998c95ef84d8a0d9a1d2)
- guard for the presence of getTime [`98f278a`](https://github.com/ljharb/js-traverse/commit/98f278a34a957134688e147ec65b1b1115244234)
- use getTime() for firefox browser support [`ee928ca`](https://github.com/ljharb/js-traverse/commit/ee928ca5c2b6a3b19cecd01a743d38d3cddaccf5)

## [v0.6.5](https://github.com/ljharb/js-traverse/compare/v0.6.4...v0.6.5) - 2013-08-30

### Commits

- fix for Cannot convert null to object  at hasOwnProperty (native) when node is null [`d9f52fa`](https://github.com/ljharb/js-traverse/commit/d9f52fa400c53f5bf1b5e388c0dd457c4dc651e3)
- merge the null fix [`c405df2`](https://github.com/ljharb/js-traverse/commit/c405df2c8a8d49321ac8081b928b4e5df5f80237)

## [v0.6.4](https://github.com/ljharb/js-traverse/compare/v0.6.3...v0.6.4) - 2012-12-17

### Commits

- upgraded readme [`c45db75`](https://github.com/ljharb/js-traverse/commit/c45db75c4a606b724156e50b14688b503e146cf3)
- using tape [`5c8e966`](https://github.com/ljharb/js-traverse/commit/5c8e966e8636fdab2c55cac0e4e0958f06f7ca1f)
- using testling-ci [`73f3061`](https://github.com/ljharb/js-traverse/commit/73f306146afa8ccc884cb0d43788338e294320cc)
- hasOwnProperty stub [`c889666`](https://github.com/ljharb/js-traverse/commit/c889666d81d79cbfd99372bea641e6938bd5531c)
- add a comma [`3f8d778`](https://github.com/ljharb/js-traverse/commit/3f8d778dbc0b070c972839fd1ac23b253a99cce2)

## [v0.6.3](https://github.com/ljharb/js-traverse/compare/v0.6.2...v0.6.3) - 2012-06-18

### Commits

- Update state with the current node before recursing [`3857dca`](https://github.com/ljharb/js-traverse/commit/3857dcaeaceca9a739300b0b846c1094ddf3b26f)
- Add test for replacing objects with strings and vice-versa [`28d5fb6`](https://github.com/ljharb/js-traverse/commit/28d5fb64e44237e21c01904d6e46b34626d66d33)
- s/Object_keys/objectKeys/g [`ef3694f`](https://github.com/ljharb/js-traverse/commit/ef3694f1fcfe948c39a5caaded33480bcbdafdfa)
- Only set state.keys when necessary [`ee66cd1`](https://github.com/ljharb/js-traverse/commit/ee66cd1c71db7701769323548916ce860f442d03)
- 0.6.3, fixes bugs when the replacement for an object is not an object [`09f560c`](https://github.com/ljharb/js-traverse/commit/09f560c0f910a9ac76fa0fc507655627cda6dd6f)
- Fix crash when node is a string and this.update is called with an object. [`5c6f161`](https://github.com/ljharb/js-traverse/commit/5c6f161f2006df87f231317f3413bc38ad799b7d)
- fixed merge conflicts [`576832a`](https://github.com/ljharb/js-traverse/commit/576832a2e4d91197b88a002dec643310fa9b3b26)

## [v0.6.2](https://github.com/ljharb/js-traverse/compare/v0.6.1...v0.6.2) - 2012-06-16

### Commits

- using tap [`4f4a3e5`](https://github.com/ljharb/js-traverse/commit/4f4a3e504e702bffa88ea15b687a3712b56938dd)
- re-generate the package.json [`99a0a15`](https://github.com/ljharb/js-traverse/commit/99a0a159b28d8175c159a208e276256a0240c056)
- fix to reconstruct prototypes in browsers without Object.create() [`0cb3f34`](https://github.com/ljharb/js-traverse/commit/0cb3f349e381109287c9fac1391472796b7fc0bd)
- using travis [`57e7ccd`](https://github.com/ljharb/js-traverse/commit/57e7ccd6b10e92e737ef41b332172b38b4d5cc2e)
- s/^js-// [`1c2bae3`](https://github.com/ljharb/js-traverse/commit/1c2bae3a286b38c5f7cd22ffe4bbcc165bab7245)
- drop 0.4 [`2331189`](https://github.com/ljharb/js-traverse/commit/2331189e047b94fc95edc6f6fce11cb0cfcbb435)

## [v0.6.1](https://github.com/ljharb/js-traverse/compare/v0.6.0...v0.6.1) - 2012-04-06

### Commits

- check builtins using the toString.call trick [`459378b`](https://github.com/ljharb/js-traverse/commit/459378b6dd18ea95e9a012fd96a5d0d30ce83d64)
- support for traversing an Error object. [`642dd51`](https://github.com/ljharb/js-traverse/commit/642dd51c41ca7e41774bbde948913d9a7996633e)
- fixed the tests for how typeof a regex is now "object" [`9250084`](https://github.com/ljharb/js-traverse/commit/925008491725beec15216147329f3df907285975)
- less annoying constructor [`2c5f693`](https://github.com/ljharb/js-traverse/commit/2c5f693b60daa8b0f2cc9566fa62ec6b733d6a84)
- bump for error fixes [`6b78600`](https://github.com/ljharb/js-traverse/commit/6b78600f53284b324e733f836b9fd3b47fa5b28d)

## [v0.6.0](https://github.com/ljharb/js-traverse/compare/v0.5.3...v0.6.0) - 2012-02-20

### Commits

- has() with tests, documented get() and set() too [`aeebf14`](https://github.com/ljharb/js-traverse/commit/aeebf1466c2b7b5660545cc4365b0a66bc54a765)

## [v0.5.3](https://github.com/ljharb/js-traverse/compare/v0.5.2...v0.5.3) - 2026-10-06

### Fixed

- [Fix] `remove`, `delete`: visit every remaining sibling exactly once [`#18`](https://github.com/ljharb/js-traverse/issues/18)
- [Fix] `.has` should not return true on a falsy node [`#20`](https://github.com/ljharb/js-traverse/issues/20)
- [Fix] continue iterating properly when items are removed [`#18`](https://github.com/ljharb/js-traverse/issues/18)

### Commits

- [eslint] fix indentation and whitespace [`d6a57ec`](https://github.com/ljharb/js-traverse/commit/d6a57ec0df36963c92544b7626dfe4632c56c280)
- [eslint] cleanup [`cf82272`](https://github.com/ljharb/js-traverse/commit/cf82272e7edaf1cb02b981b23a4849fd4b449cea)
- using tap [`2c7b9d7`](https://github.com/ljharb/js-traverse/commit/2c7b9d7312116da5cc7c947a32113ec0d2be8094)
- [Fix] `set`: only follow and create own properties; never write to a built-in prototype [`402e0b1`](https://github.com/ljharb/js-traverse/commit/402e0b153b45834f65b4177bcdb38d8b78d902ac)
- [meta] add `auto-changelog` [`ad75588`](https://github.com/ljharb/js-traverse/commit/ad75588d56f8d41b1dfc6365efe127410eeda774)
- [Fix] `clone`, `map`, immutable `forEach`: copy an own `__proto__` key as an own property [`0b6cff8`](https://github.com/ljharb/js-traverse/commit/0b6cff870a1bd69b86d6dd9c76bbd2045e804291)
- Update state with the current node before recursing [`5ffcb4c`](https://github.com/ljharb/js-traverse/commit/5ffcb4c8dc138e0c87a221d6ccd359728ddd0ac6)
- [Fix] `clone`, `map`, immutable `forEach`: copy boxed primitives instead of sharing them [`410ee80`](https://github.com/ljharb/js-traverse/commit/410ee801b2405567878f0e4016b324b92bd54ea2)
- [New] [Fix] add `includeSymbols` option; partial revert of "[New] support enumerable Symbol properties" [`7bbfb04`](https://github.com/ljharb/js-traverse/commit/7bbfb04c174cd98a69ee46de03e1b94888692577)
- has() with tests, documented get() and set() too [`76aa00f`](https://github.com/ljharb/js-traverse/commit/76aa00f48effb040b5bd6da3674bf8f8b9fa25ae)
- upgraded readme [`31b85cd`](https://github.com/ljharb/js-traverse/commit/31b85cdd5252fc7537b3ea2f323105427fe030c4)
- [actions] add reusable workflows [`3073c13`](https://github.com/ljharb/js-traverse/commit/3073c1353bbb9288e3d0b50b465bf143ee1403ba)
- [Dev Deps] update `tape` [`f2d4f2e`](https://github.com/ljharb/js-traverse/commit/f2d4f2ef34e3cfed6ccc7241e93da68a35ae3fa1)
- [New] support cloning Typed Arrays [`5251dcb`](https://github.com/ljharb/js-traverse/commit/5251dcb1a99d285b97cb6703aa17a792e24fcd8a)
- [eslint] add eslint [`7550cf1`](https://github.com/ljharb/js-traverse/commit/7550cf11c2a86609aaf766463520490b6ce7a6c7)
- [Fix] an `undefined` or `null` options argument is the same as none [`92ffeb6`](https://github.com/ljharb/js-traverse/commit/92ffeb6c3c99e3a14e6f06fc12ad6949d7401f2a)
- [Fix] `set`: do not descend into a property that could not be created as an own property [`0a51870`](https://github.com/ljharb/js-traverse/commit/0a518702c42b162307612c167cb31d717345d79c)
- fixed the tests for how typeof a regex is now "object" [`78f99cc`](https://github.com/ljharb/js-traverse/commit/78f99ccd48f3f59d642af74297d1aa4ca2681c36)
- [Fix] `remove`: a repeated `remove()` removes the element that took the node's place [`8b6a470`](https://github.com/ljharb/js-traverse/commit/8b6a4706e6c82220e50bf6265a39ae1648d357c2)
- [New] support enumerable Symbol properties [`8f869a4`](https://github.com/ljharb/js-traverse/commit/8f869a40365dd578d044b15df2c7e5e4bceac3b4)
- using tape [`3f4e83e`](https://github.com/ljharb/js-traverse/commit/3f4e83e09e1b15e08dd1c11023601af6902593dc)
- support for traversing an Error object. [`dd77648`](https://github.com/ljharb/js-traverse/commit/dd7764854cc3454971c98a9e3ca4cd505de36a7b)
- [actions] update workflows [`0224988`](https://github.com/ljharb/js-traverse/commit/0224988db4c450c43d29725170fe0148aea52c85)
- [Fix] `get`, `has`: a null or undefined node along the path means the path does not exist [`cc135fa`](https://github.com/ljharb/js-traverse/commit/cc135fa4fb4cae08aa0821e9aa1b210e77aa2bf3)
- re-generate the package.json [`2dce689`](https://github.com/ljharb/js-traverse/commit/2dce689d4fec415c5a128a46b937c69f483b3296)
- [readme] rename, add badges [`311e6a6`](https://github.com/ljharb/js-traverse/commit/311e6a630b46470d9f8389e35819dd9bf550105a)
- Add test for replacing objects with strings and vice-versa [`b39ab51`](https://github.com/ljharb/js-traverse/commit/b39ab518d6daeed17b122f428f2fd448f1d11040)
- check builtins using the toString.call trick [`432dd45`](https://github.com/ljharb/js-traverse/commit/432dd459723f78ecc2cdb2fc86bdeb22017515ae)
- [Tests] `clone`, `map`: add a test for a Buffer [`5ca92d3`](https://github.com/ljharb/js-traverse/commit/5ca92d3d538870efefb9269036784b67e673d3bb)
- [actions] use reusable rebase action [`e247c1e`](https://github.com/ljharb/js-traverse/commit/e247c1ec472e4f60188fb11ca6f89722ac8f0833)
- fix to reconstruct prototypes in browsers without Object.create() [`ade5927`](https://github.com/ljharb/js-traverse/commit/ade5927b4dc2f412ee38862400e5a0957d514c60)
- [Robustness] minimize use of prototype methods [`f809f00`](https://github.com/ljharb/js-traverse/commit/f809f00dca99163e8c9674097de5da365e4d6005)
- [Fix] Add "isWritable" before writing to properties [`752c6f5`](https://github.com/ljharb/js-traverse/commit/752c6f5411c5893d4e106e28cbb5af6ffd119bdd)
- [meta] update license text so GitHub can identify it [`231a249`](https://github.com/ljharb/js-traverse/commit/231a249ebda559afd5bd476f4bf9f6d76d2f340b)
- [meta] create FUNDING.yml; add `funding` in package.json [`73a137f`](https://github.com/ljharb/js-traverse/commit/73a137f4259159ff8b40140e57434b4b795f3a25)
- [actions] remove redundant finisher [`e1c3334`](https://github.com/ljharb/js-traverse/commit/e1c33342f2a13fa534a23e93678e75659a61b846)
- [Refactor] use an internal null options object instead of an `immutable` boolean [`b3d1aad`](https://github.com/ljharb/js-traverse/commit/b3d1aadcc5e9b34964a946c5c2eeb2981aaf2351)
- using testling-ci [`bc7ab77`](https://github.com/ljharb/js-traverse/commit/bc7ab77daf1e7fb2ce7ce9107ebb49d373edc717)
- hasOwnProperty stub [`0cf9f7f`](https://github.com/ljharb/js-traverse/commit/0cf9f7fa5f4b334f71624fbe8c112c5eddd30bde)
- [meta] use `npmignore` to autogenerate an npmignore file [`882da54`](https://github.com/ljharb/js-traverse/commit/882da540ba1685136ae4d3806a1dccce03d4dcf1)
- s/Object_keys/objectKeys/g [`7f84d7a`](https://github.com/ljharb/js-traverse/commit/7f84d7a80fa120c0c11f87947ff6bbbd6c276be7)
- Only apps should have lockfiles [`525b5c1`](https://github.com/ljharb/js-traverse/commit/525b5c1bfb642b992ea9f25df82b5a5075169af6)
- [meta] update URLs [`d450641`](https://github.com/ljharb/js-traverse/commit/d4506410171c4c5145fece6e3269777966c381e1)
- [Fix] `set`: convert path segments with `es-to-primitive` [`d972a1e`](https://github.com/ljharb/js-traverse/commit/d972a1ed9e406b8259105bf5d2c3e0bbb3a7aa09)
- [Tests] avoid an io.js 1.x bug with index-like keys in object literals [`0f24053`](https://github.com/ljharb/js-traverse/commit/0f24053c4ed5f13d6f8d8815abd7034a6ed6710f)
- using travis [`e79bd5a`](https://github.com/ljharb/js-traverse/commit/e79bd5a9e30b09e1b058a22760459fd43c1465cf)
- [Refactor] avoid use of a dep [`5e6c16f`](https://github.com/ljharb/js-traverse/commit/5e6c16f914ef955f23e039afdce9d656f040e335)
- [meta] omit some files [`b5c15ae`](https://github.com/ljharb/js-traverse/commit/b5c15aef20aff68c5d4dcaa2b8c97c271b1eaba9)
- [Tests] Stop equal Dates from being flaky [`0063554`](https://github.com/ljharb/js-traverse/commit/0063554b097f7a215d960d72d8b5955844127a71)
- remove tap as a dep to get around the cyclic library issues [`fa4020d`](https://github.com/ljharb/js-traverse/commit/fa4020d73deced759f4c30d212946dcc8bdff9ea)
- [meta] add `safe-publish-latest` [`754c665`](https://github.com/ljharb/js-traverse/commit/754c66575ee5af05ccdaaac855397c7e6e8f4b54)
- fix for Cannot convert null to object  at hasOwnProperty (native) when node is null [`0e2c7f8`](https://github.com/ljharb/js-traverse/commit/0e2c7f8602772f8100cbb89d0bd7819a48adf9ec)
- [Refactor] protect against an impossible bug [`cee1994`](https://github.com/ljharb/js-traverse/commit/cee19948a4a0a173188e87b94727fb11b5f3ab8f)
- [meta] add missing `engines.node` [`e712df4`](https://github.com/ljharb/js-traverse/commit/e712df4b2bae5cb86591ce007b2df5314d9d4539)
- [actions] set least-privilege `cache-mode` [`29de771`](https://github.com/ljharb/js-traverse/commit/29de771fb7ce0efc98c150f581b8ab88cdcac09f)
- [Robustness] use a null object in `modifiers` [`52f5acc`](https://github.com/ljharb/js-traverse/commit/52f5acca19b832d344c5a3bb3b5697164624ffa3)
- [actions] update checkout action [`9ff20d8`](https://github.com/ljharb/js-traverse/commit/9ff20d8a176be135e9a793908f10e2f06d54fa80)
- [actions] update checkout action [`258ed14`](https://github.com/ljharb/js-traverse/commit/258ed140487c8173799f40dad476bca113d1cadc)
- guard for the presence of getTime [`2ddb72e`](https://github.com/ljharb/js-traverse/commit/2ddb72e6eefb3dc7edfc285baeca48f4f5a96316)
- use getTime() for firefox browser support [`a9222f1`](https://github.com/ljharb/js-traverse/commit/a9222f18befd0f1f124b0e6f537ef0b8ca28a3cf)
- add a comma [`d242803`](https://github.com/ljharb/js-traverse/commit/d242803f3405f911aac7b08124602a4ddb5b5602)
- Fix crash when node is a string and this.update is called with an object. [`ea57bcb`](https://github.com/ljharb/js-traverse/commit/ea57bcb6bf969bfadc88b6deeabb2cba04a379dd)
- s/^js-// [`7100e48`](https://github.com/ljharb/js-traverse/commit/7100e48166318ba3887c9709aa2d6a85ec3668aa)
- [Tests] replace `aud` with `npm audit` [`49b214f`](https://github.com/ljharb/js-traverse/commit/49b214f4e32752d4fb2e651bb653af7cc2f7ab10)
- Only set state.keys when necessary [`49bf6d8`](https://github.com/ljharb/js-traverse/commit/49bf6d8c165163c55c9299d35a906a9f89617f1d)
- drop 0.4 [`ed4d0e9`](https://github.com/ljharb/js-traverse/commit/ed4d0e9c61d5bd599c48159d8ce3d75f5dd51910)

## [v0.5.2](https://github.com/ljharb/js-traverse/compare/v0.5.1...v0.5.2) - 2011-10-16

### Commits

- Should be able to stop traversing when removing or deleting [`4aa61ef`](https://github.com/ljharb/js-traverse/commit/4aa61ef874d81a633aec4b72c3b2bc5ede64947f)
- relative requires for the tests [`9d4d4c5`](https://github.com/ljharb/js-traverse/commit/9d4d4c5d4c3abb9ef38c6f878a7ee8c61f0264c1)
- Added documentation for stopHere-flag on remove and delete [`2bb8018`](https://github.com/ljharb/js-traverse/commit/2bb80186f15d860cd5e17934c270bd0814236004)
- bump for stopHere on delete and remove [`a23839a`](https://github.com/ljharb/js-traverse/commit/a23839a473d0e91814911210f01d2ec4a95d1098)

## [v0.5.1](https://github.com/ljharb/js-traverse/compare/v0.5.0...v0.5.1) - 2011-08-23

### Commits

- fix for brokenness in IE with using the wrong variable name for the prototype checking [`4cb7bcb`](https://github.com/ljharb/js-traverse/commit/4cb7bcbd155df29268c8b8fc249f0f838aaa94f3)

## [v0.5.0](https://github.com/ljharb/js-traverse/compare/v0.4.7...v0.5.0) - 2011-08-23

### Commits

- spun off deepEqual into a utility library [`9d5148a`](https://github.com/ljharb/js-traverse/commit/9d5148a22dbe1484286c216959625168275457db)
- traverse now works with all the IEs [`96d9e25`](https://github.com/ljharb/js-traverse/commit/96d9e2564fc0f1413a7a1371cfd9cc5600896771)
- tests all updated for the removal of deepEqual from the main lib [`9ebde92`](https://github.com/ljharb/js-traverse/commit/9ebde9226720231d4390ebdaea04a0c4652caf21)
- stubs for non-es5 browsers, didn't break any unit tests [`559a6f1`](https://github.com/ljharb/js-traverse/commit/559a6f18873d48a97b293c058cc2a8f334dfd535)

## [v0.4.7](https://github.com/ljharb/js-traverse/compare/v0.4.6...v0.4.7) - 2026-10-07

### Fixed

- [Fix] `remove`, `delete`: visit every remaining sibling exactly once [`#18`](https://github.com/ljharb/js-traverse/issues/18)
- [Fix] `.has` should not return true on a falsy node [`#20`](https://github.com/ljharb/js-traverse/issues/20)
- [Fix] continue iterating properly when items are removed [`#18`](https://github.com/ljharb/js-traverse/issues/18)

### Commits

- [eslint] fix indentation and whitespace [`7755f6b`](https://github.com/ljharb/js-traverse/commit/7755f6b9eff5154ea31d80848b35553703fbc9f6)
- [eslint] cleanup [`5d9608f`](https://github.com/ljharb/js-traverse/commit/5d9608f81a6870bd672eab48abf23ae635275875)
- using tap [`8d1d42c`](https://github.com/ljharb/js-traverse/commit/8d1d42cc74daa727791fd1f3fa76a85329ac6503)
- [Fix] `set`: only follow and create own properties; never write to a built-in prototype [`f95f9aa`](https://github.com/ljharb/js-traverse/commit/f95f9aa952d3a55db8b351815f8fe4517e8b23dd)
- [meta] add `auto-changelog` [`25e125a`](https://github.com/ljharb/js-traverse/commit/25e125a1126623a7ea34ddcec7a53336a1127f6b)
- [Fix] `clone`, `map`, immutable `forEach`: copy an own `__proto__` key as an own property [`2c09544`](https://github.com/ljharb/js-traverse/commit/2c09544f37b66288e9d29ad767c13d2801c2d74a)
- has() with tests, documented get() and set() too [`684c7b4`](https://github.com/ljharb/js-traverse/commit/684c7b4a5e7f9ce62af9bc8ef3ccd4afaa0c89b9)
- Update state with the current node before recursing [`7e704df`](https://github.com/ljharb/js-traverse/commit/7e704df96455ef226b9698ff096b33a24bc8f329)
- [Fix] `clone`, `map`, immutable `forEach`: copy boxed primitives instead of sharing them [`a4e4410`](https://github.com/ljharb/js-traverse/commit/a4e44105fa373740fefefbf7edf97a19b4fe0b09)
- [New] [Fix] add `includeSymbols` option; partial revert of "[New] support enumerable Symbol properties" [`e0ef213`](https://github.com/ljharb/js-traverse/commit/e0ef21367da836d69338f710e49a18c7458dfa53)
- upgraded readme [`e79f161`](https://github.com/ljharb/js-traverse/commit/e79f161a11b78c3ca950fae8e8e293b5680858a4)
- [actions] add reusable workflows [`6864c01`](https://github.com/ljharb/js-traverse/commit/6864c01e20cbef6765269ffbb5678c52d5b6eb20)
- [Dev Deps] update `tape` [`e4e7e1b`](https://github.com/ljharb/js-traverse/commit/e4e7e1bd5337617dfdd9ffd528d34f66001e952c)
- traverse now works with all the IEs [`42e673c`](https://github.com/ljharb/js-traverse/commit/42e673cdadec60b917215d9e3301267a1b9811d3)
- [eslint] add eslint [`641843b`](https://github.com/ljharb/js-traverse/commit/641843be9191bcde4a039a7aebdf328cda732d3c)
- [New] support cloning Typed Arrays [`35cf0ad`](https://github.com/ljharb/js-traverse/commit/35cf0ad9d0cd08d771dbc6143872863c9bb16a32)
- [Fix] an `undefined` or `null` options argument is the same as none [`36f86cc`](https://github.com/ljharb/js-traverse/commit/36f86cc70e31d3cdf76577f12b76f6feb35297d1)
- [Fix] `set`: do not descend into a property that could not be created as an own property [`99fd7a5`](https://github.com/ljharb/js-traverse/commit/99fd7a514007238e887a93240aa9f392ddc3e7f4)
- fixed the tests for how typeof a regex is now "object" [`d14aa25`](https://github.com/ljharb/js-traverse/commit/d14aa252d46993031d7cada7959deedf01a3ce3e)
- Should be able to stop traversing when removing or deleting [`3c207e7`](https://github.com/ljharb/js-traverse/commit/3c207e7eda25a3e70ca4857eae786773588bd126)
- [Fix] `remove`: a repeated `remove()` removes the element that took the node's place [`72ce394`](https://github.com/ljharb/js-traverse/commit/72ce3949afffaa4b6d1288b9d816df666596b183)
- [New] support enumerable Symbol properties [`b5d04ae`](https://github.com/ljharb/js-traverse/commit/b5d04ae31d94f7fa3b82fa50db951bd1baa8a2b5)
- using tape [`ee28666`](https://github.com/ljharb/js-traverse/commit/ee28666bea660e11a9ef92a71f3600b98c14c5ac)
- support for traversing an Error object. [`f582b6a`](https://github.com/ljharb/js-traverse/commit/f582b6a41d11a33eacb658c0ed96223000885493)
- [actions] update workflows [`adbdeee`](https://github.com/ljharb/js-traverse/commit/adbdeee45c1eababd4289e9723884042034feb7f)
- [Fix] `get`, `has`: a null or undefined node along the path means the path does not exist [`5a16517`](https://github.com/ljharb/js-traverse/commit/5a16517c8f791090e97090f6c1ef23636482cc1b)
- re-generate the package.json [`2d80dd6`](https://github.com/ljharb/js-traverse/commit/2d80dd675788f5856858c1ca72f4a9b7337ca813)
- relative requires for the tests [`dc85766`](https://github.com/ljharb/js-traverse/commit/dc85766c8845462d32b0874a110da8f249db1d22)
- stubs for non-es5 browsers, didn't break any unit tests [`9680594`](https://github.com/ljharb/js-traverse/commit/9680594acae59fb7a35914bf8e1fed3e34824091)
- [readme] rename, add badges [`f0d105a`](https://github.com/ljharb/js-traverse/commit/f0d105a83b2feb92fce094194863ccd8b5ec49e7)
- Add test for replacing objects with strings and vice-versa [`df6a527`](https://github.com/ljharb/js-traverse/commit/df6a52789cbce7b7987f1d2517ae48b8f0312376)
- check builtins using the toString.call trick [`84b111c`](https://github.com/ljharb/js-traverse/commit/84b111c5ba111ce514882dc5da1858bc63d24f87)
- [Tests] `clone`, `map`: add a test for a Buffer [`083e9b6`](https://github.com/ljharb/js-traverse/commit/083e9b641cf0dd02aeeb87966fa078aff7ba97ee)
- [actions] use reusable rebase action [`1345db4`](https://github.com/ljharb/js-traverse/commit/1345db441572964b31d7d18d726e738024fe2c0f)
- fix to reconstruct prototypes in browsers without Object.create() [`a144845`](https://github.com/ljharb/js-traverse/commit/a1448455b745f2402c25b84fa5d22880e9ac07b4)
- [Robustness] minimize use of prototype methods [`290e38c`](https://github.com/ljharb/js-traverse/commit/290e38ca90c04d17739085fc052530df5ff7d9c2)
- [Fix] Add "isWritable" before writing to properties [`9aa00a3`](https://github.com/ljharb/js-traverse/commit/9aa00a3326a8ecb584e0825ad78da3495dd06d60)
- Added documentation for stopHere-flag on remove and delete [`2fe4f72`](https://github.com/ljharb/js-traverse/commit/2fe4f725ce0eb7db63d71bb89992ccdcca83827b)
- [meta] update license text so GitHub can identify it [`ff3cde8`](https://github.com/ljharb/js-traverse/commit/ff3cde861019c13f33e72e26e91074e6c4e5ec56)
- [meta] create FUNDING.yml; add `funding` in package.json [`cf554b6`](https://github.com/ljharb/js-traverse/commit/cf554b67547c916cd4b48b3f639e3cba364cd56e)
- [actions] remove redundant finisher [`2d96e31`](https://github.com/ljharb/js-traverse/commit/2d96e31bd8f5445ff77ad5ea3b247496880b55d7)
- [Refactor] use an internal null options object instead of an `immutable` boolean [`ff07779`](https://github.com/ljharb/js-traverse/commit/ff07779a68bbde032a31faf7bf0b1aa8f5d626de)
- using testling-ci [`3c73943`](https://github.com/ljharb/js-traverse/commit/3c7394390f58f5350d4e08979dfccc67cb16245d)
- hasOwnProperty stub [`1d7a199`](https://github.com/ljharb/js-traverse/commit/1d7a199f2c979de65ec18a8e3c92cedc2055146f)
- [meta] use `npmignore` to autogenerate an npmignore file [`fd37d33`](https://github.com/ljharb/js-traverse/commit/fd37d331fd0dae734edde0cea8cad03ca059ca8e)
- [Fix] `set`: convert path segments with `es-to-primitive` [`c69ae15`](https://github.com/ljharb/js-traverse/commit/c69ae1521355f1d687206e4cdd1618eea4947198)
- s/Object_keys/objectKeys/g [`22ecd53`](https://github.com/ljharb/js-traverse/commit/22ecd53d4c94bb9032464e8541fbdcb9e47ddb80)
- Only apps should have lockfiles [`cf96ae8`](https://github.com/ljharb/js-traverse/commit/cf96ae8da8a7a3d4608d31029729e17bc6838b77)
- [meta] update URLs [`81061fe`](https://github.com/ljharb/js-traverse/commit/81061febe0e620b10755addc1b7242022b13f819)
- [Tests] avoid an io.js 1.x bug with index-like keys in object literals [`c15ae0c`](https://github.com/ljharb/js-traverse/commit/c15ae0cf3cd5c2295772d7402b22d9af248647ca)
- using travis [`3c6f953`](https://github.com/ljharb/js-traverse/commit/3c6f953a33ad5998e5ea41de23094c7ae87225cb)
- [meta] omit some files [`ceee250`](https://github.com/ljharb/js-traverse/commit/ceee2501d1db8a318ce8b7c84fb7e651bba9815d)
- remove tap as a dep to get around the cyclic library issues [`9a07429`](https://github.com/ljharb/js-traverse/commit/9a074296b0f72c2c7cacc72845c1c31b8e18c31a)
- [Tests] Stop equal Dates from being flaky [`3f5453d`](https://github.com/ljharb/js-traverse/commit/3f5453d934de1e6ecb198cb6d2428d0e1061b2ce)
- [meta] add `safe-publish-latest` [`2ba7bed`](https://github.com/ljharb/js-traverse/commit/2ba7bed255449af8ff7c7f2a25f816fca116890a)
- fix for Cannot convert null to object  at hasOwnProperty (native) when node is null [`5302ebe`](https://github.com/ljharb/js-traverse/commit/5302ebe2df5dbbfac49d8648c713afd7cb1d6402)
- fix for brokenness in IE with using the wrong variable name for the prototype checking [`f656562`](https://github.com/ljharb/js-traverse/commit/f656562d55c5e471daae7928a6e540281d327188)
- [Refactor] protect against an impossible bug [`4a4d48b`](https://github.com/ljharb/js-traverse/commit/4a4d48bc23065de6ee6a0cdd629f2bb43bfc5d1b)
- [meta] add missing `engines.node` [`8f99ded`](https://github.com/ljharb/js-traverse/commit/8f99ded2025658195564d50fdedb542ca42d5c79)
- [actions] set least-privilege `cache-mode` [`88c6dd5`](https://github.com/ljharb/js-traverse/commit/88c6dd59915427b3652fbc729ca2525dac67075b)
- [Robustness] use a null object in `modifiers` [`abedd09`](https://github.com/ljharb/js-traverse/commit/abedd09fea331ac904685c7599c42acab981e324)
- [actions] update checkout action [`6f731e6`](https://github.com/ljharb/js-traverse/commit/6f731e637d1687904cf940ffdc01ba859913c132)
- [actions] update checkout action [`71f00a0`](https://github.com/ljharb/js-traverse/commit/71f00a02ff237a6984cd3086f22a5a276bc0f366)
- guard for the presence of getTime [`3f44a11`](https://github.com/ljharb/js-traverse/commit/3f44a1161481b0706b30007ea8a3788111545398)
- use getTime() for firefox browser support [`70e6eac`](https://github.com/ljharb/js-traverse/commit/70e6eace5a9de877b8f9222c8e2b6e87aeb9893c)
- Fix crash when node is a string and this.update is called with an object. [`d2ba591`](https://github.com/ljharb/js-traverse/commit/d2ba591f565b47aaabb39949f3f64f283305b486)
- s/^js-// [`4dd1754`](https://github.com/ljharb/js-traverse/commit/4dd175467d696f813622d1e0e38dc261ca2fa03b)
- [Tests] replace `aud` with `npm audit` [`3a5ae1c`](https://github.com/ljharb/js-traverse/commit/3a5ae1c314586cd651c14be3ccf0580f58a4825c)
- Only set state.keys when necessary [`5a25904`](https://github.com/ljharb/js-traverse/commit/5a2590405349b6f7cf13bd1262cd3388b9b3f18c)
- drop 0.4 [`a635743`](https://github.com/ljharb/js-traverse/commit/a635743e08493a9743f5c1267a01500be29c8246)

## [v0.4.6](https://github.com/ljharb/js-traverse/compare/v0.4.5...v0.4.6) - 2011-07-27

### Commits

- some minor adjustments to expose keys for sibling calculations [`a936bea`](https://github.com/ljharb/js-traverse/commit/a936bea1e4d164ab33459352234eaea9a1d84a38)

## [v0.4.5](https://github.com/ljharb/js-traverse/compare/v0.4.4...v0.4.5) - 2011-07-24

### Commits

- include circular ref example in the readme, Traverse =&gt; traverse [`4a6285f`](https://github.com/ljharb/js-traverse/commit/4a6285f71f4220550d4587090fd832ec9fcb10b7)
- scrub example [`ec1fb18`](https://github.com/ljharb/js-traverse/commit/ec1fb18b494f1bcb6b1ce4a2a86dce6560ae746d)
- bump for exposing parents [`5cb4ecb`](https://github.com/ljharb/js-traverse/commit/5cb4ecb37b2af64367f466cd1994d18c45def070)
- export 'parents' to context [`5af2f8d`](https://github.com/ljharb/js-traverse/commit/5af2f8d24e2e9dce5c43ae5abbe2ff23384610fc)

## [v0.4.4](https://github.com/ljharb/js-traverse/compare/v0.4.3...v0.4.4) - 2011-07-20

### Commits

- allow setting of keys (ordering) in before modifier [`9fb8e2c`](https://github.com/ljharb/js-traverse/commit/9fb8e2c126e5bcec59e382b59e040ae764ea9045)
- note about this.keys, bump [`1148bc7`](https://github.com/ljharb/js-traverse/commit/1148bc7603411c423b41a5cb396b27ab6ca2c565)

## [v0.4.3](https://github.com/ljharb/js-traverse/compare/v0.4.2...v0.4.3) - 2011-06-14

### Commits

- bump to 0.4.3 for guybrush's IE fixes [`c74a7ea`](https://github.com/ljharb/js-traverse/commit/c74a7eaa83edb86e20b2427bbd2068339b385aa8)
- another fix for IE [`ed86376`](https://github.com/ljharb/js-traverse/commit/ed86376b826284a858d040f8d0a40532a8d4d919)
- fix for IE [`35949ef`](https://github.com/ljharb/js-traverse/commit/35949ef979662e6a9118beca80d0f6a080828ddc)

## [v0.4.2](https://github.com/ljharb/js-traverse/compare/v0.4.1...v0.4.2) - 2011-06-11

### Commits

- bump to 0.4.2 for this.block() with a passing test [`d945818`](https://github.com/ljharb/js-traverse/commit/d945818e0e489d9ffe2dd25ea64c598085139c69)
- note about stopHere for update() in the readme [`18f3e27`](https://github.com/ljharb/js-traverse/commit/18f3e273c7ec22b7121438d517eaeb7832f18d99)

## [v0.4.1](https://github.com/ljharb/js-traverse/compare/v0.4.0...v0.4.1) - 2011-06-10

### Commits

- moved stop behavior in updates into a second keepGoing argument [`1d31897`](https://github.com/ljharb/js-traverse/commit/1d318974255df34a821da53cb3d573153a0682b2)

## [v0.4.0](https://github.com/ljharb/js-traverse/compare/v0.3.10...v0.4.0) - 2011-06-10

### Commits

- subexpr test passes by checking if update() happened [`44e731b`](https://github.com/ljharb/js-traverse/commit/44e731b972b864b1de1ef315bf1ce4dbba3a7d67)
- subexpressions from update()s shouldn't be traversed, failing test [`be2b574`](https://github.com/ljharb/js-traverse/commit/be2b5746670b213d1c57c8f1f6d59a78e8ff88e6)

## [v0.3.10](https://github.com/ljharb/js-traverse/compare/v0.3.9...v0.3.10) - 2026-10-07

### Fixed

- [Fix] `remove`, `delete`: visit every remaining sibling exactly once [`#18`](https://github.com/ljharb/js-traverse/issues/18)
- [Fix] `.has` should not return true on a falsy node [`#20`](https://github.com/ljharb/js-traverse/issues/20)
- [Fix] continue iterating properly when items are removed [`#18`](https://github.com/ljharb/js-traverse/issues/18)

### Commits

- [eslint] fix indentation and whitespace [`665168b`](https://github.com/ljharb/js-traverse/commit/665168bcd2754062a3f8f57194e9701bcd06f00f)
- [eslint] cleanup [`141d2ed`](https://github.com/ljharb/js-traverse/commit/141d2ed124937cb9159e6dee3e9b24fa386acbb0)
- using tap [`88c39e5`](https://github.com/ljharb/js-traverse/commit/88c39e547aab17d50bce2aa0760085f929c0bb2e)
- [Fix] `set`: only follow and create own properties; never write to a built-in prototype [`152afad`](https://github.com/ljharb/js-traverse/commit/152afad6f186e416d120e230c819793c9e17cc8a)
- [meta] add `auto-changelog` [`a7d57da`](https://github.com/ljharb/js-traverse/commit/a7d57dac170f9ae13435311d4588c8764ec56679)
- [Fix] `clone`, `map`, immutable `forEach`: copy an own `__proto__` key as an own property [`c636916`](https://github.com/ljharb/js-traverse/commit/c636916e55fb0beaa5e35aa90db2ea11d2f259ce)
- has() with tests, documented get() and set() too [`1b83929`](https://github.com/ljharb/js-traverse/commit/1b839299c422d71d5140375f56e12dff99001f13)
- Update state with the current node before recursing [`1d48725`](https://github.com/ljharb/js-traverse/commit/1d48725df16d988ac4f409b6d63a453814ba95f7)
- [Fix] `clone`, `map`, immutable `forEach`: copy boxed primitives instead of sharing them [`13ac907`](https://github.com/ljharb/js-traverse/commit/13ac9075407aa9d188443f5392083bedce36c568)
- [New] [Fix] add `includeSymbols` option; partial revert of "[New] support enumerable Symbol properties" [`ffff037`](https://github.com/ljharb/js-traverse/commit/ffff03750129afc5ccf5f0243a0b29dcc135ed41)
- upgraded readme [`0a7527b`](https://github.com/ljharb/js-traverse/commit/0a7527bd9b968dbdb229cbd25b1c9abf4f3b161c)
- [actions] add reusable workflows [`6a4a410`](https://github.com/ljharb/js-traverse/commit/6a4a410ade6d005ff6a5e3577c72bad0a631d4fa)
- [Dev Deps] update `tape` [`badadfa`](https://github.com/ljharb/js-traverse/commit/badadfaea77dfe051abfd3c772275cbc60c3fed8)
- traverse now works with all the IEs [`863400d`](https://github.com/ljharb/js-traverse/commit/863400d50047bb71f8bc0f79ec8b47eb2e2bb766)
- [eslint] add eslint [`a3c6a6f`](https://github.com/ljharb/js-traverse/commit/a3c6a6fbc0aa7174267f370ce045eaa914a1bdab)
- [New] support cloning Typed Arrays [`3a306bb`](https://github.com/ljharb/js-traverse/commit/3a306bb6e7f08eda8a12b2e13193425d67b5eb62)
- [Fix] an `undefined` or `null` options argument is the same as none [`63bfcb8`](https://github.com/ljharb/js-traverse/commit/63bfcb87b4f4daa2313520ac88a44bc017387359)
- [Fix] `set`: do not descend into a property that could not be created as an own property [`be0a8ad`](https://github.com/ljharb/js-traverse/commit/be0a8adc9ff8bc3603afa310d6a0b2412054a056)
- fixed the tests for how typeof a regex is now "object" [`dea6d87`](https://github.com/ljharb/js-traverse/commit/dea6d873730ff27c555c07e82c5e6f652a8b2e49)
- Should be able to stop traversing when removing or deleting [`52f4f43`](https://github.com/ljharb/js-traverse/commit/52f4f431d30ce2b60ea8fbde50b1b32d5f27eb69)
- [Fix] `remove`: a repeated `remove()` removes the element that took the node's place [`8bb5c96`](https://github.com/ljharb/js-traverse/commit/8bb5c962032db51f396dd2d172f660b8de699fd2)
- [New] support enumerable Symbol properties [`a1daed2`](https://github.com/ljharb/js-traverse/commit/a1daed2ceb9301317706c9ce8737983adfd77f61)
- using tape [`4d29b9c`](https://github.com/ljharb/js-traverse/commit/4d29b9ca81fcb0ae3c15cf3af6d862abe67573ca)
- some minor adjustments to expose keys for sibling calculations [`94b8ac3`](https://github.com/ljharb/js-traverse/commit/94b8ac39f24c52eb96800488685fc3b4e5ac8a8c)
- support for traversing an Error object. [`176b502`](https://github.com/ljharb/js-traverse/commit/176b5024eb699cfe0f94b04c34d50c2ea3bc63cb)
- [actions] update workflows [`7bcf523`](https://github.com/ljharb/js-traverse/commit/7bcf523c75034a6ba8efcd0e13193f98e36e11aa)
- [Fix] `get`, `has`: a null or undefined node along the path means the path does not exist [`e724f3c`](https://github.com/ljharb/js-traverse/commit/e724f3c84fd5c302e35ed8aa4b0f27ed77199dc6)
- re-generate the package.json [`211ba0e`](https://github.com/ljharb/js-traverse/commit/211ba0e8b917d58ebaa9455fec67cab05f862aee)
- include circular ref example in the readme, Traverse =&gt; traverse [`f443599`](https://github.com/ljharb/js-traverse/commit/f44359938a4dbc546421e8f5b5ead26edd6fe598)
- allow setting of keys (ordering) in before modifier [`a075a1a`](https://github.com/ljharb/js-traverse/commit/a075a1a2856b7d652765a812e3a02817107e6270)
- relative requires for the tests [`fdbe25d`](https://github.com/ljharb/js-traverse/commit/fdbe25daaeb34a5de64e92e234cb38c5bc65bbf7)
- stubs for non-es5 browsers, didn't break any unit tests [`0a5212d`](https://github.com/ljharb/js-traverse/commit/0a5212d5865ad4f48a0b4608502c9febf6022bc6)
- [readme] rename, add badges [`728a75f`](https://github.com/ljharb/js-traverse/commit/728a75f35a744d6e68c63a88461ba26511a5594a)
- Add test for replacing objects with strings and vice-versa [`22520d1`](https://github.com/ljharb/js-traverse/commit/22520d1f554d23acba09a9690d3ebeaa677c4f3b)
- subexpr test passes by checking if update() happened [`80e7578`](https://github.com/ljharb/js-traverse/commit/80e75780d2eb9929c819af7d39757c14aa36f78d)
- check builtins using the toString.call trick [`d8c9071`](https://github.com/ljharb/js-traverse/commit/d8c90718ba4d4334d1aa0aaed673b3c0af3de88d)
- bump to 0.4.2 for this.block() with a passing test [`3d2b4db`](https://github.com/ljharb/js-traverse/commit/3d2b4dbcd11967b00750533a104bcab740d3c9b8)
- [Tests] `clone`, `map`: add a test for a Buffer [`1de7f38`](https://github.com/ljharb/js-traverse/commit/1de7f385612e1744cc2bae47790e4b586b7712f3)
- [actions] use reusable rebase action [`308142a`](https://github.com/ljharb/js-traverse/commit/308142aa9b24c730b7012dc93510d6d0419883f1)
- fix to reconstruct prototypes in browsers without Object.create() [`f38bc17`](https://github.com/ljharb/js-traverse/commit/f38bc173b3c9f990cda5587be13272708739b448)
- [Robustness] minimize use of prototype methods [`3b6087c`](https://github.com/ljharb/js-traverse/commit/3b6087c3e077c9857ced5ff15e2fc1b9a9e9e553)
- [Fix] Add "isWritable" before writing to properties [`1d9bdfa`](https://github.com/ljharb/js-traverse/commit/1d9bdfa25f90935c53817dd35f62d50adc251ae8)
- Added documentation for stopHere-flag on remove and delete [`6e5b316`](https://github.com/ljharb/js-traverse/commit/6e5b31614a387ab6c61c14d07589d98e7fc32128)
- [meta] update license text so GitHub can identify it [`ba2a85b`](https://github.com/ljharb/js-traverse/commit/ba2a85b140ffaf6fe5f3d390cefb5430c19b771b)
- [meta] create FUNDING.yml; add `funding` in package.json [`bd5de2b`](https://github.com/ljharb/js-traverse/commit/bd5de2b8b8420e14df069260b4fc52d542511af0)
- moved stop behavior in updates into a second keepGoing argument [`16ce1ae`](https://github.com/ljharb/js-traverse/commit/16ce1aed784813c220df4990f3e7709e801a90c7)
- [actions] remove redundant finisher [`f281ad2`](https://github.com/ljharb/js-traverse/commit/f281ad2c62139e58aeada5cc9c50e7e749faa483)
- [Refactor] use an internal null options object instead of an `immutable` boolean [`089f542`](https://github.com/ljharb/js-traverse/commit/089f542fa7bcbcc4cc186cc30331a4ba960c43a6)
- using testling-ci [`48c0213`](https://github.com/ljharb/js-traverse/commit/48c02138b1209a31571f5dc9caf3e85361cf2a7c)
- hasOwnProperty stub [`ec9eb65`](https://github.com/ljharb/js-traverse/commit/ec9eb657b7ce19e13a0f4a903591347105d3454a)
- [meta] use `npmignore` to autogenerate an npmignore file [`63f0283`](https://github.com/ljharb/js-traverse/commit/63f0283b2eaf980072ea708545f9650dda2fd592)
- [Fix] `set`: convert path segments with `es-to-primitive` [`5caa853`](https://github.com/ljharb/js-traverse/commit/5caa85371d510cea7a0513ed1369764948d5210b)
- s/Object_keys/objectKeys/g [`2bdbbb1`](https://github.com/ljharb/js-traverse/commit/2bdbbb1d5479d513cf780be8ffa9b191005eec28)
- scrub example [`61f5501`](https://github.com/ljharb/js-traverse/commit/61f55016b6c1f6d79f63dd7819015c29cf27fc20)
- Only apps should have lockfiles [`0b2e82a`](https://github.com/ljharb/js-traverse/commit/0b2e82a8a6d76e22022b65437f64bd81f7cae0d5)
- [meta] update URLs [`be4a398`](https://github.com/ljharb/js-traverse/commit/be4a398edcea17245a6f428a898f6a0d81de2684)
- note about stopHere for update() in the readme [`68a5c18`](https://github.com/ljharb/js-traverse/commit/68a5c18916d6c1113adb349a97d6731e7a5ca485)
- [Tests] avoid an io.js 1.x bug with index-like keys in object literals [`208e933`](https://github.com/ljharb/js-traverse/commit/208e933459637adcb99649bf59300be6e30891ba)
- using travis [`d1b1340`](https://github.com/ljharb/js-traverse/commit/d1b13400d4e37a506da2ee17bf494210836142d8)
- [meta] omit some files [`54a356f`](https://github.com/ljharb/js-traverse/commit/54a356f90a9a853ef34820b5cf792e67a18c62e7)
- remove tap as a dep to get around the cyclic library issues [`dc28d5e`](https://github.com/ljharb/js-traverse/commit/dc28d5eac6122f4a1eca5a7a8e3b8da5da79124d)
- [Tests] Stop equal Dates from being flaky [`a19fce6`](https://github.com/ljharb/js-traverse/commit/a19fce67644740ee260113d82e70dffc5a5a60e4)
- [meta] add `safe-publish-latest` [`8d5233c`](https://github.com/ljharb/js-traverse/commit/8d5233cf3cebddc487eadec68773ae7205cdbeb0)
- fix for Cannot convert null to object  at hasOwnProperty (native) when node is null [`f9f76af`](https://github.com/ljharb/js-traverse/commit/f9f76afbcb28e5e4ccdd4e159803dc38d36f60d5)
- fix for brokenness in IE with using the wrong variable name for the prototype checking [`3469e6a`](https://github.com/ljharb/js-traverse/commit/3469e6af16245d07062705fabb9f6a742e519cb9)
- [Refactor] protect against an impossible bug [`2f0d9f5`](https://github.com/ljharb/js-traverse/commit/2f0d9f5a6eeaed9740314e9e06494505ae45eff4)
- [meta] add missing `engines.node` [`b361a59`](https://github.com/ljharb/js-traverse/commit/b361a59bbd0a6be8bfc0d583bc645b356d9f8e97)
- [actions] set least-privilege `cache-mode` [`5f1a7eb`](https://github.com/ljharb/js-traverse/commit/5f1a7ebca2774c213ea94cfe3897cd3fdcccf744)
- [Robustness] use a null object in `modifiers` [`06d8bdf`](https://github.com/ljharb/js-traverse/commit/06d8bdfa1284f18c39cf7b9bc5b19d7432474a9e)
- [actions] update checkout action [`58464cc`](https://github.com/ljharb/js-traverse/commit/58464cc5d964213e436a6f08827cd2b65f265939)
- [actions] update checkout action [`6d45285`](https://github.com/ljharb/js-traverse/commit/6d452850bfd2a2fd10d2bd61bbb38a624e5a33a2)
- guard for the presence of getTime [`5527e41`](https://github.com/ljharb/js-traverse/commit/5527e415a68d8092d9fb8baa74a10f090aa3d2b6)
- use getTime() for firefox browser support [`90be0e2`](https://github.com/ljharb/js-traverse/commit/90be0e2a644b99740ae6f5d469170dd59b8f5a06)
- Fix crash when node is a string and this.update is called with an object. [`3dcf61f`](https://github.com/ljharb/js-traverse/commit/3dcf61f61e3ed061f781ec879db9b9b453d84e32)
- s/^js-// [`977d8b7`](https://github.com/ljharb/js-traverse/commit/977d8b729717f173b67423068a4967de7f60c67f)
- note about this.keys, bump [`13fceed`](https://github.com/ljharb/js-traverse/commit/13fceed8f95022306e54998053b55a4c5cf76878)
- fix for IE [`b4c73dd`](https://github.com/ljharb/js-traverse/commit/b4c73dd4f610bac9b281a6606283543accac58fd)
- [Tests] replace `aud` with `npm audit` [`cc3ee42`](https://github.com/ljharb/js-traverse/commit/cc3ee4230c5b487af8e9a1fca8ff02ddd51dfa45)
- Only set state.keys when necessary [`cc7b4a4`](https://github.com/ljharb/js-traverse/commit/cc7b4a4bdb04eccd9415fa95f635e51ea44788af)
- drop 0.4 [`86b9485`](https://github.com/ljharb/js-traverse/commit/86b948584385fe8c31b87be5287429427e411c68)
- export 'parents' to context [`94692fa`](https://github.com/ljharb/js-traverse/commit/94692fa2119eb0245e16be8815672a678e64f8ea)
- bump for exposing parents [`7ef056c`](https://github.com/ljharb/js-traverse/commit/7ef056c77c2633971083bee0d3658e7235fa1495)

## [v0.3.9](https://github.com/ljharb/js-traverse/compare/v0.3.8...v0.3.9) - 2011-06-14

### Commits

- an amazing number of test descriptions were getting ignored [`1d043f0`](https://github.com/ljharb/js-traverse/commit/1d043f09e6eb6ecf8456295efdbe4e7298f7c3c8)
- better failing super deep test [`01d35ce`](https://github.com/ljharb/js-traverse/commit/01d35ce70d514243d1854bd4c50eb0fa5321ef2b)
- stop() passes its test [`79d615f`](https://github.com/ljharb/js-traverse/commit/79d615f8dc60dc491da82d80f0fdab1a53974d3d)
- passing test for deep reduce and this.stop() [`9aea0a1`](https://github.com/ljharb/js-traverse/commit/9aea0a10cdd48f23ef40aeaee54f2d50053d77ff)
- passing new tests yay [`3d5057a`](https://github.com/ljharb/js-traverse/commit/3d5057a832c14f51d07ddb7f3331769c37f6192d)
- failing test for this.stop() [`090c3d4`](https://github.com/ljharb/js-traverse/commit/090c3d4d2de99586ad89a8b51ab8ea5664747e3e)
- passing test for stop map too hooray [`0ee24cc`](https://github.com/ljharb/js-traverse/commit/0ee24cc01673ea3dfd63e854b70bcd7b36b9884d)
- test for arity shows more bugs [`da698d6`](https://github.com/ljharb/js-traverse/commit/da698d6c7f5b712c9d89b3fa42a00b9cf2b42b4c)
- bump to 0.3.9 for guybrush's IE fix [`f20a2f4`](https://github.com/ljharb/js-traverse/commit/f20a2f4c039c9bfe1392ffc09f3472abd498ed60)
- fix for IE [`6739acb`](https://github.com/ljharb/js-traverse/commit/6739acb59cc359eda2ac283d7808ef56978e41df)
- Merge commit '6739acb59cc359eda2ac283d7808ef56978e41df' into 0.3 [`b83be23`](https://github.com/ljharb/js-traverse/commit/b83be23777ebc0665bcb4bb0412197ea3912b347)

## [v0.3.8](https://github.com/ljharb/js-traverse/compare/v0.3.7...v0.3.8) - 2011-06-06

### Commits

- tests for some bugs in deepEqual [`2b15a41`](https://github.com/ljharb/js-traverse/commit/2b15a410f723f0ed5b3bdc019803deff7d70b7c0)
- deep equal tests now pass, delete map tests fail though [`bfdc40e`](https://github.com/ljharb/js-traverse/commit/bfdc40e35f7a3ec3acf96f7f8599602747ef999d)
- delete map redux test also passes for deleted element construction syntax [,,,] etc [`56553ff`](https://github.com/ljharb/js-traverse/commit/56553ff7753e21480023caa488791a4d88f36673)
- now passing all the equality tests again [`6721461`](https://github.com/ljharb/js-traverse/commit/6721461c4fc1323c5784f16ee5efcd7a18d77122)
- tests for remove() and delete() [`f5d429a`](https://github.com/ljharb/js-traverse/commit/f5d429a15a77e2a7ce33c2485a2b3ee43f41d341)
- remove tests [`7010fe2`](https://github.com/ljharb/js-traverse/commit/7010fe2bdc568f59576da576c09b5a7c90291b89)
- better failing levels test for deepEqual [`73efbe5`](https://github.com/ljharb/js-traverse/commit/73efbe5ea5f2c61c8c3f6e4cd6fbc2d290e33188)
- failing deepEqual comparison with undefined throws [`0a6d27d`](https://github.com/ljharb/js-traverse/commit/0a6d27d139baefbd2a19411a6a4805b2bbd5d664)
- remove unused seq devDependency, bump expresso version [`0c1e021`](https://github.com/ljharb/js-traverse/commit/0c1e0218a991fa6fd71468ee54cdd364cab5d1b5)

## [v0.3.7](https://github.com/ljharb/js-traverse/compare/v0.3.6...v0.3.7) - 2011-06-05

### Commits

- now with syntax-highlightable markdown snippets [`d4a7710`](https://github.com/ljharb/js-traverse/commit/d4a771015d6483859784a585912a816bd4d82484)
- failing circular map scrub test [`9f36635`](https://github.com/ljharb/js-traverse/commit/9f3663533d34d4280c6dd49387a8516b40ae67c4)
- fix for immutable removal, bump to 0.3.7 [`9528471`](https://github.com/ljharb/js-traverse/commit/9528471cad4bbe810d7b10133f53ea0937e6667d)

## [v0.3.6](https://github.com/ljharb/js-traverse/compare/v0.3.5...v0.3.6) - 2011-06-03

### Commits

- tests for not-yet-written deepEqual() [`5267ae1`](https://github.com/ljharb/js-traverse/commit/5267ae183ac44d82438da0c3665a31c456e27fdb)
- deepEqual now passes several tests [`6fe06a5`](https://github.com/ljharb/js-traverse/commit/6fe06a5a7e7d76e4cdeaae148fbd40964a8bd478)
- dox for deepEqual [`5eab662`](https://github.com/ljharb/js-traverse/commit/5eab662f486e423e8d1d4bde65c47f99243aa1fe)
- untested get and set [`7fa7247`](https://github.com/ljharb/js-traverse/commit/7fa7247dcfe2b2ddcc0ea9ecd2c7329a1e034151)
- missing comma fixed the regexp test and also an implementation for typeof "function" [`fc23e4f`](https://github.com/ljharb/js-traverse/commit/fc23e4fb50e8adf0891c416c994390b02545a197)
- a passing test for the other case of structural deep circular reference checking [`04e5492`](https://github.com/ljharb/js-traverse/commit/04e54928da73b2d02a4430bfa79e2505af51068a)
- some tests were wrong, regexp test rightly still fails [`b9d1110`](https://github.com/ljharb/js-traverse/commit/b9d11107f62367453eaf707b2cb29df1533043ea)
- circular test for topological circular equality passes [`b423996`](https://github.com/ljharb/js-traverse/commit/b4239962ab0312d660a7895b74fda36368d057f9)
- and another test just in case for non-root circular ref checks [`a914717`](https://github.com/ljharb/js-traverse/commit/a9147171961cbf7ae8a9a45fb73cd3c0591da33b)
- actually check function equality, all tests now passing [`cb7c1b0`](https://github.com/ljharb/js-traverse/commit/cb7c1b04cb7b4b1037419349000e96b13d824ab7)

## [v0.3.5](https://github.com/ljharb/js-traverse/compare/v0.3.4...v0.3.5) - 2011-05-28

### Commits

- took out up-front cloning, only fails date test [`718d01b`](https://github.com/ljharb/js-traverse/commit/718d01b06cdb9f9c948d1ac5886a7a3fc17d1008)
- cleaned up root handling, fails circDubMap still [`9ed99f3`](https://github.com/ljharb/js-traverse/commit/9ed99f3dd74123c17eb2787bfac6207c643d39d6)
- updated tests for expresso updates ages ago [`f95bf5e`](https://github.com/ljharb/js-traverse/commit/f95bf5e0eb7300832d326960289ec7f395630bfd)
- passes all its tests again [`d0dac52`](https://github.com/ljharb/js-traverse/commit/d0dac529201dc8b3e6a7dba3d853d839b746ffbf)

## [v0.3.4](https://github.com/ljharb/js-traverse/compare/v0.3.3...v0.3.4) - 2011-04-16

### Commits

- updated readme for this.delete() and this.remove() [`e4cea30`](https://github.com/ljharb/js-traverse/commit/e4cea309a1f035400c8f4e9ebd55e6e0cecf8a35)
- quote the delete keyword [`42d0460`](https://github.com/ljharb/js-traverse/commit/42d0460fc6624a38775bd65a4788cfa8b3f08825)

## [v0.3.3](https://github.com/ljharb/js-traverse/compare/v0.3.2...v0.3.3) - 2011-04-15

### Commits

- this.remove() and this.delete() with passing tests [`d603771`](https://github.com/ljharb/js-traverse/commit/d603771e1381e0d62c70bc1f47736c8eaa6cfa6f)

## [v0.3.2](https://github.com/ljharb/js-traverse/compare/v0.3.1...v0.3.2) - 2011-04-10

### Commits

- now traverses over dates correctly and should work for other builtins [`bb8d1b5`](https://github.com/ljharb/js-traverse/commit/bb8d1b567489a94507941f4a6bda2224ed2d9692)
- failing date map test [`a504425`](https://github.com/ljharb/js-traverse/commit/a504425aa3021371f67498b27d4a98e6f7a4283f)
- forgot the console.dir [`fb2c472`](https://github.com/ljharb/js-traverse/commit/fb2c4729ac1a7824358ee04ea840a35ac3ea17af)

## [v0.3.1](https://github.com/ljharb/js-traverse/compare/v0.3.0...v0.3.1) - 2011-02-18

### Commits

- updated readme and examples for the new interface changes [`aa2d4f3`](https://github.com/ljharb/js-traverse/commit/aa2d4f3f1cc88a230cdb8fae3b1b416773860ef4)
- mutability tests all pass [`36df874`](https://github.com/ljharb/js-traverse/commit/36df874ae431b0e31dc809c0b949073774f624b4)
- updated tests to not use sys anymore [`7a0969f`](https://github.com/ljharb/js-traverse/commit/7a0969fbb39a7a66f4bd46ca8172edef15b675ea)
- simpler clone implementation [`6a6cb49`](https://github.com/ljharb/js-traverse/commit/6a6cb49f2da571470a6b024b1e8db5ef2080b946)
- double circular ref test failing, not aggressive enough [`d190897`](https://github.com/ljharb/js-traverse/commit/d190897a9763549e2a077c01378520d519b402f7)
- reduce() now too [`c89ae4b`](https://github.com/ljharb/js-traverse/commit/c89ae4be025534494422cc1265f50595828398b3)
- fix for isRoot, check path.length, not node === root [`423066e`](https://github.com/ljharb/js-traverse/commit/423066e821070ffb8f8a29022175b08f4bfc5d99)
- passing circular ref update forEach test but failing for likewise with map [`d411695`](https://github.com/ljharb/js-traverse/commit/d4116955a4fbc00a2fd716e3885e334b9664d670)
- trade some space savings for less agressive circular reference algorithm (the same as console.dir it seems) [`ee52d80`](https://github.com/ljharb/js-traverse/commit/ee52d80d2b18ea069f38039b210f68b00aa29d4b)
- failing test for circular ref updates [`42b6b84`](https://github.com/ljharb/js-traverse/commit/42b6b84917f34f80729339127360c36bd62fa9bd)

## [v0.3.0](https://github.com/ljharb/js-traverse/compare/v0.2.4...v0.3.0) - 2011-02-18

### Commits

- completely rewrote Traverse, deleted hash.js and web.js [`414c726`](https://github.com/ljharb/js-traverse/commit/414c72637807c0e6e86f38f66146d729d0bbf3f2)
- tests pass again with the rewrite [`f0f76cc`](https://github.com/ljharb/js-traverse/commit/f0f76cc6b08849644a79a828e249be2d8896797a)

## [v0.2.4](https://github.com/ljharb/js-traverse/compare/v0.2.3...v0.2.4) - 2011-02-03

### Commits

- for some silly reason I was requiring sys [`95712d9`](https://github.com/ljharb/js-traverse/commit/95712d9de9e6182860418754690bb98c40462d62)

## [v0.2.3](https://github.com/ljharb/js-traverse/compare/v0.2.2...v0.2.3) - 2010-11-19

### Commits

- a hash exclude test and a package bump [`536b93d`](https://github.com/ljharb/js-traverse/commit/536b93dc0474a27a0f5c3f53b8a80cf3eb32e4e4)
- exclude to remove keys [`752f64f`](https://github.com/ljharb/js-traverse/commit/752f64f66da9fb424a4f78fc2d4ad0ef096ba65d)

## [v0.2.2](https://github.com/ljharb/js-traverse/compare/v0.2.1...v0.2.2) - 2010-10-25

### Commits

- detect test, package bump [`04b1d50`](https://github.com/ljharb/js-traverse/commit/04b1d50e73870026fd21ab9ccea609c3f1351080)
- detect like in ruby [`441f3b4`](https://github.com/ljharb/js-traverse/commit/441f3b4bef547cb4b07b10e139fa68ec1b9b4a95)

## [v0.2.1](https://github.com/ljharb/js-traverse/compare/v0.2.0...v0.2.1) - 2010-09-11

### Commits

- better compatability fallbacks for ff, maybe ie [`33577aa`](https://github.com/ljharb/js-traverse/commit/33577aae0ccdc441e40fab0a945d831805cc8148)
- compact and size for Hash (can't do .length since the function prototype has that) [`b9e6db5`](https://github.com/ljharb/js-traverse/commit/b9e6db57addbcc67a1cfec0ab9a380573d0cab8e)
- more correct string behavior in stringify example [`b9750ff`](https://github.com/ljharb/js-traverse/commit/b9750ff32be6ad76892bdf01a533bd13907d92f7)

## [v0.2.0](https://github.com/ljharb/js-traverse/compare/v0.1.4...v0.2.0) - 2010-09-08

### Commits

- deepEquals to make the tests simpler [`a962ed8`](https://github.com/ljharb/js-traverse/commit/a962ed8d0e5e3baf8279e5b3bf2476e5d2c7dbb8)
- top-level Hash functions more closely mirror Hash() functions [`35298be`](https://github.com/ljharb/js-traverse/commit/35298be61b782681f6d0a555a0ab8db673419293)
- .has with tests [`02727cf`](https://github.com/ljharb/js-traverse/commit/02727cfe1d86cf6c36daa700513861fe1f4a8066)
- test for valuesAt and now takes a single non-array key too [`3487771`](https://github.com/ljharb/js-traverse/commit/348777160fe2008186d5089fddd8e5686d0c1c3a)
- take out memoization since it breaks if the hash gets modified outside the fluent interface [`67b6d3d`](https://github.com/ljharb/js-traverse/commit/67b6d3d5ea7d8ed7127f7f9129660510f9292716)
- zip and zip constructor [`616514e`](https://github.com/ljharb/js-traverse/commit/616514ebd72a9c8a4e4b59763ee0462dcae89de0)
- zip test passes [`0226636`](https://github.com/ljharb/js-traverse/commit/0226636db7b8d3a49c2a7cbb26d18f7eeba061c1)

## [v0.1.4](https://github.com/ljharb/js-traverse/compare/v0.1.3...v0.1.4) - 2010-09-08

### Commits

- test for compact passes [`ec171ba`](https://github.com/ljharb/js-traverse/commit/ec171bab4d2b2339752cbab00c0d4b65652de0f0)
- compact like in ruby, but for hashes [`0d8e1e6`](https://github.com/ljharb/js-traverse/commit/0d8e1e624005b58aecd6a6dddaefc20da33cdf4a)

## [v0.1.3](https://github.com/ljharb/js-traverse/compare/v0.1.2...v0.1.3) - 2010-09-04

### Commits

- add stringify to examples [`6683529`](https://github.com/ljharb/js-traverse/commit/668352964878c1f896b3f57b69a989717c0fae5c)
- now isArray and instanceof works for arrays [`fa2d72b`](https://github.com/ljharb/js-traverse/commit/fa2d72b33705adccc74bf12e94e4e68d7261469c)

## [v0.1.2](https://github.com/ljharb/js-traverse/compare/v0.1.1...v0.1.2) - 2010-09-04

### Commits

- pushed walk() out of map [`e7ec7de`](https://github.com/ljharb/js-traverse/commit/e7ec7dee4b33968b0b380e54202d5d01af5e9a80)
- modifiers seem to work [`f0ee567`](https://github.com/ljharb/js-traverse/commit/f0ee567968c4b218ae729d76520ab2f3fe2c372f)
- stringify test for new modifiers [`6de18e5`](https://github.com/ljharb/js-traverse/commit/6de18e5012578b4a71faf442962ce999fc72624c)
- before, after, and between callbacks to fancier traversing [`5662b6f`](https://github.com/ljharb/js-traverse/commit/5662b6f5265bfec32dccb999b9749cf2569e7d9f)
- updated readme and negative example with new style [`5aa3f84`](https://github.com/ljharb/js-traverse/commit/5aa3f84584fb1a74652485e3cf809f5982a4cb88)
- deprecated .get() in favor of .value [`a8d1645`](https://github.com/ljharb/js-traverse/commit/a8d1645665ebb832ff82eca3317e61bf62ca83ed)
- non-coerced root test fixes an odd bug with array traversal [`f22580a`](https://github.com/ljharb/js-traverse/commit/f22580aacec7b2eb60c38ba8ba1b89324ed3e209)

## [v0.1.1](https://github.com/ljharb/js-traverse/compare/v0.1.0...v0.1.1) - 2010-09-04

### Commits

- only update when this.update is still around, tests for Traverse.functions [`cc59d56`](https://github.com/ljharb/js-traverse/commit/cc59d56b994759f6acd9efd70d9063ea40f45fbf)
- deprecate modify in favor of map [`f018025`](https://github.com/ljharb/js-traverse/commit/f018025989afdd6c9474d9e9095331500826d553)
- fix nodes and paths [`78edd30`](https://github.com/ljharb/js-traverse/commit/78edd30685e1d47deac4edd7bdd1e1b360a0244f)
- use return values to auto-update [`bc68fa5`](https://github.com/ljharb/js-traverse/commit/bc68fa5426363872835f1b4b73b8abf7920c9bfc)

## [v0.1.0](https://github.com/ljharb/js-traverse/compare/v0.0.9...v0.1.0) - 2010-09-03

### Commits

- circular refs don't crash it now [`2cdd854`](https://github.com/ljharb/js-traverse/commit/2cdd85460054f91e3130b269a6020e20cb59d7c0)
- new top-level map forEach paths and nodes [`e508823`](https://github.com/ljharb/js-traverse/commit/e5088233c9e09221f2ac766bd95c0ea55e7d0761)
- package bump to 0.1.0 and should work in IE better now too [`4400d88`](https://github.com/ljharb/js-traverse/commit/4400d886d7e33dd811121e7cd5ac5a31a0ca25b0)

## [v0.0.9](https://github.com/ljharb/js-traverse/compare/v0.0.8...v0.0.9) - 2010-08-27

### Commits

- broke up test into separate exports [`92046a4`](https://github.com/ljharb/js-traverse/commit/92046a4e0622d0db9502a2d6090041935d1bede6)
- forgot the return in ('traverse/web').source() [`188ee17`](https://github.com/ljharb/js-traverse/commit/188ee170de8b087a6bbec6dad92b39a0f1ffc67e)

## [v0.0.8](https://github.com/ljharb/js-traverse/compare/v0.0.7...v0.0.8) - 2010-08-26

### Commits

- memoization for keys, values, length [`9cffe15`](https://github.com/ljharb/js-traverse/commit/9cffe158a70f4945a6bf000dace4eddf4ca2c344)
- merge, update, and tap [`df5b737`](https://github.com/ljharb/js-traverse/commit/df5b737a7b82711261be325b7f9aa0e7aedc6804)
- length, clone, and copy [`249ec0f`](https://github.com/ljharb/js-traverse/commit/249ec0fcd2b62c6701488c17083433049060ae15)
- updated readme and f.call(self) [`03f6f1e`](https://github.com/ljharb/js-traverse/commit/03f6f1e03c9ccc2a6afb0525393acde13d2b009f)
- more explicit about the licensing (MIT/X11) [`c452103`](https://github.com/ljharb/js-traverse/commit/c4521038e845878ebb20984204f1db7520df9cad)
- oh right and this example file [`d98c125`](https://github.com/ljharb/js-traverse/commit/d98c125d9f9f17ca08260ed57ede2b1fac26da11)
- updated readme for hash traversal [`a56b629`](https://github.com/ljharb/js-traverse/commit/a56b629aae33e6bfe45bc3ec72b65bc84536f57b)
- tests for update, concat, and merge all pass [`7fc4eca`](https://github.com/ljharb/js-traverse/commit/7fc4ecaf203924becd9c88d800216ddad7ecbd4b)
- updated readme for hash stuff [`094ab55`](https://github.com/ljharb/js-traverse/commit/094ab556f795e554e8227016d8fd6acc36f0257c)
- more tests, all pass [`2d9f7a2`](https://github.com/ljharb/js-traverse/commit/2d9f7a245ac6793e8e58ba4c751e551650cfbaac)
- key and value getters [`459def9`](https://github.com/ljharb/js-traverse/commit/459def9529e381d38909f75b182b330e20d3f2f9)
- stupid markdown parens [`0bd932b`](https://github.com/ljharb/js-traverse/commit/0bd932bc6517d08f02ab3aac8cc551425072ead7)
- new valuesAt and extract functions [`883f015`](https://github.com/ljharb/js-traverse/commit/883f015c79ea79acc188a98be3bfa7ad54186266)
- tests for valuesAt and extract pass [`86d71a9`](https://github.com/ljharb/js-traverse/commit/86d71a97241ff84b071a0ff4aed68a99919014ff)
- hash example, some() [`c7a133c`](https://github.com/ljharb/js-traverse/commit/c7a133cbb59d5fa9aedfe3958b9a0898fc5dea4c)
- key and value tests [`92212e5`](https://github.com/ljharb/js-traverse/commit/92212e55cfb1f16f68c14885d644125a83951589)
- copy instead of clone for merge [`4fcece2`](https://github.com/ljharb/js-traverse/commit/4fcece2de64fbe90ef0250f31f4f399a103ec7ed)

## [v0.0.7](https://github.com/ljharb/js-traverse/compare/v0.0.6...v0.0.7) - 2010-08-26

### Commits

- new hash lib and clone sugar [`586124c`](https://github.com/ljharb/js-traverse/commit/586124cebb2b613ee63d0c76a0d636058c5c9213)
- hash test for map [`393444a`](https://github.com/ljharb/js-traverse/commit/393444a2add24b9dba4f68385518b96a3900de33)
- a test for instances [`1adf75a`](https://github.com/ljharb/js-traverse/commit/1adf75a9cdc13b094b660f17bc496a94fd9576fd)
- new modules format for package.json, boost to 0.0.7 [`0f11600`](https://github.com/ljharb/js-traverse/commit/0f11600d5cfb67b50fb4f4f79dda522d17c9df4f)
- __proto__ trick to make instanceof work on cloned objects [`130a833`](https://github.com/ljharb/js-traverse/commit/130a833014477b7463cb8fbf4de246fd93f990a5)

## [v0.0.6](https://github.com/ljharb/js-traverse/compare/v0.0.5...v0.0.6) - 2010-08-01

### Commits

- magical webified version of traverse with require('dnode/web').source() [`0043cd6`](https://github.com/ljharb/js-traverse/commit/0043cd6b57327a0d1962b7378e9f6897d963e3c0)
- directories.lib, I forgot. Also scrub requires for later [`2a1f530`](https://github.com/ljharb/js-traverse/commit/2a1f5301601984b09a1746bd0b1699fb88a18264)

## [v0.0.5](https://github.com/ljharb/js-traverse/compare/v0.0.4...v0.0.5) - 2010-07-28

### Commits

- test for stupid .constructor() bug [`6b9d85d`](https://github.com/ljharb/js-traverse/commit/6b9d85dac5eedd3e043c63fe2cff4881c25f9f98)
- stupid traversal bug, version bump [`4cf36f3`](https://github.com/ljharb/js-traverse/commit/4cf36f3f987a71704064dd6ab6b695ddce0cac47)

## [v0.0.4](https://github.com/ljharb/js-traverse/compare/v0.0.3...v0.0.4) - 2010-07-27

### Commits

- now using expresso for test suite, json test written [`7d448da`](https://github.com/ljharb/js-traverse/commit/7d448daa7c93444b302095da394f8f47bf3fb61f)
- leaves and negative tests to go with the example, also s/tests/test/ [`13e19bf`](https://github.com/ljharb/js-traverse/commit/13e19bf5441abc903a270eb5abfc985d75a7507b)
- clone in the constructor so updates don't mess up the root object's refs [`fc5903b`](https://github.com/ljharb/js-traverse/commit/fc5903b3b008377d7f06e83ad3bce84957900c8c)
- readme updates for expresso tests and version bump to 0.0.4 [`6993515`](https://github.com/ljharb/js-traverse/commit/69935153c1b54afaee42c58c8e33f15d21f55efe)

## [v0.0.3](https://github.com/ljharb/js-traverse/compare/v0.0.2...v0.0.3) - 2010-07-21

### Commits

- backwards compatible update for var Traverse = require('traverse') style [`d0f50e9`](https://github.com/ljharb/js-traverse/commit/d0f50e9a6f428b68fc51e1c582148196deb9e209)

## [v0.0.2](https://github.com/ljharb/js-traverse/compare/v0.0.1...v0.0.2) - 2010-07-14

### Commits

- special check for null, for which typeof(null) == 'object' [`a4128c0`](https://github.com/ljharb/js-traverse/commit/a4128c01a666132b40c69d57d9176a33a1f5046c)
- installation in readme [`a6fc0d6`](https://github.com/ljharb/js-traverse/commit/a6fc0d641970984fefab29773a930f22c925eb91)
- add output to negative example [`590045e`](https://github.com/ljharb/js-traverse/commit/590045e3bc9daf8dbb884f59b3579bf57a7dc42d)
- license file [`519fd1f`](https://github.com/ljharb/js-traverse/commit/519fd1ff6d225d2465899d102519e93ef5334bba)
- s/127/128/ [`5fcb3f5`](https://github.com/ljharb/js-traverse/commit/5fcb3f5256207e392e9500db720aa2aeb3f85304)

## v0.0.1 - 2010-07-08

### Commits

- initial commit with forEach, modify, get, paths, nodes [`e73bba8`](https://github.com/ljharb/js-traverse/commit/e73bba81dbc8630a0ef6003fa3c12ceaafc4188d)
- more examples [`16bf66e`](https://github.com/ljharb/js-traverse/commit/16bf66e5cf5c537441a98001eae9368d4bae7317)
- readme with json example [`fa8265b`](https://github.com/ljharb/js-traverse/commit/fa8265badad1dfe3df5d1aa6e561a3698e4b1338)
- json example [`607de69`](https://github.com/ljharb/js-traverse/commit/607de691cd1bdeb0ced603d5177e3f855dc20417)
- leaf example [`23ccea5`](https://github.com/ljharb/js-traverse/commit/23ccea575ce9b6984fcd8bb64ccd7f9ee765c258)
- package.json file for version 0.0.1 [`c3266e0`](https://github.com/ljharb/js-traverse/commit/c3266e060d8b5ebfb6472385dba323c7e951fd14)
- npm doesn't like newlines in package.json strings [`6840d4e`](https://github.com/ljharb/js-traverse/commit/6840d4e7c75aaafeca6778a48600759641dfa7f1)

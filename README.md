# karma-kintuba

[![npm version](https://badge.fury.io/js/karma-kintuba.svg)](https://badge.fury.io/js/karma-kintuba)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

kintuba for karma.

## Description

karma-kintuba は karma で kintuba を利用する為のプラグインです。

kintuba については以下リポジトリを参照して下さい。

[https://github.com/t-kojima/kintuba](https://github.com/t-kojima/kintuba)

## Install

```bash
npm install --save-dev karma-kintuba
```

or

```bash
yarn add --dev karma-kintuba
```

## Usage

### karma.conf.js

`karma.conf.js`ファイルの`frameworks`と`files`に以下追記します。

```js
frameworks: ['kintuba'],
files: [
    {
        pattern: '.kintuba/**/*.json',
        watched: false,
        included: false,
        served: true,
        nocache: false,
    },
],
```

実際使用する際のファイルは以下のようになります。

```js
module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon', 'kintuba'],
    files: [
      'src/**/*.js',
      'test/**/*.js',
      {
        pattern: '.kintuba/**/*.json',
        watched: false,
        included: false,
        served: true,
        nocache: false
      }
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
}
```

以上の設定で、karma でテストを実行する際に`kintone`オブジェクトのスタブを利用することができます。

使用例）

```js
describe('example', () => {
  it('can get ui version', () => {
    chai.assert.equal(kintone.getUiVersion(), 2)
  })
})
```

### テストデータの利用

デフォルトの状態ではデータが存在しない為、`event.records`などにアクセスしても空配列が返ります。テストデータを返すようにするには、テストデータを用意し以下の手順で都度読み込んでください。また、テストデータの作成は[ここ](https://github.com/t-kojima/kintuba/blob/master/docs/Commands.md)を参考に行ってください。

### schema

`schema.load()`を実行すると、`.kintuba/schema` ディレクトリにある以下のファイルを読み込みます。

- app.json
- fields.json
- form.json
- views.json

尚、非同期に読み込まれる為、以下の例では async/await で読み込んでいます。

```js
describe('example', () => {
  before(async () => {
    await schema.load()
  })
})
```

既定のディレクトリ（`.kintuba/schema`）以外にあるファイルを読みたい場合は引数で指定することができます。

```js
await schema.load('other/dir')
// other/dir/app.json等がロードされる
```

### fixture

`fixture.load()`を実行すると、`.kintuba/fixture`ディレクトリにある以下のファイルを読み込みます。

- login.json
- records.json

`schema`と同様に非同期に実行される点注意して下さい。

また、既定のディレクトリ以外を読む場合は引数で指定します。

```js
await fixture.load('other/dir')
// other/dir/login.json等がロードされる
```

## Licence

MIT License.

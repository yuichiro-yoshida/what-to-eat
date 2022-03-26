# what-to-eat
妊婦の「これ食べて大丈夫なの？」「何を食べるのが望ましいの？」を素早く解決するアプリケーション。

https://i-dont-know-what-to-eat.vercel.app/

## 背景
妻が妊娠した時、食べて大丈夫だと思って買ってきたものがよくよく調べたら控えるべき食べ物だったことが何度かあり、素早く検索しやすいアプリが欲しくなって作りました。

## 主要機能
- 食べた方がいいもの、避けた方がいいものをそれぞれタブで絞り込んで表示できます
- 食材名、成分名をテキスト入力して部分一致で素早く探したい食べ物の情報を調べられます
- 時期（妊娠初期、中期、後期、授乳期）で絞り込んで、その時期特有の食べた方がいいもの、避けた方がいいものがわかります
- 食べ物の情報からは、妊娠に影響する含まれる成分名や、その効果・含有量、おすすめの食べ方などがわかります

## 主な技術スタック
- Nuxt3（実装時点ではbeta版）, Vue3（composition-api）
- TypeScript
- PrimeVue（Vue3対応のUIライブラリ）

## 開発ロードマップ
GitHubのプロジェクト機能で管理しています。
https://github.com/yuichiro-yoshida/what-to-eat/projects/1

## 開発環境セットアップ

```bash
yarn install
```

## ローカルdevelopment環境の立ち上げ

http://localhost:3000

```bash
yarn dev
```

## Productionビルド

```bash
yarn build
```

# デジタルバリューハッカソンチーム

## 概要

今回のハッカソンのテーマは、「企業向けのDAO支援ツール」です。  
TOYOTA社内で新規事業を生み出すプログラム「Be Creation」へのDAOの導入案件です。

私たちの成果物である、DAO支援ツールは次のようなコンセプトです。

* プロジェクトの導入における資金調達を手助けします。
* プロジェクトの実績を引き出し、見える化します。
* プロジェクト自身が事務局とともに審査員となって他プロジェクトに投票し評価することで、プロジェクト自身にも予算が還元されるようにします。

> 審査員への配分予算は、Defi プラットフォーム [ArthSwap](https://app.arthswap.org/#/farms) での流動性マイニングの運用益から捻出します。

![Introduction](https://github.com/snst-lab/nuxt3-nestjs-graphql-web3/blob/develop/docs/images/Introduction.jpg)

<br/>

## What's our challenges? - 解決したい課題 -

* マネジメントレイヤーの悩み
   * どのプロジェクトに出資すべきか、判断が難しい
      * 審査対象のプロジェクトの数も多く、負担が大きい。

* プロジェクトチームの悩み
   * 成果を出すためにがんばっているけど、なかなか予算がとれない。
   * 予算がないと成果も出しづらい。
      * ニワトリタマゴの関係

![Problem](https://github.com/snst-lab/nuxt3-nestjs-graphql-web3/blob/develop/docs/images/Problem.jpg)

<br/>

## 実現したいこと

* Be Creation への参加プロジェクト達自らが、審査員となり相互にプロジェクトへ投票する仕組み。

* 審査員となったプロジェクトが、義務や強制ではなく、自発的に投票に参加したくなるような仕組み。

* 審査員となったプロジェクトが、駆け引きや打算無しに真剣に有望なプロジェクトを選びたくなるような仕組み。

> 出資の決定権は残るものの、事務局の仕事が、最終的には予算管理や Web3 ウォレットの管理等、主に事務的な事項のみに集約されていくことを期待します。

![Expection](https://github.com/snst-lab/nuxt3-nestjs-graphql-web3/blob/develop/docs/images/Expection.jpg)

<br/>

## 制作物

* **[Business Idea ビジネスアイディア](./docs/BusinessIdea.md)**

* **[UseCases デモ動画・ユースケース一覧](./docs/UseCases.md)**

<br/>

## 提供したい価値

### 事務局へ向けて

- 各々のプロジェクト自身が審査に積極的に関わり、事務局の負担を減らすように自発的に動くための、モチベーションを提供します。

- プロジェクトの活動実績を集約して見える化し、審査の一助となるUIを提供します。


### プロジェクトへ向けて

- がんばっているけどなかなか予算配分されないプロジェクトに対しても、審査員としての「見る目」を発揮することで、予算配分の可能性を提供します。

- Defi プラットフォーム [ArthSwap](https://app.arthswap.org/#/farms) を活用して、予算確保から審査が終了するまでの間、出資金を休眠させている期間を運用機会とみなして、余剰予算を捻出するしくみを提供します。


### ユーザー共通の価値

- 誰が誰にいくら投票したか等の数量の改ざんができないブロックチェーンの性質により、
サービス自体に対する公平感・信頼性を提供します。

<br/>

## 番外編（使用した技術スタック）

### コミュニケーション

- Notion
- Discord

### 設計

- Miro (ビジネスアイディア設計)
- Figma (画面設計)
- A5 SQL Mk2 (ER図)

### フロントエンド

- Nuxt3
- Quasar
- GraphQL Client
- Metamask

### バックエンド (Off Chain)

- NestJS
- Fastify
- GraphQL Server (Mercurius)
- Prisma
- MariaDB (Docker)

### スマートコントラクト (On Chain)

- Ganache
- Hardhat
- Solidity



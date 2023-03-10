# 使い方説明書

## ソースコード最新化

* ソースコード最新取得
  * `pull`
* DB 初期化
  * `make db-init`
* スキーマ更新
  * `make prisma`
    * DBが起動していない場合はエラーになるので先に「DB起動」を実行する
      * `make db`

* DB 定義変更が反映されない場合は以下を試してみる
  * Prisma Studio のコマンドを終了する(Ctrl + C)
  * DB を再度起動
    * `make db`
  * 原因
    * `make db` でDB起動と Prisma Studio を起動しているが、Prisma Studio を起動したままだと変更が反映されない？

* SmartContractService を使用するための準備
* packages/@constsnts/web3/config.ts
  * コメント解除範囲の修正(baseUrl, Key)

  ```json
  astar: {
    title: "Astar Mainnet",
    name: "astar",
    chainId: 592,
    nativeCurrency: {
      name: "Astar",
      symbol: "ASTR",
      decimals: 18,
    },
    rpc: {
      // baseUrl: "https://astar-mainnet.g.alchemy.com/v2",
      // key: process.env.RPC_KEY_astar,
      baseUrl: "https://astar.api.onfinality.io/public",
      // baseUrl: "https://evm.astar.network",
      // baseUrl: "https://rpc.astar.network:8545",
      key: "",
    },
  ```

* コマンド実行

```text
make web3
```

* metamask
  * アカウント(管理者、利用者)をインポート
    * 鍵は .env の EVM_ADMIN_SECRET, EVM_USER_SECRET をコピーして、インポート時に貼り付けていく
  * ネットワーク追加
    * 上部のネットワークから追加を選択する
    * ネットワークタブから localhost を選択する

* 別ターミナルで以下を実行

```text
make web3-init
```

* metamask の account2 のガス代が減っていることを確認

## バッチ起動

* Jira の Basic認証の設定
  * .env.template の `JIRA_ID`, `JIRA_TOKEN`の行を .env の末尾にコピーする
    * `JIRA_ID=登録メールアドレス`
    * `JIRA_TOKEN=発行したトークン`
      * [トークン発行手順](https://support.atlassian.com/ja/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/)
* タスク実行
  * `make api`
* ターミナルのバッチ起動ログを確認する

## トラブルシューティング

* git で `No supported authentication methos available` エラーがでる
  * git bash で以下のコマンドを実施する
  * `pageant ~/.ssh/id_rsa.ppk`

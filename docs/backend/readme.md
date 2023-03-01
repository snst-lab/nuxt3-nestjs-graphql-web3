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

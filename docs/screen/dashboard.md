# Pages_ダッシュボード

## `/`

### 着手中タスク一覧

> UI Type : List[Card]  
> Entity : Ticket / Project 

| 物理名 | 論理名 | 説明 | 保管先 |
| -------- | -------- | -------- |-------- |
| Ticket.name | タスク名 | ログイン中 Conributor にアサインされたタスクの名称   | Vendor / DB |
| Ticket.status | タスク名 | ログイン中 Conributor にアサインされたタスクの状態   | Vendor / DB |
| Project.name | プロジェクト名 | タスクが帰属するプロジェクトの名称   | Vendor / DB |
| Project.avatar_uri  | アバター | タスクが帰属するプロジェクトのアバター画像   | Vendor / DB  |

※ Vendor = Jira 等の外部サービスを想定しています

---

### 参加プロジェクト一覧

> UI Type : List[Card]  
> Entity : Project 

| 物理名 | 論理名 | 説明 | 保管先 |
| -------- | -------- | -------- |-------- |
| Project.name | プロジェクト名 | ログイン中 Conributor が参加している<br>プロジェクトの名称   | Vendor / DB |
| Project.avatar_uri | アバター | ログイン中ユーザーが参加している<br>プロジェクトのアバター画像   | Vendor / DB  |
| Project.status | ステータス | 活動中/休止中 のフラグ。プロジェクト更新期限時点で最低参加者数を下回った場合に休止中になる | ~~DB~~ →バッチ処理での更新はやめ、暫定的にフロント側で即時判定する |
| Project.contributor_count| 参加者数 | プロジェクトに現在参加している人数 | Vendor / DB  |
| Project.minimum_contributor_count | 最低参加者数 | プロジェクトが開始するための最低参加者数 | DB  |
| Project.campaign_deadline | ~~プロジェクト更新期限~~ | 最低参加者数判定日。~~プロジェクト起案日の月末から3カ月周期~~で訪れる月末バッチ処理日| ~~DB~~ →バッチ処理での更新はやめ、暫定的にフロント側で即時ステータスを切り替える対応 |
    
※参加者数と最低参加者数はグラフで表示するなど視覚化
※ Vendor = Jira 等の外部サービスを想定しています

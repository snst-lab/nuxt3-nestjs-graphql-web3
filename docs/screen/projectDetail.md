
# Pages_プロジェクト詳細

## `/projects/[id]`

<!-- #### プロジェクトのカバー画像
> UI Type : Image  
> Entity : Project

| 物理名 | 論理名 | 説明 | 保管先 |
| -------- | -------- | -------- |-------- |
| Project.picture | 画像 | プロジェクトのカバー画像   | Vendor / DB  | -->
    
#### プロジェクトのアバター
> UI Type : Avatar  
> Entity : Project

| 物理名 | 論理名 | 説明 | 保管先 |
| -------- | -------- | -------- |-------- |
| Project.avatar_uri | アバター | プロジェクトのアバター画像   | Vendor / DB  |

#### プロジェクト名
> UI Type : Text  
> Entity : Project

| 物理名 | 論理名 | 説明 | 保管先 |
| -------- | -------- | -------- |-------- |
| Project.name | プロジェクト名 | プロジェクトのタイトル   | Vendor / DB  |

#### プロジェクト概要エリア
> UI Type : Container  
> Entity : Project

| 物理名 | 論理名 | 説明 | 保管先 |
| -------- | -------- | -------- |-------- |
| Project.description | プロジェクト概要 | プロジェクトの説明文書   | Vendor / DB  |


#### 供託/出資ボタン
> UI Type : Button  
> Action: Smart Contract を呼び出す


#### プロジェクト参加ボタン
> UI Type : Button  
> Action: Jira プロジェクトへの招待URLに遷移する


#### プロジェクト情報エリア

> UI Type : Container  
> Entity : Project / Project_detail

| 物理名 | 論理名 | 説明 | 保管先 |
| -------- | -------- | -------- |-------- |
| Project.status | ステータス | 活動中/休止中 のフラグ。プロジェクト更新期限時点で最低参加者数を下回った場合に休止中になる | ~~DB~~ →バッチ処理での更新はやめ、暫定的にフロント側で即時判定する |
| Project.contributor_count | 参加者数 | プロジェクトに現在参加している人数 | Vendor / DB  |
| Project.minimum_contributor_count | 最低参加者数 | プロジェクトが開始するための最低参加者数 | DB  |
| Project.campaign_deadline | ~~プロジェクト更新期限~~ | 最低参加者数判定日。~~プロジェクト起案日の月末から3カ月周期~~で訪れる月末バッチ処理日→バッチやめる (暫定：フロント側で即時判定) | DB  |
| Project_detail.credit_amount | プロジェクトへの投票額 | プロジェクトへこれまで投票された総額(Credit) | Smart Contract |
| Project_detail.sum_project_amount | プロジェクト報酬額 | プロジェクトへの預託額の運用益から、これまで受け取った報酬総額 | DB  |
| invested_amount | プロジェクトへの出資額 | プロジェクトへ出資された総額 | Smart Contract  |

※出資額 = 最終的に、プロジェクト側に渡されるお金。  
※供託額 = 最終的に、事務局側に返金されるお金。


#### 活動実績
> UI Type : List[Card]  
> Entity : -

| 物理名 | 論理名 | 説明 | 保管先 |
| -------- | -------- | -------- |-------- |
|  | 活動日 | 活動日 | Vendor |
|  | 画像 | 活動内容の画像 | Vendor |
|  | タイトル | 活動のタイトル | Vendor |
|  | 活動内容 | 活動の内容説明 | Vendor |

※ Vendor = MicroCMS などの 外部 CMS サービス を想定
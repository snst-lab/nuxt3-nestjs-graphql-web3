
# Pages_プロジェクト一覧

## `/projects`

### 検索UI
    
> UI Type : Select

- 全てのプロジェクト
- 活動中のプロジェクト
- 休止中のプロジェクト
    
GraphQL で status を 指定して検索取得するため、 `X-Search-Specification` のような定義は不要
    
例
```graphql=
query {
  findManyProject(
    where: {
       status: {
          equals: "active"
       }
    }
  ) {
    response
  }
}
    
```
    
### プロジェクト一覧

> UI Type : List[Card]  
> Entity : Project

| 物理名 | 論理名 | 説明 | 保管先 |
| -------- | -------- | -------- |-------- |
| name | プロジェクト名 | ログイン中 Conributor が参加している<br>プロジェクトの名称   | Vendor / DB |
|  | アバター | ログイン中ユーザーが参加している<br>プロジェクトのアバター画像   | Vendor / DB  |
|  | ステータス | 活動中/休止中 のフラグ。プロジェクト更新期限時点で最低参加者数を下回った場合に休止中になる | DB  |
|  | 参加者数 | プロジェクトに現在参加している人数 | Vendor / DB  |
|  | 最低参加者数 | プロジェクトが開始するための最低参加者数 | DB  |
|  | プロジェクト更新期限 | 最低参加者数判定日。プロジェクト起案日の月末から3カ月周期で訪れる月末バッチ処理日 | DB  |
    
※参加者数と最低参加者数はグラフで表示するなど視覚化
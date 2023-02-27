# Fund.sol

> 出資金を預かり運用する基金

### 使用方法
https://github.com/snst-lab/nuxt3-nestjs-graphql-web3/blob/develop/packages/web3/test/fund.spec.ts

### 前提条件

localhost に fork された Astar EVM Chain ノードが起動していること
```sh
make web3
```

localhost に fork された Astar EVM Chain に Smart Contract がデプロイされていること
```sh
make contract-Fund
```
### 整数型の基本ルール
引数は Int /  戻り値は BigInt


## `getTotalCredit () returns (uint)`

#### ユースケース
基金への出資総額を照会する

#### 呼出元 - ロール
Backend - 管理者 / Frontend - 全ユーザー

#### 引数
なし

#### 戻り値
戻り値型    | 備考                                                                
--------|-------------------------------------------------------------------
BigInt | 基金への出資金残高


---

## `getCreditByProjectId (uint _projectId) external view returns (uint)`


#### ユースケース
プロジェクトへ出資された金額を照会する

#### 呼出元 - ロール
Backend - 管理者 / Frontend - 全ユーザー

#### 引数
 引数名     | 引数型    | 備考                                                                
-----------|--------|-------------------------------------------------------------------
 projectId | Int | Project Table の主キー 

#### 戻り値
戻り値型    | 備考                                                                
--------|-------------------------------------------------------------------
BigInt | プロジェクトに出資された出資金総額

---

## `getSupporterListByProjectId (uint _projectId) external view returns (address[] memory, uint[] memory)`

#### ユースケース
出資者を照会する

#### 呼出元 - ロール
Backend - 管理者 / Frontend - 全ユーザー

#### 引数
 引数名     | 引数型    | 備考                                                                
-----------|--------|-------------------------------------------------------------------
 projectId | Int | Project Table の主キー 

#### 戻り値
 配列インデックス | 戻り値型    | 備考                                                                
-----------|--------|-------------------------------------------------------------------
 0 | String[] | 出資者アドレスの配列 (登録の新しい順) 
 1 | BigInt[] | 出資者ごとの出資額の配列 (登録の新しい順) 

 > Solidity 言語の仕様で、構造体の配列を返却できないため上記のような返し方になります。構造体の配列として扱う場合は、OffChain 側で適宜マッピングする必要があります。

 ---

## `deposit (uint _projectId,address[] calldata _pathA,address[] calldata _pathB,uint _amountIn) external`

#### ユースケース
プロジェクトに出資する

#### 呼出元 - ロール
Frontend - 出資者

#### 引数
 引数名     | 引数型    | 備考                                                                
-----------|--------|-------------------------------------------------------------------
 projectId | Int | Project Table の主キー 
 pathA | String[] | 0: 出資者が送金するトークンアドレス 1: 交換先の流動性ペアAのトークン
 pathB | String[] | 0: 出資者が送金するトークンアドレス 1: 交換先の流動性ペアBBのトークンアドレス
 amountIn | Int | 出資者が送金するトークン量

#### 戻り値

なし

---

## `estimateReward (uint _projectId)`


#### ユースケース
プロジェクト毎の未受け取り報酬額を照会する

#### 呼出元 - ロール
Backend - 管理者 / Frontend - 全ユーザー

#### 引数
 引数名     | 引数型    | 備考                                                                
-----------|--------|-------------------------------------------------------------------
 projectId | Int | Project Table の主キー 


#### 戻り値
戻り値型    | 備考                                                                
--------|-------------------------------------------------------------------
BigInt | プロジェクト毎の未受け取り報酬額

---

## `claim(uint _projectId) `


#### ユースケース
基金からプロジェクト毎の報酬月額を受け取る

#### 呼出元 - ロール
Backend - 管理者

#### 引数
 引数名     | 引数型    | 備考                                                                
-----------|--------|-------------------------------------------------------------------
 projectId | Int | Project Table の主キー 


#### 戻り値

なし
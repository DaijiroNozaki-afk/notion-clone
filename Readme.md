# notionClone を利用した文字コンテメーカー

これは、Shin Code 氏の講座「【フルスタック開発】Notion クローンを MERN スタックで本格的に構築する Web アプリケーション開発実践講座」で作成した「notionClone」に手を加えたものです。
講座では触れられなかった「お気に入り」機能、Beautiful DND を使った並べ替えも実装しています。
上記の機能だけ知りたい方は、ブランチの[fix-activeFavoriteIndex-20230911](https://github.com/DaijiroNozaki-afk/notion-clone/tree/fix-activeFavoriteIndex-20230911) をご利用下さい。

文字コンテメーカーは[fix-activeFavoriteIndex-20230911](https://github.com/DaijiroNozaki-afk/notion-clone/tree/fix-activeFavoriteIndex-20230911)でいったん作り終えています。

## インストール手順:

VSCode をインストールする
[Visual Studio Code](https://azure.microsoft.com/ja-jp/products/visual-studio-code)のページを検索などで開いて、お使いの OS にあったものををローカルにダウンロードしてインストールします

Node.js をインストールする
[Node.js](https://nodejs.org/ja) のページを検索などで開いて、「推奨版」をローカルにダウンロードしてインストールします。

### /server の追加インストール

cors のインストール

npm i cors

crypto-js

npm i crypto-js

date-fns

npm i date-fns

express

npm i express

express-validator

npm i express-validator

jsonwebtoken

npm i jsonwebtoken

nodemon

npm i nodemon

dotenv

npm install --save-dev dotenv

mongoose

npm install --save-dev mongoose

### /client に React をインストール

react
npm i react

このアプリでは Beautiful DND を扱うため、react のバージョンを 17 にダウングレードします。

[React のダウングレードの手順](https://github.com/Shin-sibainu/notion-clone-client/blob/main/react17.txt)は、Shin Code 氏の説明をご覧ください。

/client のパッケージ追加インストール

絵文字ピッカーのインストール
npm install emoji-mart @emoji-mart/react @emotion/react @emotion/styled

Material UI のインストール
npm install @mui/icons-material @mui/material @mui/styled-engine-sc @mui/styles @mui/lab

axios
npm install axios

Beautiful DND
npm install react-beautiful-dnd

readt-dom
npm install react-dom

Redux
npm install react-redux @reduxjs/toolkit

react-router-dom

npm install react-router-dom

react-scripts
npm install react-scripts

styled-components
npm install styled-components

web-vitals
npm install web-vitals

## ファイルの構成

notion-clone

- /.vscode - VSCode の「タスクの実行」で、クライアントとサーバーを立ち上げるタスクを記載しています
- /client - フロントエンドを React で作成しています
- /server - サーバーサイドを Node.js で作成しています。
  - .env - MongoDB を使うための設定が書かれていますが、個人の MongoDB のアカウントを利用しているので非公開です。アプリを利用するあなたのアカウントを利用して設定してください。

### .env で設定する MongoDB の定数

- MONGODB_URL = ''
  - MongoDB ＞ Database ＞ Connect ＞ Connect to your application ＞ Add your connection string into your application code に書かれているもの
  - password の部分は、自分で作成したアカウントのパスワードを記載する
- SECRET_KEY = ''
  - CryptoJS で利用するキー、パスワードのように予測されない文字列を記載する
- TOKEN_SECRET_KEY = ''

  - jsonwebtoken で利用するキー、パスワードのように予測されない文字列を記載する

## 使い方

- アプリにアクセスすると、ログイン画面が表示されます。
  - アカウントがない場合、「新規作成」をクリックして、受信可能なメールアドレスを使ってアカウントを作成します。
  - アカウントを作成したら、ログイン画面で作成したアカウントのメールアドレスとパスワードを使ってログインします。
- 「最初のメモを作成」、もしくは「プライベート」の右にある「+」をクリックすると、新規メモが作成できます
  - メモは星ボタンをクリックすることで、「お気に入り」への登録が可能です。
  - メモ上部にある「ゴミ箱」ボタンをクリックすると、そのメモをゴミ箱に入れることができます。
  - メモにはタイトル、アイコン、あらすじ、発見、継承、法則、始まり、順序、終わりと終わりの解決方法を編集することができます。
- 左カラムの「お気に入り」および「プライベート」に追加したメモは、マウスドラッグで並び替えができます。
- 左カラム上部、お名前の右にある「ログアウト」ボタンを押すと、アプリからログアウトできます。
- 左カラムの「ゴミ箱」をクリックすると、中央にゴミ箱の中身が表示されます。
  - ゴミ箱の中のメモは、削除から 30 日が経過すると、完全に削除されます。
  - メモタイトルの右にある「元に戻す」ボタンを押すと、編集可能な状態に戻すことができます。
  - メモタイトルの右にある「完全に削除する」ボタンを押すと確認のホップアップが表示され、「OK」を押すとそのメモが完全に削除されます。

## 技術スタック:

**/client**

- "@emoji-mart/react": "^1.1.1",
- "@emotion/react": "^11.11.1",
- "@emotion/styled": "^11.11.0",
- "@mui/icons-material": "^5.14.3",
- "@mui/lab": "^5.0.0-alpha.140",
- "@mui/material": "^5.14.5",
- "@mui/styled-engine-sc": "^5.12.0",
- "@mui/styles": "^5.14.6",
- "@reduxjs/toolkit": "^1.9.5",
- "axios": "^1.4.0",
- "emoji-mart": "^5.5.2",
- "react": "^17.0.2",
- "react-beautiful-dnd": "^13.1.1",
- "react-dom": "^17.0.2",
- "react-redux": "^8.1.2",
- "react-router-dom": "^6.15.0",
- "react-scripts": "5.0.0",
- "styled-components": "^5.3.11",
- "web-vitals": "^0.2.4"

**/server**

- "cors": "^2.8.5",
- "crypto-js": "^4.1.1",
- "date-fns": "^2.30.0",
- "express": "^4.18.2",
- "express-validator": "^7.0.1",
- "jsonwebtoken": "^9.0.1",
- "nodemon": "^3.0.1"
- "dotenv": "^16.3.1",
- "mongoose": "^7.4.2"

## データベース

MongoDB 6.0.10

### データベース設計:

#### データベースの概要

- users：ユーザーのアカウント情報を管理するために使用されます。
- memos：個々のユーザーが作成したメモの情報を管理するために使用されます。

#### データベーススキーマ

**users**

- \_id: 固有の ID です。MongoDB で自動的に割り振られます
- username: 利用者の名前です。
- password: パスワードは Node.js で CryptoJS を使って暗号化しています。

**memos**

- \_id: 固有の ID です。MongoDB で自動的に割り振られます
- user:メモを作成したユーザー ID です。
- icon:ユーザーが選択したメモのアイコンです。
- title:メモのタイトルです
- description:文字コンテメーカーの文章編集領域です。
- discovery:文字コンテメーカーの文章編集領域です。
- inheritance:文字コンテメーカーの文章編集領域です。
- storyRule:文字コンテメーカーの文章編集領域です。
- startStory:文字コンテメーカーの文章編集領域です。
- orderStory:文字コンテメーカーの文章編集領域です。
- endStory:文字コンテメーカーの文章編集領域です。
- solution:文字コンテメーカーの「終わり」に使う、解決方法の選択を保存します。
- position:メモの並び順を保存します。
- favorite:「お気に入り」の情報を保存します。
- favoritePosition:お気に入りの並び順を保存します。
- isTrash:「ゴミ箱」の情報を保存します。
- trashDate:「ゴミ箱」に入れた日時を保存します。

## バージョン履歴:

- client
  - 0.2.0
  - ひとまず完成のバージョン
- server
  - 1.1.0
  - ひとまず完成のバージョン

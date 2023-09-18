# notionClone を利用した文字コンテメーカー

これは、Shin Code 氏の講座「【フルスタック開発】Notion クローンを MERN スタックで本格的に構築する Web アプリケーション開発実践講座」で作成した「notionClone」に手を加えたものです。
講座では触れられなかった「お気に入り」機能、Beautiful DND を使った並べ替えも実装しています。
上記の機能だけ知りたい方は、ブランチの[fix-activeFavoriteIndex-20230911](https://github.com/DaijiroNozaki-afk/notion-clone/tree/fix-activeFavoriteIndex-20230911) をご利用下さい。

文字コンテメーカーは[fix-activeFavoriteIndex-20230911](https://github.com/DaijiroNozaki-afk/notion-clone/tree/fix-activeFavoriteIndex-20230911)でいったん作り終えています。

## インストール手順:

        プロジェクトをクローンしてローカル環境で実行するためのステップバイステップのインストール手順を提供します。依存関係のインストールや設定ファイルの調整などが含まれます。

VSCode をインストールする
[Visual Studio Code](https://azure.microsoft.com/ja-jp/products/visual-studio-code)のページを検索などで開いて、お使いの OS にあったものををローカルにダウンロードしてインストールします

Node.js をインストールする
[Node.js](https://nodejs.org/ja) のページを検索などで開いて、「推奨版」をローカルにダウンロードしてインストールします。

/server の追加インストール
cors のインストール

npm i cors

crypto-js

npm i crypto-js

date-fns
npm i
express

express-validator

jsonwebtoken

nodemon

dotenv

npm install --save-dev

mongoose

npm install --save-dev
"cors": "^2.8.5",
"crypto-js": "^4.1.1",
"date-fns": "^2.30.0",
"express": "^4.18.2",
"express-validator": "^7.0.1",
"jsonwebtoken": "^9.0.1",
"nodemon": "^3.0.1"
},
"devDependencies": {
"dotenv": "^16.3.1",
"mongoose": "^7.4.2"

ファイルの構成
notion-clone
/.vscode - VSCode の「タスクの実行」で、クライアントとサーバーを立ち上げるタスクを記載しています
/client - フロントエンドを React で作成しています
/server - サーバーサイドを Node.js で作成しています。
.env - MongoDB を使うための設定が書かれていますが、アプリを利用するあなたのアカウントを利用してください。

.env
MONGODB_URL = ''
SECRET_KEY = ''
TOKEN_SECRET_KEY = ''

    使い方:
        アプリケーションの基本的な使用方法や機能を説明します。ユーザーガイドやスクリーンショットを追加することで、ユーザーがアプリを理解しやすくなります。

    技術スタック:
        使用した技術スタックについてリストアップし、バージョン情報を提供します。例えば、React v16.0.0、Node.js v14.0.0、Express v4.0.0、MongoDB v4.0.0など。

    データベース設計:
        データベースのスキーマやコレクションの構造に関する情報を提供します。必要に応じてデータベースの初期設定に関する指示も含めます。

    ライセンス情報:
        プロジェクトのライセンスについて説明し、適用されるライセンスを明示します。多くの場合、MITライセンスやApacheライセンスなどが使用されます。

    貢献:
        他の開発者がプロジェクトに貢献する方法について説明します。Pullリクエストのガイドラインやコントリビューションのプロセスを記述します。

    バグ報告と問い合わせ:
        ユーザーからのバグ報告や質問に対応する方法について説明し、連絡先情報を提供します。GitHubのIssueトラッカーなどがあればそれも含めます。

    ライブデモやスクリーンショット:
        プロジェクトのデモページやスクリーンショットを提供し、アプリケーションの外観や動作を視覚的に紹介します。

    バッジとリンク:
        ビルドステータス、テストカバレッジ、ライセンスステータスなどのバッジを表示し、他の関連リンク（ドキュメンテーション、ブログポスト、ウェブサイトなど）を提供します。

    ライセンス:
        プロジェクトのライセンスに関する情報を提供し、コードの再利用や変更に関する条件を明示します。

    バージョン履歴:
        過去のリリースと変更履歴に関する情報を提供し、新しいリリースがどのような変更を含むかを示します。

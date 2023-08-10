const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

//DB接続
try {
  mongoose.connect(
    'mongodb+srv://dnozaki88888888:TQY9iu1V5qIHKjkT@cluster0.xjffgte.mongodb.net/?retryWrites=true&w=majority'
  );
  console.log('DB と接続中');
} catch (err) {
  console.log(err);
}
//ユーザー新規登録API

//ユーザーログイン用API

app.listen(PORT, () => {
  console.log('ローカルサーバー起動中・・・');
});

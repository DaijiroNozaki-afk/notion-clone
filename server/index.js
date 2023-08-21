const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;
require('dotenv').config();
const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

//express でJSON を使えるようにする
app.use(express.json());
app.use('/api/v1', require('./src/v1/routes'));

//DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log('DB と接続中');
} catch (err) {
  console.log(err);
}

app.listen(PORT, () => {
  console.log('ローカルサーバー起動中・・・');
});

const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Hello Express');
});

app.listen(PORT, () => {
  console.log('ローカルサーバー起動中・・・');
});

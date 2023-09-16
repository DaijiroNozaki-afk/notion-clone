const router = require('express').Router();
const memoController = require('../controllers/memo');
const tokenHandler = require('../handlers/tokenHandler');

//メモを作成
router.post('/', tokenHandler.verifyToken, memoController.create);

//ログインしているユーザーが投稿したメモを全て取得
router.get('/', tokenHandler.verifyToken, memoController.getAll);

//ログインしているユーザーが投稿したメモのうち、お気に入り全て取得
router.get(
  '/favorite',
  tokenHandler.verifyToken,
  memoController.getFavoriteAll
);
//ログインしているユーザーが投稿したゴミ箱メモを全て取得
router.get('/trash', tokenHandler.verifyToken, memoController.getTrashAll);

//ログインしているユーザーが投稿したメモを1つ取得
router.get('/:memoId', tokenHandler.verifyToken, memoController.getOne);

//ログインしているユーザーが投稿したメモを1つ更新
router.put('/:memoId', tokenHandler.verifyToken, memoController.update);

//ログインしているユーザーが投稿したメモを全て更新
router.put('/', tokenHandler.verifyToken, memoController.updatePosition);

//ログインしているユーザーが投稿したお気に入りメモを全て更新
router.put(
  '/favorite/position',
  tokenHandler.verifyToken,
  memoController.updateFavoritePosition
);

//ログインしているユーザーが投稿したメモを1つ削除
router.delete('/:memoId', tokenHandler.verifyToken, memoController.delete);

module.exports = router;

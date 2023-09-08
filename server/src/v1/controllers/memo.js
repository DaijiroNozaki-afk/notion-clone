const Memo = require('../models/memo');

exports.create = async (req, res) => {
  try {
    const memoCount = await Memo.find().count();
    //メモ新規作成
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount > 0 ? memoCount : 0,
    });
    res.status(201).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const memos = await Memo.find({ user: req.user._id }).sort('-position');
    res.status(200).json(memos);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json('メモが存在しません。');
    res.status(200).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  const { memoId } = req.params;
  const { title, description, favorite, favoritePosition } = req.body;
  try {
    if (title === '') req.body.title = '無題';
    if (description === '')
      req.body.description = 'ここに自由に記入してください。';
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json('メモが存在しません。');
    //favoritePosition の最大値を取得する
    const favorites = await Memo.find({ favorite: true });
    //favorite に対して降順で入れ替え
    favorites.sort((a, b) => {
      if (a.favoritePosition > b.favoritePosition) {
        return -1;
      } else {
        return 1;
      }
    });
    //favoritePosition の最大値を取る
    // console.log(favorites[0].favoritePosition);
    // この修正は数字が重複するpositionにも加える必要がある

    const favoriteCount = await Memo.find({ favorite: true }).count();
    //favorite がtrue なら、favoritePosition を追加する
    if (favorite) {
      req.body.favoritePosition =
        favoriteCount > 0 ? favorites[0].favoritePosition + 1 : 0;
    } else if (!favorite) {
      //favorite がfalse なら、favoritePosition を削除する
      req.body.favoritePosition = '';
    }
    //

    const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
      $set: req.body,
    });

    res.status(200).json(updatedMemo);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updatePosition = async (req, res) => {
  // 変更したposition ごと、memoId に上書き保存する
  try {
    for (const updateInfo of req.body) {
      // console.log(i, updateInfo._id, updateInfo.position);

      const updatedMemo = await Memo.findByIdAndUpdate(updateInfo._id, {
        $set: updateInfo,
      });
    }
    //ログイン中のユーザーのメモを全て取得
    const memos = await Memo.find({ user: req.user._id }).sort('-position');

    res.status(200).json(memos);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.delete = async (req, res) => {
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json('メモが存在しません。');

    await Memo.deleteOne({ _id: memoId });

    res.status(200).json('メモを削除しました。');
  } catch (err) {
    res.status(500).json(err);
  }
};

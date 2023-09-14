const Memo = require('../models/memo');

exports.create = async (req, res) => {
  try {
    const memoCount = await Memo.find().count();
    //position の最大値を取得する
    const memos = await Memo.find({ user: req.user._id }).sort('-position');
    //メモ新規作成
    const memo = await Memo.create({
      user: req.user._id,
      // position: memoCount > 0 ? memoCount : 0,
      position: memos[0] !== undefined ? memos[0].position + 1 : 0,
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
exports.getFavoriteAll = async (req, res) => {
  try {
    const memos = await Memo.find({ user: req.user._id, favorite: true }).sort(
      '-favoritePosition'
    );
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
  const { title, description, favorite } = req.body;
  try {
    if (title === '') req.body.title = '無題';
    if (description === '')
      req.body.description = 'ここに自由に記入してください。';
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json('メモが存在しません。');
    //favoritePosition を降順にソートして最大値を取得する
    const favorites = await Memo.find({ favorite: true }).sort(
      '-favoritePosition'
    );

    //favorite がtrue なら、favoritePosition を追加する
    if (favorite === true) {
      req.body.favoritePosition =
        favorites[0] !== undefined ? favorites[0].favoritePosition + 1 : 0;
    } else if (favorite === false) {
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

exports.updateFavoritePosition = async (req, res) => {
  // 変更したfavoritePosition ごと、memoId に上書き保存する
  try {
    for (const updateInfo of req.body) {
      // console.log(i, updateInfo._id, updateInfo.favoritePosition);

      const updatedMemo = await Memo.findByIdAndUpdate(updateInfo._id, {
        $set: updateInfo,
      });
    }
    //ログイン中のユーザーのお気に入りのメモを全て取得
    const memos = await Memo.find({ user: req.user._id, favorite: true }).sort(
      '-favoritePosition'
    );
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

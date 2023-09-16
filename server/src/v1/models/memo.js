const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  icon: {
    type: String,
    default: '📝',
  },
  title: {
    type: String,
    default: '無題',
  },
  description: {
    type: String,
    default: 'ここに自由に記入してください。',
  },
  discovery: {
    type: String,
    default: 'アイデアを記入してください。',
  },
  inheritance: {
    type: String,
    default: 'アイデアを記入してください。',
  },
  storyRule: {
    type: String,
    default: 'アイデアを記入してください。',
  },
  startStory: {
    type: String,
    default: 'アイデアを記入してください。',
  },
  orderStory: {
    type: String,
    default: 'アイデアを記入してください。',
  },
  endStory: {
    type: String,
    default: 'アイデアを記入してください。',
  },
  solution: {
    type: String,
    default: '選択してください',
  },
  position: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  favoritePosition: {
    type: Number,
  },
  isTrash: {
    type: Boolean,
    default: false,
  },
  trashDate: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model('Memo', memoSchema);

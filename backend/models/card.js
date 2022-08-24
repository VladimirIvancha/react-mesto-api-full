const mongoose = require('mongoose');
const { isURL } = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Название должно содержать не менее 2х знаков, сейчас {VALUE}'],
    maxlength: [30, 'Название должно содержать не более 30ти знаков, сейчас {VALUE}'],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return isURL(link);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);

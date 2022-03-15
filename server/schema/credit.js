var mongoose = require('mongoose');

const CreditSchema = new mongoose.Schema({
  _textId: mongoose.Schema.Types.ObjectId,
  player: String,
  product: String,
  round: Number,
  ticket: Number,
  point: Number,
  block: Number
});

CreditSchema.statics.latestBlock = async function (callback) {
  await this.find()
    .sort({ block: -1 })
    .exec(callback);
}

var Credit = mongoose.model('Credit', CreditSchema);
module.exports = Credit;
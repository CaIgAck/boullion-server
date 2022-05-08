const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const receipt = new Schema({
    id: Schema.Types.ObjectId,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    ingredientAmount: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ingredientAmount',
            required: true
        }
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: false
    },
    likeBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: false
        }
    ],
    receiptName: String,
    img: {
        type: Schema.Types.ObjectId,
        ref: 'file',
        required: true
    },
    receiptDescription: String,
    status: String,
    complexity: String,
    timeForPreparing: String
});

module.exports = mongoose.model('receipt', receipt)
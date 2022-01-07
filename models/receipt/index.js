const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const receipt = new Schema({
    id: Schema.Types.ObjectId,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'ingredient',
        required: true
    },
    receiptName: String,
    img: String,
    receiptDescription: String
});

module.exports = mongoose.model('receipt', receipt)
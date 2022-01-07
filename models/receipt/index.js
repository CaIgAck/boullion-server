const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const receipt = new Schema({
    id: Schema.Types.ObjectId,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    ingredients: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ingredient',
            required: true
        }
    ],
    receiptName: String,
    img: String,
    receiptDescription: String,
    status: String
});

module.exports = mongoose.model('receipt', receipt)
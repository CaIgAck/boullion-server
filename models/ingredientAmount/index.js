const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientAmount = new Schema({
    id: Schema.Types.ObjectId,
    amount: {
        required: true,
        type: Number
    },
    ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'ingredient',
        required: true
    },
});

module.exports = mongoose.model('ingredientAmount', ingredientAmount)
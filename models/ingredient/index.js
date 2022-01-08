const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredient = new Schema({
    id: Schema.Types.ObjectId,
    ingredientName: String
});

module.exports = mongoose.model('ingredient', ingredient)
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const category = new Schema({
    id: Schema.Types.ObjectId,
    categoryName: String
});

module.exports =  mongoose.model('category', category );

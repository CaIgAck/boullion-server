const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const file = new Schema({
    id: Schema.Types.ObjectId,
    img: {
            data: Buffer,
            contentType: String
        }
});

module.exports =  mongoose.model('file', file );

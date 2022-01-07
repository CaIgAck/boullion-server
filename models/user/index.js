const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    id: Schema.Types.ObjectId,
    userName: {type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
    avatar: String,
    role: {type:String, required: true},
    created: {type: Date, default: new Date()},
    token: { type: String },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true,
        default: null
    },
    survey: {
        type: Schema.Types.ObjectId,
        ref: 'survey',
        required: true,
        default: null
    }
})

module.exports = mongoose.model('user', user );

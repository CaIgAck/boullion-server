const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const survey = new Schema({
    id: Schema.Types.ObjectId,
    surveyName: String
});

module.exports = mongoose.model('survey', survey );


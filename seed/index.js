const mongoose = require("mongoose");
require('dotenv').config();

const { MONGO_URI } = process.env;

const category = require('../models/category');
const categorySeed = require("./category");

const ingredients = require("../models/ingredient");
const ingredientsSeed = require("./ingredient");

const user = require("../models/user");
const userSeed = require("./user");

(async () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    await category.deleteMany({});
    await category.insertMany(categorySeed);

    await ingredients.deleteMany({});
    await ingredients.insertMany(ingredientsSeed);

    await user.deleteMany({});
    await user.insertMany(userSeed);

    mongoose.connection.close();
})();

const user = require('../../models/user');
const { body,validationResult } = require("express-validator");
const {listResponse} = require("../../helpers/utils");

exports.user_list = (req, res, next) => {
    user.find({}).exec((err, list) => {
        if(err) next(err)
        else {

           return res.json(listResponse({list, request: req}))
        }
    })
}

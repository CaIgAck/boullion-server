const user = require('../../models/user');
const {listResponse, actionResponse, errorResponse} = require("../../helpers/utils");

exports.user_list = (req, res, next) => {
    user.find({}).exec((err, list) => {
        if(err) next(err)
        else {
           return res.json(listResponse({list, request: req}))
        }
    })
}
exports.user_details = async (req, res) => {
    try {
        const { id } = req.params
        const foundUser = await user.findOne({_id: id})
        if(foundUser) {
            return res.json(actionResponse({model: foundUser}))
        } else {
            const error = {
                message: "User not found",
                error: 400
            }
          return res.json(errorResponse({error}))
        }
    } catch (e) {
        return res.json(e)
    }
}

exports.user_details_by_email = async (req, res) => {
    try {
        const { email } = req.user
        const foundUser = await user.findOne({email})
        if(foundUser) {
            return res.json(actionResponse({model: foundUser}))
        } else {
            const error = {
                message: "User not found",
                error: 400
            }
            return res.json(errorResponse({error}))
        }
    } catch (e) {
        return res.json(e)
    }
}
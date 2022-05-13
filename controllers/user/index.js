const user = require('../../models/user');
const {listResponse, actionResponse, errorResponse} = require("../../helpers/utils");

exports.user_list = async (req, res) => {
    try {
        const filter = req.params
        const userList = await user.find(filter).populate({
            path: 'survey'
        })
        return res.json(listResponse({list: userList, request: req}))
    } catch (e) {
        return res.status(500).json(e)
    }
}
exports.user_details = async (req, res) => {
    try {
        const { id } = req.params
        const foundUser = await user.findOne({_id: id}).populate([{
            path: 'survey',
            populate: {
                path: 'surveyName'
            }
        }])
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
        const foundUser = await user.findOne({email}).populate(['category', 'survey'])
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
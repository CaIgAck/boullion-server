const {category} = require('../../models/category')
const {actionResponse, errorResponse} = require("../../helpers/utils");
exports.category_details = async (req, res) => {
    try {
        const {id} = req.params
        const categoryFound = category.findOne({_id: id})
        if (categoryFound) {
            return res.json(actionResponse({model: categoryFound}))
        } else {
            const error = {
                message: "Category not found",
                error: 400
            }
            return res.json(errorResponse({error}))
        }
    } catch (e) {
        const error = {
            message: "Request not working",
            error: 400
        }
        return res.json(errorResponse({error}))
    }
}
const ingredient = require("../../models/ingredient");
const {listResponse, errorResponse} = require("../../helpers/utils");
exports.ingredients_list = async (req, res) => {
    try {
        const listIngredients = ingredient.find({})
        return res.json(listResponse({list: listIngredients, request: req}))
    } catch (e) {
        const error = {
            message: 'Request is not working',
            error: e
        }
        return res.json(errorResponse({error}))
    }
}

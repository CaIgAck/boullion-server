const ingredient = require("../../models/ingredient");
const {listResponse, errorResponse, actionResponse} = require("../../helpers/utils");
exports.ingredients_list = async (req, res) => {
    const {itemCount} = req
    ingredient.find({}).limit(itemCount ?? 50).exec((err, list) => {
        if(err) next(err)
        else {
            return res.json(listResponse({list, request: req}))
        }
    })
}
exports.create_ingredients = async (req, res, next) => {
    try {
        const {ingredientName} = req.body
        const new_ingredient = new ingredient({
            ingredientName
        })
        await new_ingredient.save((err) => {
            if (err) next(err);
            res.json(actionResponse({model:new_ingredient}));
        })
    } catch (e) {
        const error = {
            message: e ,
            error: 400
        }
        return res.json(errorResponse({error}))
    }
}

const {body, validationResult} = require("express-validator");
const ingredientAmount = require('../../models/ingredientAmount')
const {actionResponse} = require("../../helpers/utils");
exports.ingredientsAmount_create = async (req,res) => {
    try {
        const { amount, ingredient } = req.body
        body('amount', 'amount is required').notEmpty().exists({checkNull: true})
        body('ingredient', 'ingredient is required').notEmpty().exists({checkNull: true})

        const errors = validationResult(req);

        const new_ingredientAmount = new ingredientAmount({
            amount,
            ingredient
        })
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        else {
            await new_ingredientAmount.save(() => {
                res.json(actionResponse({model:new_ingredientAmount}));
            });
        }
    } catch (e) {
        console.log(e)
        return res.status(400).json({errors: e})
    }
}
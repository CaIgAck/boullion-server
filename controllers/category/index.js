const category = require('../../models/category');
const {actionResponse, errorResponse, listResponse} = require("../../helpers/utils");


exports.create_categories = async (req, res) => {
    try {
        const {categoryName} = req.body
        const new_category = new category({
            categoryName
        })
        await new_category.save((err) => {
            if (err) next(err);
            res.json(actionResponse({model:new_category}));
        })
    } catch (e) {
        const error = {
            message: e ,
            error: 400
        }
        return res.json(errorResponse({error}))
    }
}

exports.category_list = async (req, res) => {
    const {itemCount} = req
    category.find({}).limit(itemCount ?? 50).exec((err, list) => {
        if(err) next(err)
        else {
            return res.json(listResponse({list, request: req}))
        }
    })
}

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
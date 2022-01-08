const {body, validationResult} = require("express-validator");
const {actionResponse, listResponse, errorResponse} = require("../../helpers/utils");
const receipt = require("../../models/receipt")
const ingredientAmountModel = require("../../models/ingredientAmount")
exports.crete_receipt = async (req, res) => {
    try {
        const {category, ingredientAmount, receiptName, img, receiptDescription, status} = req.body
        body('category', 'category is required field').isLength({min: 1}).exists()
        body('ingredientAmount', 'ingredientAmount is required field').isArray().exists()
        body('receiptName', 'receiptName is required field').isLength({min: 4}).exists()
        body('receiptDescription', 'receiptDescription is required field').isLength({min: 15}).exists()
        body('status', 'status is required field').isLength({min: 15}).exists()

        console.log(ingredientAmount)
        let ingredientsAmount = [];
        for (let ingredientsAmountElement of ingredientAmount) {
            const ingredientAmount_new = await ingredientAmountModel.create({
                amount: ingredientsAmountElement['amount'],
                ingredient: ingredientsAmountElement['ingredient'],
            })
            ingredientsAmount.push(ingredientAmount_new)
        }
        const errors = validationResult(req);

        const new_receipt = new receipt({
            category,
            ingredientAmount: ingredientsAmount,
            receiptName,
            img,
            receiptDescription,
            status
        })
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        else {
            await new_receipt.save(() => {
                res.json(actionResponse({model:new_receipt}));
            });
        }
    } catch (e) {
        console.log(e)
        return res.status(400).json({errors: e})
    }
}

exports.receipt_list = async (req, res) => {
    try {
        const status = req.query.status
        if(status) {
            const listReceipt = await receipt.find({status})
            return res.json(listResponse({list: listReceipt, request: req}))
        }
        else {
            const error = {
                message: 'Status is not defined',
                error: 400
            }
            return res.json(errorResponse({error}))
        }
    } catch (e) {
        const error = {
            message: 'Request is not working',
            error: 500
        }
        return res.json(errorResponse({error}))
    }
}

exports.receipt_details = async (req, res) => {
    try {
        const { id } = req.params
        const receipt_details = await receipt.findOne({_id: id})
        if (receipt_details) {
            return res.json(actionResponse({model: receipt_details}))
        } else {
            const error = {
                message: 'Receipt not found',
                error: 400
            }
            return res.json(errorResponse({error}))
        }
    } catch (e) {
        const error = {
            message: 'Request is not working',
            error: 500
        }
        return res.json(errorResponse({error}))
    }
}
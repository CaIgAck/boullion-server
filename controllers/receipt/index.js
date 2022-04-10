const {body, validationResult} = require("express-validator");
const {actionResponse, listResponse, errorResponse} = require("../../helpers/utils");
const receipt = require("../../models/receipt")
const ingredientAmountModel = require("../../models/ingredientAmount")
function validationRequestData() {
    body('category', 'category is required field').isLength({min: 1}).exists()
    body('ingredientAmount', 'ingredientAmount is required field').isArray().exists()
    body('receiptName', 'receiptName is required field').isLength({min: 4}).exists()
    body('receiptDescription', 'receiptDescription is required field').isLength({min: 15}).exists()
    body('status', 'status is required field').isLength({min: 15}).exists()
}
exports.crete_receipt = async (req, res) => {
    try {
        const {category, ingredientAmount, receiptName, img, receiptDescription, status, createdBy, likeBy,complexity, timeForPreparing} = req.body

        validationRequestData()

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
            status,
            createdBy,
            likeBy,
            complexity,
            timeForPreparing
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
        const filter = req.query
        if(filter.status) {
            const listReceipt = await receipt.find(filter)
            console.log(listReceipt)
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
        const receipt_details = await receipt.find({_id: id}).populate('ingredientAmount').populate("ingredientAmount.ingredient")
        console.log(receipt_details)
        if (receipt_details) {
            return res.json(actionResponse({model: receipt_details}))
        } else {
            res.statusCode = 400
            const error = {
                message: 'Receipt not found',
                error: 400
            }
            return res.json(errorResponse({error}))
        }
    } catch (e) {
        res.statusCode = 500
        const error = {
            message: 'Request is not working',
            error: 500
        }
        return res.json(errorResponse({error}))
    }
}
exports.receipt_update = async (req, res) => {
    try {
        console.log(req.params)
        const {status,category, ingredientAmount, receiptName, img, receiptDescription, timeForPreparing, complexity} = req.body
        const {id} = req.params
        const receipt_details = await receipt.findOne({_id: id})
        if(receipt_details) {
            receipt_details.status = status ? status : receipt_details.status
            receipt_details.receiptName = receiptName ? receiptName : receipt_details.receiptName
            receipt_details.img = img ? img : receipt_details.img
            receipt_details.receiptDescription = receiptDescription ? receiptDescription : receipt_details.receiptDescription
            receipt_details.timeForPreparing = timeForPreparing ? timeForPreparing : receipt_details.timeForPreparing
            receipt_details.complexity = complexity ? complexity : receipt_details.complexity
            await receipt_details.save();
            const receiptUpdated = await receipt.findOne({_id: id})
            return res.json(actionResponse({model: receiptUpdated}));
        } else {
            res.statusCode = 400
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
        res.statusCode = 500
        return res.json(errorResponse({error}))
    }
}


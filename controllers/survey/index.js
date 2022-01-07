const {body, validationResult} = require("express-validator");
const {errorResponse, actionResponse} = require("../../helpers/utils");
const survey = require("../../models/survey/index")



exports.create_survey = async (req, res, next) => {
    try {
        const {surveyName} = req.body

        body('surveyName', 'surveyName is required').exists()
        const errors = validationResult(req);
        const new_survey = new survey({
            surveyName
        })
        if(!errors.isEmpty()) {
            const error = {
                message: errors ,
                error: 400
            }
            return res.json(errorResponse({error}))
        } else {
            await new_survey.save((err) => {
                if (err) next(err);
                res.json(actionResponse({model:new_survey}));
            })
        }
    } catch (e) {
        const error = {
            message: e ,
            error: 400
        }
        return res.json(errorResponse({error}))
    }


}
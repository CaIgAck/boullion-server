const {body, validationResult} = require("express-validator");
const {errorResponse, actionResponse} = require("../../helpers/utils");
const survey = require("../../models/survey/index")



exports.create_survey = async (req, res, next) => {
    try {
        const {surveyName} = req.body
        body('surveyName', 'surveyName is required').isLength({ min: 1 })
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

exports.survey_details = async (req, res) => {
    try {
        const { id } = req.params
        const foundSurvey = survey.findOne({_id: id})

        if(foundSurvey) {
            return res.json(actionResponse({model: foundSurvey}))
        } else {
            const error = {
                message: 'Survey not found',
                error: 400
            }
            return res.status(400).json(errorResponse({error}))
        }
    } catch (e) {
        const error = {
            message: 'Request not work',
            error: 400
        }
        return res.status(400).json(errorResponse({error}))
    }
}
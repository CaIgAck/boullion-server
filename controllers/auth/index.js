const { body,validationResult } = require("express-validator");
const user = require("../../models/user");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const {actionResponse, errorResponse} = require("../../helpers/utils");
let encryptedPassword;
exports.user_create = async (req, res, next) => {
    console.log(req.body)
    try {
        const { userName, email, password, role, avatar, category, survey } = req.body

        body('userName', 'Username must not be empty.').isLength({ min: 4 }).escape()
        body('email', 'Email must not be empty.').trim().isEmail().escape()
        body('password', 'Password must not be empty.').trim().isLength({ min: 5 }).escape()
        body('role', 'Role must not be empty').trim().escape()

        encryptedPassword = await bcrypt.hash(password, 10);

        const oldUser = await user.findOne({ email: email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const new_user = new user({
            userName: userName,
            email: email,
            password: encryptedPassword,
            role: role,
            avatar: avatar,
            created: new Date(),
            category,
            survey
        })

        const token = jwt.sign(
            { user_id: user.id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        new_user.token = token;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        else {
            await new_user.save((err) => {
                if (err) next(err);
                res.json(actionResponse({model:new_user}));
            });
        }
    } catch (e) {
        const error = {
            message: 'Ты что-то с моделькой не то сделал',
            error: e.message
        }
        return res.status(400).json(errorResponse({error}));
    }
}

exports.user_login =  async (req, res) => {
    try {
        const {email, password} = req.body
        body('userName', 'Username must not be empty.').trim().isLength({ min: 4 }).escape()
        body('password', 'Password must not be empty.').trim().isLength({ min: 5 }).escape()

        const errors = validationResult(req);
        const new_user = await user.findOne({email})

        if(errors.isEmpty() && new_user && (await bcrypt.compare(password, new_user.password))) {
            const token = jwt.sign(
                { user_id: user.id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            new_user.token = token;

            // user
            res.status(200).json(actionResponse({model:new_user}));
        }
        else {
            const error = {
                message: 'Password is invalid or email',
                error: 400
            }
            return res.status(400).json(errorResponse({error}));
        }
    } catch (e) {
        const error = {
            message: 'Password is invalid or email',
            error: e.message
        }
        return res.status(400).json(errorResponse({error}));
    }
}
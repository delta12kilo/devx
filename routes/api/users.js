const express = require('express');
const router = express.Router();

const {
    check,
    validationResult
} = require('express-validator');

const User = require('../../models/users');

const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const config = require('config');
const jwt = require('jsonwebtoken');


// @route POST api/users
// @desc register user
// @access Public

router.post('/', [
    check('name', 'Enter your Name !')
        .not()
        .isEmpty(),
    check('email', 'Please valid Email !')
        .isEmail(),
    check('password', 'oooops ! Password don`t match !')
        .isLength({
            min: 6
        })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            name,
            email,
            password
        } = req.body;

        try {

            //see if user exists
            let user = await User.findOne({
                email
            });

            if (user) {
                return res.status(400).json({
                    errors: [{
                        msg: 'Ooops.. It Seems Ninja Already Exists !'
                    }]
                });
            }

            //get user garavatar
            const avatar = await gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            user = new User({
                name,
                email,
                avatar,
                password
            });
            //encrypt user password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            //return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, config.get('jwtToken'), {
                expiresIn: 360000
            }, (err, token) => {
                if (err)
                    throw err;
                res.json({
                    token
                });

            });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    })

module.exports = router;
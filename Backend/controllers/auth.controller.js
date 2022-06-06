const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");
function signin(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            message: 'Invalid username or password'
        });
    }
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            res.status(500).json({
                message: 'Internal server error'
            });
        }
        if (!user) {
            res.status(400).json({
                message: 'Invalid username or password'
            });
        }
        if (user.password !== password) {
            res.status(400).json({
                message: 'Invalid username or password'
            });
        }
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SERECT, {
            expiresIn: '1h'
        })
        res.status(200).json({
            message: 'Successfully signed in',
            token
        });
    })
}

function signup(req, res) {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({
            message: 'Invalid username or password'
        });
    }
    User.create({
        username: username,
        password: password,
        email: email

    }, (err, user) => {
        if (err) {
            res.status(500).json({
                message: 'Internal server error'
            });
        }
        res.status(200).json({
            message: 'Successfully signed up',

        });
    })
}
function forgot(req, res) {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            message: 'Invalid email'
        });
    }
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            res.status(500).json({
                message: 'Internal server error'
            });
        }
        if (!user) {
            res.status(400).json({
                message: 'Invalid email'
            });
        }
        res.status(200).json({
            message: 'Successfully sent email',
            password: user.password
        });
    })

}

module.exports = {
    signin,
    signup,
    forgot
}
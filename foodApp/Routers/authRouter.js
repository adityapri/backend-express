const express = require('express')
const authRouter = express.Router();

const userModel = require('../models/userModel')


authRouter
    .route('/signup')
    .get(middleware1, getSignUp, middleware2)
    .post(postSignUp)


authRouter
    .route('/login')
    .post(loginUser)


function middleware1(req, res, next) {
    console.log('middleware1 encountered');
    next();
}

function middleware2(req, res) {
    console.log('middleware2 encountered');
}

function getSignUp(req, res, next) {
    res.sendFile('/public/index.html', { root: __dirname })
    next();
}

async function postSignUp(req, res) {
    let objReceived = req.body;
    let user = await userModel.create(objReceived)
    console.log(objReceived);
    res.json({
        message: 'signed up successfully',
        data: objReceived
    })
}

async function loginUser(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                if (data.password == user.password) {
                    return res.json({
                        message: 'login successful',
                        userDetails: user
                    })
                } else {
                    return res.json({
                        message: 'invalid credentials',
                        userDetails: user
                    })
                }
            } else {
                return res.json({
                    message: 'user not found'
                })
            }
        }
        else {
            return res.json({
                message: 'Empty field found'
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = authRouter
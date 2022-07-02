const express = require('express')
const userModel = require('../models/userModel')
const userRouter = express.Router();



userRouter
    .route('/getCookies')
    .get(getCookies)

userRouter
    .route('/setCookies')
    .get(setCookies)

userRouter
    .route('/')
    .get(getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route('/:id')
    .get(getUserById)




async function getUsers(req,res){
        let allUsers = await userModel.find();
        res.json({
            message: "all users",
            data: allUsers
        });
}

function postUser(req, res) {
    console.log(req.body)
    users = req.body;
    res.json({
        message: "Data received successfully",
        user: req.body
    })
}

function updateUser(req, res) {
    console.log(req.body);

    let dataToBeUpdated = req.body;
    // let user = await userModel.findOneAndUpdate({email:"akshay@gmail.com",dataToBeUpdated})
    // users.push(dataToBeUpdated);
    // for(key in dataToBeUpdated) {
    //     users[key]  = dataToBeUpdated[key]
    // }

    res.json({
        message: "Data updated successfully"
    })
}

async function deleteUser(req, res) {
    const dataToBeDeleted = { name: 'xyz@gmail.com' };
    let user = await userModel.findOneAndRemove(dataToBeDeleted)
    res.json({
        message: "Data deleted successfully",
        data: user
    })
}

function getUserById(req, res) {
    res.send('user id received ');
    console.log(req.params.id);
    console.log(req.params)
}

function setCookies(req, res) {
    res.cookie('isLoggedIn', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: false })
    res.cookie('isPrimeMember', true)
    res.send('Cookies have been set')

}

function getCookies(req, res) {
    let cookies = req.cookie;
    res.send('cookies received')
    console.log(cookies);
}



module.exports = userRouter
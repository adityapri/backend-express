const express = require('express');

const app = express();

//middleware : whatever data comes from front-end, convert that to json
app.use(express.json());

const userRoute = express.Router();
const authRouter = express.Router();

//base router
app.use('/users',userRoute);
app.use('/auth',authRouter);

let users = [
    {
        'id' : 1,
        'name' : 'abc'
    },
    {
        'id' : 2,
        'name' : 'def'
    },
    {
        'id' : 3,
        'name' : 'ghi'
    }
]

userRoute
.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRoute
.route('/:id')
.get(getUserById)


authRouter
.route('/signup')
.get(getSignUp)
.post(postSignUp)

function getUser(req,res){
    res.send(users);
}

function postUser(req,res){
    console.log(req.body)
    users = req.body;
    res.json({
        message: "Data received successfully",
        user : req.body
    })
}

function updateUser(req,res){
    console.log(req.body);

    let dataToBeUpdated = req.body;
    users.push(dataToBeUpdated);
    // for(key in dataToBeUpdated) {
    //     users[key]  = dataToBeUpdated[key]
    // }

    res.json({
        message: "Data updated successfully"
    })
}

function deleteUser(req,res){
    users.shift();
  res.json({
    message: "Data deleted successfully"
  })
}

function getUserById(req,res){
    res.send('user id received ');
    console.log(req.params.id);
    console.log(req.params)
}

function getSignUp(req,res){
    res.sendFile('/public/index.html',{root:__dirname})
}

function postSignUp(req,res){
   let objReceived = req.body;
   console.log(objReceived);
    res.json({
        message: 'signed up successfully',
        data: objReceived
    })
}


app.listen(3000)
const express = require('express');

const app = express();

//middleware : whatever data comes from front-end, convert that to json
app.use(express.json());

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

app.get('/',(req,res) => {
    console.log(req.query);
    res.send(users);
})



app.post('/',(req,res) => {
    console.log(req.body)
    users = req.body;
    res.json({
        message: "Data received successfully",
        user : req.body
    })
})

//update -> Patch

app.patch('/',(req,res) => {
    console.log(req.body);

    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated) {
        users[key]  = dataToBeUpdated[key]
    }

    res.json({
        message: "Data updated successfully"
    })
})

//delete - to remove the data
app.delete('/',(req,res) => {
    users = {}
  res.json({
    message: "Data deleted successfully"
  })
})

//params
app.get('/:id',(req,res) => {
    res.send('user id received ');
    console.log(req.params.id);
    console.log(req.params)
})


app.listen(3000)
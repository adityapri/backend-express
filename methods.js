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
    // res.send('/');
    res.sendFile('D:\VSCode\Backend\views\index.html');
})
app.get('/views/about.html',(req,res) => {
    // res.send('Hello');
    res.sendFile('./views/about.html',{root: __dirname})
})

//redirect

app.get('/about-us',(req,res) => {
    res.redirect('/about')
})

// 404 page

app.use((req,res) => {
    res.status(404).sendFile('./views/404.html',{root: __dirname})
})


app.listen(3000)
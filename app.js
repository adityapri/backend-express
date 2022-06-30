const express = require('express');

const app = express();



app.get('/',(req,res) => {
    // res.send('/');
    // res.sendFile('D:\VSCode\Backend\views\index.html');
})
app.get('/about',(req,res) => {
    // res.send('Hello');
    res.sendFile('./views/about.html',{root: __dirname})
})

//redirect

app.get('/about-us',(req,res) => {
    res.redirect('/about')
})

//404 page

app.use((req,res) => {
    res.status(404).sendFile('./views/404.html',{root: __dirname})
})


app.listen(3000);
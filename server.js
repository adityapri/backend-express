//server creation

//1. Http Module

const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
    console.log('request from browser to server');
    // console.log(req.method);
    // console.log(req.url);

    res.setHeader('Content-Type', 'text/html');
    // res.write('<h1> Hello, Learners! :) </h1>');
    // res.end();
    let path = './views';
    //routing
    switch(req.url){
        case '/':
            path+='/index.html'
            break;
        case '/about':
            path+='/about.html'
            break;
        case '/about-abc':
            res.statusCode = 301
            res.setHeader('Location','/about')
            res.end();
            break;
        
        case '/eventRegistration':
            path+='/eventRegistration.html'
            break;
        default:
            path+='/404.html'
            res.statusCode = 404;
            break;
    };
    fs.readFile(path, (err, fileData) => {
        if (err) {
            console.log(err)
        } else {
            res.write(fileData)
            res.end()
        }
    })
})

//Port number, host name, callback function 
server.listen(port, 'localhost', () => {
    console.log('server is listening on port 3000');
})
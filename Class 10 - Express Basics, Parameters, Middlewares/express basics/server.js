const express = require('express');

const server = express();
const port = 4444;

const name = "cena";
// console.log(__dirname)

server.use(express.urlencoded({extended: false}));

server.use((req, res, next) => {
    console.log("Inside Middleware 1");
    // next();
    res.send("sent from middleware 1");
})

server.use('/a', (req, res, next) => {
    console.log("Inside Middleware 2");
    next();
})

server.use('/b', (req, res, next) => {
    console.log("Inside Middleware 3");
    next();
})

server.use('/a/b', (req, res, next) => {
    console.log("Inside Middleware a and b");
    next();
})

server.get('/a', (req, res) => {
    console.log('GET method of /a');
    res.send("hello world!");
})

server.get('/b', (req, res) => {
    console.log('GET method of /b');
    res.send("hello world!");
})



server.get('/', function (request, response) {
    // response.send(`
    //     <h1>Hello ${name}</h1>
    // `);
    // console.log("Hello, ", request.query.fn, request.query.ln, "!");
    response.sendFile(__dirname + '/public/form.html');
});

server.get('/form', (req, res) => {
    res.send(`
        <h1>Hello, ${req.query.fn} ${req.query.ln}!</h1>
    `);
});

server.post('/form', (req, res) => {
    // console.log(req.body);
    res.send(`
        <h1>POST Hello, ${req.body.fn} ${req.body.ln}!</h1>
    `);
});

server.get('/welcome/:fn/:ln', (req, res) => {
    // console.log(req);
    res.send(`
        <h1>Welcome, ${req.params.fn} ${req.params.ln}!</h1>
    `);
});

server.listen(port);


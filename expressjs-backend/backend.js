const express = require('express');
const app = express();
const port = 5000;
const users = new Map();

users.set("Admin", "AdminPassword");

var cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/users', (req, res) => {
    res.send(Array.from(users.keys()));
});

app.post('/account/login', (req, res) => {
    const fakeAuth = "2342f2f1d131rf12"
    var username = req.body.username
    var password = req.body.password
    if (users.get(username) != undefined && users.get(username) == password) {
        res.send(fakeAuth)
    }
    else {
        res.status(401).send("Invalid Login");
    }
});

app.post('/account/register', (req, res) => {
    var username = req.body.username
    var password = req.body.password
    var validatePassword = req.body.validatePassword

    if (username == "" || password == "" || validatePassword == "") {
        res.status(403).send("Empty Field");
    }

    if (users.get(username) != undefined) {
        res.status(403).send("Username already exists");
    }

    if (password != validatePassword) {
        res.status(403).send("Passwords are not the same");
    }

    if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        res.status(403).send("Passwords must contain:\n  -8 characters\n  -one capital letter\n  -one number\n  -one symbol ( @$!%*#?& )");
    }

    else {
        users.set(username, password);
        res.status(201).send("Account created succesfully");
    }
});
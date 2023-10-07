// server.js
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Placeholder for users (in a real-world application, you'd use a database)
const users = [];

app.post('/signup', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
});

app.post('/login', async (req, res) => {
    const user = users.find(u => u.name === req.body.name);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        res.send('Success');
    } else {
        res.send('Failure');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const fs = require('fs');
const path = require('path');
const Database = require('./database');

const app = express();
app.use(express.urlencoded());

const port = 3000;

let database = new Database();

app.use(express.static('public'));


// post - сохранение в базу данных
app.post('/distro', async (req, res) => {

    let distros = {
        distro_name: req.body.distro_name,
        rating: req.body.rating,
        opinion: req.body.opinion,
    };

    database.add('distros', distros);

    res.send(JSON.stringify({
        status: true,
        message: '',
        distros: distros,
    }));
});

// get - получение из базы данных
app.get('/distro', (req, res) => {
    // В данном случае мы получаем все объекты из базы данных и выводим их в виде json
    res.send(JSON.stringify(database.get('distros')));
});



app.post('/userdata', async (req, res) => {
    let data = {
        first_name: req.body.first_name,
        first_second: req.body.first_second,
        phone: req.body.phone,
        email: req.body.email,
        datetime: req.body.datetime,
    };

    database.add('data', data);

    res.send(JSON.stringify({
        status: true,
        message: '',
        data: data,
    }));
});

app.get('/userdata', (req, res) => {
    // В данном случае мы получаем все объекты из базы данных и выводим их в виде json
    res.send(JSON.stringify(database.get('data')));
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});


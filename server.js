const express = require('express');

const app = express();
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('home');
})

app.get('/aboutus', function(req, res) {
    res.render('aboutus');
})

app.get('/learner', function(req, res) {
    res.render('learner');
})

app.get('/college', function(req, res) {
    res.render('college');
})

app.get('/company', function(req, res) {
    res.render('company');
})

app.get('/compiler', function(req, res) {
    res.render('compiler');
})

app.get('/login', function(req, res) {
    res.render('login');
})

app.get('/registration', function(req, res) {
    res.render('registration');
})

app.get('/learner-navbar', function(req, res) {
    res.render('learner-navbar');
})

app.get('/footer', function(req, res) {
    res.render('footer');
})

app.get('/learner-home', function(req, res) {
    res.render('learner-home');
})

app.listen(8080);
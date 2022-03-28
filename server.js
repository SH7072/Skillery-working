const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const Instructor = require('./model/instructor')
const Company = require('./model/company')
const Admin = require('./model/admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var learnerModel = require('./model/learner')
var learner =learnerModel.find({})

const JWT_SECRET = 'abhs@vb#s3g%f$fgmnabkjufyfc@ijhu#HB$BHB$b5%jhbB%gb%Hg%b'

mongoose.connect('mongodb+srv://array2002:Abhay%40123@cluster0.gcftg.mongodb.net/login-app-db', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(d=>console.log("sucesss"))

const app = express()

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())

//Authentication

app.post('/api/register', async (req, res) => {
	const { email, username, password: plainTextPassword } = req.body


	if (!email || typeof email !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			email,
			username,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username or emailid already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})


app.post('/api/user-login', async (req, res) => {
	const { username, password } = req.body
	// data shouldn't be in mongodb format
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful
		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})

app.post('/api/instructor-login', async (req, res) => {
	const { username, password } = req.body
	// data shouldn't be in mongodb format
	const instructor = await Instructor.findOne({ username }).lean()

	if (!instructor) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, instructor.password)) {
		// the username, password combination is successful
		const token = jwt.sign(
			{
				id: instructor._id,
				username: instructor.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})

app.post('/api/company-login', async (req, res) => {
	const { username, password } = req.body
	// data shouldn't be in mongodb format
	const company = await Company.findOne({ username }).lean()

	if (!company) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, company.password)) {
		// the username, password combination is successful
		const token = jwt.sign(
			{
				id: company._id,
				username: company.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})

app.post('/api/admin-login', async (req, res) => {
	const { username, password } = req.body
	// data shouldn't be in mongodb format
	const admin = await Admin.findOne({ username }).lean()

	if (!admin) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, admin.password)) {
		// the username, password combination is successful
		const token = jwt.sign(
			{
				id: admin._id,
				username: admin.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})

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


app.get('/footer', function(req, res) {
    res.render('footer');
})

app.get('/learner-home', function(req, res) {
    res.render('learner-home');
})

app.listen(8080);

app.get('/chatbotRoom', function(req, res) {
    res.render('chatbotRoom');
})

app.get('/chat', function(req, res) {
    res.render('chat');
})

app.get('/admin', function(req, res) {
    res.render('admin');
})
app.get('/learner-profile', function(req, res) {
    res.render('profile');
})

// learners-list view

app.get('/learners-list', function(req, res, next) {
	learner.exec(function(err,data){
  if(err) throw err;
  res.render('learners-list', { title: 'Learner Records', records:data });
	});
	
  });


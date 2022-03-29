const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Learner = require("./model/learner");
const Instructor = require("./model/instructor");
const Company = require("./model/company");
const Admin = require("./model/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let learnerModel = require("./model/learner");


const JWT_SECRET = "abhs@vb#s3g%f$fgmnabkjufyfc@ijhu#HB$BHB$b5%jhbB%gb%Hg%b";

mongoose
  .connect(
    "mongodb+srv://array2002:Abhay%40123@cluster0.gcftg.mongodb.net/login-app-db",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((d) => console.log("sucesss"));

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//Authentication

app.post("/api/register", async (req, res) => {
  const {
    email,
    username,
    password: plainTextPassword,
    fullname,
    college,
    degree,
    passing,
    dsa,
    web
  } = req.body;

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await Learner.create({
      email,
      username,
      password,
      fullname,
      college,
      degree,
      passing,
      dsa,
      web
    });
    console.log("User created successfully: ", response);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({
        status: "error",
        error: "Username/email id already in use",
      });
    }
    throw error;
  }

  res.json({ status: "ok" });
});

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


// Home routes
app.get("/", function (req, res) {
  res.render("home");
});

app.get("/home-learner", function (req, res) {
  res.render("home-learner");
});

app.get("/home-college", function (req, res) {
  res.render("home-college");
});

app.get("/home-company", function (req, res) {
  res.render("home-company");
});

app.get("/home-aboutus", function (req, res) {
  res.render("home-aboutus");
});

app.get("/home-login", function (req, res) {
  res.render("home-login");
});

app.get("/home-registration", function (req, res) {
  res.render("home-registration");
});

// Chat

app.get("/chat-home", function (req, res) {
  res.render("chat-home");
});

app.get("/chat-room", function (req, res) {
  res.render("chat-room");
});


// Learner

app.get("/learner-home", function (req, res) {
  // const token= req.body.token;
  // console.log(token);
  // try {
	// 	const learner = jwt.verify(token, JWT_SECRET)

	// 	const _id = learner.id

	// 	console.log(_id);
	// 	res.json({ status: 'ok' })
	// } catch (error) {
	// 	console.log(error)
	// 	res.json({ status: 'error', error: ';))' })
	// }
  res.render("learner-home");
});

app.get('/learner-module',function(req,res){
  res.render('learner-module');
})

app.get('/learner-profile', function(req, res) {
  res.render("learner-profile");
})









// Admin

app.get('/admin-learnerslist',function(req,res){
  let learner = learnerModel.find({});
  learner.exec(function (err, data) {
    if (err) throw err;
    res.render("admin-learnerslist", {records: data });
  });
})
app.get("/compiler", function (req, res) {
  res.render("compiler");
});





app.get("/admin", function (req, res) {
  res.render("admin");
});

app.get("/discussions", function (req, res) {
  res.render("discussions");
});


// learners-list view


app.get("/learners-list", function (req, res) {
  let learner = learnerModel.find({});
  learner.exec(function (err, data) {
    if (err) throw err;
    res.render("learners-list", { title: "Learner Records", records: data });
  });
});
app.get("/admin-home", function (req, res) {
  res.render('admin-home');
});

app.get("/contact-us", function (req,res){
  res.render('contact-us');
})


app.listen(8080);





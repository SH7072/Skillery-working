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
const cookieParser = require("cookie-parser");

let learnerModel = require("./model/learner");
let instructorModel = require("./model/instructor");
let companyModel = require("./model/company");

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
app.use(cookieParser());

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
    web,
  } = req.body;

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
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
      web,
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

app.post("/api/company-register", async (req, res) => {
  const { email, username, password: plainTextPassword, name } = req.body;

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
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
    const response = await Company.create({
      email,
      username,
      password,
      name,
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

app.post("/api/instructor-register", async (req, res) => {
  const {
    email,
    username,
    password: plainTextPassword,
    fullname,
    qualification,
    experience,
  } = req.body;

  console.log(username);

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
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
    const response = await Instructor.create({
      email,
      username,
      password,
      fullname,
      qualification,
      experience,
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

app.post("/api/learner-login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  // data shouldn't be in mongodb format
  const user = await Learner.findOne({ username }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }

  if (await bcrypt.compare(password, user.password)) {
    // the username, password combination is successful
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        college: user.college,
        degree: user.degree,
        passing: user.passing,
        dsa: user.dsa,
        web: user.web,
      },
      JWT_SECRET
    );
    res.cookie("check", token);
    return res.json({ status: "ok" });
  }

  res.json({ status: "error", error: "Invalid username/password" });
});

app.post("/api/instructor-login", async (req, res) => {
  const { username, password } = req.body;
  // data shouldn't be in mongodb format
  const instructor = await Instructor.findOne({ username }).lean();

  if (!instructor) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }

  if (await bcrypt.compare(password, instructor.password)) {
    // the username, password combination is successful
    const token = jwt.sign(
      {
        id: instructor._id,
        username: instructor.username,
      },
      JWT_SECRET
    );
    res.cookie("check", token);
    return res.json({ status: "ok" });
  }
  res.json({ status: "error", error: "Invalid username/password" });
});

app.post("/api/company-login", async (req, res) => {
  const { username, password } = req.body;
  // data shouldn't be in mongodb format
  const company = await Company.findOne({ username }).lean();

  if (!company) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }

  if (await bcrypt.compare(password, company.password)) {
    // the username, password combination is successful
    const token = jwt.sign(
      {
        id: company._id,
        username: company.username,
      },
      JWT_SECRET
    );
    res.cookie("check", token);
    return res.json({ status: "ok" });
  }

  res.json({ status: "error", error: "Invalid username/password" });
});

app.post("/api/admin-login", async (req, res) => {
  const { username, password } = req.body;
  // data shouldn't be in mongodb format
  const admin = await Admin.findOne({ username }).lean();

  if (!admin) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }

  if (await bcrypt.compare(password, admin.password)) {
    // the username, password combination is successful
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
      },
      JWT_SECRET
    );
    res.cookie("check", token);
    return res.json({ status: "ok" });
  }

  res.json({ status: "error", error: "Invalid username/password" });
});

app.get("/logout", function (req, res) {
  res.cookie("check", { expires: Date.now() });
  res.redirect("/");
});

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
app.get("/home-forgotpassword", function (req, res) {
  res.render("home-forgotpassword");
});

app.get("/home-registration", function (req, res) {
  res.render("home-registration");
});


// Learner

app.get("/learner-home", function (req, res) {
  const token = req.cookies.check;
  try {
    const learner = jwt.verify(token, JWT_SECRET);
    res.render("learner-home");
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/learner-module", function (req, res) {
  const token = req.cookies.check;
  try {
    const learner = jwt.verify(token, JWT_SECRET);
    res.render("learner-module");
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/learner-chat-room", function (req, res) {
  res.render("chat-room", {user : "learner"});
});

app.get("/learner-profile", function (req, res) {
  const token = req.cookies.check;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    // let learner = await Learner.findOne({ user.username }).lean()
    res.render("learner-profile", { learner: user });
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

// Admin

app.get("/admin-home", function (req, res) {
  const token = req.cookies.check;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    // let learner = await Learner.findOne({ user.username }).lean()
    res.render("admin-home");
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/admin-learnerslist", function (req, res) {
  const token = req.cookies.check;
  try {
    let learner = learnerModel.find({});
    learner.exec(function (err, data) {
      if (err) throw err;
      res.render("admin-learnerslist", { records: data });
    });
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/admin-instructorslist", function (req, res) {
  const token = req.cookies.check;
  try {
    let instructor = instructorModel.find({});
    instructor.exec(function (err, data) {
      if (err) throw err;
      res.render("admin-instructorslist", { records: data });
    });
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/admin-companieslist", function (req, res) {
  const token = req.cookies.check;
  try {
    let company = companyModel.find({});
    company.exec(function (err, data) {
      if (err) throw err;
      res.render("admin-companieslist", { records: data });
    });
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/admin-learner-registartion", function (req, res) {
  const token = req.cookies.check;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.render("admin-learnerreg");
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/admin-company-registration", function (req, res) {
  const token = req.cookies.check;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.render("admin-companyreg");
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/admin-instructor-registration", function (req, res) {
  const token = req.cookies.check;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.render("admin-instructorreg");
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/compiler", function (req, res) {
  const token = req.cookies.check;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.render("compiler", {user : "learner"});
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/discussions", function (req, res) {
  const token = req.cookies.check;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.render("discussions");
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

// Company view

app.get("/company-home", function (req, res) {
  const token = req.cookies.check;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.render("company-home");
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/company-learnerslist", function (req, res) {
  const token = req.cookies.check;
  try {
    let learner = learnerModel.find({});
    learner.exec(function (err, data) {
      if (err) throw err;
      res.render("company-learnerslist", { records: data });
    });
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/company-instructorslist", function (req, res) {
  const token = req.cookies.check;
  try {
    let instructor = instructorModel.find({});
    instructor.exec(function (err, data) {
      if (err) throw err;
      res.render("company-instructorslist", { records: data });
    });
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

// Instructors view

app.get("/instructor-home", function (req, res) {

  const token = req.cookies.check;
  try {
    let instructor = instructorModel.find({});
    instructor.exec(function (err, data) {
      if (err) throw err;
      res.render("instructor-home");
    });
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/instructor-module", function (req, res) {
  const token = req.cookies.check;
  try {
    let instructor = instructorModel.find({});
    instructor.exec(function (err, data) {
      if (err) throw err;
      res.render("instructor-module");
    });
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/instructor-homeworklist", function (req, res) {
  const token = req.cookies.check;
  try {
    let instructor = instructorModel.find({});
    instructor.exec(function (err, data) {
      if (err) throw err;
      res.render("instructor-homeworklist");
    });
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/instructor-learnerslist", function (req, res) {
  const token = req.cookies.check;
  try {
    let learner = learnerModel.find({});
    learner.exec(function (err, data) {
      if (err) throw err;
      res.render("instructor-learnerslist", { records: data });
    });
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/instructor-chat-home", function (req, res) {
  res.render("chat-home", {user : "instructor"});
});

app.get("/instructor-compiler", function (req, res) {
  res.render("compiler", {user : "instructor"});
});


app.get("chat-home", function (req, res) {
  res.render("chat-home");
})
app.get("/contact-us", function (req, res) {
  res.render("contact-us");
});

app.listen(8080);

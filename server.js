const express = require("express");
const http = require('http');
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Learner = require("./model/learner");
const Day = require("./model/day");
const Instructor = require("./model/instructor");
const Company = require("./model/company");
const Chat = require("./model/chat");
const Admin = require("./model/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
let learnerModel = require("./model/learner");
let instructorModel = require("./model/instructor");
let dayModel = require("./model/day");
let companyModel = require("./model/company");
let chatModel = require("./model/chat");
const fs = require("fs");
const { exec, execSync } = require("child_process");
const { stderr } = require("process");
const { route } = require("express/lib/application");

const app = express();
const server = http.createServer(app);
let io = socketio(server);

const JWT_SECRET = "abhs@vb#s3g%f$fgmnabkjufyfc@ijhu#HB$BHB$b5%jhbB%gb%Hg%b";

mongoose
  .connect(
    "mongodb+srv://array2002:Abhay%40123@cluster0.gcftg.mongodb.net/login-app-db",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((d) => console.log("success"));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(cookieParser());

// Chat application
// When client connects to server
io.on("connection",socket => {  

  console.log("user connected");
ṭ
  socket.on("chat message", function(data){
    io.emit("received", data);
    let chatMessage = new Chat({ message: data.msg, sender: data.username });
    chatMessage.save();
  })
  //   // Welcome cureent userr (TO the client)
  // socket.emit('message',formatMessage(botname,"Welcome back"));

  // //Braodcast when a user connects (All the client expect the user)
  // socket.broadcast.emit('message',formatMessage(botname,"User has joined the chat"));

  // // All the clients
  // // io.emit


  // Runs when client disconnects 
  io.on('disconnect',()=>{
    console.log("Disconnected");
    // io.emit('message',formatMessage(botname,'A user has left the chat'));
  })

  
  // //Listen for chat messgae
  // socket.on('chatMessage',(msg) => {
  //   io.emit('message',formatMessage("user",msg));
  // })
})


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

app.post("/api/addLecture", async (req, res) => {
  const {lectureLink, homeworkLink} = req.body;
  try {
    const response = await Day.create({
      lectureLink, 
      homeworkLink
    });
    console.log("Day created successfully: ", response);
  } catch (error) {
    throw error;
  }
  res.json({ status: "ok" });
})

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
  res.render("home-registration",{user : "home"});
});


// Learner

app.get("/learner-home", function (req, res) {
  const token = req.cookies.check;
  try {
    const learner = jwt.verify(token, JWT_SECRET);
    res.render("instructor-home",{user : "learner"});
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/learner-module", function (req, res) {
  const token = req.cookies.check;
  try {
    const learner = jwt.verify(token, JWT_SECRET);
    try {
      let day = dayModel.find({});
      day.exec(function (err, data) {
        if (err) throw err;
        res.render("instructor-module", { user:"learner", records: data });
      });
    } catch (error) {
      console.log(error);
      res.redirect("home-login");
    }
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
    
});

app.get("/learner-chat-home", function (req, res) {
  const token = req.cookies.check;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.render("chat-home", { user : "learner", learner: user });
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
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
    res.render("home-registration",{user : "instructor"});
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/admin-company-registration", function (req, res) {
  const token = req.cookies.check;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.render("home-registration",{user : "company"});
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/admin-instructor-registration", function (req, res) {
  const token = req.cookies.check;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.render("home-registration",{user : "instructor"});
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
      res.render("instructor-home",{user : "instructor"});
    });
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});

app.get("/instructor-module", function (req, res) {
  const token = req.cookies.check;
  try {
    let day = dayModel.find({});
    day.exec(function (err, data) {
      if (err) throw err;
      res.render("instructor-module", { user:"instructor", records: data });
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
      res.render("instructor-learnerslist", { user:"instructor" , records: data });
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

app.post('/deletestudent', async (req, res, next) => {
  Learner.deleteOne({_id: req.body.id},(err)=>{
    if(err){
      throw err;
    }
  });
  next();
})

app.post('/deleteinstructor', async (req, res, next) => {
  Instructor.deleteOne({_id: req.body.id},(err)=>{
    if(err){
      throw err;
    }
  });
  next();
})

app.post('/deletecompany', async (req, res, next) => {
  console.log(req.body.id);
  Company.deleteOne({_id: req.body.id},(err)=>{
    if(err){
      throw err;
    }
  });
  next();
})


app.get("/learner-chat-room", function (req, res) {
  const token = req.cookies.check;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    let chat = chatModel.find({});
    chat.exec(function (err, data) {
      if (err) throw err;
      console.log(data);
      res.render("chat-room", { records: data, user: "learner" });
    });
  } catch (error) {
    console.log(error);
    res.redirect("home-login");
  }
});



const eval = (code, lang) => {
  if(lang === "cpp"){
    fs.writeFileSync("./Compilation/eval.cpp", code);
    let childp1
    try{
      childp1 = execSync("g++ ./Compilation/eval.cpp -o eval")
    }catch(err){
      return err.stderr.toString();
    }

    try {
        let childp2 = execSync(".\\eval.exe < ./Compilation/input.txt");
        return childp2.toString() ;
    }
    catch(err) {
        return err.stderr.toString();
    }
  }
  if(lang === "py"){
    fs.writeFileSync("./Compilation/evall.py", code);
    try {
        let childp2 = execSync("py ./Compilation/evall.py < ./Compilation/input.txt");  
        return childp2.toString() ;
    }
    catch(err) {
        return err.stderr.toString();
    }
  }
  if(lang === "c"){
    fs.writeFileSync("./Compilation/evalC.c", code);
    let childp1;
    try {
        childp1 = execSync("gcc ./Compilation/evalC.c");
    }
    catch(err) {
        return err.stderr.toString();
    }
      try {
        let childp2 = execSync(".\\a.exe < ./Compilation/input.txt");
        return childp2.toString() ;
    }
      catch(err) {
          return err.stderr.toString();
      }
    }

  if(lang === "js"){
    fs.writeFileSync("./Compilation/evalJs.js", code);
    let childp1;
    try {
        childp1 = execSync("node ./Compilation/evalJs.js < ./Compilation/input.txt");
        return childp1.toString() ;
    }
    catch(err) {
      console.log(err);
        return err.stderr.toString();
    }
  }
};

app.post('/get-result',(req,res)=>{
  const {code,lang}=req.body;
  res.status(200).json(eval(code,lang));
})


server.listen(8080);
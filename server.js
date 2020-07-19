const express = require('express');
const app = express();
const {createUser, getUserStrategy, serializeUser,deserializeUser, getUserInfo, isAdmin} = require("./modules/user-manager");
const {getPublicRooms, getRoomNameFromUser, createRoom}  = require('./modules/rooms');

//sessions
const eS = require('express-session');
const expressSession = eS({ secret: 'keyboard cat', resave: false, saveUninitialized: false });

//websocket
const expressWs = require('express-ws');
expressWs(app);
const newConnection = require("./modules/new-connection");

//passport
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const {ensureLoggedIn} = require('connect-ensure-login');

//setup middleware
app.use(express.urlencoded({ extended: true }))
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());


passport.use(new Strategy(getUserStrategy))
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

const port = 8080;

//Routes
//pages
app.get('/', ensureLoggedIn('/login'), (req,res)=>res.sendFile(__dirname + "/site/index.html"));

app.get('/login', (req,res)=>res.sendFile(__dirname + '/site/pages/login.html'));

app.get('/register', (req,res)=>res.sendFile(__dirname + '/site/pages/new-user.html'));

//websockets
app.ws('/', (ws, req)=>{if(req.isAuthenticated()) newConnection(ws)});

//forms
app.post("/login", passport.authenticate('local'), (req,res)=>{
  res.redirect(`/`);
});

app.post("/register", createUser, (req,res)=>{
  res.redirect("/login")
});

//api?
app.get("/list-rooms", getPublicRooms, (req,res)=>res.json(res.rooms));

app.post("/create-room", isAdmin, createRoom, (req,res)=>res.json(res.newRoom));

app.get("/room-name", getRoomNameFromUser, (req,res)=>res.json({name:res.roomName}));

app.get("/get-my-user-info", getUserInfo, (req,res)=>res.json(res.user))

//this has to be after the routes 
app.use(express.static('site'));

app.listen(port, () => console.log(`http://localhost:${port}`));

//open up port on ec2 instance
//sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
//iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
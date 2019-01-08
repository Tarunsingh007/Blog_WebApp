// dependencied
var express = require('express')
var app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');



//middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: [keys.CookieKey]
}));

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

//connect to database
mongoose.connect(keys.database,{ useNewUrlParser: true })
	.then(() => console.log('connection successful'))
	.catch((err) => console.error(err));
mongoose.Promise = global.Promise;



//app.use(express.static(path.join(__dirname, 'client/build')));
 
//basic-get
app.get('/check',function(req,res){
    res.send({success:true});
});

// set up routes
app.use('/auth', authRoutes);

app.post('/api/home',function(req,res){
	if(!req.user){
        res.send({success:true, isAuth:false});
    } 
    else {
        res.send({success:true, isAuth:true, user:req.user});
    }
});

app.post('/api/profile', (req, res) => {
    if(!req.user){
        console.log('here');
        res.send({success:true, isAuth:false});
    } 
    else{
        res.send({success:true, isAuth:true, user:req.user});
    }
});

app.post('/api/check_login',function(req,res){
    if(!req.user){
        res.send({success:true, isAuth:false});
    } 
    else {
        res.send({success:true, isAuth:true, user:req.user});
    }
});

/*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
*/

var port = process.env.PORT || 3001;
var server = app.listen(port,function(){
	console.log('server listening....')
});
require('rootpath')();
const express = require('express')
const port = process.env.PORT || 3001;
//const port = process.env.PORT || 34677;
const cors = require('cors');
const session = require('express-session')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const bodyParser = require('body-parser');

//Use configuration in the .env file via `process.env.VARIABLE_NAME`
require('dotenv').config();

//Create express application
const app = express()
app.use(express.static(__dirname +"/public"))
//Use express implementation instead of body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Enable http requests
app.use(cors());

//Config passport
//require('./config/passport.config')(passport)

//Passport Authentication
//app.use(passport.initialize())    
//Load Routes

const authRouter = require('./routes/auth.routes')
const employerRouter = require('./routes/employer.routes')
const jobRouter = require('./routes/job.routes')
const miscRouter = require('./routes/misc.routes')
const jobseekerRouter = require('./routes/jobseeker.routes')
app.use('/api', authRouter);
app.use('/api', employerRouter);
app.use('/api', jobRouter);
app.use('/api', miscRouter);
app.use('/api', jobseekerRouter);
//Default homepage
app.get('/', (req, res) => {res.send('Welcome to PR Jobs')})
 app.get('/api/user/:id', (req, res)=>{
     res.send(req.params.id);
});


//Open server port 3001
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser'); 
const path = require('path');
dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 8080
const app = express();
const router = require('./server/routes/router');
const connectDB = require('./server/database/connection');
const cors = require('cors');


const corsOptions ={
    origin:'http://192.168.1.7/test', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
};


app.use(cors());


//log request
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body-parser 
app.use(bodyparser.urlencoded({extended : true}));

//set view engine
app.set('view engine', 'ejs')
// app.set('views', path.resolve(__dirname,"views/ejs"));

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
// css/style.css
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));

//load routers
app.use('/', router);





app.listen(PORT, () => console.log(`Sever is running on ${path.dirname(__filename)}:${PORT}`));

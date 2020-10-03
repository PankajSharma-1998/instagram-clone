const express = require('express');
const app = express();
const path = require('path');
const body = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
require('./db/mongodb');
const user_router = require('./Router/user_router');
const post_router = require('./Router/userPost_routes');



//only for development mode;
//app.use(morgan('dev'));

// setting template engines
app.set('views',path.join(__dirname, '../views'));// providing path for 'views' directory'
app.set('view engine','ejs');// setting view engine to ejs{'Her i m not using templates now, but in next update u will get tempates.}

//to get rid of cors error;
app.use(cors());

// to parse url encoded bodies or incoming data
app.use(body.urlencoded({extended:false}));
//to get json data from input send in json format
app.use(body.json());

app.use('/',user_router);
app.use('/post',post_router);

// also not doing error handling but will do in next update.

if(process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(__dirname,'../client','build')));

    app.get('*',(req,res)=>{
        
        res.sendFile(path.resolve(__dirname,'../client','build','index.html'));
    
    })

}


module.exports = app;
const mongoose = require('mongoose');
const colorify = require('../chalk/chalk');
const { MONGODB_URI } = require('../config/deployment');

mongoose.connect(MONGODB_URI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
    keepAlive:true
});

mongoose.connection.on('error',() => {
    console.log(colorify.red('[error connecting to database]'));
    
});

mongoose.connection.once('connected',()=>{
    console.log(colorify.blue('[connected to database]'));

});
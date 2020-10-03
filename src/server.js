const http = require('http');
const PORT = process.env.PORT || '8080';
const app = require('./app');
const colorify = require('./chalk/chalk');

const server = http.createServer(app);

server.listen(PORT,()=>{

    console.log(colorify.blue(`server is runnig on port:${PORT}`));

});
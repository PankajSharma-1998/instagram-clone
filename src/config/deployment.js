//here we are using same keys for production and development;

if(process.env.NODE_ENV === 'production'){

    module.exports =require('./keys');

}else{
    
    module.exports =require('./keys');
}
// json web tokens

const jwt = require('jsonwebtoken');

const genrate_token = (id, key) => {
   
const token = jwt.sign(id, key);

return token;

}

module.exports = genrate_token;
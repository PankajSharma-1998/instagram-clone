// hashing password here;

const bcrypt = require('bcrypt');

const hash_password = (password, saltRounds) => {

   const hashed_password = bcrypt.hashSync(password, saltRounds);
 
   return hashed_password;


}

// comparing hash_password;
const compare_password = (password, stored_password) => {

   const compared_password = bcrypt.compareSync(password, stored_password);

   return compared_password;

}

module.exports = { hash_password, compare_password };
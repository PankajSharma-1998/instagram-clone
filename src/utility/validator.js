const validator = require('validator');

const validation = (value, dataType) => {

    switch (dataType) {

        case 'string':   
        return validator.isEmpty(value);
        break;

        case 'number': 
        return validator.isEmpty(value);
        break;
        
        case 'email':
        return validator.isEmail(value);
        break;
        
        default : return null;
    }
}

module.exports = validation;
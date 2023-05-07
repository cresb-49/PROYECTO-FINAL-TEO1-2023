const ENCRYPT_VALUE = 10;
const bycrypt = require('bcryptjs');


const encrypt = async (text) => {
    const value = await bycrypt.hash(text, ENCRYPT_VALUE);
    return value;
}

const compare = async (password, hashPassword) => {
    return await bycrypt.compare(password,hashPassword);
}

module.exports={
    encrypt:encrypt,
    compare:compare
}
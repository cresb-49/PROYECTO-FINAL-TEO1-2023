const ENCRYPT_VALUE = 'SLIURNVIGSLVGNSTUIGREVGSYEFVSFSGVBSGKF';
const bycrypt = require('bcryptjs');


const encrypt = async (text) => {
    const hash = await bycrypt.hash(text, ENCRYPT_VALUE);
    return hash;
}

const compare = async (password, hashPassword) => {
    return await bycrypt.compare(password,hashPassword);
}

module.exports={
    encrypt:encrypt,
    compare:compare
}
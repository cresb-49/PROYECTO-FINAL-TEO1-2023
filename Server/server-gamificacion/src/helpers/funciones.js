
const generarCodigoJuegos = () => {
    let codigo = '';
    const caracteres = '0123456789';
    for (let i = 1; i <= 6; i++) {
      let caracter = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(caracter)
    }
    return codigo;
}

module.exports = {
    generarCodigoJuegos
}
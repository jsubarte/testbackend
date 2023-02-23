import { Usuario } from '../models/index.js'

const emailExiste = async (email) => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({where: { email }})
    if( existeEmail ) throw new Error(`El email ${ email }, ya está registrado en la BD`)
}

const validaRol = async (userid, rol) => {
    const { role } = await Usuario.findByPk(userid)
    return (role == rol)
}

const obtOpciones = async (userid, typeRol, filter) => {
    let opciones = {}
    if(typeRol){
        opciones = { where: { userid }, order: [ ['created_date', 'DESC'] ] }
    }
    else{
        switch (filter) {
            case '1':
                opciones = { where: { active: 'Y' }, order: [ ['created_date', 'DESC'] ] }
                break
            case '2':
                opciones = { where: { solved: 'Y' }, order: [ ['created_date', 'DESC'] ] }
                break
            case '3':
                opciones = { where: { solved: 'N' }, order: [ ['created_date', 'DESC'] ] }
                break
            case '4':
                opciones = { where: { active: 'N' }, order: [ ['created_date', 'DESC'] ] }
                break
            default:
                console.log('caso default')
                opciones = { order: [ ['created_date', 'DESC'] ] }
                break
        }
    }
    return opciones
}

export{
    emailExiste,
    validaRol,
    obtOpciones
}
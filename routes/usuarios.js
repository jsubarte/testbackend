import { Router } from 'express'
import { check } from 'express-validator'
import { validaCampos, validaJWT } from '../middlewares/index.js'
import { usuariosDelete, usuariosPatch, usuariosPost, login } from '../controllers/usuarios.js'
import { emailExiste } from '../helpers/db_validators.js'

export const rtrUsuario = Router()


rtrUsuario.post('/',
    [
        check('name', 'El nombre es obligatorio y no puede ser numero').notEmpty().isAlpha('es-ES'),
        check('lastname', 'El apellido es obligatorio y no puede ser numero').notEmpty().isAlpha('es-ES'),
        check('email', 'El email es obligatorio').notEmpty(),
        check('email', 'El email no es valido').isEmail(),
        check('email').custom(emailExiste),
        check('password', `Minimo: 8 caracteres, 1 minuscula, 1 mayuscula, 1 numero, 1 caracter especial`).isStrongPassword(),
        check('phone', 'El telefono es obligatorio').notEmpty().isMobilePhone(),
        check('role', 'No es un rol permitido').isIn(['C','T','']),
        check('active', 'No es un valor permitido para active').isIn(['Y','N','']),
        validaCampos.validarCampos
    ], usuariosPost 
)


rtrUsuario.post('/login', [
    check('email', 'El correo es obligatorio').notEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('password','La contraseña es obligatoria').notEmpty(),
    validaCampos.validarCampos
], login)


rtrUsuario.patch('/:id', 
    [
        validaJWT.validarJWT,
        validaCampos.validarCampos
    ], usuariosPatch 
)


rtrUsuario.delete('/:id', 
    [
        validaJWT.validarJWT,
        validaCampos.validarCampos
    ], usuariosDelete 
)
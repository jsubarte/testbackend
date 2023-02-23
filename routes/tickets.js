import { Router } from 'express'
import { check } from 'express-validator'
import { validaCampos, validaJWT } from '../middlewares/index.js'
import { obtenerTickets, crearTickets, atenderTicket, actualizarEstadoTicket } from '../controllers/tickets.js'


export const rtrTicket = Router()

rtrTicket.get('/',
    [
        validaJWT.validarJWT
    ], obtenerTickets
)

rtrTicket.post('/',
    [
        validaJWT.validarJWT,
        check('description','La descripcion es obligatoria').notEmpty(),
        validaCampos.validarCampos
    ], crearTickets
)

rtrTicket.patch('/atender/:ticketid', 
    [
        validaJWT.validarJWT
    ], atenderTicket
)

rtrTicket.patch('/estado/:ticketid', 
    [
        validaJWT.validarJWT,
        check('active','No es un estado valido').optional().isIn(['Y','N']),
        check('solved','No es un estado valido').optional().isIn(['Y','N']),
        validaCampos.validarCampos
    ], actualizarEstadoTicket
)

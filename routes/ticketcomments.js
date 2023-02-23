import { Router } from 'express'
import { check } from 'express-validator'
import { validaCampos, validaJWT } from '../middlewares/index.js'
import { comentarTicket } from '../controllers/ticketcomments.js'

export const rtrTicketComment = Router()

rtrTicketComment.post('/:ticketid',
    [
        validaJWT.validarJWT,
        check('commentary','El comentario es obligatorio').notEmpty(),
        validaCampos.validarCampos
    ], comentarTicket
)

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { response, request } from 'express'
import { Ticket, TicketComment } from '../models/index.js'
import { validaRol, obtOpciones } from '../helpers/db_validators.js'
import { subirArchivo } from '../helpers/index.js'

const obtenerTickets = async (req = request, res = response) => {
    try {
        let ticket = []
        const userid = req.usuario.userid
        const typeRol = await validaRol(userid, 'C')
        const opciones = await obtOpciones(userid, typeRol, req.query.filter)
        ticket = await Ticket.findAll({...opciones, include: TicketComment})
        ticket = ticket.map(
            t => {
                t = typeRol ?
                        {
                            'comentar': t.active == 'Y', 
                            'atender': false,
                            ...t.dataValues
                        }
                        :
                        {
                            'comentar': ( t.attention == userid && t.active == 'Y' ), 
                            'atender': ( t.attention == null && t.active == 'Y' ), 
                            ...t.dataValues
                        }
                if(!!t.filepath) t.image = `data:image/gif;base64,${fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '../images/', t.filepath), 'base64')}`
                t.TicketComments = t.TicketComments.map( 
                    tc => { 
                        return !!tc.filepath ?
                        { 
                            image: `data:image/gif;base64,${fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '../images/', tc.filepath), 'base64')}`,//tc.filepath, 'base64')}`,
                            ...tc.dataValues 
                        } 
                        :
                        {
                            ...tc.dataValues
                        }
                    }
                )
                return t
            }
        )
        res.status(200).json({ ticket })
    } catch (error) {
        console.log(`Error: ${error}`)
        res.status(500).json(`Error: ${error}`)
    }
}

const crearTickets = async (req = request, res = response) => {
    try {
        const userid = req.usuario.userid
        if(await validaRol(userid, 'C')){
            const { description } = req.body

            const nombre = await subirArchivo.subirArchivo(req.files)
            const ticket = new Ticket({ description, userid, filepath: nombre })
            
            // Guardar en Base de Datos
            await ticket.save()
    
            res.status(201).json(ticket)
        }
        else{
            res.status(400).json({ msg: 'Usted no puede crear tickets'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(`Error: ${error}`)
    }
}

const atenderTicket = async (req = request, res = response) => {
    try {
        const userid = req.usuario.userid
        const { ticketid } = req.params
        if( await validaRol(userid, 'T') ){
            const ticket = await Ticket.update( { attention: userid }, { where: { ticketid, solved: 'N', active: 'Y', attention: null } } )
            res.status(200).json({ 'msg': `Se actualizo ${ticket} registro(s)` })
        }
        else{
            res.status(401).json({ 'error': `Usted no puede atender tickets` })
        }
    } catch (error) {
        console.log(`Error: ${error}`)
        res.status(500).json(`Error: ${error}`)
    }
}

const actualizarEstadoTicket = async (req = request, res = response) => {
    try {
        const userid = req.usuario.userid
        const { ticketid } = req.params
        let ticket
        if( await validaRol(userid, 'T') ){
            const { active } = req.body
            ticket = await Ticket.update( { active }, { where: { ticketid, attention: userid } } )
        }
        else{
            const { solved } = req.body
            ticket = await Ticket.update( { solved }, { where: { ticketid, userid, active: 'Y' } } )
        }
        res.status(200).json({ 'msg': `Se actualizo ${ticket} registro(s)` })
    } catch (error) {
        console.log(error)
        res.status(500).json(`Error: ${error}`)
    }
}

export{
    obtenerTickets,
    crearTickets,
    atenderTicket,
    actualizarEstadoTicket
}
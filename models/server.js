import express from 'express'
import cors from 'cors'
import { rtrUsuario, rtrTicket, rtrTicketComment } from '../routes/index.js'
import fileUpload from 'express-fileupload'

class Server{
    
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            usuarios: '/api/usuarios',
            tickets: '/api/tickets',
            ticketcomment: '/api/ticketcomment'
        }

        // Middlewares
        this.middleware()

        // Documentacion Swagger
        //this.docSwagger()

        // Rutas de mi aplicacion
        this.routes()
    }

    middleware(){
        //CORS
        this.app.use(cors())

        // Lectura y Parseo del Body
        this.app.use(express.json())

        //File Upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }))
    }

    routes(){
        this.app.use(this.paths.usuarios, rtrUsuario)
        this.app.use(this.paths.tickets, rtrTicket)
        this.app.use(this.paths.ticketcomment, rtrTicketComment)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Aplicacion ejecutandose en puerto ${this.port}`)
        })
    }

}

export {
    Server
}

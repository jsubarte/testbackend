import { Sequelize } from 'sequelize'
import 'dotenv/config'

const dbConnection = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS,
    { 
        host: process.env.DB_HOST || process.env.DKDB_HOST, 
        dialect: process.env.DB_DIAL, 
        port: process.env.DB_PORT,
        dialectOptions: { 
            useUTC: false 
        }, 
        timezone: process.env.DB_ZH 
    }
)

export {
    dbConnection
}
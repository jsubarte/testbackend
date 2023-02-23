import { DataTypes, Model } from 'sequelize'
import { dbConnection } from '../database/config.js'
import { TicketComment } from './ticketcomments.js'

class Ticket extends Model{}

Ticket.init(
    {
        ticketid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        created_date: {
            type: DataTypes.DATE,
            //allowNull: false,
            defaultValue: Date.now
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        filepath: {
            type: DataTypes.TEXT
        },
        attention: {
            type: DataTypes.INTEGER
        },
        solved: {
            type: DataTypes.ENUM('Y','N'),
            defaultValue: 'N'
        },
        active: {
            type: DataTypes.ENUM('Y','N'),
            defaultValue: 'Y'
        }
    },
    {
        sequelize: dbConnection,
        timestamps: false,
        modelName: 'Ticket',
        tableName: 'ticket'
    }
)

Ticket.hasMany(TicketComment,{
    foreignKey: 'ticketid',
    sourceKey: 'ticketid'
})

TicketComment.belongsTo(Ticket,{
    foreignKey: 'ticketid',
    targetId: 'ticketid'
})

//Ticket.sync()

export {
    Ticket
}
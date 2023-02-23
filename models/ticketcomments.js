import { DataTypes, Model } from 'sequelize'
import { dbConnection } from '../database/config.js'

class TicketComment extends Model{}

TicketComment.init(
    {
        ticketcommentid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        ticketid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_date: {
            type: DataTypes.DATE,
            //allowNull: false,
            defaultValue: Date.now
        },
        commentary: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        filepath: {
            type: DataTypes.TEXT
        }
    },
    {
        sequelize: dbConnection,
        timestamps: false,
        modelName: 'TicketComment',
        tableName: 'ticketcomments'
    }
)

//TicketComment.sync()

export {
    TicketComment
}
import { DataTypes, Model } from 'sequelize'
import { dbConnection } from '../database/config.js'

class Usuario extends Model{}

Usuario.init(
    {
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        lastname: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        company: {
            type: DataTypes.TEXT
        },
        phone: {
            type: DataTypes.TEXT
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('C','T'),
            defaultValue: 'C'
        },
        active: {
            type: DataTypes.ENUM('Y','N'),
            defaultValue: 'Y'
        }
    },
    {
        sequelize: dbConnection,
        timestamps: false,
        modelName: 'Usuario',
        tableName: 'usuario'
    }
)

//Usuario.sync()

export {
    Usuario
}
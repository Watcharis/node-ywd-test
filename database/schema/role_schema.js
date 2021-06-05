import { DataTypes, Model, Sequelize } from 'sequelize'
import sequelize from '../connect_mariadb.js'

class Roles extends Model {}

Roles.init(
    {
        role_id : {
            type : DataTypes.UUID,
            primaryKey: true,
        },
        role_name : {
            type : DataTypes.STRING,
            allowNull: false
        },
        role_status:{
            type : DataTypes.INTEGER,
            allowNull: false
        },
        create_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize, 
        modelName: 'roles',
        timestamps : false,
        createdAt: false,
        updatedAt: false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
)

export default Roles

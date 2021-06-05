import { DataTypes, Model } from 'sequelize'
import sequelize from '../connect_mariadb.js'
import Roles from './role_schema.js'

class Users extends Model {}

Users.init(
    {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING, 
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        display_name: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        role_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Roles,
                key: 'role_id'
            }
        },
        create_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        modelName: 'users',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
)

Roles.hasOne(Users, {foreignKey: 'role_id', sourceKey: 'role_id'})
Users.belongsTo(Roles, {targetKey: 'role_id', foreignKey: 'role_id'})

export default Users
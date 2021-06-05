import { DataTypes, Model, Sequelize, UUID } from 'sequelize'
import sequelize from '../connect_mariadb.js'
import Users from './user_schema'

class Receipt extends Model {}

Receipt.init(
    {
        receipt_id : {
            type : DataTypes.UUID,
            primaryKey: true,
        },
        user_id : {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Users,
                key: 'user_id'
            }
        },
        receipt_code : {
            type : DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        receipt_point: {
            type : DataTypes.INTEGER,
            allowNull: true,
        },
        total_price: {
            type : DataTypes.INTEGER,
            allowNull: false,
        },
        status_receipt: {
            type : DataTypes.INTEGER,
            defaultValue: 0 // admin ยังไม่ให้ คะเเนน
        },
        create_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize, 
        modelName: 'receipt',
        timestamps : false,
        createdAt: false,
        updatedAt: false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
)

Users.hasMany(Receipt, {foreignKey: 'user_id', sourceKey: 'user_id'})
Receipt.belongsTo(Users, {targetKey: 'user_id', foreignKey: 'user_id'})

export default Receipt

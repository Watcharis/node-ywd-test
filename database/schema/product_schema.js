import { DataTypes, Model, Sequelize } from 'sequelize'
import sequelize from '../connect_mariadb.js'

class Product extends Model {}

Product.init(
    {
        product_id : {
            type : DataTypes.UUID,
            primaryKey: true,
        },
        product_name : {
            type : DataTypes.STRING,
            allowNull: false
        },
        product_point : {
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
        modelName: 'product',
        timestamps : false,
        createdAt: false,
        updatedAt: false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
)

export default Product

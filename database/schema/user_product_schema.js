import { DataTypes, Model } from 'sequelize'
import sequelize from '../connect_mariadb.js'
import Users from './user_schema.js'
import Product from './product_schema.js'

class UserProducts extends Model{}

UserProducts.init(
    {
        user_product_id : {
            type: DataTypes.UUID,
            primaryKey: true
        },
        user_id : {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Users,
                key: 'user_id'
            }
        },
        product_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Product,
                key: 'product_id'
            }
        },
        create_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        modelName: 'user_products',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
)

Users.hasMany(UserProducts, {foreignKey: 'user_id', sourceKey: 'user_id'})
UserProducts.belongsTo(Users, {targetKey: 'user_id', foreignKey: 'user_id'})

Product.hasMany(UserProducts, {foreignKey: 'product_id', sourceKey: 'product_id'})
UserProducts.belongsTo(Product, {targetKey: 'product_id', foreignKey: 'product_id'})

export default UserProducts
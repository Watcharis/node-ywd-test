import Users from './schema/user_schema'
import Roles from './schema/role_schema'
import Receipt from './schema/receipt_schema'
import Product from './schema/product_schema'
import UserProducts from './schema/user_product_schema'
import sequelize from './connect_mariadb'
import { v4 as uuidv4 } from 'uuid'

const createTabletMariadb = async() => {
    try {
        await sequelize.sync({ force: false }).then(() => { console.log("connect mariadb by sequelize")})

        const roleAdmin = uuidv4()
        
        if (JSON.stringify(await Roles.findAll({where: {role_name: 'admin'}})) === '[]'){
            await Roles.create({role_id: roleAdmin, role_name: "admin", role_status : 1})
        }

        if (JSON.stringify(await Roles.findAll({where: {role_name: 'user'}})) === '[]'){
            await Roles.create({role_id: uuidv4(), role_name: "user", role_status : 0})
        }

        if (JSON.stringify(await Users.findAll({ where: {email : 'admin@admin.com'}})) === '[]' ){

            await Users.create({
                user_id: uuidv4(),
                email: "admin@admin.com",
                password: "admin",
                display_name : "Admin",
                phone : "1234567890",
                role_id: roleAdmin
            })
        }
        // await sequelize.drop()
    } catch (error) {
        console.error(`Unable to connect to the database: ${error}`);
    }
}
  

export default createTabletMariadb
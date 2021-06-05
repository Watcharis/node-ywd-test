import Product from "../database/schema/product_schema"

class UserProductReppository {
    constructor(UserProducts){
        this.userproducts = UserProducts
    }

    insertUserProduct = async(data, user_product_id)=> {
        await this.userproducts.create({
            user_product_id : user_product_id,
            user_id: data.user_id,
            product_id: data.product_id
        })
        return "insert user product success"
    }

    findUserProductByUserId = async(user_id)=> {
        return await this.userproducts.findAll({
            where: {user_id: user_id},
            include:[{
                model: Product,
            }]
        })
    }
}


export default UserProductReppository
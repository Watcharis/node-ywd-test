class ProductRepository {

    constructor(Product){
        this.products = Product
    }

    insertProduct = async(data, product_id)=> {
        await this.products.create({
            product_id: product_id,
            product_name: data.product_name,
            product_point: data.product_point
        })
        return "insert product success"
    }

    findProductByProductName = async(product_name)=> {
        return await this.products.findAll({ where: {product_name: product_name}})
    }

    findAllProduct = async()=> {
        return await this.products.findAll({})
    }

    findProductById = async(product_id)=> {
        return await this.products.findOne({where: {product_id: product_id}})
    }
}

export default ProductRepository
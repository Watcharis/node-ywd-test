import ProductRepository from '../../repository/product_repository'
import Product from '../../database/schema/product_schema'
import HandleError from '../errorhandle/hanle_error'
import { v4 as uuidv4 } from 'uuid'

const productRepository = new ProductRepository(Product)


const addProduct = async(req, res) => {
    try{

        if (req.body.product_name === "" ){
            throw new Error("invalide format product_name")
        }

        if (req.body.product_point <= 0) {
            throw new Error("product_point must more than zero")
        }

        if (req.body.product_name !== "" && req.body.product_point > 0){

            const product_id = uuidv4()

            const checkProductName = await productRepository.findProductByProductName(req.body.product_name)

            if (checkProductName.length === 0){

                const saveProduct = await productRepository.insertProduct(req.body, product_id)
                
                saveProduct === "insert product success" ? res.status(200).json({messgae: "add product", status: "success", data: ""})
                : HandleError.EchoError("add product fail")
            }else {
                res.status(200).json({ message : "product is exists", status: "fail", })
            }
        }else {
            throw new Error("product_point must more than zero and invalide format product_name")
        }
    }catch(e){
        res.status(400).json({messgae: e.message, status: "fail", data: ""})
    }
}


const getProduct = async(req, res) => {
    const product = await productRepository.findAllProduct()
    res.status(200).json({ messgae: "get all product", status: "success", data: product})
}

export {
    addProduct,
    getProduct
}
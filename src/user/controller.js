import { v4 as uuidv4 } from 'uuid'
import UserRepository from '../../repository/user_repository'
import RoleRepository from '../../repository/role_repository'
import ReceiptRepository from '../../repository/receipt_repository'
import ProductRepository from '../../repository/product_repository'
import UserProductReppository from '../../repository/user_product_repository'
import Users from '../../database/schema/user_schema'
import Receipt from '../../database/schema/receipt_schema'
import Product from '../../database/schema/product_schema'
import UserProducts from '../../database/schema/user_product_schema'
import HandleError from '../errorhandle/hanle_error'
import jwt from 'jsonwebtoken'

const userRepository = new UserRepository(Users)
const receiptRepository = new ReceiptRepository(Receipt)
const productRepopsitory = new ProductRepository(Product)
const userProductRepository = new UserProductReppository(UserProducts)

const registerUser = async(req, res)=> {
    try{
        const validateEmail = "^([a-zA-Z0-9_.]+@+[a-zA-Z0-9]+[./a-z]+[a-z])*$"
        
        if ( req.body.email.match(validateEmail) !== null ) {

            const checkEmailUser = await userRepository.checkEmail(req.body.email)

            if (checkEmailUser.length !== 0) {
                res.status(200).json({ message: "Duplicate email", status: "fail", data: ""})
            }else{

                const getRole = await RoleRepository.getRoleUser()

                const addUser = await userRepository.insertUser(req.body, uuidv4(), getRole.role_id)
                .then(response => response)
                
                addUser === "insert users success" 
                ? res.status(200).json({message: "register success", status: "success", data: ""})
                : HandleError.EchoError("register fail")
            }
        }else{
            throw new Error("invalid format email")
        }
    }catch(e) {
        res.status(400).json({message: e.message, status: "fail", data: ""})
    }
}

const login = async(req, res)=> {
    try{

        const validateEmail = "^([a-zA-Z0-9_.]+@+[a-zA-Z0-9]+[./a-z]+[a-z])*$"

        if ( req.body.email.match(validateEmail) !== null ) {
            
            const checkUser = await userRepository.findUserByEmailAndPassword(req.body.email, req.body.password)

            if (checkUser.length !== 0){
                
                let genToken = jwt.sign( 
                    { 
                        user_id: checkUser[0].dataValues.user_id, 
                        role_id: checkUser[0].dataValues.role_id
                    }, 
                    process.env.TOKEN_SECRET, 
                    { expiresIn: '3600s' }
                )
                
                // let decodeToken = jwt.verify(genToken, process.env.TOKEN_SECRET)

                res.status(200).json({message: "login success", status: "success", data: { accesstoken : genToken}})
            }else {
                res.status(200).json({ message: "Not found Users", status: "fail", data: ""})
            }
        }else{
            throw new Error("invalid format email")
        }
    }catch(e){
        res.status(400).json({message: e.message, status: "fail", data: ""})
    }
}

const sendSlip = async(req, res)=> {
    const receipt_id = uuidv4()
    const checkReceiptCode = await receiptRepository.findReceiptByCode(req.body.receipt_code)
    if (checkReceiptCode.length !== 0){
        res.status(200).json({message: "Duplicate receipt_code", status: "fail", data: ""})
    }else{
        await receiptRepository.insertReceipt(req.body, receipt_id)
        res.status(200).json({message: "sendSlip success", status: "success", data: ""})
    }
}

const exchange = async(req, res)=> {
    try{

        const user_product_id = uuidv4()

        const totalPoint = await receiptRepository.sumReceiptPoint(req.body.user_id)

        const productPoint = await productRepopsitory.findProductById(req.body.product_id).then(response => response.dataValues.product_point)

        const checkExchange = await userProductRepository.findUserProductByUserId(req.body.user_id)

        if (productPoint){

            if (checkExchange.length === 0){
            
                if (totalPoint > productPoint) {
        
                    await userProductRepository.insertUserProduct(req.body, user_product_id)
        
                    res.status(200).json({ message: "exchange success", status: "success", data: ""})
                }else{
                    res.status(200).json({ message: "point not enought exchange fail", status: "fail", data: ""})
                }
            }else {
                const calculateProductExchange = checkExchange.map( 
                    eachProduct => eachProduct.dataValues.product.dataValues.product_point
                )
                .reduce((accumulator, currentValue)=> accumulator + currentValue)

                if ((totalPoint - calculateProductExchange) > productPoint){
                    
                    await userProductRepository.insertUserProduct(req.body, user_product_id)

                    res.status(200).json({message: "exchange success", status: "success", data: ""})
                }else{
                    res.status(200).json({ message: "point not enought exchange fail", status: "fail", data: ""})
                }
            }
        }else{
            res.status(200).json({ message: "product not exists", status: "fail", data: ""})
        }
    }catch(e){
        res.status(400).json({message: e.message, status: "fail", data: ""})
    }
}

const userExchange = async(req, res) => {
    const checkExchange = await userProductRepository.findUserProductByUserId(res.locals.userDetail.user_id)
    const resultExchage = checkExchange.map(eachProduct => eachProduct.dataValues.product.dataValues)
    res.status(200).json({message: "get user exchage success", status: "success", data: resultExchage})
}


export {
    registerUser,
    login,
    sendSlip,
    exchange,
    userExchange
}
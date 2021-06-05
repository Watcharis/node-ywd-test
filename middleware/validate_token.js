import jwt from 'jsonwebtoken'
import Roles from '../database/schema/role_schema'

const authenticateToken = (req, res, next) => {
    try{
        if ( Object.keys(req.headers).includes('authorization') !== true){
            throw new Error("authentication fail not found key 'authorization'")
        }else{
            const token = req.headers.authorization

            if ( token.split(" ").length !== 2) {
                throw new Error("invalid format token")
            }else{
                const checkToken = jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET)
        
                if (checkToken.exp >= (Date.now()/ 1000)){
                    res.locals.userDetail = {
                        user_id : checkToken.user_id,
                        role_id : checkToken.role_id
                    }
                    return next()
                }else {
                    throw new Error("expire token")
                }
            }
        }
    }catch(e){
        res.status(401).json({message: e.message, status: "fail", data: ""})
    }
}

const rejectRoleUnderAdmin = async(req, res, next) => {
    try{
        const getRoleStatus = await Roles.findAll({ where : { role_id : res.locals.userDetail.role_id }})
        .then(response => response[0].dataValues.role_status)

        if (getRoleStatus >= 1){
            return next()
        }else{
            throw new Error("Permission Denine")
        }
    }catch(e){
        res.status(401).json({message: e.message, status: "fail", data: ""})
    }

}


export { 
    authenticateToken,
    rejectRoleUnderAdmin
}
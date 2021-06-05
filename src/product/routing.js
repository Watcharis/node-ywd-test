import express from 'express'
import * as serviceProducts from './controller'
import {  authenticateToken, rejectRoleUnderAdmin } from '../../middleware/validate_token'

const route = express.Router()

route.post('/', authenticateToken, rejectRoleUnderAdmin, serviceProducts.addProduct) // authen ด้วย token ของ admin เท่านั้น
route.get('/',authenticateToken, serviceProducts.getProduct)




export { route } 
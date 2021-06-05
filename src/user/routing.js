import express, { Router } from 'express'
import * as serviceUsers from './controller'
import {  authenticateToken, rejectRoleUnderAdmin } from '../../middleware/validate_token'

const route = express.Router()

route.post('/register', serviceUsers.registerUser)
route.post('/login', serviceUsers.login)
route.post('/slip',authenticateToken, serviceUsers.sendSlip)
route.post('/exchange',authenticateToken, serviceUsers.exchange)
route.get('/getexchange',authenticateToken, serviceUsers.userExchange)


export { route } 
import express, { Router } from 'express'
import * as serviceReceipt from './controller'
import {  authenticateToken, rejectRoleUnderAdmin } from '../../middleware/validate_token'

const route = express.Router()

route.get("/",authenticateToken, rejectRoleUnderAdmin, serviceReceipt.adminGetSlip) // authen ด้วย token ของ admin เท่านั้น
route.put("/",authenticateToken, rejectRoleUnderAdmin, serviceReceipt.adminGiveReceiptPoint) // authen ด้วย token ของ admin เท่านั้น
route.get("/totalpoint", authenticateToken, serviceReceipt.getTotalPointUser)

export { route }
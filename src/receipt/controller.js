import ReceiptRepository from '../../repository/receipt_repository'
import Receipt from '../../database/schema/receipt_schema'

const receiptRepository = new ReceiptRepository(Receipt)


const adminGetSlip = async(req, res) => {
    const allSlip = await receiptRepository.findAllReceiptByStatus()
    res.status(200).json({message: "get slip success", status: "success", data: allSlip})
}

const adminGiveReceiptPoint = async(req, res) => {
    const callReceipt = await receiptRepository.findReceiptById(req.body.receipt_id)
    if (callReceipt.dataValues.total_price < 100) {
        await receiptRepository.updateReceiptPoint(req.body.receipt_id, 30)
        res.status(200).json({ message: "give point success", status: "success", data: ""})
    } else {
        const point = (callReceipt.dataValues.total_price / 100) * 100
        await receiptRepository.updateReceiptPoint(req.body.receipt_id, point)
        res.status(200).json({ message: "give point success", status: "success", data: ""})
    }
}

const getTotalPointUser = async(req, res)=>{
    const totalPoint = await receiptRepository.sumReceiptPoint(res.locals.userDetail.user_id)
    res.status(200).json({message: 'get total point success', status: 'success', data: {total_point: totalPoint}})
}

export {
    adminGetSlip,
    adminGiveReceiptPoint,
    getTotalPointUser
}
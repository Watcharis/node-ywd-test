class ReceiptRepository {
    constructor(Receipt){
        this.recepit = Receipt
    }

    insertReceipt = async(data, receipt_id) => {
        await this.recepit.create({
            receipt_id: receipt_id,
            user_id: data.user_id,
            receipt_code: data.receipt_code,
            total_price: data.total_price
        })
        return "insert Receipt success"
    }

    findAllReceiptByStatus = async() => {
        return await this.recepit.findAll({where: { status_receipt : 0 }})
    }

    findReceiptById = async(receipt_id) => {
        return await this.recepit.findOne({where: { receipt_id : receipt_id }})
    }

    findReceiptByCode = async(receipt_code) => {
        return await this.recepit.findAll({where: { receipt_code : receipt_code }})
    }

    updateReceiptPoint = async(receipt_id, receipt_point) => {
        const updateReceipt = await this.recepit.update({receipt_point : receipt_point, status_receipt: 1}, {where: {receipt_id : receipt_id}})
        return updateReceipt[0] === 1 ? "update recepit success": "update recepit fail"
    }

    sumReceiptPoint = async(user_id)=> {
        const sum = await this.recepit.sum('receipt_point', {where: {user_id : user_id}})
        return sum
    }
}

export default ReceiptRepository
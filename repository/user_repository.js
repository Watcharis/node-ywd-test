class UserRepository {

    constructor(Users){
        this.users = Users
    }

    insertUser = async(data, user_id, role_id) => {
        await this.users.create({
            user_id: user_id,
            email : data.email,
            password : data.password,
            phone : data.phone,
            display_name : data.display_name,
            role_id : role_id
        })
        return "insert users success"
    }

    checkEmail = async(email) => {
        return await this.users.findAll({ where: { email: email }})
    }

    findUserByEmailAndPassword = async(email, password) => {
        return await this.users.findAll({ where: { email: email, password: password }})
    }
}


export default UserRepository
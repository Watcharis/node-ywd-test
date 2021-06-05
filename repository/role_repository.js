import Roles from "../database/schema/role_schema"

class RoleRepository {

    static getRoleUser = async() => {
        return await Roles.findOne({ attributes:["role_id"], where : {role_name: "user"}})
        .then(response => response.dataValues)
    }
}


export default RoleRepository
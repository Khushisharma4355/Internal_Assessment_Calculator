import Department from "../../model/Department.js";
export default{
    Query:{
        getDepartment:async()=> {
            return await Department.findAll()
    }
}
}
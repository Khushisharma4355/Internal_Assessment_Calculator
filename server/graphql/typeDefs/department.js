import {gql} from "graphql-tag";
const departmentTypeDef=gql`
  type Department{
    dep_id:String
    dept_name:String
  }
    extend type Query{
      getDepartment:[Department]
    }
`
export default departmentTypeDef;
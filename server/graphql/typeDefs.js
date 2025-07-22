import gql from "graphql-tag";
//graphql schema
export const typeDefs=gql`
           type Course{
           id:ID!
           name:String
           }
           type Student {
            id:ID!
            name:String!
            classs:String!
            courseId:Int
            course:Course
           }
           type Query{
             students:[Student]
             student(id:ID!):Student
             studentByEmail(email: String!): Student
             courses:[Course]
           }

`;
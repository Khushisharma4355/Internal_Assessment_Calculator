import Admin from "../../model/Admin.js";
import Teacher from "../../model/Teacher.js";
import Student from "../../model/Student.js";
import Course from "../../model/Course.js";
export default {
  Query: {
   getAdmin: async (_, { emp_id }) => {
  const admin = await Admin.findByPk(emp_id, {
    include: [{
      model: Teacher,
      attributes: ["emp_id", "emp_name", "emp_email", "emp_phone"]
    }]
  });

  if (!admin) return null;
  return admin;
}

  },
  Mutation:{
   addAdmin:async(_,args)=>{
    const admin=await Admin.create(args);
    return admin;
   }
  },

  Admin: {
  teacher: (parent) => parent.Teacher,
   teacherCount: async () => {
      return await Teacher.count(); // Efficient COUNT query
    },
    studentCount:async()=>{
       return await Student.count();
    },
    courseCount:async()=>{
      return await Course.count();
    }
}
  
};

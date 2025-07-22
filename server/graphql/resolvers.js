import Student from "../model/Student.js";
import Course from "../model/Course.js";

export const resolvers = {
    Query: {
        students: async () => await Student.findAll({ include: Course }),
        student: async (_, { id }) => await Student.findByPk(id, { include: Course }),
        studentByEmail: async (_, { email }) =>
            await Student.findOne({
                where: { email },
                include: Course,
            }),
        courses: async () => await Course.findAll()
    },
    Student: {
        course: async (parent) => await Course.findByPk(parent.courseId)
    }
};
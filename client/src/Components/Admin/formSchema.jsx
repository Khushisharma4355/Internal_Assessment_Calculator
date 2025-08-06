import { gql } from '@apollo/client';

// Define your GraphQL queries/mutations here or import them
export const ADD_TEACHER = gql`
  mutation AddTeacher(
  $emp_id: String!,
   $emp_name: String!,
    $emp_email: String!,
     $emp_phone: String!, 
     $dep_id: String!) {
    addTeacher(
    emp_id: $emp_id, 
    emp_name: $emp_name,
     emp_email: $emp_email, 
     emp_phone: $emp_phone, 
     dep_id: $dep_id) {
      emp_id
    }
  }
`;

export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    getDepartment {
      dep_id
      dept_name
    }
  }
`;

export const formSchemas = {
    teacher: {
        title: 'Add New Teacher',
        mutation: ADD_TEACHER,
        query: GET_DEPARTMENTS,
        fields: [
            { name: 'emp_id', label: 'Employee ID', type: 'text', required: true },
            { name: 'emp_name', label: 'Full Name', type: 'text', required: true },
            { name: 'emp_email', label: 'Email', type: 'email', required: true },
            { name: 'emp_phone', label: 'Phone', type: 'text', required: true },
            {
                name: 'dep_id',
                label: 'Department',
                type: 'select',
                select: true,
                required: true,
                optionsKey: 'departments',
            },
        ],
    },
    student: {
        title: 'Add New Student',
        // Add student mutation when available
        fields: [
            { name: 'student_id', label: 'Student ID', type: 'text', required: true },
            { name: 'full_name', label: 'Full Name', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'class', label: 'Class', type: 'text', required: true },
        ],
    },
};
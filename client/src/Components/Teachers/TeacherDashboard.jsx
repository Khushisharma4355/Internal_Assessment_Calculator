import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define your GraphQL query
const GET_TEACHER = gql`
  query GetTeacher($emp_id: String!) {
    getTeacher(emp_id: $emp_id) {
      emp_name
      emp_email
      emp_phone
      Subjects {
        subjectCode
        section_id
      }
    }
  }
`;

export const TeacherDashboard=() =>{
  const { loading, error, data } = useQuery(GET_TEACHER, {
    variables: { emp_id: "T001" }  // You can make this dynamic later
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Render the fetched data
  return (
    <div>
      <h1>Welcome, {data.getTeacher.emp_name}</h1>
      <p>Email: {data.getTeacher.emp_email}</p>
      <p>Phone: {data.getTeacher.emp_phone}</p>

      <h2>Subjects Assigned:</h2>
      <ul>
        {data.getTeacher.Subjects.map((sub, idx) => (
          <li key={idx}>
            {sub.subjectCode} - Section {sub.section_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

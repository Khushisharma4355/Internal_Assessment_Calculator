import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_TEACHER = gql`
  query GetTeacher($emp_id: String!) {
    getTeacher(emp_id: $emp_id) {
      emp_name
      emp_email
      emp_phone
    }
  }
`;

const GET_TEACHER_CLASSES = gql`
  query GetTeacherClasses($emp_id: String!) {
    getTeacherClasses(emp_id: $emp_id) {
      courseId
      courseName
      sem_id
      section_id
      subjectCode
      subjectName
    }
  }
`;

const GET_STUDENTS_BY_CLASS = gql`
  query GetStudentsByClass($courseId: ID!, $sem_id: ID!, $section_id: String!) {
    getStudentsByClass(courseId: $courseId, sem_id: $sem_id, section_id: $section_id) {
      id
      name
      rollno
    }
  }
`;

const BULK_ENTER_MARKS = gql`
  mutation BulkEnterMarks($marks: [MarksInput!]!) {
    bulkEnterMarks(marks: $marks) {
      success
      message
    }
  }
`;

export const TeacherDashboard = () => {
  const empId = 'T001'; // Replace dynamically
  const [selectedClass, setSelectedClass] = useState(null);
  const [marksMap, setMarksMap] = useState({});
  const [markType, setMarkType] = useState('MTE');

  const { loading: loadingTeacher, error: errorTeacher, data: dataTeacher } = useQuery(GET_TEACHER, {
    variables: { emp_id: empId },
  });

  const { loading: loadingClasses, error: errorClasses, data: dataClasses } = useQuery(GET_TEACHER_CLASSES, {
    variables: { emp_id: empId },
  });

  const { data: studentsData } = useQuery(GET_STUDENTS_BY_CLASS, {
    variables: {
      courseId: selectedClass?.courseId,
      sem_id: selectedClass?.sem_id,
      section_id: selectedClass?.section_id,
    },
    skip: !selectedClass,
  });

  const [bulkEnterMarks] = useMutation(BULK_ENTER_MARKS);

  const handleMarkChange = (studentId, value) => {
    setMarksMap((prev) => ({ ...prev, [studentId]: Number(value) }));
  };

  const handleSubmit = async () => {
    const marksArray = studentsData.getStudentsByClass.map((stu) => ({
      student_id: stu.id,
      subjectCode: selectedClass.subjectCode,
      marks: marksMap[stu.id] || 0,
      markType,
    }));

    try {
      const res = await bulkEnterMarks({ variables: { marks: marksArray } });
      alert(res.data.bulkEnterMarks.message);
    } catch {
      alert('Error submitting marks');
    }
  };

  if (loadingTeacher || loadingClasses) return <p>Loading...</p>;
if (errorTeacher || errorClasses) {
  console.error("Teacher Error:", errorTeacher);
  console.error("Class Error:", errorClasses);
  return <p>Error loading data: {errorTeacher?.message || errorClasses?.message}</p>;
}
  const teacher = dataTeacher.getTeacher;
  const classes = dataClasses.getTeacherClasses;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Welcome, {teacher.emp_name}</h1>
      <p>Email: {teacher.emp_email}</p>
      <p>Phone: {teacher.emp_phone}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Your Assigned Classes:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {classes.map((cls, idx) => (
          <div
            key={idx}
            className={`border rounded-lg shadow-md p-4 hover:shadow-xl cursor-pointer ${
              selectedClass === cls ? 'bg-blue-100' : ''
            }`}
            onClick={() => setSelectedClass(cls)}
          >
            <h3 className="text-lg font-bold">{cls.subjectName}</h3>
            <p>Course: {cls.courseName}</p>
            <p>Semester: {cls.sem_id}</p>
            <p>Section: {cls.section_id}</p>
            <p>Subject Code: {cls.subjectCode}</p>
          </div>
        ))}
      </div>

      {selectedClass && studentsData?.getStudentsByClass?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Enter Marks for {selectedClass.subjectName}</h3>

          <label className="block mb-2">
            Select Mark Type:
            <select
              className="border p-1 ml-2"
              value={markType}
              onChange={(e) => setMarkType(e.target.value)}
            >
              <option value="MTE">MTE</option>
              <option value="Class_test_1">Class Test 1</option>
              <option value="Class_test_2">Class Test 2</option>
              <option value="ETE">ETE</option>
              <option value="attendance">Attendance</option>
            </select>
          </label>

          <table className="w-full mt-4 border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2 py-1">Roll No</th>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Marks ({markType})</th>
              </tr>
            </thead>
            <tbody>
              {studentsData.getStudentsByClass.map((stu) => (
                <tr key={stu.id}>
                  <td className="border px-2 py-1">{stu.rollno}</td>
                  <td className="border px-2 py-1">{stu.name}</td>
                  <td className="border px-2 py-1">
                    <input
                      type="number"
                      className="border p-1 w-20"
                      value={marksMap[stu.id] || ''}
                      onChange={(e) => handleMarkChange(stu.id, e.target.value)}
                      min="0"
                      max="100"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit Marks
          </button>
        </div>
      )}
    </div>
  );
};

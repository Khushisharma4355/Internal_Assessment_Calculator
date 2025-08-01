import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// ==================== GraphQL Queries and Mutations ====================

// Query to get teacher details
const GET_TEACHER = gql`
  query GetTeacher($emp_id: ID!) {
    getTeacher(emp_id: $emp_id) {
      emp_name
      emp_email
      emp_phone
    }
  }
`;

// Query to get classes assigned to the teacher
const GET_TEACHER_CLASSES = gql`
  query GetTeacherClasses($emp_id: ID!) {
    getTeacherClasses(emp_id: $emp_id) {
      courseId
      courseName
      semester_id
      section_id
      subjectCode
      subjectName
    }
  }
`;

// Query to get students by class
const GET_STUDENTS_BY_CLASS = gql`
  query GetStudentsByClass($courseId: ID!, $semester_id: ID!, $section_id: String!) {
    getStudentsByClass(courseId: $courseId, sem_id: $semester_id, section_id: $section_id) {
      registrationNo
      name
    }
  }
`;

// Mutation to enter marks in bulk
const BULK_ENTER_MARKS = gql`
  mutation BulkEnterMarks($marks: [MarksInput!]!) {
    bulkEnterMarks(marks: $marks) {
      success
      message
    }
  }
`;

// ==================== Main Component ====================

export const TeacherDashboard = () => {
  const empId = "T001"; // Replace or get dynamically as needed

  // States
  const [selectedClass, setSelectedClass] = useState(null);
  const [marksMap, setMarksMap] = useState({});
  const [markType, setMarkType] = useState('MTE');

  // Fetch teacher info
  const {
    loading: loadingTeacher,
    error: errorTeacher,
    data: dataTeacher,
  } = useQuery(GET_TEACHER, {
    variables: { emp_id: empId },
    fetchPolicy: 'cache-and-network',
  });

  // Fetch teacher's assigned classes
  const {
    loading: loadingClasses,
    error: errorClasses,
    data: dataClasses,
  } = useQuery(GET_TEACHER_CLASSES, {
    variables: { emp_id: empId },
    fetchPolicy: 'cache-and-network',
  });

  // Fetch students only when a class is selected
  const {
    loading: loadingStudents,
    error: errorStudents,
    data: studentsData,
  } = useQuery(GET_STUDENTS_BY_CLASS, {
    variables: {
      courseId: selectedClass?.courseId,
      sem_id: selectedClass?.semester_id,
      section_id: selectedClass?.section_id,
    },
    skip: !selectedClass,
    fetchPolicy: 'cache-and-network',
  });

  // Mutation for bulk entering marks
  const [bulkEnterMarks, { loading: loadingSubmit }] = useMutation(BULK_ENTER_MARKS);

  // Handle mark input changes
  const handleMarkChange = (registrationNo, value) => {
    setMarksMap((prev) => ({
      ...prev,
      [registrationNo]: value === '' ? '' : Number(value),
    }));
  };

  // Submit marks handler
  const handleSubmit = async () => {
    if (!studentsData?.getStudentsByClass?.length) {
      alert('No students found to submit marks for.');
      return;
    }

    const marksArray = studentsData.getStudentsByClass.map((stu) => ({
      registrationNo: stu.registrationNo,
      subjectCode: selectedClass.subjectCode,
      marks: marksMap[stu.registrationNo] === '' || marksMap[stu.registrationNo] === undefined
        ? 0
        : marksMap[stu.registrationNo],
      markType,
    }));

    try {
      const res = await bulkEnterMarks({ variables: { marks: marksArray } });
      alert(res.data.bulkEnterMarks.message);
      // Optional: Clear marks after submission
      setMarksMap({});
    } catch (error) {
      console.error('Submit Marks Error:', error);
      alert('Error submitting marks');
    }
  };

  // Loading and error states
  if (loadingTeacher || loadingClasses) return <p>Loading teacher info and classes...</p>;
  if (errorTeacher || errorClasses)
    return (
      <p>
        Error loading data: {errorTeacher?.message || errorClasses?.message}
      </p>
    );

  if (!dataTeacher?.getTeacher)
    return <p className="text-red-600">Teacher data not found. Check emp_id.</p>;

  const teacher = dataTeacher.getTeacher;
  const classes = dataClasses?.getTeacherClasses ?? [];

  return (
    <div className="p-6">
      {/* Teacher Info */}
      <h1 className="text-3xl font-bold mb-2 text-blue-800">
        Welcome, {teacher.emp_name}
      </h1>
      <p className="text-gray-700">Email: {teacher.emp_email}</p>
      <p className="text-gray-700">Phone: {teacher.emp_phone}</p>

      {/* Assigned Classes */}
      <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-800">
        Your Assigned Classes
      </h2>

      {classes.length === 0 ? (
        <p className="text-gray-600 italic">No classes assigned to you yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {classes.map((cls, idx) => {
            const isSelected =
              selectedClass?.subjectCode === cls.subjectCode &&
              selectedClass?.section_id === cls.section_id;

            return (
              <div
                key={idx}
                className={`border rounded-lg shadow-md p-4 cursor-pointer transition duration-150 ${
                  isSelected ? 'bg-blue-100 border-blue-600' : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedClass(cls)}
              >
                <h3 className="text-lg font-bold text-blue-700">
                  {cls.subjectName}
                </h3>
                <p>
                  <strong>Course:</strong> {cls.courseName}
                </p>
                <p>
                  <strong>Semester:</strong> {cls.semester_id}
                </p>
                <p>
                  <strong>Section:</strong> {cls.section_id}
                </p>
                <p>
                  <strong>Code:</strong> {cls.subjectCode}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Students List and Marks Entry */}
      {selectedClass && (
        <>
          {loadingStudents && <p>Loading students...</p>}
          {errorStudents && (
            <p className="text-red-600">Error loading students: {errorStudents.message}</p>
          )}

          {studentsData?.getStudentsByClass?.length > 0 ? (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">
                Enter Marks for {selectedClass.subjectName}
              </h3>

              {/* Mark type selector */}
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

              <table className="w-full mt-4 border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-2 py-1">Roll No</th>
                    <th className="border px-2 py-1">Name</th>
                    <th className="border px-2 py-1">Marks ({markType})</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsData.getStudentsByClass.map((stu) => (
                    <tr key={stu.registrationNo}>
                      <td className="border px-2 py-1">{stu.registrationNo}</td>
                      <td className="border px-2 py-1">{stu.name}</td>
                      <td className="border px-2 py-1">
                        <input
                          type="number"
                          className="border p-1 w-20"
                          value={marksMap[stu.registrationNo] ?? ''}
                          onChange={(e) =>
                            handleMarkChange(stu.registrationNo, e.target.value)
                          }
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
                disabled={loadingSubmit}
              >
                {loadingSubmit ? 'Submitting...' : 'Submit Marks'}
              </button>
            </div>
          ) : (
            !loadingStudents && (
              <p className="text-gray-600 italic mt-4">No students found in this class.</p>
            )
          )}
        </>
      )}
    </div>
  );
};

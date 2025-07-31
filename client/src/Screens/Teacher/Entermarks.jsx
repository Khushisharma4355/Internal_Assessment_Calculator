import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

// GraphQL Queries & Mutations
const GET_CLASSES = gql`
  query {
    courses {
      courseId
      courseName
    }
    semesters {
      sem_id
    }
    sections {
      section_id
      section_name
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

export default function EnterMarks() {
  const [courseId, setCourseId] = useState("");
  const [sem_id, setSem_id] = useState("");
  const [section_id, setSection_id] = useState("");
  const [students, setStudents] = useState([]);
  const [marksMap, setMarksMap] = useState({});
  const [markType, setMarkType] = useState("MTE");
  const [subjectCode] = useState("SUB001"); // change to dynamic later

  const { data: classesData } = useQuery(GET_CLASSES);

  const { data: studentsData } = useQuery(GET_STUDENTS_BY_CLASS, {
    variables: { courseId, sem_id, section_id },
    skip: !courseId || !sem_id || !section_id,
  });

  useEffect(() => {
    if (studentsData?.getStudentsByClass) {
      setStudents(studentsData.getStudentsByClass);
      setMarksMap({});
    }
  }, [studentsData]);

  const [bulkEnterMarks] = useMutation(BULK_ENTER_MARKS);

  const handleMarkChange = (studentId, value) => {
    setMarksMap((prev) => ({ ...prev, [studentId]: Number(value) }));
  };

  const handleSubmit = async () => {
    const marksArray = students.map((stu) => ({
      student_id: stu.id,
      subjectCode: subjectCode,
      marks: marksMap[stu.id] || 0,
      markType: markType,
    }));

    try {
      const res = await bulkEnterMarks({ variables: { marks: marksArray } });
      alert(res.data.bulkEnterMarks.message);
    } catch (err) {
      alert("Error submitting marks",err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Enter Marks for a Class</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <select onChange={(e) => setCourseId(e.target.value)} value={courseId}>
          <option value="">Select Course</option>
          {classesData?.courses.map((c) => (
            <option key={c.courseId} value={c.courseId}>{c.courseName}</option>
          ))}
        </select>

        <select onChange={(e) => setSem_id(e.target.value)} value={sem_id}>
          <option value="">Select Semester</option>
          {classesData?.semesters.map((s) => (
            <option key={s.sem_id} value={s.sem_id}>{s.sem_name}</option>
          ))}
        </select>

        <select onChange={(e) => setSection_id(e.target.value)} value={section_id}>
          <option value="">Select Section</option>
          {classesData?.sections.map((sec) => (
            <option key={sec.section_id} value={sec.section_id}>{sec.section_name}</option>
          ))}
        </select>

        <select onChange={(e) => setMarkType(e.target.value)} value={markType}>
          <option value="MTE">MTE</option>
          <option value="Class_test_1">Class Test 1</option>
          <option value="Class_test_2">Class Test 2</option>
          <option value="ETE">ETE</option>
          <option value="attendance">Attendance</option>
        </select>
      </div>

      {students.length > 0 && (
        <>
          <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "1rem" }}>
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Marks ({markType})</th>
              </tr>
            </thead>
            <tbody>
              {students.map((stu) => (
                <tr key={stu.id}>
                  <td>{stu.rollno}</td>
                  <td>{stu.name}</td>
                  <td>
                    <input
                      type="number"
                      value={marksMap[stu.id] || ""}
                      onChange={(e) => handleMarkChange(stu.id, e.target.value)}
                      min="0"
                      max="100"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={handleSubmit} style={{ marginTop: "1rem", padding: "10px 20px" }}>
            Submit Marks
          </button>
        </>
      )}
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import { useQuery, useMutation, gql } from "@apollo/client";

// // GraphQL Queries & Mutations
// const GET_CLASSES = gql`
//   query {
//     courses {
//       courseId
//       courseName
//     }
//     semesters {
//       semester_id
//       semester_Name
//     }
//     sections {
//       section_id
//       section_name
//     }
//   }
// `;

// const GET_STUDENTS_BY_CLASS = gql`
//   query GetStudentsByClass($courseId: ID!, $semester_id: ID!, $section_id: String!) {
//     getStudentsByClass(courseId: $courseId, semester_id: $semester_id, section_id: $section_id) {
//       registrationNo
//       name
//     }
//   }
// `;

// const BULK_ENTER_MARKS = gql`
//   mutation BulkEnterMarks($marks: [MarksInput!]!) {
//     bulkEnterMarks(marks: $marks) {
//       success
//       message
//     }
//   }
// `;

// export default function EnterMarks() {
//   const [courseId, setCourseId] = useState("");
//   const [semester_id, setSemester_id] = useState("");
//   const [section_id, setSection_id] = useState("");
//   const [students, setStudents] = useState([]);
//   const [marksMap, setMarksMap] = useState({});
//   const [markType, setMarkType] = useState("MTE");
//   const [subjectCode] = useState("SUB001"); // hardcoded for now
//   const [error, setError] = useState(null);

//   const { loading: classesLoading, error: classesError, data: classesData } = useQuery(GET_CLASSES);

//   const { loading: studentsLoading, error: studentsError, data: studentsData } = useQuery(GET_STUDENTS_BY_CLASS, {
//     variables: { courseId, semester_id, section_id },
//     skip: !courseId || !semester_id || !section_id,
//     onError: (err) => setError(err.message)
//   });

//   useEffect(() => {
//     if (studentsData?.getStudentsByClass) {
//       setStudents(studentsData.getStudentsByClass);
//       const initialMarks = {};
//       studentsData.getStudentsByClass.forEach(student => {
//         initialMarks[student.registrationNo] = "";
//       });
//       setMarksMap(initialMarks);
//     }
//   }, [studentsData]);

//   const [bulkEnterMarks, { loading: submitLoading }] = useMutation(BULK_ENTER_MARKS, {
//     onError: (err) => setError(err.message)
//   });

//   const handleMarkChange = (registrationNo, value) => {
//     const numericValue = value === "" ? "" : Number(value);
//     setMarksMap(prev => ({ ...prev, [registrationNo]: numericValue }));
//   };

//   const handleSubmit = async () => {
//     setError(null);

//     const invalidStudents = students.filter(student => {
//       const mark = marksMap[student.registrationNo];
//       return mark === "" || isNaN(mark) || mark < 0 || mark > 100;
//     });

//     if (invalidStudents.length > 0) {
//       setError("Please enter valid marks (0-100) for all students.");
//       return;
//     }

//     const marksArray = students.map(student => ({
//       registrationNo: student.registrationNo,
//       subjectCode,
//       marks: marksMap[student.registrationNo] || 0,
//       markType
//     }));

//     try {
//       const { data } = await bulkEnterMarks({ variables: { marks: marksArray } });
//       if (data?.bulkEnterMarks?.success) {
//         alert("Marks submitted successfully!");
//         setMarksMap({});
//       } else {
//         setError(data?.bulkEnterMarks?.message || "Submission failed");
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   if (classesLoading) return <div>Loading class data...</div>;
//   if (classesError) return <div>Error loading class data: {classesError.message}</div>;

//   return (
//     <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
//       <h2 style={{ marginBottom: "20px" }}>Enter Marks for a Class</h2>

//       {error && <div style={{ color: "red", marginBottom: "15px" }}>Error: {error}</div>}

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "15px", marginBottom: "20px" }}>
//         <div>
//           <label>Course</label>
//           <select onChange={(e) => setCourseId(e.target.value)} value={courseId} style={{ width: "100%", padding: "8px" }}>
//             <option value="">Select Course</option>
//             {classesData?.courses?.map((c) => (
//               <option key={c.courseId} value={c.courseId}>{c.courseName}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Semester</label>
//           <select onChange={(e) => setSemester_id(e.target.value)} value={semester_id} style={{ width: "100%", padding: "8px" }}>
//             <option value="">Select Semester</option>
//             {classesData?.semesters?.map((s) => (
//               <option key={s.semester_id} value={s.semester_id}>
//                 {s.semester_Name || `Semester ${s.semester_id}`}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Section</label>
//           <select onChange={(e) => setSection_id(e.target.value)} value={section_id} style={{ width: "100%", padding: "8px" }}>
//             <option value="">Select Section</option>
//             {classesData?.sections?.map((sec) => (
//               <option key={sec.section_id} value={sec.section_id}>
//                 {sec.section_name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Mark Type</label>
//           <select onChange={(e) => setMarkType(e.target.value)} value={markType} style={{ width: "100%", padding: "8px" }}>
//             <option value="MTE">MTE</option>
//             <option value="Class_test_1">Class Test 1</option>
//             <option value="Class_test_2">Class Test 2</option>
//             <option value="ETE">ETE</option>
//             <option value="attendance">Attendance</option>
//           </select>
//         </div>
//       </div>

//       {studentsLoading ? (
//         <div>Loading students...</div>
//       ) : studentsError ? (
//         <div style={{ color: "red" }}>Error loading students: {studentsError.message}</div>
//       ) : students.length > 0 ? (
//         <>
//           <div style={{ overflowX: "auto" }}>
//             <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px", boxShadow: "0 2px 3px rgba(0,0,0,0.1)" }}>
//               <thead>
//                 <tr style={{ backgroundColor: "#f5f5f5" }}>
//                   <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Reg. No</th>
//                   <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Name</th>
//                   <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Marks ({markType})</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((stu) => (
//                   <tr key={stu.registrationNo} style={{ borderBottom: "1px solid #eee" }}>
//                     <td style={{ padding: "12px" }}>{stu.registrationNo}</td>
//                     <td style={{ padding: "12px" }}>{stu.name}</td>
//                     <td style={{ padding: "12px" }}>
//                       <input
//                         type="number"
//                         value={marksMap[stu.registrationNo] ?? ""}
//                         onChange={(e) => handleMarkChange(stu.registrationNo, e.target.value)}
//                         min="0"
//                         max="100"
//                         style={{ padding: "8px", width: "80px", border: "1px solid #ddd", borderRadius: "4px" }}
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <button onClick={handleSubmit} disabled={submitLoading} style={{
//             marginTop: "20px",
//             padding: "10px 20px",
//             backgroundColor: "#4CAF50",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//             fontSize: "16px",
//             opacity: submitLoading ? 0.7 : 1
//           }}>
//             {submitLoading ? "Submitting..." : "Submit Marks"}
//           </button>
//         </>
//       ) : (
//         courseId && semester_id && section_id && (
//           <div style={{ marginTop: "20px", color: "#666" }}>
//             No students found for the selected class
//           </div>
//         )
//       )}
//     </div>
//   );
// }

// File: src/Components/Pdf/PdfDownload.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const GeneratePDF = (assessmentData) => {
  if (!assessmentData || assessmentData.length === 0) {
    alert("No data available to generate PDF.");
    return;
  }

  const doc = new jsPDF();

  // Title
  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.text("Student Assessment Report", 60, 15);

  // Student details (from the first entry)
  const student = assessmentData[0]?.student;
  
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  doc.text(`Student Name: ${student?.student_name ?? "-"}`, 14, 30);
  doc.text(`Registration No: ${student?.registrationNo ?? "-"}`, 14, 38);

  // Table rows from assessment data
  const tableData = assessmentData.map((entry, index) => [
    index + 1,
    entry.subjectCode ?? "-",
    entry.subject?.subjectName ?? "-",
    entry.Class_test_1 ?? "-",
    entry.Class_test_2 ?? "-",
    entry.MTE ?? "-",
    entry.ETE ?? "-",
    entry.attendance ?? "-"
  ]);

  // Table headers and data
  autoTable(doc,{
    startY: 50,
    head: [["#", "Subject Code", "Subject Name", "CT1", "CT2", "MTE", "ETE", "Attendance"]],
    body: tableData,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [29, 53, 87] }, // Optional styling
  });

  // Save the file
  console.log("PDF generated successfully.");
  doc.save("assessment_report.pdf");
};

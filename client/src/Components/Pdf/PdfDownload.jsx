// File: src/Components/Pdf/PdfDownload.js
import jsPDF from "jspdf";
import "jspdf-autotable";

export const GeneratePDF = (assessmentData) => {
  const doc = new jsPDF();

  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.text("Student Report Card", 70, 10);

  const student = assessmentData[0]?.Student;
  doc.setFontSize(12);
  doc.text(`Student Name: ${student?.name ?? "-"}`, 14, 20);
  doc.text(`Registration No: ${student?.registrationNo ?? "-"}`, 14, 28);

  const tableData = assessmentData.map((a, index) => [
    index + 1,
    a.subjectCode,
    a.Teacher?.name ?? "-",
    a.Class_test_1 ?? "-",
    a.Class_test_2 ?? "-",
    a.MTE ?? "-",
    a.ETE ?? "-",
    a.attendance ?? "-"
  ]);

  doc.autoTable({
    startY: 40,
    head: [["#", "Subject", "Teacher", "CT1", "CT2", "MTE", "ETE", "Attendance"]],
    body: tableData,
  });

  doc.save("report_card.pdf");
};

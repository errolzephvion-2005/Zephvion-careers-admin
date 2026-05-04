import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Application } from '@/shared/types';

export const exportToExcel = async (data: Application[], format: 'csv' | 'xlsx') => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Applications', {
    views: [{ state: 'frozen', ySplit: 4 }] // Freeze the top 4 rows
  });

  // Define column structure
  const colDefs = [
    { header: 'Applied Date', key: 'created_at', width: 25 },
    { header: 'Candidate Name', key: 'candidate_name', width: 25 },
    { header: 'Candidate Email', key: 'candidate_email', width: 30 },
    { header: 'Candidate Contact', key: 'candidate_contact', width: 20 },
    { header: 'LinkedIn', key: 'candidate_linkedin', width: 35 },
    { header: 'GitHub', key: 'candidate_github', width: 35 },
    { header: 'App Status', key: 'status', width: 15 },
    { header: 'Motivation', key: 'motivation', width: 40 },
    { header: 'Resume URL', key: 'resume_url', width: 40 },
    { header: 'Cover Letter URL', key: 'cover_letter_url', width: 40 },
    { header: 'Job Title', key: 'job_title', width: 25 },
    { header: 'Job Ref Code', key: 'job_ref', width: 20 },
    { header: 'Service Line', key: 'job_service', width: 20 },
    { header: 'Category', key: 'job_category', width: 20 },
    { header: 'Job Type', key: 'job_type', width: 15 },
    { header: 'Location', key: 'job_location', width: 20 },
    { header: 'Salary', key: 'job_salary', width: 20 },
    { header: 'Experience Req', key: 'job_exp', width: 25 },
    { header: 'Edu Requirements', key: 'job_edu', width: 30 },
    { header: 'Responsibilities', key: 'job_resp', width: 50 },
    { header: 'Technical Req', key: 'job_tech', width: 50 },
    { header: 'Preferred Skills', key: 'job_skills', width: 50 },
    { header: 'Trending', key: 'job_trending', width: 12 },
    { header: 'Job Active', key: 'job_active', width: 12 },
  ];

  // Helper to get column letter (A, B, ..., Z, AA, AB, ...)
  const getColLetter = (n: number) => {
    let letter = '', temp = n;
    while (temp > 0) {
      let mod = (temp - 1) % 26;
      letter = String.fromCharCode(65 + mod) + letter;
      temp = Math.floor((temp - mod) / 26);
    }
    return letter;
  };

  const totalCols = colDefs.length;
  const lastColLetter = getColLetter(totalCols);

  // 1. SET HEADERS BASED ON FORMAT
  if (format === 'xlsx') {
    // Premium XLSX Layout with Titles
    const titleRow = worksheet.getRow(1);
    titleRow.height = 40;
    worksheet.mergeCells(`A1:${lastColLetter}1`);
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'ZEPHVION CAREERS - APPLICATIONS REPORT';
    titleCell.font = { size: 22, bold: true, color: { argb: 'FF000000' }, name: 'Arial' };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF5F5F5' } };

    const countRow = worksheet.getRow(2);
    countRow.height = 25;
    worksheet.mergeCells(`A2:${lastColLetter}2`);
    const countCell = worksheet.getCell('A2');
    countCell.value = `Total Record Count: ${data.length} Applications Found`;
    countCell.font = { size: 14, italic: true, bold: true, color: { argb: 'FF555555' } };
    countCell.alignment = { horizontal: 'center', vertical: 'middle' };
    countCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF5F5F5' } };

    worksheet.getRow(3).height = 10;

    // Table Headers (Row 4 for XLSX)
    const headerRow = worksheet.getRow(4);
    headerRow.height = 35;
    colDefs.forEach((col, idx) => {
      const cell = headerRow.getCell(idx + 1);
      cell.value = col.header.toUpperCase();
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF000000' } };
      cell.font = { color: { argb: 'FFFFFFFF' }, bold: true, size: 11, name: 'Courier New' };
      cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cell.border = {
        left: { style: 'thin', color: { argb: 'FFFFFFFF' } },
        right: { style: 'thin', color: { argb: 'FFFFFFFF' } },
        top: { style: 'thin', color: { argb: 'FFFFFFFF' } },
        bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } }
      };
      worksheet.getColumn(idx + 1).width = col.width;
    });
  } else {
    // Plain CSV Layout - Start immediately with headers at Row 1
    const headerRow = worksheet.getRow(1);
    colDefs.forEach((col, idx) => {
      headerRow.getCell(idx + 1).value = col.header;
      worksheet.getColumn(idx + 1).key = col.key;
    });
  }

  // 5. DATA ROWS
  data.forEach((app) => {
    const rowData = [
      new Date(app.created_at).toLocaleString(),
      app.candidates?.full_name || 'N/A',
      app.candidates?.email || 'N/A',
      app.candidates?.contact_number || 'N/A',
      app.candidates?.linkedin || 'N/A',
      app.candidates?.github || 'N/A',
      app.status || 'Applied',
      app.motivation || 'N/A',
      app.resume_url || 'N/A',
      app.cover_letter_url || 'N/A',
      app.jobs?.job_title || 'N/A',
      app.jobs?.job_reference_code || 'N/A',
      app.jobs?.service_line || 'N/A',
      app.jobs?.category || 'N/A',
      app.jobs?.job_type || 'N/A',
      app.jobs?.location || 'N/A',
      app.jobs?.salary || 'N/A',
      app.jobs?.work_experience || 'N/A',
      app.jobs?.educational_requirements || 'N/A',
      app.jobs?.responsibilities || 'N/A',
      app.jobs?.technical_requirements || 'N/A',
      app.jobs?.preferred_skills || 'N/A',
      app.jobs?.is_trending ? 'YES' : 'NO',
      app.jobs?.is_active ? 'YES' : 'NO',
    ];

    const row = worksheet.addRow(rowData);
    if (format === 'xlsx') {
      row.height = 25;
      row.eachCell((cell) => {
        cell.alignment = { vertical: 'middle', wrapText: true, horizontal: 'left' };
        cell.font = { size: 10, name: 'Arial' };
        cell.border = {
          bottom: { style: 'thin', color: { argb: 'FFEEEEEE' } },
          right: { style: 'thin', color: { argb: 'FFEEEEEE' } }
        };
      });
    }
  });

  // 6. EXPORT
  const fileName = `Zephvion_Report_${new Date().toISOString().split('T')[0]}`;
  
  if (format === 'xlsx') {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${fileName}.xlsx`);
  } else {
    const buffer = await workbook.csv.writeBuffer();
    const blob = new Blob([buffer], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `${fileName}.csv`);
  }
};

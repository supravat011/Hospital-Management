import jsPDF from 'jspdf';

export const generateInvoicePDF = (invoice: any) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(21, 85, 141);
    doc.text('EHR NOW', 20, 20);

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('INVOICE', 20, 35);

    // Invoice Details
    doc.setFontSize(10);
    doc.text(`Invoice ID: ${invoice.id}`, 20, 50);
    doc.text(`Date: ${invoice.date}`, 20, 57);
    doc.text(`Booked on: ${invoice.bookedOn}`, 20, 64);

    // Doctor Details
    doc.setFontSize(12);
    doc.text('Doctor Information:', 20, 80);
    doc.setFontSize(10);
    doc.text(`Name: ${invoice.doctor}`, 20, 88);
    doc.text(`Specialty: ${invoice.specialty || 'General Medicine'}`, 20, 95);

    // Patient Details
    doc.setFontSize(12);
    doc.text('Patient Information:', 20, 110);
    doc.setFontSize(10);
    doc.text('Name: [Patient Name]', 20, 118);

    // Amount
    doc.setFontSize(14);
    doc.text('Amount:', 20, 140);
    doc.setFontSize(16);
    doc.setTextColor(21, 85, 141);
    doc.text(invoice.amount, 60, 140);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for choosing EHR NOW', 20, 280);
    doc.text('For any queries, contact: support@ehrnow.com', 20, 285);

    // Save
    doc.save(`invoice-${invoice.id}.pdf`);
};

export const generatePrescriptionPDF = (prescription: any) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(21, 85, 141);
    doc.text('EHR NOW', 20, 20);

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('PRESCRIPTION', 20, 35);

    // Date
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);

    // Doctor Details
    doc.setFontSize(12);
    doc.text('Prescribed by:', 20, 65);
    doc.setFontSize(10);
    doc.text(prescription.doctor || 'Dr. [Doctor Name]', 20, 73);

    // Patient Details
    doc.setFontSize(12);
    doc.text('Patient:', 20, 88);
    doc.setFontSize(10);
    doc.text(prescription.patient || '[Patient Name]', 20, 96);

    // Prescription Details
    doc.setFontSize(12);
    doc.text('Prescription:', 20, 111);
    doc.setFontSize(10);

    const prescriptionText = prescription.details || 'Prescription details will be added here';
    const splitText = doc.splitTextToSize(prescriptionText, 170);
    doc.text(splitText, 20, 119);

    // Instructions
    doc.setFontSize(10);
    doc.setTextColor(200, 0, 0);
    doc.text('Note: This is a computer-generated prescription.', 20, 260);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('EHR NOW - Digital Healthcare Platform', 20, 280);

    // Save
    doc.save(`prescription-${Date.now()}.pdf`);
};

export const generateMedicalRecordPDF = (record: any) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(21, 85, 141);
    doc.text('EHR NOW', 20, 20);

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('MEDICAL RECORD', 20, 35);

    // Record Details
    doc.setFontSize(10);
    doc.text(`Record ID: ${record.id}`, 20, 50);
    doc.text(`Record Name: ${record.name}`, 20, 57);
    doc.text(`Date: ${record.date}`, 20, 64);

    // Patient
    doc.setFontSize(12);
    doc.text('Patient:', 20, 80);
    doc.setFontSize(10);
    doc.text(record.for?.name || '[Patient Name]', 20, 88);

    // Comments
    if (record.comments) {
        doc.setFontSize(12);
        doc.text('Comments:', 20, 103);
        doc.setFontSize(10);
        doc.text(record.comments, 20, 111);
    }

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('This is a digitally generated medical record', 20, 280);

    // Save
    doc.save(`medical-record-${record.id}.pdf`);
};

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateVisitPDF = async (visit, patient) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });
            const fileName = `visit-${visit.visitId}.pdf`;
            const filePath = path.join(__dirname, '../uploads/pdfs', fileName);

            // Ensure directory exists
            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);

            // Header
            doc.fontSize(20).text('EHR NOW - Visit Summary', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text('_'.repeat(70), { align: 'center' });
            doc.moveDown(2);

            // Patient Information
            doc.fontSize(14).text('Patient Information', { underline: true });
            doc.moveDown(0.5);
            doc.fontSize(11);
            doc.text(`Patient ID: ${patient.patientId}`);
            doc.text(`Name: ${patient.name}`);
            doc.text(`Age: ${patient.age} years`);
            doc.text(`Blood Group: ${patient.bloodGroup}`);
            doc.moveDown(1.5);

            // Visit Information
            doc.fontSize(14).text('Visit Information', { underline: true });
            doc.moveDown(0.5);
            doc.fontSize(11);
            doc.text(`Visit ID: ${visit.visitId}`);
            doc.text(`Date: ${new Date(visit.visitDate).toLocaleDateString()}`);
            doc.text(`Time: ${new Date(visit.visitDate).toLocaleTimeString()}`);
            doc.text(`Doctor: ${visit.doctorName}`);
            doc.text(`Hospital: ${visit.hospitalName}`);
            doc.moveDown(1.5);

            // Medical Details
            doc.fontSize(14).text('Medical Details', { underline: true });
            doc.moveDown(0.5);
            doc.fontSize(11);
            doc.text(`Diagnosis: ${visit.diagnosis}`);
            doc.moveDown(0.5);

            if (visit.tablets && visit.tablets.length > 0) {
                doc.text('Prescribed Tablets:');
                visit.tablets.forEach((tablet, index) => {
                    doc.text(`  ${index + 1}. ${tablet}`);
                });
                doc.moveDown(0.5);
            }

            if (visit.tabletTimings) {
                doc.text(`Tablet Timings: ${visit.tabletTimings}`);
            }

            if (visit.foodInstructions) {
                doc.text(`Food Instructions: ${visit.foodInstructions}`);
            }

            doc.moveDown(1.5);

            // Vitals
            doc.fontSize(14).text('Vital Signs', { underline: true });
            doc.moveDown(0.5);
            doc.fontSize(11);
            if (visit.bloodPressure) {
                doc.text(`Blood Pressure: ${visit.bloodPressure}`);
            }
            if (visit.spo2) {
                doc.text(`SpO2: ${visit.spo2}%`);
            }
            if (visit.heartRate) {
                doc.text(`Heart Rate: ${visit.heartRate} bpm`);
            }

            // Footer
            doc.moveDown(3);
            doc.fontSize(10).text('_'.repeat(70), { align: 'center' });
            doc.text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });
            doc.text('EHR NOW - Electronic Health Records Management', { align: 'center' });

            doc.end();

            stream.on('finish', () => {
                resolve(filePath);
            });

            stream.on('error', (error) => {
                reject(error);
            });

        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { generateVisitPDF };

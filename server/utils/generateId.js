const generatePatientId = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0');

    return `OPID-${year}${month}${day}-${random}`;
};

const generateDoctorId = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0');

    return `DOC-${year}${month}${day}-${random}`;
};

const generateVisitId = () => {
    const timestamp = Date.now();
    const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');

    return `VISIT-${timestamp}-${random}`;
};

const generateReportId = () => {
    const timestamp = Date.now();
    const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');

    return `REPORT-${timestamp}-${random}`;
};

const generateQueryId = () => {
    const timestamp = Date.now();
    const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');

    return `QUERY-${timestamp}-${random}`;
};

module.exports = {
    generatePatientId,
    generateDoctorId,
    generateVisitId,
    generateReportId,
    generateQueryId
};

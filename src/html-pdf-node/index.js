const html_to_pdf = require('html-pdf-node');
const fs = require('fs');
const path = require('path');

/**
 * Generate a pdf from html, replacing all double mustaches to {invoiceData} props
 * @param {Object} invoiceData props to replace in html file
 * @param {string} filePath route on file system
 * Example: {{ title }} replaced to invoiceData.title
 */
const generateInvoicePdf = (invoiceData, filePath) => {
    const htmlContent = parseInvoice(invoiceData, filePath);
    const file = { content: htmlContent };
    const options = { format: 'A4' };
    const outputFileName = `factura-${invoiceData.id}.pdf`;


    function callbackAfterCloseFile(err) {
        // fs.unlinkSync(outputFileName);
        // can execute code post the file is created
    };

    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        const writeStream = fs.createWriteStream(outputFileName);
        writeStream.write(pdfBuffer);
        writeStream.close(callbackAfterCloseFile);
    });
};

const parseInvoice = (invoiceData, filePath) => {
    let contentFile = fs.readFileSync(filePath, {
        encoding: 'utf-8'
    });

    function replaceMustaches(a) {
        const varName = a.replace(/{|}/g, '').trim();
        return invoiceData[varName]
    }

    const reMatchVarsInHtml = /{{.+?}}/g;
    contentFile = contentFile.replace(reMatchVarsInHtml, replaceMustaches);
    const buffer = Buffer.from(contentFile);
    return buffer;
};

const invoiceData = {
    id: 444,
    invoiceTitle: `Factura #36333`,
    created_date: '15-10-1992',
    due_date: '13-13-2020'
};

const filePath = path.join("invoice.html");
generateInvoicePdf(invoiceData, filePath);

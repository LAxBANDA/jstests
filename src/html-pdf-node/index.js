var html_to_pdf = require('html-pdf-node');
var fs = require('fs');
const path = require('path');

let options = { format: 'A4' };
// Example of options with args //
// let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

// or //
// let file = { url: "https://example.com" };

const generateInvoicePdf = invoiceData => {
    const htmlContent = parseInvoice(invoiceData);
    const file = { content: htmlContent };
    const outputFileName = `factura-${invoiceData.id}.pdf`;

    function sendFile(err) {
        setTimeout(() => {
            fs.unlinkSync(outputFileName);
        }, 3000)
    };

    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        const writeStream = fs.createWriteStream(outputFileName);
        writeStream.write(pdfBuffer);
        writeStream.close(sendFile);
    });
};

const parseInvoice = (invoiceData) => {
    let contentFile = fs.readFileSync(path.join("invoice.html"), {
        encoding: 'utf-8'
    });

    function replaceMustaches(a){
        const varName = a.replace(/{|}/g, '').trim();
        return invoiceData[varName]
    }

    const reMatchVarsInHtml = /{{.+?}}/g;
    contentFile = contentFile.replace(reMatchVarsInHtml, replaceMustaches);
    const buffer = Buffer.from(contentFile);
    return buffer;
};

generateInvoicePdf({
    id: 356,
    invoiceTitle: `Factura #36333`,
    created_date: '15-10-1992',
    due_date: '13-13-2020'
});

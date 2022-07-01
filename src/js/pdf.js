import {PDFDocument} from 'pdf-lib';

const FileSaver = require('file-saver');

export default async function merge(files) {
    const pdfDoc = await PDFDocument.create();
    for (const file of files) {
        const document = await PDFDocument.load(file);
        const copiedPages = await pdfDoc.copyPages(document, document.getPageIndices());
        copiedPages.forEach((page) => pdfDoc.addPage(page));
    }
    return await pdfDoc.save();
}

export async function loadDocument(file) {
    const doc = await PDFDocument.load(file);
    return await doc.save();
}

export async function download(bytes, name) {
    const blob = new Blob([bytes]);
    FileSaver.saveAs(blob, `${name}.pdf`)
}

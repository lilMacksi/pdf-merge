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
    console.log(doc)
    return await doc.save();
}

export async function download(bytes, name) {
        /*
        NATIVE IMPLEMENTATION (unfortunately rather slow)
        const opts = {
            types: [{
                description: 'PDF file',
                accept: {'application/pdf': ['.pdf']},
            }],
            suggestedName: name
        };
        const handle = await window.showSaveFilePicker(opts);
        const stream = await handle.createWritable();
        await stream.write(new Blob([bytes]));
        await stream.close();
        return new Promise((res) => res(true));*/
        const blob = new Blob([bytes]);
        FileSaver.saveAs(blob, `${name}.pdf`)
}

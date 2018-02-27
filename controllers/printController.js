'use strict';

const htmlpdf = require('html-pdf');
const ejs = require('ejs');

exports.printBulkCMR = function (req, res) {
    console.log('Received request');

    let index = 0;
    let length = req.body.length;
    let success = true;
    const data = [];
    const errors = [];

    createPdfPrint();

    function createPdfPrint() {
        if (index === length) return;
        const cmr = req.body[index];
        ejs.renderFile('views/index.ejs', {cmr: cmr},
            function (err, result) {
                // render on success
                if (result) {
                    const date = (cmr.setup && cmr.setup.time) ? new Date(cmr.setup.time) : new Date();
                    const filename = getFilename(date, cmr.receiver);
                    console.log(filename + ' created');
                    data.push(filename);
                    htmlpdf.create(result, {format: 'A4', border: 0,}).toFile(filename, function (err, response) {
                        // todo send actual print job
                    });
                } else {
                    success = false;
                    errors.push(err);
                    console.log(err);
                }
                index++;
                createPdfPrint();
            }
        );
    }

    console.log('Sending reponse');
    // todo return errors
    res.json({success, data, errors});
};

const getFilename = function (date, receiver) {
    const month = (date.getMonth() + 1).toString();
    const day = (date.getDate()).toString();
    const hours = (date.getHours()).toString();
    const minutes = (date.getMinutes()).toString();
    const seconds = (date.getSeconds()).toString();

    let filename = '';
    filename += date.getFullYear().toString().substr(2, 2);
    filename += (month.length === 1) ? '0' : '';
    filename += month;
    filename += (day.length === 1) ? '0' : '';
    filename += day;
    filename += (hours.length === 1) ? '0' : '';
    filename += hours;
    filename += (minutes.length === 1) ? '0' : '';
    filename += minutes;
    filename += (seconds.length === 1) ? '0' : '';
    filename += seconds;
    filename += (receiver.company) ?
        filterBadCharacters(receiver.company) :
        filterBadCharacters(receiver.lastName) + '_' + filterBadCharacters(receiver.firstName);
    filename += '.pdf';
    return filename;
};

const filterBadCharacters = function (str) {
    let out = '';
    for (let i = 0; i < str.length; i++) {
        switch (str[i]) {
            case ' ':
                out += '-';
                break;
            default:
                out += str[i];
                break;
        }
    }
    return out;
};
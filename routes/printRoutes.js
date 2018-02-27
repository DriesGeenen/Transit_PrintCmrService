'use strict';

module.exports = function (app) {
    const PrintController = require('../controllers/printController');
    const AuthHelper = require('../helpers/authHelper');

    app.route('/print')
        .post(PrintController.printBulkCMR);

};
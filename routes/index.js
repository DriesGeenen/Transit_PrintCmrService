var express = require('express');
var router = express.Router();
var htmlpdf = require('html-pdf');
var ejs = require('ejs')
//var htmlpdfviewer = require('html-pdf-viewer')
/* GET home page. */
router.get('/', function (req, res, next) {
    var location = {
        address: "Harten 8",
        postal: "2300",
        city: "Turnhout"
    };
    var point = {
        name: "Naam Punt",
        location: location,
        time: new Date()

    };
    var contact = {
        lastName: "Van Reusel",
        firstname: "Erik",
        company: "Thomas More",
        telephone: ["0572917177"],
        email: ["evanreusel@gmail.com"],
        location: location
    };
    var cmr = {
        sender: contact,
        receiver: contact,
        reception: point,
        deliveryLocation: point,
        mainTransporter: contact,
        subTransporter: contact,
        successiveTransporter: contact,
        goods: [
            {name: "Good"}
        ],
        setup: point,
        autographs: {sender: "Sender", transporter: "Trans", receiver: "Receiver"}

    };
    //console.log(cmr);
    ejs.renderFile('views/index.ejs', {cmr: cmr},
        function (err, result) {
            // render on success
            if (result) {

                //htmlpdfviewer(html);

                htmlpdf.create(result, {format: 'A4', border: 0,}).toFile('out.pdf', function (err, res) {
                    console.log(res);
                });
                /*var conversion = require("phantom-html-to-pdf");
                conversion({html: result}, function (err, pdf) {
                    if (err) {
                        //return res.end(err);
                    }
                    pdf.stream.pipe(res);
                });*/
                //return res.end(result);

            }
            // render or error
            else {
                console.log(err);
                //return res.end('An error occurred:' + JSON.stringify(err));
            }
        });
    //res.render('index', {cmr: cmr});

});

module.exports = router;

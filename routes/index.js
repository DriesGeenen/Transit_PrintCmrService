var express = require('express');
var router = express.Router();
var htmlpdf = require('html-pdf');
var phanthompdf = require('phantom-html-to-pdf');
var ejs = require('ejs')
//var htmlpdfviewer = require('html-pdf-viewer')
/* GET home page. */
router.get('/', function (req, res, next) {
    var location =
        {
            address: "Harten 8",
            postal: "2300",
            city: "Turnhout"
        };
    var point = {
        name: "Naam Punt",
        location: location,
        time: new Date()

    }
    var contact= {
        lastName: "Van Reusel",
        firstname: "Erik",
        company: "Thomas More",
        telephone: ["0572917177"],
        email: ["evanreusel@gmail.com"],
        location: location
    }
    var cmr =
        {
            sender: contact,
            receiver:contact,
            reception: point,
            deliveryLocation: point,
            mainTransporter: contact,
            subTransporter: contact,
            successiveTransporter: contact,
            goods:[
                {name :"Good"}
            ],
            setup: point,
            autographs:{sender: "Sender", transporter: "Trans", receiver:"Receiver"}

        };
    console.log(cmr)
    ejs.renderFile('views/index.ejs', {cmr: cmr},
        function(err, result) {
        // render on success
        if (result) {

            //htmlpdfviewer(html);

            // htmlpdf.create(result,{format: 'A4', border:0, }).toStream(function(err, stream){
            //     console.log(stream);
            //     stream.pipe(res);
            // });
            // var conversion = require("phantom-html-to-pdf")();
            // conversion({ html: result }, function(err, pdf) {
            //     if(err)
            //     {
            //         res.end(err);
            //     }
            //     pdf.stream.pipe(res);
            // });
            res.end(result);

        }
        // render or error
        else {
            res.end('An error occurred:' +  JSON.stringify(err));
            console.log(err);
        }
    });
    //res.render('index', {cmr: cmr});

});

module.exports = router;

var nodemailer = require('nodemailer');
// email sender function
exports.sendEmail = function(option) {
    console.log(option)
    console.log("Entro aca-------")
        // Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cesar@ptree.com.mx',
            pass: 'desarrollo2019'
        }
    });
    var mailOptions = {
        from: 'sergio@ptree.com.mx',
        to: 'sergio@ptree.com.mx',
        subject: 'Metodo GET',
        text: 'Funcion Metodo Get'
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });
};

exports.sendEmailPost = function(req, res, option) {
    console.log(req)
    console.log(res)
    console.log(option)
    console.log("Entro aca-------")
        // Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cesar@ptree.com.mx',
            pass: 'desarrollo2019'
        }
    });
    var mailOptions2 = {
        from: 'sergio@ptree.com.mx',
        to: 'sergio@ptree.com.mx',
        subject: 'Metodo Post',
        text: 'Funcion Metodo Post'
    };
    // Enviamos el email
    transporter.sendMail(mailOptions2, function(error, info) {
        if (error) {
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });
};
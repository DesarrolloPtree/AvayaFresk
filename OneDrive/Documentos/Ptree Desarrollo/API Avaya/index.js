const express = require("express");
const bodyParser = require('body-parser');
const msg = require("./mailCtrl")
const app = express();
var nodemailer = require('nodemailer');
var http = require('http');
var request = require('request');
const { parse } = require("path");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let usuario = {
    nombre: '',
    apellido: ''
};
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cesar@ptree.com.mx',
        pass: 'desarrollo2019'
    }
})
let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};
app.get('/', function(req, res) {
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Punto de inicio'
    };
    res.send(respuesta);
});
app.route('/API/v1').get(function(req, res) {
        var options = {
            'method': 'GET',
            'url': 'https://script.google.com/macros/s/AKfycbwLtkGCOlfeqvBnDPgc51R0KOBERRU-iWHrVcgJiFs425gbR30/exec',
            'headers': {
                'Content-Type': 'application/json',
            }
        };
        var mailOptions = {
            from: 'sergio@ptree.com.mx',
            to: 'sergio@ptree.com.mx',
            subject: 'Metodo GET ' + new Date(),
            text: JSON.stringify(req.body)
        };
        transporter.sendMail(mailOptions, function(error, info) {
            request(options, function(error, response) {
                if (error) throw new Error(error);
                respuesta = {
                    error: false,
                    codigo: 200,
                    mensaje: 'Ok',
                    respuesta: req.body,
                    respuestaServer: JSON.parse(response.body)
                };

                res.send(respuesta);
            });
        })
    })
    .post(function(req, res) {
        var mailOptions = {
            from: 'sergio@ptree.com.mx',
            to: 'sergio@ptree.com.mx',
            subject: 'Metodo POST ' + new Date(),
            text: JSON.stringify(req.body)
        };
        transporter.sendMail(mailOptions, function(error, info) {
            var options = {
                'method': 'POST',
                'url': 'https://script.google.com/macros/s/AKfycbwLtkGCOlfeqvBnDPgc51R0KOBERRU-iWHrVcgJiFs425gbR30/exec',
                'headers': {
                    'Content-Type': 'application/json'
                },
                "body": JSON.stringify(req.body)

            };
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'Ok',
                respuesta: req.body,
            };

            res.send(respuesta);

        })
    })
app.use(function(req, res, next) {
    respuesta = {
        error: true,
        codigo: 404,
        mensaje: 'URL no encontrada'
    };
    res.status(404).send(respuesta);
});
app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});
const express = require("express");
const bodyParser = require('body-parser');
const msg = require("./mailCtrl")
const app = express();
const url = require('url');
const querystring = require('querystring');
var nodemailer = require('nodemailer');
var http = require('http');
var request = require('request');
const encode = require('nodejs-base64-encode');
const { parse } = require("path");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let USERNAME = 'IJl9UjJk6lh0xNOAaGRZ'; //Correo del usuario
let PASSWORD = 'xxx'; //Contraseña  del fresh
let API_URL = 'https://helpdeskbepensa.freshdesk.com/api/v2/tickets'; //Se debe ingresar la url con el dominio de la empresa
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
        const queryObject = url.parse(req.url, true).query;
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
            subject: 'Metodo GEs ' + new Date(),
            text: "Esto es el boy" + JSON.stringify(req.body) + "\n Esto es el query" + JSON.stringify(queryObject)
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
        const queryObject = url.parse(req.url, true).query;
        var num = queryObject.externalnumber;
        var tel = parseInt(num.replace(/[-+()‑\s]/g, ''));
        var data = {
            parteInterna: queryObject.agentname,
            telefono: tel,
            grupo: queryObject.skill,
            type: queryObject.accountcodes
        }
        var type = "Solicitud Administrativa"
        if (data.type) {
            type = data.type.split(",")[0];
        }
        var obj = {
            "description": "Favor de completar los datos faltantes",
            "subject": "Ticket registrado automáticamente",
            "email": "s@ptree.com.mx",
            "priority": 1,
            "status": 2,
            "type": type,
            "custom_fields": {
                "cf_telfono": data.telefono,
                "cf_nombre_del_contacto": "Favor de completar/seleccionar",
                "cf_sucursal": "Favor de completar/seleccionar",
                "cf_causa": "Favor de completar/seleccionar",
                "cf_rea": "Favor de completar/seleccionar",
                "cf_empresa": "Favor de completar/seleccionar"
            }
        }
        if (data.parteInterna == "Mariana(1621)") {
            obj.responder_id = 66001520991;
        } else if (data.parteInterna == "Adali(1609)") {
            obj.responder_id = 66001727875;
        } else if (data.parteInterna == "Aremy(1601)") {
            obj.responder_id = 66009708103;
        }
        if (data.grupo == "Servicio al Cliente" || data.grupo == "Atencion a Clientes") {
            obj.group_id = 66000081050;
        } else if (data.grupo == "Ventas") {
            obj.group_id = 66000075334
        }

        var dates = JSON.stringify(obj);
        console.log(dates)
        var mailOptions = {
            from: 'sergio@ptree.com.mx',
            to: 'sergio@ptree.com.mx',
            subject: 'Metodo POST URL Pruebas Final' + new Date(),
            text: "\n Esto es el query" + JSON.stringify(queryObject)
        };
        var base64 = encode.encode(USERNAME + ":" + PASSWORD, 'base64')
        console.log("base64")
        console.log(base64)
        options = {
            'method': 'POST',
            'url': 'https://helpdeskbepensa.freshdesk.com/api/v2/tickets',
            'headers': {
                'Authorization': 'Basic ' + base64,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)

        };
        transporter.sendMail(mailOptions, function(error, info) {
            request(options, function(error, response) {
                if (error) throw new Error(error);
                respuesta = {
                    error: false,
                    codigo: 200,
                    mensaje: 'Ok',
                    respuestaServer: JSON.parse(response.body)
                };
                res.send(respuesta);
            });
        })
    })
app.route('/test/API/v1').post(function(req, res) {
    const queryObject = url.parse(req.url, true).query;
    var num = queryObject.externalnumber;
    var tel = parseInt(num.replace(/[-+()‑\s]/g, ''));
    var data = {
        parteInterna: queryObject.agentname,
        telefono: tel,
        grupo: queryObject.skill,
        type: queryObject.accountcodes
    }
    var obj = {
        "description": "Favor de completar los datos faltantes",
        "subject": "Ticket registrado automáticamente",
        "email": "s@ptree.com.mx",
        "priority": 1,
        "status": 2,
        "type": "Felicitación",
        "custom_fields": {
            "cf_telfono": 55555,
            "cf_nombre_del_contacto": "Favor de completar/seleccionar",
            "cf_sucursal": "Favor de completar/seleccionar",
            "cf_causa": "Favor de completar/seleccionar",
            "cf_rea": "Favor de completar/seleccionar",
            "cf_empresa": "Favor de completar/seleccionar"
        }
    }
    obj.responder_id = 66001520991;
    obj.group_id = 66000075334
    console.log(obj)
    var dates = JSON.stringify(obj)

    // plain-text string
    const str = USERNAME + ":" + PASSWORD;

    // create a buffer
    const buff = Buffer.from(str, 'utf-8');

    // decode buffer as Base64
    const base64 = buff.toString('base64');
    options = {
        'method': 'POST',
        'url': 'https://helpdeskbepensa.freshdesk.com/api/v2/tickets',
        'headers': {
            'Authorization': 'Basic ' + base64,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)

    };
    request(options, function(error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        res.send(JSON.parse(response.body));
    });

})

app.use(function(req, res, next) {
    respuesta = {
        error: true,
        codigo: 404,
        mensaje: 'URL no encontrada'
    };
    res.status(404).send(respuesta);
});
var port = process.env.PORT || 3000;
app.listen(port);
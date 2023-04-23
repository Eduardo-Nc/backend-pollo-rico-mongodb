const { response } = require('express');
const moment = require('moment-timezone');
const pdf = require('html-pdf');
const pdfTemplate = require('./../templates/reporte.js');
const ticket = require('./../templates/index.js');
const pdfTemplateReimprecion = require('./../templates/reimpresion.js');



let HoraActual = moment().tz('America/Merida').format('YYYY-MM-DD hh:mm A');


const createTicket = async (req, res = response) => {

    var options = {
        httpHeaders: {
            Authorization: "Bearer ACEFAD8C-4B4D-4042-AB30-6C735F5BAC8B"
        },
        phantomPath: "../../node_modules/phantomjs/bin/phantomjs",
        childProcessOptions: {
            env: { OPENSSL_CONF: '/dev/null' }
        },
        "height": "11in",
        "width": "83mm",
        "border": "0px",
    }

    let compra = req.body;
    let datos = req.params;

    try {

        let r = pdf.create(ticket(compra, datos, HoraActual), options).toFile(`${process.cwd()}/src/facturas/result.pdf`, (err) => {
            if (err) {
                console.log(err)
                res.send(Promise.reject());
            }
            res.send(Promise.resolve());
        });

        console.log(r + " RESPUESTA Ticket")
        // return res.status(200).json(usuario);


    } catch (error) {
        console.error(error);
        // console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}

const createReporte = async (req, res = response) => {
    var options = {
        httpHeaders: {
            Authorization: "Bearer ACEFAD8C-4B4D-4042-AB30-6C735F5BAC8B"
        },
        phantomPath: "../../node_modules/phantomjs/bin/phantomjs",
        childProcessOptions: {
            env: { OPENSSL_CONF: '/dev/null' }
        }, format: 'Letter'
    };
    let compras = req.body;
    let datos = req.params;

    try {

        let r = pdf.create(pdfTemplate(compras, datos, HoraActual), options).toFile(`${process.cwd()}/src/facturas/reporte.pdf`, (err) => {
            if (err) {
                console.log(err)
                res.send(Promise.reject());
            }
            res.send(Promise.resolve());
        });

        console.log(r + " RESPUESTA")


    } catch (error) {
        console.error(error);
        // console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}


const getReporte = async (req, res = response) => {
    try {
        res.sendFile(`${process.cwd()}/src/facturas/reporte.pdf`)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}



const getTicket = async (req, res = response) => {
    try {
        res.sendFile(`${process.cwd()}/src/facturas/result.pdf`)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}





const reimprimirTicket = async (req, res = response) => {

    var options = {
        httpHeaders: {
            Authorization: "Bearer ACEFAD8C-4B4D-4042-AB30-6C735F5BAC8B"
        },
        phantomPath: "../../node_modules/phantomjs/bin/phantomjs",
        childProcessOptions: {
            env: { OPENSSL_CONF: '/dev/null' }
        },
        "height": "11in",
        "width": "83mm",
        "border": "0px",
    }

    let compra = req.body;
    let datos = req.params;
    // console.log(compra)
    // console.log(datos)
    let HoraA = moment(datos.hora_actual).tz('America/Merida').format('YYYY-MM-DD hh:mm A');

    try {

        let r = pdf.create(pdfTemplateReimprecion(compra, datos, HoraA), options).toFile(`${process.cwd()}/src/facturas/reimpresion.pdf`, (err) => {
            if (err) {
                console.log(err)
                res.send(Promise.reject());
            }
            res.send(Promise.resolve());
        });

        console.log(r + " RESPUESTA Ticket Reimprecion")
        // return res.status(200).json(usuario);


    } catch (error) {
        console.error(error);
        // console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}

const getReimprimirTicket = async (req, res = response) => {
    try {
        res.sendFile(`${process.cwd()}/src/facturas/reimpresion.pdf`)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}




module.exports = {
    createReporte,
    getReporte,
    createTicket,
    getTicket,
    getReimprimirTicket,
    reimprimirTicket
}
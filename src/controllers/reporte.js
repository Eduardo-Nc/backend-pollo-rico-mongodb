const { response } = require('express');
const moment = require('moment-timezone');
const pdf = require('html-pdf');
const pdfTemplate = require('./../templates/reporte.js');
const ticket = require('./../templates/index.js');



let HoraActual = moment().tz('America/Merida').format('YYYY-MM-DD hh:mm A');


const createTicket = async (req, res = response) => {

    var options = {
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
    var options = { format: 'Letter' };
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


module.exports = {
    createReporte,
    getReporte,
    createTicket,
    getTicket,

}
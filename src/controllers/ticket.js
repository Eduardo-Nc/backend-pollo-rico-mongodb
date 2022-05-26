const { response } = require('express');
const Ticket = require("../models/ticket");
const moment = require('moment-timezone');
const Sucursal = require("../models/sucursal");
const Detalle = require("../models/detalle");
const lodash = require('lodash')
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


const createTicket = async (req, res = response) => {


    try {

        const ticket = new Ticket(req.body);

        let saveTicket = await ticket.save();

        res.status(201).json({
            ok: true,
            msg: 'Ticket fue creada correctamente',
            id: saveTicket._id
        })

    } catch (error) {
        console.error(error.message);
    }
}


const getTicket = async (req, res = response) => {

    const { folio } = req.params;

    try {

        const Found = await Ticket.findOne({ folio }).populate('sucursal');

        if (Found === undefined) {
            return res.status(201).json({
                ok: false,
                msg: 'No fueron encontrados Ticket registrados'
            })
        } else {
            return res.status(200).json(Found)
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}


module.exports = {
    createTicket,
    getTicket,
}
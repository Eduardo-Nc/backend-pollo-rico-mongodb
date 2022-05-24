const { response } = require('express');
const Venta = require("../models/venta");
const moment = require('moment-timezone');


const createVenta = async (req, res = response) => {

    try {

        const venta = new Venta(req.body);

        await venta.save();

        res.status(201).json({
            ok: true,
            msg: 'La Venta fue creada correctamente',
        })

    } catch (error) {
        console.error(error.message);
    }
}

const getVentaCantidadSuc = async (req, res = response) => {

    const { i, f, id_suc } = req.params;


    try {

        const ventaFound = await Venta.find({
            status: true, sucursal: id_suc,
            createdAt: { $gte: new Date(i + 'T00:00:00.000Z'), $lte: new Date(f + 'T00:00:00.000Z') },
        });

        if (ventaFound === 0) {
            return res.status(201).json({
                ok: false,
                msg: 'No fueron encontrados venta registrados',
                total_venta: 0
            })
        } else {
            return res.status(200).json({ total_venta: ventaFound.length })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}


const getVentaCantidadSucRoot = async (req, res = response) => {

    const { i, f } = req.params;


    try {

        const CantVentas = await Venta.find({
            status: true,
            createdAt: { $gte: new Date(i + 'T00:00:00.000Z'), $lte: new Date(f + 'T00:00:00.000Z') },
        });

        if (CantVentas === 0) {
            return res.status(201).json({
                ok: false,
                msg: 'No fueron encontrados venta registrados',
                total_venta: 0
            })
        } else {
            return res.status(200).json({ total_venta: CantVentas.length })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}

const getVenta = async (req, res = response) => {
    try {

        const bebidaFound = await Venta.find();

        if (bebidaFound === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No fueron encontrados bebidas registrados'
            })
        } else {
            return res.status(200).json(bebidaFound)
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}


const updatedVenta = async (req, res = response) => {


    const { id } = req.params;
    const { data } = req.body;



    try {

        const updateVenta = await Venta.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            }
        );


        if (!updateVenta) {
            return res.status(404).json({
                ok: false,
                msg: 'Venta no encontrada'
            })
        }
        else {

            return res.status(200).json({ ok: true, msg: 'Venta actualizada correctamente' });
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}





const deactivateVenta = async (req, res = response) => {

    const { id } = req.params;

    try {

        const updateVenta = await Venta.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );


        if (!updateVenta) {
            return res.status(404).json({
                ok: false,
                msg: 'Venta no encontrada'
            })
        }
        else {

            return res.status(200).json({
                ok: true,
                msg: 'Venta eliminada correctamente'
            });
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }


}





module.exports = {
    createVenta,
    getVenta,
    getVentaCantidadSuc,
    getVentaCantidadSucRoot,
    updatedVenta,
    deactivateVenta
}
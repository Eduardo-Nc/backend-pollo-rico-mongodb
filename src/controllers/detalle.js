const { response } = require('express');
const Detalle = require("../models/detalle");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


const createDetalle = async (req, res = response) => {

    try {

        const detalle = new Detalle(req.body);

        await detalle.save();

        res.status(201).json({
            ok: true,
            msg: 'La detalle fue creada correctamente',
        })

    } catch (error) {
        console.error(error.message);
    }
}


const getDetalle = async (req, res = response) => {
    try {

        const bebidaFound = await Detalle.find();

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


const updatedDetalle = async (req, res = response) => {


    const { id } = req.params;
    const { data } = req.body;



    try {

        const updateDetalle = await Detalle.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            }
        );


        if (!updateDetalle) {
            return res.status(404).json({
                ok: false,
                msg: 'Detalle no encontrada'
            })
        }
        else {

            return res.status(200).json({ ok: true, msg: 'Detalle actualizada correctamente' });
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}





const deactivateDetalle = async (req, res = response) => {

    const { id } = req.params;

    try {

        const updateDetalle = await Detalle.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );


        if (!updateDetalle) {
            return res.status(404).json({
                ok: false,
                msg: 'Detalle no encontrada'
            })
        }
        else {

            return res.status(200).json({
                ok: true,
                msg: 'Detalle eliminada correctamente'
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


const getDetallesModal = async (req, res = response) => {

    const { id_suc, id_user, id_venta } = req.params;

    try {

        // const detallesFound = await Detalle.find({
        //     status: true, corte: id_corte
        // }, {});

        // total_venta: { $multiply: ["$cantidad", "$precio"] }

        const detallesFound = await Detalle.aggregate([
            { $match: { status: true, venta: ObjectId(id_venta) } },
            {
                $project: {
                    precio_total: { $multiply: ["$cantidad", "$precio"] },
                    precio: "$precio",
                    cantidad_total: "$cantidad",
                    nombre_producto: "$nombre_producto",
                    fecha_venta: "$fecha_venta"
                }
            }
        ])

        // const ventaFound = await Venta.find({
        //     status: true, sucursal: id_suc, user: id_user, corte: id_corte
        // }).sort({ $natural: -1 }).populate('sucursal').populate('user').populate('corte');

        console.log(detallesFound)

        // let totales = detallesFound.map(item => {
        //     return item.total
        // })

        // let cantidad_total = lodash.sum(totales)

        // console.log(ventaFound.concat(detallesFound))

        if (detallesFound.length === 0) {
            return res.status(201).json([])
        } else {
            return res.status(200).json(detallesFound)
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
    createDetalle,
    getDetalle,
    updatedDetalle,
    deactivateDetalle,
    getDetallesModal
}
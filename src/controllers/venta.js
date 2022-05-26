const { response } = require('express');
const Venta = require("../models/venta");
const moment = require('moment-timezone');
const Sucursal = require("../models/sucursal");
const Detalle = require("../models/detalle");
const lodash = require('lodash')
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


const createVenta = async (req, res = response) => {

    // console.log(req.body)
    // TEK20220525-001
    const { id_suc } = req.params;

    let i = moment().tz('America/Merida').format('YYYY-MM-DD');
    let f = moment().tz('America/Merida').add(1, 'days').format('YYYY-MM-DD');

    try {

        const cantVentas = await Venta.find({ status: true, sucursal: id_suc, createdAt: { $gte: new Date(i + 'T00:00:00.000Z'), $lte: new Date(f + 'T00:00:00.000Z') } });
        let fechaFolio = moment().tz('America/Merida').format('YYYYMMDD');
        const sucursalFound = await Sucursal.findById(id_suc);
        let abreviaturaSuc = sucursalFound.abreviatura;

        // Aqui lo que hago es concatenar ceros 
        const fill = (number, len) => "0".repeat(len - number.toString().length) + number.toString();
        // Lo que hago aquí es sacar la cantidad de colecciones existentes y sumarle 1
        const folio = parseInt(cantVentas.length) + 1;


        // Aquí lo que hago es concatenar a mi obejeto que se guardara en mi base de datos el folio
        // Salida esperada C00001 O S00001 O P0001

        const venta = new Venta(req.body);

        venta.folio = `${abreviaturaSuc}${fechaFolio}-${fill(folio, 3)}`;


        let saveVenta = await venta.save();

        res.status(201).json({
            ok: true,
            msg: 'La Venta fue creada correctamente',
            id: saveVenta._id
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


const getUltimaVenta = async (req, res = response) => {

    const { id_suc } = req.params;


    try {
        const ventaFound = await Venta.findOne({
            status: true, sucursal: id_suc
        }).sort({ $natural: -1 }).populate('sucursal');

        // console.log(ventaFound)

        if (ventaFound === undefined) {
            return res.status(201).json({})
        } else {
            return res.status(200).json(ventaFound)
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}


const getTodosVentasUser = async (req, res = response) => {

    const { id_user } = req.params;


    try {
        const ventaFound = await Venta.find({
            status: true, user: id_user
        }).sort({ $natural: -1 }).populate('sucursal').populate('user').populate('corte');

        // console.log(ventaFound)

        if (ventaFound.length === 0) {
            return res.status(201).json([])
        } else {
            return res.status(200).json(ventaFound)
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}

const getTodosVentasUserAsc = async (req, res = response) => {

    const { id_user } = req.params;


    try {
        const ventaFound = await Venta.find({
            status: true, user: id_user
        }).sort({ $natural: 1 }).populate('sucursal').populate('user').populate('corte');

        // console.log(ventaFound)

        if (ventaFound.length === 0) {
            return res.status(201).json([])
        } else {
            return res.status(200).json(ventaFound)
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}



const getDataReportVenta = async (req, res = response) => {

    const { id_suc, id_user, id_corte } = req.params;

    try {

        // const detallesFound = await Detalle.find({
        //     status: true, corte: id_corte
        // }, {});

        // total_venta: { $multiply: ["$cantidad", "$precio"] }

        const detallesFound = await Detalle.aggregate([
            { $match: { status: true, corte: ObjectId(id_corte) } },
            {
                $project: {
                    precio_total: { $multiply: ["$cantidad", "$precio"] },
                    precio: "$precio",
                    cantidad_total: "$cantidad",
                    nombre_producto: "$nombre_producto",
                }
            }
        ])

        const ventaFound = await Venta.find({
            status: true, sucursal: id_suc, user: id_user, corte: id_corte
        }).sort({ $natural: -1 }).populate('sucursal').populate('user').populate('corte');

        // console.log(detallesFound)

        // let totales = detallesFound.map(item => {
        //     return item.total
        // })

        // let cantidad_total = lodash.sum(totales)

        // console.log(ventaFound.concat(detallesFound))

        if (ventaFound.length === 0) {
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
    createVenta,
    getVenta,
    getVentaCantidadSuc,
    getVentaCantidadSucRoot,
    updatedVenta,
    deactivateVenta,
    getUltimaVenta,
    getDataReportVenta,
    getTodosVentasUser,
    getTodosVentasUserAsc
}
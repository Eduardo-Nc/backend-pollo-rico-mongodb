const { response } = require('express');
const Corte = require("../models/corte");
const Venta = require("../models/venta");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const moment = require('moment-timezone');




const createCorte = async (req, res = response) => {

    try {

        const corte = new Corte(req.body);

        await corte.save();

        res.status(201).json({
            ok: true,
            msg: 'La corte fue creada correctamente',
        })

    } catch (error) {
        console.error(error.message);
    }
}

const getCorteTotal = async (req, res = response) => {

    const { i, f } = req.params;

    // console.log(new Date(i + 'T00:00:00.000Z'))
    // console.log(new Date(f + 'T00:00:00.000Z'))

    try {
        const corteFound = await Corte.find({
            status: true, estado: "Cerrado",
            fecha_venta_cierre_caja: { $gte: new Date(i + 'T00:00:00.000Z'), $lte: new Date(i + 'T23:59:59.999Z') },
            // createdAt: { $gte: new Date(i + 'T00:00:00.000Z'), $lte: new Date(f + 'T00:00:00.000Z') },
        });

        console.log(corteFound)

        let cortesCerrados = corteFound.map(item => {
            return ObjectId(item._id)
        })
        // console.log(cortesCerrados)

        const detallesFound = await Venta.find({ status: true, corte: { $in: cortesCerrados } }, { totales: { $sum: "$total_venta" } });

        console.log(detallesFound.length)

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

const getCorteDia = async (req, res = response) => {

    const { i, f } = req.params;


    try {
        const corteFound = await Corte.find({
            status: true, estado: "Cerrado",
            createdAt: { $gte: new Date(i + 'T00:00:00.000Z'), $lte: new Date(f + 'T23:59:59.999Z') },
            // createdAt: { $gte: new Date(i + 'T00:00:00.000Z'), $lte: new Date(f + 'T00:00:00.000Z') },
        });

        console.log(corteFound)

        if (corteFound.length === 0) {
            return res.status(201).json([])
        } else {
            return res.status(200).json(corteFound)
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}


const getCorteTotalSuc = async (req, res = response) => {

    const { i, f, id_suc } = req.params;


    try {
        const corteFound = await Corte.findOne({
            status: true, estado: "Cerrado", sucursal: ObjectId(id_suc),
            fecha_venta_cierre_caja: { $gte: new Date(i + 'T00:00:00.000Z'), $lte: new Date(f + 'T23:59:59.999Z') },
            // createdAt: { $gte: new Date(i + 'T00:00:00.000Z'), $lte: new Date(f + 'T00:00:00.000Z') },
        }).sort({ $natural: -1 });

        // console.log(corteFound)
        // console.log("skjsiojioajopsjopsdjopsdjopjo")

        // let cortesCerrados = corteFound.map(item => {
        //     return ObjectId(item._id)
        // })
        // console.log(cortesCerrados)

        if (corteFound === null) {
            return res.status(201).json([])
        }

        const detallesFound = await Venta.find({ status: true, corte: ObjectId(corteFound._id) }, { totales: { $sum: "$total_venta" } });

        console.log(detallesFound)

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



const getCorte = async (req, res = response) => {
    try {

        const Found = await Corte.find().sort({ $natural: -1 }).populate('user').populate('sucursal');

        if (Found.length === 0) {
            return res.status(201).json([])
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

const getCorteSuc = async (req, res = response) => {

    const { id_suc } = req.params;

    try {

        const Found = await Corte.find({ sucursal: id_suc }).sort({ $natural: -1 }).populate('user').populate('sucursal');

        if (Found.length === 0) {
            return res.status(201).json([])
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


const updatedCorte = async (req, res = response) => {


    const { id } = req.params;
    // const { data } = req.body;
    // console.log(req.body)

    try {

        const updateCorte = await Corte.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );


        if (!updateCorte) {
            return res.status(404).json({
                ok: false,
                msg: 'Corte no encontrada'
            })
        }
        else {

            return res.status(200).json({ ok: true, msg: 'Corte actualizada correctamente' });
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}





const deactivateCorte = async (req, res = response) => {

    const { id } = req.params;

    try {

        const updateCorte = await Corte.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );


        if (!updateCorte) {
            return res.status(404).json({
                ok: false,
                msg: 'Corte no encontrada'
            })
        }
        else {

            return res.status(200).json({
                ok: true,
                msg: 'Corte eliminada correctamente'
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


const getUltimoCorteUser = async (req, res = response) => {

    const { id_user } = req.params;

    try {

        const Found = await Corte.findOne({ status: true, user: id_user }).sort({ createdAt: -1 }).populate('user').populate('sucursal');


        if (Found === null) {
            return res.status(201).json("")
        } else {
            return res.status(200).json(Found._id)
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}



const getCorteCorreo = async (req, res = response) => {

    const { correo } = req.params;

    // console.log("LIMIT 10")
    let HoraActual = moment().tz('America/Merida').format('YYYY-MM-DD');

    try {

        // .limit(50)


        const Found = await Corte.find({ status: true }).sort({ createdAt: -1 }).limit(10).populate('user').populate('sucursal');

        let r = Found.filter(item => item.user.correo === correo);

        // console.log(r)

        if (r.length === 0) {
            return res.status(201).json([])
        } else {
            return res.status(200).json(r)
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}

const getCorteCorreoxdia = async (req, res = response) => {

    const { correo, inicial, final } = req.params;

    // console.log(correo, inicial, final)
    // let HoraActual = moment().tz('America/Merida').format('YYYY-MM-DD');

    try {


        const Found = await Corte.find({ status: true, createdAt: { $gte: new Date(inicial + 'T00:00:00.000Z'), $lte: new Date(final + 'T23:59:59.999Z') } }).sort({ createdAt: -1 }).populate('user').populate('sucursal');

        let r = Found.filter(item => item.user.correo === correo);

        // console.log(r)

        if (r.length === 0) {
            return res.status(201).json([])
        } else {
            return res.status(200).json(r)
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}


const corteCorreo = async (req, res = response) => {

    const { correo } = req.params;

    // console.log(correo)

    try {

        const Found = await Corte.find({
            status: true, estado: "Activo"
        }).populate('user').populate('sucursal');

        // console.log(Found)

        let r = Found.find(item => item.user.correo === correo)

        // console.log(r)

        if (r === undefined) {
            return res.status(201).json({})
        } else {
            return res.status(200).json(r)
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}

const corteCorreoRol = async (req, res = response) => {

    const { correo } = req.params;


    try {

        const Found = await Corte.find({
            status: true, estado: "Activo"
        }).populate('user');


        // console.log(Found[0].user.rol)
        // && item.user.rol === 628c0a94718beafc1c5ca269
        let r = Found.find(item => item.user.correo === correo)

        // console.log(r)

        if (r === undefined) {
            return res.status(201).json({})
        } else {
            return res.status(200).json(r)
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
    createCorte,
    getCorte,
    getCorteSuc,
    getCorteTotal,
    getCorteDia,
    getCorteTotalSuc,
    updatedCorte,
    deactivateCorte,
    getUltimoCorteUser,
    getCorteCorreo,
    corteCorreo,
    getCorteCorreoxdia,
    corteCorreoRol
}
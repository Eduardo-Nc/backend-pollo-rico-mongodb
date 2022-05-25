const { response } = require('express');
const Corte = require("../models/corte");



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


    try {

        const corteFound = await Corte.findOne({
            status: true, estado: "Cerrado",
            fecha_venta_cierre_caja: { $gte: new Date(i + 'T00:00:00.000Z'), $lte: new Date(f + 'T00:00:00.000Z') },
        });


        if (corteFound === null) {
            return res.status(201).json({
                ok: false,
                msg: 'No fueron encontrados corte registrados',
                total_venta: 0
            })
        } else {
            return res.status(200).json({ total_venta: Object.keys(corteFound).length })
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
            status: true, sucursal: id_suc, estado: "Cerrado",
            fecha_venta_cierre_caja: { $gte: new Date(i + 'T00:00:00.000Z'), $lte: new Date(f + 'T00:00:00.000Z') },
        });


        if (corteFound === null) {
            return res.status(201).json({
                ok: false,
                msg: 'No fueron encontrados corte registrados',
                total_venta: 0
            })
        } else {
            return res.status(200).json({ total_venta: Object.keys(corteFound).length })
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

        const bebidaFound = await Corte.find();

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

        const Found = await Corte.findOne({ status: true, user: id_user }).sort({ createdAt: -1 }).populate('user');


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

    // console.log(correo)

    try {

        const Found = await Corte.find({ status: true }).sort({ createdAt: -1 }).populate('user');

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


    try {

        const Found = await Corte.find({
            status: true, estado: "Activo"
        }).populate('user');


        let r = Found.find(item => item.user.correo === correo)


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
    getCorteTotal,
    getCorteTotalSuc,
    updatedCorte,
    deactivateCorte,
    getUltimoCorteUser,
    getCorteCorreo,
    corteCorreo,
    corteCorreoRol
}
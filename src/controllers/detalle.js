const { response } = require('express');
const Detalle = require("../models/detalle");



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





module.exports = {
    createDetalle,
    getDetalle,
    updatedDetalle,
    deactivateDetalle
}
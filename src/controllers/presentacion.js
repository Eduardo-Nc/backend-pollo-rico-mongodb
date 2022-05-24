const { response } = require('express');
const Presentacion = require("../models/presentacion");



const createPresentacion = async (req, res = response) => {

    try {

        const presentacion = new Presentacion(req.body);

        await presentacion.save();

        res.status(201).json({
            ok: true,
            msg: 'La presentacion fue creado correctamente',
        })

    } catch (error) {
        console.error(error.message);
    }
}


const getPresentacion = async (req, res = response) => {
    try {

        const presentacionFound = await Presentacion.find();

        if (presentacionFound === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No fueron encontrados presentacion registrados'
            })
        } else {
            return res.status(200).json(presentacionFound)
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}


const updatedPresentacion = async (req, res = response) => {


    const { id } = req.params;
    const { data } = req.body;



    try {

        const updatePresentacion = await Presentacion.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            }
        );


        if (!updatePresentacion) {
            return res.status(404).json({
                ok: false,
                msg: 'Presentacion no encontrada'
            })
        }
        else {

            return res.status(200).json({ ok: true, msg: 'Presentacion actualizada correctamente' });
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}





const deactivatePresentacion = async (req, res = response) => {

    const { id } = req.params;

    try {

        const updatePresentacion = await Presentacion.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );


        if (!updatePresentacion) {
            return res.status(404).json({
                ok: false,
                msg: 'Presentacion no encontrada'
            })
        }
        else {

            return res.status(200).json({
                ok: true,
                msg: 'Presentacion eliminada correctamente'
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
    createPresentacion,
    getPresentacion,
    updatedPresentacion,
    deactivatePresentacion
}
const { response } = require('express');
const Clasificacion = require("../models/clasificacion");



const createClasificacion = async (req, res = response) => {

    try {

        const clasificacion = new Clasificacion(req.body);

        await clasificacion.save();

        res.status(201).json({
            ok: true,
            msg: 'La clasificacion fue creado correctamente',
        })

    } catch (error) {
        console.error(error.message);
    }
}


const getClasificacion = async (req, res = response) => {
    try {

        const clasificacionFound = await Clasificacion.find();

        if (clasificacionFound === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No fueron encontrados clasificacion registrados'
            })
        } else {
            return res.status(200).json(clasificacionFound)
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}


const updatedClasificacion = async (req, res = response) => {


    const { id } = req.params;
    const { data } = req.body;



    try {

        const updateClasificacion = await Clasificacion.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            }
        );


        if (!updateClasificacion) {
            return res.status(404).json({
                ok: false,
                msg: 'Clasificacion no encontrada'
            })
        }
        else {

            return res.status(200).json({ ok: true, msg: 'Clasificacion actualizada correctamente' });
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}





const deactivateClasificacion = async (req, res = response) => {

    const { id } = req.params;

    try {

        const updateClasificacion = await Clasificacion.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );


        if (!updateClasificacion) {
            return res.status(404).json({
                ok: false,
                msg: 'Clasificacion no encontrada'
            })
        }
        else {

            return res.status(200).json({
                ok: true,
                msg: 'Clasificacion eliminada correctamente'
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
    createClasificacion,
    getClasificacion,
    updatedClasificacion,
    deactivateClasificacion
}
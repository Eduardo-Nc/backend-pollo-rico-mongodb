const { response } = require('express');
const Comida = require("../models/comida");



const createComida = async (req, res = response) => {

    try {

        const comida = new Comida(req.body);

        await comida.save();

        res.status(201).json({
            ok: true,
            msg: 'La comida fue creado correctamente',
        })

    } catch (error) {
        console.error(error.message);
    }
}


const getComidaCantidadSuc = async (req, res = response) => {

    const { id_suc } = req.params;

    try {

        const Found = await Comida.find({
            status: true, sucursal: id_suc
        });

        if (Found === 0) {
            return res.status(201).json({
                ok: false,
                msg: 'No fueron encontrados comida registrados',
                CantComidas: 0
            })
        } else {
            return res.status(200).json({ CantComidas: Found.length })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}

const getComidaCantidadRoot = async (req, res = response) => {


    try {
        const Found = await Comida.find({
            status: true
        });

        if (Found === 0) {
            return res.status(201).json({
                ok: false,
                msg: 'No fueron encontrados comida registrados',
                CantComidas: 0
            })
        } else {
            return res.status(200).json({ CantComidas: Found.length })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}


const getComida = async (req, res = response) => {
    try {

        const comidaFound = await Comida.find();

        if (comidaFound === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No fueron encontrados comida registrados'
            })
        } else {
            return res.status(200).json(comidaFound)
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}


const updatedComida = async (req, res = response) => {


    const { id } = req.params;
    const { data } = req.body;



    try {

        const updateComida = await Comida.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            }
        );


        if (!updateComida) {
            return res.status(404).json({
                ok: false,
                msg: 'Comida no encontrada'
            })
        }
        else {

            return res.status(200).json({ ok: true, msg: 'Comida actualizada correctamente' });
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}





const deactivateComida = async (req, res = response) => {

    const { id } = req.params;

    try {

        const updateComida = await Comida.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );


        if (!updateComida) {
            return res.status(404).json({
                ok: false,
                msg: 'Comida no encontrada'
            })
        }
        else {

            return res.status(200).json({
                ok: true,
                msg: 'Comida eliminada correctamente'
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
    createComida,
    getComida,
    getComidaCantidadSuc,
    getComidaCantidadRoot,
    updatedComida,
    deactivateComida
}
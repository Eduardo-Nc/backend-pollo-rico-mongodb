const { response } = require('express');
const Complemento = require("../models/complemento");



const createComplemento = async (req, res = response) => {

    try {

        const complemento = new Complemento(req.body);

        await complemento.save();

        res.status(201).json({
            ok: true,
            msg: 'La complemento fue creada correctamente',
        })

    } catch (error) {
        console.error(error.message);
    }
}

const getComplementoCantidadSuc = async (req, res = response) => {

    const { id_suc } = req.params;

    try {

        const Found = await Complemento.find({
            status: true, sucursal: id_suc
        });

        if (Found === 0) {
            return res.status(201).json({
                ok: false,
                msg: 'No fueron encontrados complementos registrados',
                CantComplementos: 0
            })
        } else {
            return res.status(200).json({ CantComplementos: Found.length })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}

const getComplementoCantidadRoot = async (req, res = response) => {


    try {
        const Found = await Complemento.find({
            status: true
        });

        if (Found === 0) {
            return res.status(201).json({
                ok: false,
                msg: 'No fueron encontrados complementos registrados',
                CantComplementos: 0
            })
        } else {
            return res.status(200).json({ CantComplementos: Found.length })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}

const complementoCantidadSuc = async (req, res = response) => {

    const { id_suc } = req.params;


    try {

        const Found = await Complemento.find({
            status: true, sucursal: id_suc
        }).populate('sucursal').populate('clasificacion').populate('presentacion');

        if (Found === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No fueron encontrados complemento registrados'
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

const complementoCantidadRoot = async (req, res = response) => {


    try {
        const Found = await Complemento.find({
            status: true
        }).populate('sucursal').populate('clasificacion').populate('presentacion');


        if (Found === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No fueron encontrados complemento registrados'
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

const getComplemento = async (req, res = response) => {
    try {

        const bebidaFound = await Complemento.find();

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


const updatedComplemento = async (req, res = response) => {


    const { id } = req.params;
    // const { data } = req.body;



    try {

        const updateComplemento = await Complemento.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );


        if (!updateComplemento) {
            return res.status(404).json({
                ok: false,
                msg: 'Complemento no encontrada'
            })
        }
        else {

            return res.status(200).json({ ok: true, msg: 'Complemento actualizada correctamente' });
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}





const deactivateComplemento = async (req, res = response) => {

    const { id } = req.params;

    try {

        const updateComplemento = await Complemento.findByIdAndUpdate(
            id,
            { status: false },
            {
                new: true,
            }
        );


        if (!updateComplemento) {
            return res.status(404).json({
                ok: false,
                msg: 'Complemento no encontrada'
            })
        }
        else {

            return res.status(200).json({
                ok: true,
                msg: 'Complemento eliminada correctamente'
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
    createComplemento,
    getComplemento,
    getComplementoCantidadSuc,
    getComplementoCantidadRoot,
    complementoCantidadSuc,
    complementoCantidadRoot,
    updatedComplemento,
    deactivateComplemento
}
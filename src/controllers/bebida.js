const { response } = require('express');
const Bebida = require("../models/bebida");



const createBebida = async (req, res = response) => {

    try {

        const bebida = new Bebida(req.body);

        await bebida.save();

        res.status(201).json({
            ok: true,
            msg: 'La bebida fue creada correctamente',
        })

    } catch (error) {
        console.error(error.message);
    }
}

const getBebidaCantidadSuc = async (req, res = response) => {

    const { id_suc } = req.params;

    try {

        const Found = await Bebida.find({
            status: true, sucursal: id_suc
        });

        if (Found === 0) {
            return res.status(201).json({
                ok: false,
                msg: 'No fueron encontrados bebida registrados',
                CantBebidas: 0
            })
        } else {
            return res.status(200).json({ CantBebidas: Found.length })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}

const getBebidaCantidadRoot = async (req, res = response) => {


    try {
        const Found = await Bebida.find({
            status: true
        });

        if (Found === 0) {
            return res.status(201).json({
                ok: false,
                msg: 'No fueron encontrados bebida registrados',
                CantBebidas: 0
            })
        } else {
            return res.status(200).json({ CantBebidas: Found.length })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}



const getBebida = async (req, res = response) => {
    try {

        const bebidaFound = await Bebida.find();

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


const updatedBebida = async (req, res = response) => {


    const { id } = req.params;
    const { data } = req.body;



    try {

        const updateBebida = await Bebida.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            }
        );


        if (!updateBebida) {
            return res.status(404).json({
                ok: false,
                msg: 'Bebida no encontrada'
            })
        }
        else {

            return res.status(200).json({ ok: true, msg: 'Bebida actualizada correctamente' });
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}





const deactivateBebida = async (req, res = response) => {

    const { id } = req.params;

    try {

        const updateBebida = await Bebida.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );


        if (!updateBebida) {
            return res.status(404).json({
                ok: false,
                msg: 'Bebida no encontrada'
            })
        }
        else {

            return res.status(200).json({
                ok: true,
                msg: 'Bebida eliminada correctamente'
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
    createBebida,
    getBebida,
    getBebidaCantidadSuc,
    getBebidaCantidadRoot,
    updatedBebida,
    deactivateBebida
}
const { response } = require('express');
const Cargo = require("../models/cargo");



const createCargo = async (req, res = response) => {

    try {

        const cargo = new Cargo(req.body);

        await cargo.save();

        res.status(201).json({
            ok: true,
            msg: 'La cargo fue creado correctamente',
        })

    } catch (error) {
        console.error(error.message);
    }
}


const getCargo = async (req, res = response) => {
    try {

        const cargoFound = await Cargo.find();

        if (cargoFound === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No fueron encontrados cargos registrados'
            })
        } else {
            return res.status(200).json(cargoFound)
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}


const updatedCargo = async (req, res = response) => {


    const { id } = req.params;
    const { data } = req.body;



    try {

        const updateCargo = await Cargo.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            }
        );


        if (!updateCargo) {
            return res.status(404).json({
                ok: false,
                msg: 'Cargo no encontrada'
            })
        }
        else {

            return res.status(200).json({ ok: true, msg: 'Cargo actualizada correctamente' });
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}





const deactivateCargo = async (req, res = response) => {

    const { id } = req.params;

    try {

        const updateCargo = await Cargo.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );


        if (!updateCargo) {
            return res.status(404).json({
                ok: false,
                msg: 'Cargo no encontrada'
            })
        }
        else {

            return res.status(200).json({
                ok: true,
                msg: 'Cargo eliminada correctamente'
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
    createCargo,
    getCargo,
    updatedCargo,
    deactivateCargo
}
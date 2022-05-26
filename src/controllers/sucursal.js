const { response } = require('express');
const Sucursal = require("../models/sucursal");



const createSucursal = async (req, res = response) => {

    try {

        const sucursal = new Sucursal(req.body);

        await sucursal.save();

        res.status(201).json({
            ok: true,
            msg: 'La sucursal fue creado correctamente',
        })

    } catch (error) {
        console.error(error.message);
    }
}


const getSucursal = async (req, res = response) => {
    try {

        const sucursalFound = await Sucursal.find({ status: true });

        if (sucursalFound.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No fueron encontrados sucursal registrados'
            })
        } else {
            return res.status(200).json(sucursalFound)
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}


const updatedSucursal = async (req, res = response) => {


    const { id } = req.params;
    // const { data } = req.body;

    try {

        const updateSucursal = await Sucursal.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );


        if (!updateSucursal) {
            return res.status(404).json({
                ok: false,
                msg: 'Sucursal no encontrada'
            })
        }
        else {

            return res.status(200).json({ ok: true, msg: 'Sucursal actualizada correctamente' });
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}





const deactivateSucursal = async (req, res = response) => {

    const { id } = req.params;

    try {

        const updateSucursal = await Sucursal.findByIdAndUpdate(
            id,
            { status: false },
            {
                new: true,
            }
        );


        if (!updateSucursal) {
            return res.status(404).json({
                ok: false,
                msg: 'Sucursal no encontrada'
            })
        }
        else {

            return res.status(200).json({
                ok: true,
                msg: 'Sucursal eliminada correctamente'
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
    createSucursal,
    getSucursal,
    updatedSucursal,
    deactivateSucursal
}
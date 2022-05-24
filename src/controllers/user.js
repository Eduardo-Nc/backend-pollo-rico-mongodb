const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { forgotPasswordTemplate } = require('../templates/templateEmail.js');
const { generarJWT } = require('../helpers/jwt');


// AWS
const { uploadToBucket } = require('../helpers/s3');


const getUser = async (req, res = response) => {

    try {

        const { user_id } = req.params;

        const usuario = await User.findById(user_id).populate('rol').populate('sucursal').populate('cargo');

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado'
            })
        } else {
            return res.status(200).json(usuario);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }

}


const getAllUsers = async (req, res = response) => {

    try {
        const usersFound = await User.find().populate('rol').populate('sucursal').populate('cargo');

        if (usersFound.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No fueron encontrados usuarios registrados'
            })
        } else {
            return res.status(200).json(usersFound);
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}



const createUser = async (req, res = response) => {

    const { name, password, email } = req.body;


    try {
        let usuario = await User.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo electrónico ya fue relacionado con un usuario'
            });
        }

        usuario = new User();


        //Enviar datos de acceso
        const accesssData = {
            name: name + " " + surnames,
            password: password,
            email: email,
        }
        sendAccessDataTemplate(accesssData)


        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();


        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            msg: 'El usuario fue creado correctamente, sus datos de acceso fueron enviados a su corro electrónico',
            uid: usuario.id,
            name: usuario.name,
            roles: usuario.roles,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        });
    }
}

const updateTokenAppUser = async (req, res = response) => {

    const { user_id } = req.params;

    try {

        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            req.body,
            {
                new: true,
            }
        );


        if (!updatedUser) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        }
        else {

            return res.status(200).json({
                ok: true,
                msg: 'Token fue actualizado correctamente'
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

const loginUser = async (req, res = response) => {

    try {
        const { correo, contrasena } = req.body;
        const usuario = await User.findOne({ correo: correo }).populate('rol').populate('sucursal').populate('cargo');

        // console.log(usuario);

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese correo'
            });
        } else if (usuario.status === false) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ingresado fue eliminado, si tienes dudas habla con tu administrador'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(contrasena, usuario.contrasena);

        // console.log("validPassword: " + validPassword)

        if (validPassword === false) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // console.log("validPassword finalizar: " + validPassword)

        // Generar JWT
        const token = await generarJWT(usuario._id, usuario.nombre_completo_usuario);

        // console.log(token)

        res.status(200).json({
            ok: true,
            id_usuario: usuario._id,
            nombre_completo_usuario: usuario.nombre_completo_usuario,
            id_sucursal: usuario.sucursal._id,
            nombre_sucursal: usuario.sucursal.name,
            edad_usuario: usuario.edad_usuario === null ? 0 : usuario.edad_usuario,
            telefono_usuario: usuario.telefono_usuario,
            correo: usuario.correo,
            nombre_cargo: usuario.cargo.name,
            id_permiso_usuario: usuario.rol._id,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        });
    }

}


const revalidateToken = async (req, res = response) => {

    const { uid, name } = req;

    try {

        const usuario = await User.findById(uid).populate('profile.rol');


        if (usuario.status === false) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ingresado fue eliminado, si tienes dudas habla con tu administrador'
            });
        }

        const { name, surnames, cell_number } = usuario.profile;
        const { profile_photo } = usuario.profile.specific_dates;


        // Generar JWT
        const token = await generarJWT(uid, name);

        res.status(200).json({
            ok: true,
            uid: usuario._id,
            name: name,
            surnames: surnames,
            email: usuario.profile.email,
            rol: usuario.profile.rol.name,
            idRol: usuario.profile.rol._id,
            photo: profile_photo,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        });
    }
}


module.exports = {
    getUser,
    getAllUsers,
    createUser,
    updateTokenAppUser,
    loginUser,
    revalidateToken
}
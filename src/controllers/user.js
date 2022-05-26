const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { forgotPasswordTemplate } = require('../templates/templateEmail.js');
const { generarJWT } = require('../helpers/jwt');
const nodemailer = require('nodemailer');



// AWS
const { uploadToBucket } = require('../helpers/s3');


const getUser = async (req, res = response) => {

    try {

        const { user_id } = req.params;

        const usuario = await User.findById(user_id).populate('rol').populate('sucursal').populate('cargo');

        // console.log(!usuario)

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

const getUsersCantidadSuc = async (req, res = response) => {

    const { id_suc } = req.params;


    try {

        const Found = await User.find({
            status: true, sucursal: id_suc
        });

        // console.log(Found)

        if (Found === 0) {
            return res.status(201).json({
                ok: false,
                msg: 'No fueron encontrados usuarios registrados',
                CantUsers: 0
            })
        } else {
            return res.status(200).json({ CantUsers: Found.length })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}

const getUsersCantidadRoot = async (req, res = response) => {


    try {
        const Found = await User.find({
            status: true
        });

        if (Found === 0) {
            return res.status(201).json({
                ok: false,
                msg: 'No fueron encontrados usuarios registrados',
                CantUsers: 0
            })
        } else {
            return res.status(200).json({ CantUsers: Found.length })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Un error fue detectado, por favor habla con el administrador'
        })
    }
}


const usersCantidadSuc = async (req, res = response) => {

    const { id_suc } = req.params;


    try {

        const Found = await User.find({
            status: true, sucursal: id_suc
        }).populate('rol').populate('sucursal').populate('cargo');


        if (Found === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No fueron encontrados usuarios registrados'
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

const usersCantidadRoot = async (req, res = response) => {


    try {
        const Found = await User.find({
            status: true
        }).populate('rol').populate('sucursal').populate('cargo');

        if (Found === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No fueron encontrados usuarios registrados'
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

    const { nombre_completo_usuario, contrasena, correo, sucursal, edad_usuario, telefono_usuario, cargo, rol } = req.body;

    // console.log(req.body);

    try {
        let usuario = await User.findOne({ correo: correo });

        if (usuario !== null) {
            return res.status(201).json({
                ok: false,
                msg: 'El correo electrónico ya fue relacionado con un usuario'
            });
        }

        usuario = new User();


        //Enviar datos de acceso
        // const accesssData = {
        //     name: nombre_completo_usuario,
        //     password: contrasena,
        //     email: correo,
        // }
        // sendAccessDataTemplate(accesssData)


        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.contrasena = bcrypt.hashSync(contrasena, salt);

        usuario.sucursal = sucursal;
        usuario.nombre_completo_usuario = nombre_completo_usuario;
        usuario.edad_usuario = edad_usuario;
        usuario.telefono_usuario = telefono_usuario;
        usuario.correo = correo;
        usuario.cargo = cargo;
        usuario.rol = rol;
        usuario.status = true;

        await usuario.save();


        // Generar JWT
        const token = await generarJWT(usuario._id, usuario.nombre_completo_usuario);

        res.status(201).json({
            ok: true,
            msg: 'El usuario fue creado correctamente, sus datos de acceso fueron enviados a su corro electrónico',
            uid: usuario._id,
            name: usuario.nombre_completo_usuario,
            roles: usuario.rol,
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


const updateUser = async (req, res = response) => {

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
                msg: 'Usuario fue actualizado correctamente'
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


const updatePasswordUser = async (req, res = response) => {

    const { user_id } = req.params;

    const { contrasena } = req.body;

    // console.log(contrasena)

    try {

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        let newContrasena = bcrypt.hashSync(contrasena, salt);

        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { contrasena: newContrasena },
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
                msg: 'Usuario fue actualizado correctamente'
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


const enviarCredenciales = async (req, res = response) => {

    const { nombre, email, password } = req.body;


    try {


        htmlTextEmail = `
	<style type="text/css">
	*{
	  font-family:Arial;
	  text-align:center;
	}
	content {
	  display:flex;
	  flex-flow:column nowrap;
	  justify-content:center;
	  align-items: center;
	  text-align: center;
	  width:100%;
	  height:1300px;
	  color: white;
	  border-radius: 7px;
	  border:4px solid blue;
	}
	h1{
		font-size:26px;
		text-transform: capitalize;
	}
	label{
	  font-size:25px;
	}
  
	a.button {
	  -webkit-appearance: button;
	  -moz-appearance: button;
	  appearance: button;
	  font-size:25px;
	  color:blue;
	  text-decoration: none;
	  color: initial;
  }
  
	strong{
	  font-size:25px;
	}
	</style>
  
	<div id="content">
	<h1>Hola ${nombre}</h1>
	<br /> 
	<label>¡Felicidades, ya formas parte de nuestra familia El Pollo Rico! Bienvenido(a)</label>
	<br /> <br /> 
	<label id="contrasena">Tú correo es: </label> 
	<br /> 
	<strong>${email}</strong>
	<br /> <br /> 
	<label id="contrasena">Tú contraseña es: </label> 
	<br /> 
	<strong>${password}</strong>
	<br /> <br /> 
	<label>No olvides cambiar tú contraseña en el apartado de perfil</label>
	<br /> <br /> 
	<a href="https://elpollorico.com.mx/" class="button">Ir a El Pollo Rico</a>
	</div>
	`;

        let transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "elpollorico_mx@hotmail.com",
                pass: "*1991Akil*",
            },
        });

        let mailOptions = {
            from: "elpollorico_mx@hotmail.com",
            to: [email],
            subject: "Sistema de alta de usuarios",
            html: htmlTextEmail,
        };
        //
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                res.status(500).json({
                    ok: false,
                    msg: 'Un error fue detectado, por favor habla con el administrador'
                });
            } else {
                res.status(201).json({
                    ok: true,
                    msg: 'El usuario fue creado correctamente, sus datos de acceso fueron enviados a su corro electrónico',
                })
            }
        });

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
            return res.status(201).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // console.log("validPassword finalizar: " + validPassword)

        // Generar JWT
        const token = await generarJWT(usuario._id, usuario.nombre_completo_usuario);

        // console.log(token)
        // console.log(usuario)

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




const deleteUser = async (req, res = response) => {

    const { user_id } = req.params;

    try {

        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { status: false },
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
                msg: 'Usuario fue eliminado correctamente'
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
    getUser,
    getAllUsers,
    getUsersCantidadSuc,
    getUsersCantidadRoot,
    usersCantidadSuc,
    usersCantidadRoot,
    createUser,
    updateTokenAppUser,
    loginUser,
    updatePasswordUser,
    revalidateToken,
    updateUser,
    deleteUser,
    enviarCredenciales
}
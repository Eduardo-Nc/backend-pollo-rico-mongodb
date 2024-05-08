const { Schema, model } = require('mongoose');


const userSchema = Schema({

    nombre_completo_usuario: {
        type: String,
        require: true
    },
    correo: {
        type: String,
        // index: true,
        // unique: true,
        // sparse: true,
        trim: true,
        lowercase: true
    },
    telefono_usuario: {
        type: String,
        require: true
    },
    contrasena: {
        type: String,
        require: true
    },
    edad_usuario: {
        type: Date,
        require: false
    },
    sucursal:
    {
        type: Schema.Types.ObjectId,
        ref: "sucursal",
        require: true
    },
    rol:
    {
        type: Schema.Types.ObjectId,
        ref: "role",
        require: true
    },
    cargo:
    {
        type: Schema.Types.ObjectId,
        ref: "cargo",
        require: true
    },
    creationDate: {
        type: Date,
        defaultValue: new Date(),
        require: true
    },
    status:
    {
        type: Boolean,
        require: true,
        defaultValue: true
    }
},
    {
        versionKey: false,
        timestamps: true
    });

module.exports = model('User', userSchema);




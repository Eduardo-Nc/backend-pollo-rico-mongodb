const { Schema, model } = require('mongoose');


const comidaSchema = Schema({
    sucursal:
    {
        type: Schema.Types.ObjectId,
        ref: "sucursal",
        require: true
    },
    nombre_comida: {
        type: String,
        require: true
    },
    presentacion_comida: {
        type: String,
        require: true
    },
    equivalencia_presentacion: {
        type: Number,
        require: true
    },
    precio: {
        type: Number,
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

module.exports = model('comida', comidaSchema);




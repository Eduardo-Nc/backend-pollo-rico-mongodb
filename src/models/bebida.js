const { Schema, model } = require('mongoose');


const bebidaSchema = Schema({
    sucursal:
    {
        type: Schema.Types.ObjectId,
        ref: "sucursal",
        require: true
    },
    nombre_bebida: {
        type: String,
        require: true
    },
    clasificacion:
    {
        type: Schema.Types.ObjectId,
        ref: "clasificacion",
        require: true
    },
    presentacion:
    {
        type: Schema.Types.ObjectId,
        ref: "presentacion",
        require: true
    },
    tamano: {
        type: String,
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

module.exports = model('bebida', bebidaSchema);




const { Schema, model } = require('mongoose');


const complementoSchema = Schema({
    sucursal:
    {
        type: Schema.Types.ObjectId,
        ref: "sucursal",
        require: true
    },
    nombre_complemento: {
        type: String,
        require: true
    },
    precio_complemento: {
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

module.exports = model('complemento', complementoSchema);




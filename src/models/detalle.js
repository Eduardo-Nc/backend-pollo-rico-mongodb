const { Schema, model } = require('mongoose');


const detalleSchema = Schema({
    nombre_producto: {
        type: String,
        require: true
    },
    precio: {
        type: Number,
        require: true
    },
    cantidad: {
        type: Number,
        require: true
    },
    fecha_venta: {
        type: Date,
        // defaultValue: new Date(),
        require: true
    },
    creationDate: {
        type: Date,
        defaultValue: new Date(),
        require: true
    },
    corte: {
        type: Schema.Types.ObjectId,
        ref: "corte"
    },
    venta: {
        type: Schema.Types.ObjectId,
        ref: "venta"
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

module.exports = model('detalle', detalleSchema);




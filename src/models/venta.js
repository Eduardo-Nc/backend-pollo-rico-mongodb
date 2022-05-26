const { Schema, model } = require('mongoose');


const ventaSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    sucursal:
    {
        type: Schema.Types.ObjectId,
        ref: "sucursal",
        require: true
    },
    fecha_venta: {
        type: Date,
        require: false
    },
    forma_pago: {
        type: String,
        require: true
    },
    total_venta: {
        type: Number,
        require: true
    },
    efectivo: {
        type: Number,
        require: false
    },
    cambio: {
        type: Number,
        require: false
    },
    nota: {
        type: String,
        require: true
    },
    corte: {
        type: Schema.Types.ObjectId,
        ref: "corte"
    },
    folio: {
        type: String,
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

module.exports = model('venta', ventaSchema);




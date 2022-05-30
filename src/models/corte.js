const { Schema, model } = require('mongoose');


const corteSchema = Schema({
    inicio_caja: {
        type: Number,
        require: true
    },
    total_efectivo: {
        type: Number,
        require: false
    },
    diferencia: {
        type: Number,
        require: false
    },
    total_venta_periodo: {
        type: Number,
        require: false
    },
    fecha_venta_inicio_caja: {
        type: Date,
        require: false
    },
    fecha_venta_cierre_caja: {
        type: Date,
        require: false
    },
    creationDate: {
        type: Date,
        defaultValue: new Date(),
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    estado: {
        type: String,
        require: true
    },
    sucursal:
    {
        type: Schema.Types.ObjectId,
        ref: "sucursal",
        require: false
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

module.exports = model('corte', corteSchema);




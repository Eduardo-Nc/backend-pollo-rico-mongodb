const { Schema, model } = require('mongoose');


const ticketSchema = Schema({
    folio: {
        type: String,
        require: true
    },
    sucursal: {
        type: Schema.Types.ObjectId,
        ref: "sucursal",
        require: true
    },
    nota: {
        type: String,
        require: true
    },
    hora_actual: {
        type: Date,
        require: true
    },
    compras: [{}],
    efectivo: {
        type: Number,
        require: true
    },
    cambio: {
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

module.exports = model('ticket', ticketSchema);




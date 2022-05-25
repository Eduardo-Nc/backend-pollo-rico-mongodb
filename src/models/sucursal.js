const { Schema, model } = require('mongoose');


const sucursalSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  abreviatura: {
    type: String,
    require: true,
  },
  telefono_usuario: {
    type: String,
    require: true
  },
  direccion: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
    defaultValue: true
  }
},
  {
    versionKey: false,
    timestamps: true
  });


module.exports = model('sucursal', sucursalSchema);
const { Schema, model } = require('mongoose');


const clasificacionSchema = new Schema({
  name: {
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


module.exports = model('clasificacion', clasificacionSchema);
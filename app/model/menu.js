'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  let d = new Date();

  const MenuSchema = new Schema({
    menu_code: { type: String, required: true, select: true },
    menu_name: { type: String, required:true, select: true },
    status: { type: Number, enum: [1, 2], default: 1, select: true },
    url: {type: String, required:false, select: true},
    pid: {type: Schema.Types.Mixed, select: true},
    sort: {type: Number, default: 1, select: true},
    icon: {type: String, select :true},
    remark: {type: String, select: true},
    type: { type: Number, enum: [1, 2, 3], default: 1, select: true },
    added_by: {type: Schema.Types.ObjectId, ref:'Admin', select: true}, 
    update_time: { type: Date, select: true },
    add_time: {type: Date, default: Date.now, select: true}
  });

  return mongoose.model('Menu', MenuSchema, 'menu');
};
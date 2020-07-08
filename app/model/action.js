'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ActionSchema = new Schema({
    action_code: { type: String, required: true, select: true },
    action_name: { type: String, required:true, select: true },
    status: { type: Number, enum: [1, 2], default: 1, required:true, select: true },
    url: {type: String, required:false, select: true},
    menu_id: {type: Schema.Types.ObjectId,  ref:'Menu',  select: true},
    remark: {type: String, select: true},
    added_by: {type: Schema.Types.ObjectId, ref:'Admin', select: true}, 
    update_time: { type: Date, select: true },
    add_time: {type: Date, default: Date.now, select: true}
  });

  return mongoose.model('Action', ActionSchema, 'Action');
};
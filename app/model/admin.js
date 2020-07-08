'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  let d = new Date();

  const AdminSchema = new Schema({
    username: { type: String, required: true, select: true },
    password: { type: String, required:true, select: false },
    mobile: { type: String, select: true },
    email: { type: String, select: true },
    status: { type: Number, enum: [1, 2], default: 1, select: true },
    role_id: { type: Schema.Types.ObjectId, ref:'Role', select: true }, // 角色id
    added_by: {type: Schema.Types.ObjectId, ref:'Admin', select: true}, 
    update_time: { type: Date, select: true },
    add_time: {type: Date, default: Date.now, select: true},
    is_super: { type: Number, enum: [0, 1], default: 0, select: false }, // 是否是超级管理员 1表示超级管理员
  });

  return mongoose.model('Admin', AdminSchema, 'admin');
};
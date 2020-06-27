'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  let d = new Date();

  const AdminSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required:true },
    mobile: { type: String },
    email: { type: String },
    status: { type: Number, default: 1 },
    role_id: { type: Schema.Types.ObjectId, ref:'Role' }, // 角色id
    add_time: {type: Date, default: Date.now},
    is_super: { type: Number, enum: [0, 1], default: 0 }, // 是否是超级管理员 1表示超级管理员
  });

  return mongoose.model('Admin', AdminSchema, 'admin');
};
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const d = new Date();

  const RoleSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: { type: Number, enum: [1, 2], default: 1 },
    added_by: {type: Schema.Types.ObjectId, ref:'Admin' }, 
    add_time: { type: Date, default: Date.now },
  });
  return mongoose.model('Role', RoleSchema, 'role');
};

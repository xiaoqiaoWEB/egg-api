'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const RoleMenuSchema = new Schema({
    role_id: {type: Schema.Types.ObjectId, ref:'Role' },
    menu_id: {type: Schema.Types.ObjectId, ref:'Menu' }
  });
  
  return mongoose.model('RoleMenu', RoleMenuSchema, 'role_menu');
};

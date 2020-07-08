'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  async create(data) {
    const { ctx, service } = this
    let {title} = data;
    let role = await ctx.model.Role.findOne({title});
    if (role) { ctx.throw(409, '角色名已存在') };
    return await new ctx.model.Role(data).save();
  }

  async getById(id) {
    const { ctx, service } = this
    let user = await ctx.model.Role.findById(id);
    if (!user) { ctx.throw(409, '角色不存在！') };
    return user;
  }

  async update(id, data) {
    const { ctx, service } = this;
    let user = ctx.model.Role.findByIdAndUpdate(id, data);
    if (!user) { ctx.throw(409, '角色名已存在') }
    return user;
  }

  async remove (id) {
    const { ctx, service } = this;
    let user = await ctx.model.Role.findByIdAndDelete(id);
    if (!user) { ctx.throw(409, '角色不存在！') };
  }

  async roleMenu (data) {
    console.log(data, 'AAAA')
    const { ctx, service } = this;
    let role_id = data.role_id;
    let menu_list = data.menu_list;
    let roleList = await ctx.model.RoleMenu.find({role_id});
    
    for (var i=0; i<roleList.length; i++) {
      await ctx.model.RoleMenu.findOneAndDelete({'menu_id': roleList[i].menu_id})
    }

    for (var i=0; i<menu_list.length; i++) {
      await new ctx.model.RoleMenu({
        role_id,
        menu_id: menu_list[i]
      }).save();
    }
    return {}
  }
}

module.exports = RoleService;

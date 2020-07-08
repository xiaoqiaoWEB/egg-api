'use strict';

const Service = require('egg').Service;
const md5 = require('md5');

class UserService extends Service {
  async create(data) {
    const { ctx, service } = this
    let {username, password} = data;
    let user = await ctx.model.Admin.findOne({username});
    if (user) { ctx.throw(409, '用户名已存在') };
    let pwd = md5(password);
    data.password = pwd;
    return await new ctx.model.Admin(data).save();
  }

  async getById(id) {
    const { ctx, service } = this
    let user = await ctx.model.Admin.findById(id).populate('role_id');
    if (!user) { ctx.throw(409, '用户不存在！') };
    return user;
  }

  async update(id, data) {
    const { ctx, service } = this;
    let user = ctx.model.Admin.findByIdAndUpdate(id, data);
    if (!user) { ctx.throw(409, '用户名已存在') }
    return user;
  }

  async remove (id) {
    const { ctx, service } = this;
    let user = await ctx.model.Admin.findByIdAndDelete(id);
    if (!user) { ctx.throw(409, '用户不存在！') };
  }
}

module.exports = UserService;

'use strict';

const Service = require('egg').Service;

class ActionService extends Service {
  async list(data) {
    const { ctx, service } = this
    let { pre_page = 5 } = data;
    let page = Math.max(data.page * 1, 1) - 1;
    let prePage = Math.max(pre_page * 1, 1);

    let searchData = {
      action_name: {$regex: new RegExp(data.action_name, 'i')}
    };
    
    for ( var attr in data) {
      if (attr === 'status' && data.status) {
        searchData.status = data.status
      } else {
        delete searchData.status
      }
    }

    let total = await ctx.model.Action
      .find({ $or: [ searchData ] })
      .count();

    let res = await ctx.model.Action
      .find({ $or: [ searchData ] })
      .limit(prePage)
      .skip(prePage*page)
      .sort({'add_time': -1})
      .populate('added_by menu_id');
    
    let obj = {
      total: total,
      page: page+1,
      pre_page: prePage,
      list: res
    }

    return obj;
  }

  async create(data) {
    const { ctx, service } = this
    let action_code = data.action_code;
    let action = await ctx.model.Action.findOne({action_code});
    if (action) { ctx.throw(409, '权限编码已存在')};
    return await new ctx.model.Action(data).save();
  }

  async getById(id) {
    const { ctx, service } = this
    let action = await ctx.model.Action.findById(id).populate('added_by menu_id');
    if (!action) { ctx.throw(409, '此权限不存在！') };
    return action;
  }

  async update(id, data) {
    const { ctx, service } = this;
    let action = ctx.model.Action.findByIdAndUpdate(id, data);
    if (!action) { ctx.throw(409, '权限不存在') }
    return action;
  }
}

module.exports = ActionService;

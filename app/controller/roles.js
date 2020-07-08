'use strict';

const Controller = require('egg').Controller;

class RolesController extends Controller {

  constructor (ctx) {
    super(ctx)
    this.testRole = {
      title: { type: 'string', required: true }
    }
  }

  async index() {
    const { ctx, app } = this;
    let { pre_page = 5 } = ctx.request.body;
    let page = Math.max(ctx.request.body.page * 1, 1) - 1;
    let prePage = Math.max(pre_page * 1, 1);

    let searchData = {
      title: {$regex: new RegExp(ctx.request.body.title, 'i')}
    };

    for ( var attr in ctx.request.body) {
      if (attr === 'status' && ctx.request.body.status) {
        searchData.status = ctx.request.body.status
      } else {
        delete searchData.status
      }
    }

    let total = await ctx.model.Role
      .find({ $or: [ searchData ] })
      .count();

    let res = await ctx.model.Role
      .find({ $or: [ searchData ] })
      .limit(prePage)
      .skip(prePage*page)
      .sort({'add_time': -1})
      .populate('added_by');
    
    let data = {
      total: total,
      page: page+1,
      pre_page: prePage,
      list: res
    }
    ctx.helper.success({ctx, res: data})
  }

  async create() {
    const { ctx, app } = this;
    ctx.validate(this.testRole);
    let data = ctx.request.body || {};
    data.added_by = ctx.state.user.userId;
    let res = await ctx.service.role.create(data);
    ctx.helper.success({ctx, res});
  }

  async getById() {
    const { ctx, app } = this;
    let id = ctx.params.id;
    let res = await ctx.service.role.getById(id);
    ctx.helper.success({ctx, res});
  }

  async update() {
    const { ctx, app } = this;
    ctx.validate(this.testRole);
    let id = ctx.params.id;
    let data = ctx.request.body;
    await ctx.service.role.update(id, data);
    ctx.helper.success({ctx, res:null});
  }

  async remove() {
    const { ctx, app } = this;
    let id = ctx.params.id;
    await ctx.service.role.remove(id);
    ctx.helper.success({ctx, res:null});
  }
}

module.exports = RolesController;

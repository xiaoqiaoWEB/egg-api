'use strict';

const Controller = require('egg').Controller;

class ActionController extends Controller {

  constructor(ctx) {
    super(ctx)
    this.testData = {
      action_code: { type: 'string', required: true },
      action_name: { type: 'string', required: true },
      menu_id: { type: 'string', required: true }
    }

    this.testUpData = {
      action_name: { type: 'string', required: true }
    }
  }

  async index() {
    const { ctx, app } = this;
    let data = ctx.request.body || {};
    let res = await ctx.service.action.list(ctx.request.body);
    ctx.helper.success({ctx, res})
  }

  async create() {
    const { ctx, app } = this;
    ctx.validate(this.testData);
    let data = ctx.request.body || {};
    data.added_by = ctx.state.user.userId;
    let res = await ctx.service.action.create(data);
    ctx.helper.success({ctx, res});
  }

  async getById() {
    const { ctx, app } = this;
    let id = ctx.params.id;
    let res = await ctx.service.action.getById(id);
    ctx.helper.success({ctx, res});
  }

  async update() {
    const { ctx, app } = this;
    ctx.validate(this.testUpData);
    let id = ctx.params.id;
    let data = ctx.request.body;
    await ctx.service.action.update(id, data);
    ctx.helper.success({ctx, res:null});
  }
}

module.exports = ActionController;

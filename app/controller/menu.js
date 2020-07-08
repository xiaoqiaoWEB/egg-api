'use strict';

const Controller = require('egg').Controller;

class MenuController extends Controller {
  
  constructor(ctx) {
    super(ctx)
    this.testAddData = {
      menu_code: { type: 'string', required: true },
      menu_name: { type: 'string', required: true}
    }
  }

  async index () {
    const { ctx, app } = this;
    let res = await ctx.service.menu.list();
    ctx.helper.success({ctx, res});
  }

  async create() {
    const { ctx, app } = this;
    ctx.validate(this.testAddData);
    let data = ctx.request.body || {};
    data.added_by = ctx.state.user.userId;
    let res = await ctx.service.menu.create(data);
    ctx.helper.success({ctx, res});
  }

  async getById() {
    const { ctx, app } = this;
    let id = ctx.params.id;
    let res = await ctx.service.menu.getById(id);
    ctx.helper.success({ctx, res});
  }

  async update() {
    const { ctx, app } = this;
    ctx.validate(this.testAddData);
    let id = ctx.params.id;
    let data = ctx.request.body;
    await ctx.service.menu.update(id, data);
    ctx.helper.success({ctx, res:null});
  }
}

module.exports = MenuController;

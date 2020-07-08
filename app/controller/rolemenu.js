'use strict';

const Controller = require('egg').Controller;

class RolemenuController extends Controller {
  async menu () {
    const { ctx, app } = this;
    let data = ctx.request.body;
    let res = await ctx.service.role.roleMenu(data)
    ctx.helper.success({ctx, res:null});
  }
}

module.exports = RolemenuController;

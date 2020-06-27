'use strict';
let md5 = require('md5');

const Controller = require('egg').Controller;

class AdminController extends Controller {

  constructor(ctx) {
    super(ctx);

    this.userTest = {
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    }
  }


  async index() {
    const { ctx, app } = this;
    let res = await ctx.model.Admin.find();
    ctx.helper.success({ctx, res})
  }

  async login() {
    const { ctx, app } = this;
    ctx.validate(this.userTest);
    let user = await ctx.model.Admin.findOne({'username': ctx.request.body.username});
    if (!user) { ctx.throw(404, '用户名不存在或错误！') }
    let password = md5(ctx.request.body.password);
    if(password == user.password) {
      const token = app.jwt.sign({
        username: user.username,
        userId: user._id,
        role_id: user.role_id
      }, app.config.jwt.secret,{
        expiresIn: app.config.jwt.expiresIn
      });
      let res = {
        username: user.username,
        userId: user._id,
        role_id: user.role_id,
        token
      }
      ctx.helper.success({ctx, res})
    } else {
      ctx.throw(404, '密码不正确!')
    }
  }
}

module.exports = AdminController;

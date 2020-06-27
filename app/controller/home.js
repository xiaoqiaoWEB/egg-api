'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    ctx.body = 'hi egg';
  }

  async login() {
    const { ctx, app } = this;

    let {username, password} = ctx.request.body;

    let user = await ctx.model.Admin.find({"username": username});

    if(user) {

      console.log('B')
      const token = app.jwt.sign({
        username,
        userId: user._id,
      }, app.config.jwt.secret,{
        expiresIn: app.config.jwt.expiresIn
      });

      ctx.body = {
        code: 200,
        message: '登陆成功！',
        result: {
          token,
          username: username,
          role_id: user[0].role_id
        }
      };
    } else {
      ctx.body = '登陆失败！'
    }
  }
}

module.exports = HomeController;

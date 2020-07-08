'use strict';
let md5 = require('md5');

const Controller = require('egg').Controller;

class AdminController extends Controller {

  constructor(ctx) {
    super(ctx)
    this.userTest = {
      username: { type: 'string', required: true },
      password: { type: 'string', required: true }
    }

    this.testUserName = {
      username: { type: 'string', required: true }
    }
  }

  async index() {
    const { ctx, app } = this;
    let { fileds = '', pre_page = 5} = ctx.request.body;
    let page = Math.max(ctx.request.body.page * 1, 1) - 1;
    let prePage = Math.max(pre_page * 1, 1);

    let searchData = {
      username: {$regex: new RegExp(ctx.request.body.username, 'i')}
    };

    for ( var attr in ctx.request.body) {
      if (attr === 'status' && ctx.request.body.status) {
        searchData.status = ctx.request.body.status
      } else {
        delete searchData.status
      }
    }

    let total = await ctx.model.Admin
      .find({ $or: [ searchData ] })
      .count();

    let res = await ctx.model.Admin
      .find({ $or: [ searchData ] })
      .limit(prePage)
      .skip(prePage*page)
      .populate('role_id')
      .sort({'add_time': -1});
    
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
    ctx.validate(this.userTest);
    let data = ctx.request.body || {};
    data.added_by = ctx.state.user.userId;
    let res = await ctx.service.user.create(data);
    ctx.helper.success({ctx, res});
  }

  async getById() {
    const { ctx, app } = this;
    let id = ctx.params.id;
    let res = await ctx.service.user.getById(id);
    ctx.helper.success({ctx, res});
  }

  async update() {
    const { ctx, app } = this;
    ctx.validate(this.testUserName);
    let id = ctx.params.id;
    let data = ctx.request.body;
    await ctx.service.user.update(id, data);
    ctx.helper.success({ctx, res:null});
  }

  async remove() {
    const { ctx, app } = this;
    let id = ctx.params.id;
    await ctx.service.user.remove(id);
    ctx.helper.success({ctx, res:null});
  }

  async login() {
    const { ctx, app } = this;
    ctx.validate(this.userTest);
    let user = await ctx.model.Admin.findOne({'username': ctx.request.body.username}).select('password');
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
        access_token: token,
        timpedate: new Date().getTime(),
        token_type: 'bearer',
        expires_in: app.config.jwt.expiresIn,
        timestamp: new Date().getTime()
      }
      ctx.helper.success({ctx, res})
    } else {
      ctx.throw(409, '密码不正确!')
    }
  }
}

module.exports = AdminController;

'use strict';

const Service = require('egg').Service;

class MenuService extends Service {
  async list() {
    const { ctx, service } = this
    let arr = await ctx.model.Menu.aggregate([
      {
        $lookup: {
          from: 'menu',
          localField: '_id',
          foreignField: 'pid',
          as: 'children',
        },
      },
      {
        $match: {
          pid: 0,
        },
      },
      {
        $sort: {
          sort: 1
        }
      }
    ]);

    for (var i=0; i<arr.length; i++) {
      let children = await ctx.model.Menu.aggregate([
        {
          $lookup: {
            from: 'menu',
            localField: '_id',
            foreignField: 'pid',
            as: 'children',
          },
        },
        {
          $match: {
            pid: arr[i]._id,
          },
        },
        {
          $sort: {
            sort: -1
          }
        }
      ])
      arr[i].children = children;
    }
    return arr;
  }

  async create(data) {
    const { ctx, service } = this
    let menu_code = data.menu_code;
    let menu = await ctx.model.Menu.findOne({menu_code});
    if (menu) { ctx.throw(409, '菜单编码已存在')};
    data.pid = data.pid == 0 ? 0 : this.app.mongoose.Types.ObjectId(data.pid);
    return await new ctx.model.Menu(data).save();
  }

  async getById(id) {
    const { ctx, service } = this
    let menu = await ctx.model.Menu.findById(id);
    if (!menu) { ctx.throw(409, '菜单不存在！') };
    return menu;
  }

  async update(id, data) {
    const { ctx, service } = this;
    let li = ctx.model.Menu.findByIdAndUpdate(id, data);
    if (!li) { ctx.throw(409, '菜单ID不存在') }
    return li;
  }
}

module.exports = MenuService;

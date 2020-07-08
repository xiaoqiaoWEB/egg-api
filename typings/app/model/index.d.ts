// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAction = require('../../../app/model/action');
import ExportAdmin = require('../../../app/model/admin');
import ExportMenu = require('../../../app/model/menu');
import ExportRole = require('../../../app/model/role');
import ExportRoleMenu = require('../../../app/model/role_menu');

declare module 'egg' {
  interface IModel {
    Action: ReturnType<typeof ExportAction>;
    Admin: ReturnType<typeof ExportAdmin>;
    Menu: ReturnType<typeof ExportMenu>;
    Role: ReturnType<typeof ExportRole>;
    RoleMenu: ReturnType<typeof ExportRoleMenu>;
  }
}

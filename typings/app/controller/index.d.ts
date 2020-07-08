// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAction = require('../../../app/controller/action');
import ExportAdmin = require('../../../app/controller/admin');
import ExportHome = require('../../../app/controller/home');
import ExportMenu = require('../../../app/controller/menu');
import ExportRolemenu = require('../../../app/controller/rolemenu');
import ExportRoles = require('../../../app/controller/roles');

declare module 'egg' {
  interface IController {
    action: ExportAction;
    admin: ExportAdmin;
    home: ExportHome;
    menu: ExportMenu;
    rolemenu: ExportRolemenu;
    roles: ExportRoles;
  }
}

'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller, jwt} = app;
  router.post('/admin/login', controller.admin.login);
  router.post('/admin/user/list', jwt, controller.admin.index);
  router.put('/admin/user', jwt, controller.admin.create);
  router.get('/admin/user/:id', jwt, controller.admin.getById);
  router.post('/admin/user/:id', jwt, controller.admin.update);
  router.delete('/admin/user/:id', jwt, controller.admin.remove);

  router.post('/admin/role/list', jwt, controller.roles.index);  
  router.put('/admin/role', jwt, controller.roles.create);
  router.get('/admin/role/:id', jwt, controller.roles.getById);
  router.post('/admin/role/:id', jwt, controller.roles.update);
  router.delete('/admin/role/:id', jwt, controller.roles.remove);
  router.post('/admin/rolemenu', jwt, controller.rolemenu.menu);
  

  router.get('/admin/menu', jwt, controller.menu.index);
  router.put('/admin/menu', jwt, controller.menu.create);
  router.get('/admin/menu/:id', jwt, controller.menu.getById);
  router.post('/admin/menu/:id', jwt, controller.menu.update);

  router.post('/admin/action/list', jwt, controller.action.index);
  router.put('/admin/action', jwt, controller.action.create);
  router.get('/admin/action/:id', jwt, controller.action.getById);
  router.post('/admin/action/:id', jwt, controller.action.update);
};

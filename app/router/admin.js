'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller, jwt} = app;

  router.post('/admin/login', controller.admin.login);
  router.get('/admin/user', jwt, controller.admin.index);
  router.post('/admin/user/create', jwt, controller.admin.create);
  router.get('/admin/user/:id', jwt, controller.admin.getById);
  router.put('/admin/user/:id', jwt, controller.admin.update);
};

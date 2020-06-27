'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller, jwt} = app;
  router.get('/admin', jwt, controller.admin.index);
  router.post('/admin/login', controller.admin.login);
};

/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1593253833097_6738';

  // mongose
  config.mongoose = { url: 'mongodb://127.0.0.1/apishop' };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // 应许 访问的白名单
    domainWhiteList: ['http://localhost:8080'],
  };

  // jwt
  config.jwt = {
    secret: 'XIAOQIAO',
    expiresIn: '1d'
  };

   // cors
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // add your middleware config here
  config.middleware = ['errorHandler'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

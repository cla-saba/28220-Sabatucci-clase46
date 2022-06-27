const Koa = require('koa');
const { Server: Httperver } = require('http');

const app = Koa();
const httpServer = new Httperver(app);

module.exports = { app, httpServer };
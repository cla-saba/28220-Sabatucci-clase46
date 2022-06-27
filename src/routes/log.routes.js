const Koa = require('koa');
const logRouter = Koa.Router();

logRouter.post('/login', ctx => {
  if (ctx.session.contador) {
    ctx.session.contador++;
    res.send(`${ctx.session.nombre} visitaste la página ${ctx.session.contador} veces.`)
  }
  else {
    const nombre = ctx.body.nombre;
    ctx.session.nombre = nombre
    ctx.session.contador = 1
    ctx.send(`Te damos la bienvenida ${nombre}`)
  }
})

logRouter.post('/logout', ctx => {
  const nombre = ctx.session.nombre;
  ctx.session.destroy(err => {
    if (!err) {
      res.send({ mensaje: `${nombre} ha sido deslogueado.` })
    }
    else {
      ctx.send(err);
    }
  })
})

module.exports = logRouter;
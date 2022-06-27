const Router = require('koa-router');
const productRouter = express.Router();
const { faker } = require('@faker-js/faker');
const ProductsMemo = require('../api/productsMemo')
const io = require('../socket')
const apiProducts = new ProductsMemo();
const router = new Router({
  prefix: '/productos'
})

router.post('/', ctx => {
  const product = ctx.body;
  apiProducts.addProduct(product);
  ctx.redirect('/');
})

router.get('/', ctx => {
  const prods = apiProducts.listAll()
  res.render("view", {
    products: prods,
    productsLength: prods.length,
  });
});

router.get('/test', async ctx => {
  for (let i = 0; i < 5; i++) {
    apiProducts.addProduct({
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      thumbnail: faker.image.avatar()
    });
  }

  io.emit('productos', apiProducts.listAll());
  res.json("Todo OK");
});

module.exports = productRouter;
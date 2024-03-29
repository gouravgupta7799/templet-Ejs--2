const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/dataBase');
const Product = require('./models/product');
const User = require('./models/user');
const cart = require('./models/cart');
const cartItem = require('./models/cart-Item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user
      next()
    })
    .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(cart);
cart.belongsTo(User);
cart.belongsToMany(Product,{through:cartItem})
Product.belongsToMany(cart, { through: cartItem })

sequelize
  // .sync({force:true})
  .sync()
  .then(result => {
    return User.findByPk(1)
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'user', email: 'user@gmail.com' })
    }
    return Promise.resolve(user);
  })

  .then(user => {
    return user.createCart()
  })
  .then(user => {
    // console.log(user)
    app.listen(4000);
  })
  .catch(err => console.log(err))
  


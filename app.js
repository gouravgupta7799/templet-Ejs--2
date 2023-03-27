const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/dataBase');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// app.use((req, res, next)=> {
//   user.findByPk(1)
// })

app.use(errorController.get404);

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
sequelize.sync()
  // .then(result => {
  //   User.findById(1)
  // })
  // .then(user => {
  //   if (!user) {
  //     return user.create({ name: 'user', email: 'user@gmail.com' })
  //   }
  //   return Promise.resolve(user);
  // })
  .then(user => {
    // console.log(user)
  })
  .catch(err => console.log(err))
  app.listen(4000);


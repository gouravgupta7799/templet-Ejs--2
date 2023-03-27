const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
    .then(result => {
      // console.log(result)
      console.log('created product')
      res.redirect('/products')
    })
    .catch(err => console.log(err))
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/')
  }
  let prodId = req.params.productId;
  req.user
    .getProducts({ WHERE: { id: prodId } })
  // Product.findByPk(prodId)
    .then(prods => {
      let prod = prods[0]
      if (!prod) {
        return res.redirect('/')
      }
      res.render('admin/edit-product', {
        pageTitle: 'edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: prod
      });
    })
    .catch(err => console.log(err))
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescriptione = req.body.description;
  Product.findByPk(prodId)
    .then(product => { 
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescriptione;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then(result => {
      console.log('updated product')
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}


exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then(prod => {
      res.render('admin/products', {
        prods: prod,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err))
};

exports.postdeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy()
    })
    .then(rssult => {
      console.log('delete product')
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}
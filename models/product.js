const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        let existProductINdex = products.findIndex(prod => prod.Id === this.id)
        let updateProduct = [...products];
        updateProduct[existProductINdex] = this;
        fs.writeFile(p, JSON.stringify(updateProduct), err => {
          console.log(err);
        });
      }
      else {
        this.Id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => { return p.Id === id })
      cb(product);
    })
  }
  static deleteProduct(id) {
    getProductsFromFile(products => {
      const updatedProd = [];
      for (let x of products) {
        if (x.id !== id) {
          updatedProd.push(x);
        }
      }
      fs.writeFile(p, JSON.stringify(updatedProd), err => console.log(err))
    })
  }
};


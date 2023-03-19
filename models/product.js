// const fs = require('fs');
// const path = require('path');
const db = require('../util/dataBase');
// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // getProductsFromFile(products => {
    //   if (this.id) {
    //     let existProductINdex = products.findIndex(prod => prod.Id === this.id)
    //     let updateProduct = [...products];
    //     updateProduct[existProductINdex] = this;
    //     fs.writeFile(p, JSON.stringify(updateProduct), err => {
    //       console.log(err);
    //     });
    //   }
    //   else {
    //     this.Id = Math.random().toString();
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), err => {
    //       console.log(err);
    //     });
    //   }
    // });
    return db.execute(`INSERT INTO Products (price,description,imgurl,title) values(?,?,?,?)`,[this.price,this.description,this.imageUrl,this.title])
  }

  static fetchAll() {
    //   getProductsFromFile(cb);
    return db.execute('SELECT * FROM Products')

  }

  static findById(id, cb) {
    //   getProductsFromFile(products => {
    //     const product = products.find(p => { return p.Id === id })
    //     cb(product);
    // })
    return db.execute(`SELECT * FROM Products WHERE Products.id = ?`,[id])
  }
  static deleteProduct(id) {
    //   getProductsFromFile(products => {
    //     const updatedProd = [];
    //     for (let x of products) {
    //       if (x.id !== id) {
    //         updatedProd.push(x);
    //       }
    //     }
    //     fs.writeFile(p, JSON.stringify(updatedProd), err => console.log(err))
    //   })
    return db.execute(`DELETE FROM Products WHERE Products.id = ?`, [id])
  }
};


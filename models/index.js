// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  // foreignKey: 'product_id', // i havent tried this line yet, but its an extra idea i might need
  through: {
    model: ProductTag,
    unique: false,
  },
  as: 'products_tagged'
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  // foreignKey: 'tag_id', // same here
  through: {
    model: ProductTag,
    unique: false,
  },
  as: 'tagged_products'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

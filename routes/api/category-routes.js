const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name']
      },
    ]
  })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ['id','product_name', 'price', 'stock']
       },
    ]
  })
  .then(data => {
    if (!data) {
      res.status(404).json({ message: 'No Category found with this id' });
      return;
    }
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then(updatedCategory => {  
    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'No Category with this id.' });
      return;
    }
    res.status(200).json(updatedCategory);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then(deletedCategory => {
    if (!deletedCategory) {
      res.status(404).json({ message: "No Category with this id."});
    };
    res.status(200).json(deletedCategory);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;

const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const getCategories = await Category.findAll().catch((err) => {
    res.status(500).json(err);
  });
  res.status(200).json(getCategories);
  

  // be sure to include its associated Products
  // i did not include the associated products yet, maybe later
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  const getCategory = await Category.findByPk(req.params.id).catch((err) => {
    res.status(500).json(err);
  });
  res.status(200).json(getCategory);


  // be sure to include its associated Products
  // i did not include the associated products yet, maybe later
});

router.post('/', (req, res) => {
  // create a new category
  const newCategory = await Category.create(req.body).catch((err) => {
    res.status(500).json(err);
  });
  res.status(200).json(newCategory);
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedCategory[0]) {
      res.status(400).json({ message: 'No Category with this id.' });
      return;
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCategory) {
      res.status(404).json({ message: "No Category with this id."});
    }
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

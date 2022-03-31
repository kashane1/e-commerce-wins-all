const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/',  (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  Tag.findAll({
    // really strugglign with this, tag doesnt have any references, so i know i have to go through ProductTag
    // cant seem to get anything to work
    // include: [
    //   {
    //     model: Product,
    //     attributes: ['product_name']
    //   },
    // ]
  })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  Tag.findByPk(req.params.id, {
    // include: [
    //   {
    //     model: Product,
    //     attributes: ['id','product_name', 'price', 'stock']
    //    },
    // ]
  })
  .then(data => {
    if (!data) {
      res.status(404).json({ message: 'No Tag found with this id' });
      return;
    }      
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json(err);
  });  

});

router.post('/', (req, res) => {
  // create a new tag

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;

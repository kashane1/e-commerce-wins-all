const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/',  (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  Tag.findAll({
    // really strugglign with this, tag doesnt have any references, so i know i have to go through ProductTag
    // cant seem to get the through: ProductTag, line to work
    attributes: ["id", "tag_name"],
    // include: [
    //   {
    //     model: Product,
    //     attributes: ["id", "product_name", "price", "stock", "category_id"],
    //     through: ProductTag,
    //     as: "products",
    //   },
    // ],
    // new idea, maybe try to tame some of the code from the create new product which was given to us
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
    // will definitely need help trying to figure this out
    // include: [
    //   {
    //     model: Product,
    //     through: ProductTag,
    //     attributes: ['id','product_name', 'price', 'stock']
    //    },
    // ]
    attributes: ["id", "tag_name"],
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
  // grabbed this example from product-routes.js
  /* req.body should look like this...
    {
      tag_name: "hip hop culture",
      productIds: [1, 2, 3, 4]
    }
  */
    Tag.create(req.body)
    .then((tag) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      // adjusted this from the product-routes.js
      if (req.body.productIds.length) {
        const productTagIdArr = req.body.productIds.map((product_id) => {
          return {
            tag_id: tag.id,
            product_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(tag);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      // find all associated products from ProductTag
      return ProductTag.findAll({ where: { tag_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of all current product_ids
      const productTagIds = productTags.map(({ product_id }) => product_id);
      // create filtered list of new product_ids
      const newProductTags = req.body.productIds
        .filter((product_id) => !productTagIds.includes(product_id))
        .map((product_id) => {
          return {
            tag_id: req.params.id,
            product_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ product_id }) => !req.body.productIds.includes(product_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then(deletedTag => {
    if (!deletedTag) {
      res.status(404).json({ message: "No Tag with this id."});
    };
    res.status(200).json(deletedTag);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;

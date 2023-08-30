const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const alltags = await Tag.findAll({
      include: [{model: Product, through: ProductTag}]
    })
    res.status(200).json(alltags)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const onetag = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag}]
    })
    res.status(200).json(onetag)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const newtag = await Tag.create(req.body)
    res.status(200).json(newtag)
   } catch (error) {
     res.status(500).json(error)
   }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatetag = await Tag.update(req.body,{
      where:{
        id: req.params.id
      }
    });
res.status(200).json(updatetag)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const deletetag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deletetag)
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;

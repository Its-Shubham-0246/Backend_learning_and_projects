const express = require('express');
const router = express.Router();
const {
  getProducts,
  rate,
  ratings
} = require('../controllers/productController');

router.get('/products',getProducts);
router.post('/rate',rate);
router.get('/ratings',ratings);

module.exports = router;
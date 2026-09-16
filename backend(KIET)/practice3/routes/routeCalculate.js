const express = require('express');

const router = express.Router();

router.get('/square/area', (req,res) => {
  const width = req.query.width;
  const area = width * width;
  return res.json({area});
})

router.get('/square/parameter',(req,res) =>{
  const width = req.query.width;
  const parameter = 4 * width;
  return res.json({parameter});
})

router.get('/rectangle/area',(req,res) => {
  const width = parseInt(req.query.width);
  const length = parseInt(req.query.height);
  area = length * width;
  return res.json({area});
})

router.get('/rectangle/parameter',(req,res) => {
  const width = parseInt(req.query.width);
  const length = parseInt(req.query.height);
  const parameter = 2 * (width + length);
  return res.json({parameter});
})

export default router;
const products = require('../data/products');


const getProducts = (req,res) => {
  res.status(200).json({
    message:"Products retrieved successfully",
    products:products
  });
}

const rate = (req,res) => {
  const {productId,rating} = req.body;
  if(productId === undefined || rating === undefined){
    return res.status(400).json({
      message:"productId and rating are required"
  });
  }

  const product = products.find(product => product.id === Number(productId));

  if(!product){
    return res.status(404).json({
      message:"Product not found"
    });
  }
   if(rating < 1 || rating > 5){
    return res.status(400).json({
      message:"Rating must be between 1 and 5"
    });
   }
  product.countRate++;
  product.totalRate += rating;
  product.averageRate = product.totalRate/product.countRate;
  res.status(200).json({
    message:"Products ratings retrieved successfully",
    product
  });
}

const ratings = (req,res) => {
  const productsData = products.map((product) => ({
    productId:product.id,
    productName:product.item,
    ratingCount:product.countRate,
    averageRating:product.averageRate
  }));
  res.status(200).json({
    message:"Product ratings retrieved successfully",
    productsData
  })
}

module.exports = {
  getProducts,
  rate,
  ratings
}
const express = require("express");
const { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById} = require("./controllers");

const router = express.Router();

router.route("/products")
    // Create a new product
    .get(getAllProducts)
    // Get all products
    .post(createProduct);
router.route("/products/:id")
    // Get a product by ID
    .get(getProductById)
    // Update a product by ID
    .put(updateProductById)
    // Delete a product by ID
    .delete(deleteProductById)
// Export the router
module.exports = router;
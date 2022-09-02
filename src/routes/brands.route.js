const router = require('express').Router();
const brandsController = require('../controllers/brands.controller')
const { validator, brandRules } = require("../middlewares/validator.middleware")

/**
    * @openapi
    * /brands:
    *   get:
    *     tags: [brands]
    *     summary: returns all brands
    *     responses:
    *        '200':    
    *            description: A JSON with array of available brands
    *        '500':
    *            description: internal server error
    *   post:
    *       tags: [brands]
    *       summary: add a new brand
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                    schema:
    *                        type: object
    *                        properties:
    *                            brand_name:
    *                                type: string
    *       responses:
    *           '201':    
    *               description: brand created
    *           '409':
    *               description: brand already exists
    *           '500':
    *               description: internal server error
    * 
    * 
    * /brands/{brandId}:
    *    delete:
    *       tags: [brands]
    *       summary: delete a brand
    *       parameters:
    *         - name: brandId
    *           in: path
    *           required: true
    *           description: the id of the brand to delete 
    *       responses:
    *           '200':    
    *               description: brand deleted
    *           '404':
    *               description: brand doesn't exist
    *           '500':
    *               description: internal server error
    * 
    *    patch:
    *       tags: [brands]
    *       summary: update a brand
    *       parameters:
    *         - name: brandId
    *           in: path
    *           required: true
    *           description: the id of the brand to update
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                    schema:
    *                        type: object
    *                        properties:
    *                            brand_name:
    *                                type: string 
    *       responses:
    *           '200':    
    *               description: brand updated
    *           '404':
    *               description: brand doesn't exist
    *           '409':
    *               description: brand already exists
    *           '500':
    *               description: internal server error
    *          
    */


router.route('/')
    .get(brandsController.index)
    .post(brandRules(), validator, brandsController.create)

router.route('/:id')
    .delete(brandsController.destroy)
    .patch(brandRules(), validator, brandsController.update)

module.exports = router
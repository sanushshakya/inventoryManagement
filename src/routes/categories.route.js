const router = require('express').Router();
const { categoryRules, validator } = require('../middlewares/validator.middleware')
const categoriesController = require('../controllers/categories.controller')

/**
    * @openapi
    * /categories:
    *   get:
    *     tags: [categories]
    *     summary: returns all categories
    *     responses:
    *        '200':    
    *            description: A JSON with array of available categories
    *        '500':
    *            description: internal server error
    *   post:
    *       tags: [categories]
    *       summary: add a new category
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                    schema:
    *                        type: object
    *                        properties:
    *                            category_type:
    *                                type: string
    *       responses:
    *           '201':    
    *               description: category created
    *           '409':
    *               description: category already exists
    *           '500':
    *               description: internal server error
    * 
    * 
    * /categories/{categoryId}:
    *    delete:
    *       tags: [categories]
    *       summary: delete a category
    *       parameters:
    *         - name: categoryId
    *           in: path
    *           required: true
    *           description: the id of the category to delete 
    *       responses:
    *           '200':    
    *               description: category deleted
    *           '404':
    *               description: category doesn't exist
    *           '500':
    *               description: internal server error
    * 
    *    patch:
    *       tags: [categories]
    *       summary: update a category
    *       parameters:
    *         - name: categoryId
    *           in: path
    *           required: true
    *           description: the id of the category to update
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                    schema:
    *                        type: object
    *                        properties:
    *                            category_type:
    *                                type: string 
    *       responses:
    *           '200':    
    *               description: category updated
    *           '404':
    *               description: category doesn't exist
    *           '409':
    *               description: category already exists
    *           '500':
    *               description: internal server error
    *          
    */

router.route('/')
    .get(categoriesController.index)
    .post(categoryRules(), validator, categoriesController.create)

router.route('/:id')
    .delete(categoriesController.destroy)
    .patch(categoryRules(), validator, categoriesController.update)

module.exports = router
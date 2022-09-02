const router = require('express').Router();
const upload = require('../middlewares/multer.middleware')
const itemsController = require('../controllers/items.controller')
const { validator, itemRules } = require('../middlewares/validator.middleware')

/**
    * @openapi
    * /items:
    *   get:
    *     tags: [items]
    *     summary: returns all items
    *     responses:
    *        '200':    
    *            description: A JSON with array of available items
    *        '500':
    *            description: internal server error
    *   post:
    *       tags: [items]
    *       summary: add a new item
    *       requestBody:
    *           required: true
    *           content:
    *               multipart/form-data:
    *                    schema:
    *                        type: object
    *                        properties:
    *                            category_id:
    *                                type: integer
    *                            brand_id:
    *                                type: integer
    *                            name:
    *                                type: string
    *                            sku_code:
    *                                type: integer
    *                            description:
    *                                type: string
    *                            image:
    *                                type: string
    *                                format: binary
    * 
    *       responses:
    *           '201':    
    *               description: item created
    *           '400':
    *               description: file upload error
    *           '404':
    *               description: requested brand or category doesn't exist
    *           '500':
    *               description: internal server error
    * 
    * 
    * /items/{itemId}:
    *    delete:
    *       tags: [items]
    *       summary: delete a item
    *       parameters:
    *         - name: itemId
    *           in: path
    *           required: true
    *           description: the id of the item to delete 
    *       responses:
    *           '200':    
    *               description: item deleted
    *           '404':
    *               description: item doesn't exist
    *           '500':
    *               description: internal server error
    * 
    *    patch:
    *       tags: [items]
    *       summary: update an item
    *       parameters:
    *         - name: itemId
    *           in: path
    *           required: true
    *           description: the id of the items to update
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                    schema:
    *                        type: object
    *                        properties:
    *                            category_id:
    *                                type: integer
    *                            brand_id:
    *                                type: integer
    *                            name:
    *                                type: string
    *                            sku_code:
    *                                type: integer
    *                            description:
    *                                type: string
    *       responses:
    *           '200':    
    *               description: item updated
    *           '404':
    *               description: item doesn't exist,requested brand or category doesn't exits
    *           '500':
    *               description: internal server error
    * 
    * /items/updateimage/{itemId}:
    *    patch:
    *       tags: [items]
    *       summary: update image an item
    *       parameters:
    *         - name: itemId
    *           in: path
    *           required: true
    *           description: the id of the item to update image
    *       requestBody:
    *           required: true
    *           content:
    *               multipart/form-data:
    *                    schema:
    *                        type: object
    *                        properties:
    *                            image:
    *                                type: string
    *                                format: binary
    *       responses:
    *           '200':    
    *               description: item updated
    *           '400':
    *               description: image upload error
    *           '404':
    *               description: item doesn't exist
    *           '500':
    *               description: internal server error
    */

router.route('/')
    .get(itemsController.index)
    .post(upload, itemRules(), validator, itemsController.create)

router.route('/:id')
    .delete(itemsController.destroy)
    .patch(itemsController.update)

router.route('/updateimage/:id')
    .patch(upload, itemsController.updateImage)

module.exports = router
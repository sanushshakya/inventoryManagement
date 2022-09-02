const router = require('express').Router();
const inventoryController = require('../controllers/inventory.controller')
const { inventoryRules, updateInventoryRules, validator } = require('../middlewares/validator.middleware')

/**
    * @openapi
    * /inventory:
    *   get:
    *     tags: [inventory]
    *     summary: returns all inventory
    *     responses:
    *        '200':    
    *            description: A JSON with array of available items in inventory
    *        '500':
    *            description: internal server error
    *   post:
    *       tags: [inventory]
    *       summary: add a new item in the inventory
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                    schema:
    *                        type: object
    *                        properties:
    *                            item_id:
    *                                type: integer
    *                            in_stock:
    *                                type: integer
    *       responses:
    *           '201':    
    *               description: item added
    *           '409':
    *               description: item already exists
    *           '404':
    *               description: item not found
    *           '500':
    *               description: internal server error
    * 
    * 
    * /inventory/{itemId}:
    *    delete:
    *       tags: [inventory]
    *       summary: delete an item from the inventory
    *       parameters:
    *         - name: itemId
    *           in: path
    *           required: true
    *           description: the id of the item to delete from inventory 
    *       responses:
    *           '200':    
    *               description: item deleted from inventory
    *           '404':
    *               description: item doesn't exist in the inventory
    *           '500':
    *               description: internal server error
    * 
    *    patch:
    *       tags: [inventory]
    *       summary: update a category
    *       parameters:
    *         - name: itemId
    *           in: path
    *           required: true
    *           description: the id of the item to update in inventory
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                    schema:
    *                        type: object
    *                        properties:
    *                            in_stock:
    *                                type: integer 
    *       responses:
    *           '200':    
    *               description: item stock updated
    *           '404':
    *               description: item doesn't exist in the inventory
    *           '500':
    *               description: internal server error
    */

router.route('/')
    .get(inventoryController.index)
    .post(inventoryRules(), validator, inventoryController.create)

router.route('/:itemId')
    .delete(inventoryController.destroy)
    .patch(updateInventoryRules(), validator, inventoryController.update)

module.exports = router
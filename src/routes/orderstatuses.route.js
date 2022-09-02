const router = require('express').Router();
const orderstatusesController = require('../controllers/orderstatuses.controller')
const {orderStatusRules,validator}=require("../middlewares/validator.middleware")

/**
    * @openapi
    * /order-status:
    *   get:
    *     tags: [order status]
    *     summary: returns all order status
    *     responses:
    *        '200':    
    *            description: A JSON with array of available order status
    *        '500':
    *            description: internal server error
    *   post:
    *       tags: [order status]
    *       summary: add a new order status
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                    schema:
    *                        type: object
    *                        properties:
    *                            status:
    *                                type: string
    *       responses:
    *           '201':    
    *               description: order status created
    *           '409':
    *               description: order status already exists
    *           '500':
    *               description: internal server error
    * 
    * 
    * /order-status/{statusId}:
    *    delete:
    *       tags: [order status]
    *       summary: delete an order status
    *       parameters:
    *         - name: statusId
    *           in: path
    *           required: true
    *           description: the id of the order status to delete 
    *       responses:
    *           '200':    
    *               description: order status deleted
    *           '404':
    *               description: order status doesn't exist
    *           '500':
    *               description: internal server error
    * 
    *    patch:
    *       tags: [order status]
    *       summary: update an order status
    *       parameters:
    *         - name: statusId
    *           in: path
    *           required: true
    *           description: the id of the order status to update
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                    schema:
    *                        type: object
    *                        properties:
    *                            status:
    *                                type: string 
    *       responses:
    *           '200':    
    *               description: order status updated
    *           '404':
    *               description: order status doesn't exist
    *           '409':
    *               description: order status already exists
    *           '500':
    *               description: internal server error
    *          
    */

router.route('/')
    .get(orderstatusesController.index)
    .post(orderStatusRules(),validator,orderstatusesController.create)

router.route('/:id')
    .delete(orderstatusesController.destroy)
    .patch(orderStatusRules(),validator,orderstatusesController.update)

module.exports = router
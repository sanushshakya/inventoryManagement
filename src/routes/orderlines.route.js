const router = require('express').Router();
const orderlinesController = require('../controllers/orderlines.controller')
const { validator, orderLineRules, addItemRules, updateOrderLineItemRules, updateOrderLineRules, updateReceivedQtyRules } = require('../middlewares/validator.middleware')

/**
    * @openapi
    * /order-lines:
    *   get:
    *     tags: [order lines]
    *     summary: returns all order lines
    *     responses:
    *        '200':    
    *            description: A JSON with array of available order lines
    *        '500':
    *            description: internal server error
    *   post:
    *       tags: [order lines]
    *       summary: add a new order line
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                    schema:
    *                        type: object
    *                        properties:
    *                            vendor_id:
    *                                type: integer
    *                            order_status_id:
    *                                type: integer
    *                            description:
    *                                type: string
    *                            invoice_number:
    *                                type: integer
    *                            order_date:
    *                                type: string
    *                                format: date
    *                            items:
    *                                type: array
    *                                items:
    *                                   type: object
    *                                   properties:
    *                                       item_id:
    *                                           type: integer
    *                                       price:
    *                                           type: integer
    *                                       order_quantity:
    *                                           type: integer
    * 
    *       responses:
    *           '201':    
    *               description: item created
    *           '404':
    *               description: requested vendor, order status or item doesnt exist
    *           '409':
    *               description: duplicate invoice number
    *           '500':
    *               description: internal server error
    * 
    * 
    * /order-lines/{orderLineId}:
    *    delete:
    *       tags: [order lines]
    *       summary: delete an order line
    *       parameters:
    *         - name: orderLineId
    *           in: path
    *           required: true
    *           description: the id of the order line to delete 
    *       responses:
    *           '200':    
    *               description: order line deleted
    *           '404':
    *               description: order line doesn't exist
    *           '500':
    *               description: internal server error
    * 
    *    patch:
    *       tags: [order lines]
    *       summary: update an order line
    *       parameters:
    *         - name: orderLineId
    *           in: path
    *           required: true
    *           description: the id of the order line to update
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                    schema:
    *                        type: object
    *                        properties:
    *                            vendor_id:
    *                                type: integer
    *                            order_status_id:
    *                                type: integer
    *                            description:
    *                                type: string
    *                            invoice_number:
    *                                type: integer
    *                            order_date:
    *                                type: string
    *                                format: date
    *       responses:
    *           '200':    
    *               description: order line updated
    *           '404':
    *               description: order line doesn't exist,requested vendor or order status doesn't exits
    *           '409':
    *               description: duplicate invoice number
    *           '500':
    *               description: internal server error
    * 
    * /order-lines/{orderLineId}/item/{itemId}:
    *    post:
    *       tags: [order lines]
    *       summary: add item to an order line
    *       parameters:
    *         - name: orderLineId
    *           in: path
    *           required: true
    *           description: the id of the orderline to add item
    *         - name: itemId
    *           in: path
    *           required: true
    *           description: the id of the item to be added in the order line
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                    schema:
    *                        type: object
    *                        properties:
    *                            price:
    *                                type: integer
    *                            order_quantity:
    *                                type: integer 
    *
    *       responses:
    *           '201':    
    *               description: item added to the order line
    *           '400':
    *               description: order line is already complete
    *           '404':
    *               description: order line doesn't exist or requested item doesn't exist
    *           '409':
    *               description: item already exists in the order line
    *           '500':
    *               description: internal server error
    * 
    *    delete:
    *       tags: [order lines]
    *       summary: delete item from an order line
    *       parameters:
    *         - name: orderLineId
    *           in: path
    *           required: true
    *           description: the id of the orderline to delete item
    *         - name: itemId
    *           in: path
    *           required: true
    *           description: the id of the item to be deleted from the order line
    *
    *       responses:
    *           '200':    
    *               description: item deleted from the order line
    *           '404':
    *               description: order line doesn't exist
    *           '500':
    *               description: internal server error
    * 
    *    patch:
    *       tags: [order lines]
    *       summary: update item in an order line
    *       parameters:
    *         - name: orderLineId
    *           in: path
    *           required: true
    *           description: the id of the orderline to update item
    *         - name: itemId
    *           in: path
    *           required: true
    *           description: the id of the item to be updated in the order line
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                    schema:
    *                        type: object
    *                        properties:
    *                            price:
    *                                type: integer
    *                            order_quantity:
    *                                type: integer 
    *
    *       responses:
    *           '200':    
    *               description: item updated in the order line
    *           '400':
    *               description: order line is already complete
    *           '404':
    *               description: order line doesn't exist or requested item doesn't exist
    *           '500':
    *               description: internal server error
    * 
    * /order-lines/{orderLineId}/update-received/{itemId}:
    *    patch:
    *       tags: [order lines]
    *       summary: update received quantity of items in an order line
    *       parameters:
    *         - name: orderLineId
    *           in: path
    *           required: true
    *           description: the id of the orderline to update received qty item
    *         - name: itemId
    *           in: path
    *           required: true
    *           description: the id of the item to update received qty in the order line
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                    schema:
    *                        type: object
    *                        properties:
    *                            received_quantity:
    *                                type: integer
    *
    *       responses:
    *           '200':    
    *               description: received qty updated in the order line
    *           '400':
    *               description: order line is already complete
    *           '404':
    *               description: order line doesn't exist or requested item doesn't exist
    *           '500':
    *               description: internal server error
    * 
    * /order-lines/complete-order/{orderLineId}:
    *    post:
    *       tags: [order lines]
    *       summary: update status of order line to completed
    *       parameters:
    *         - name: orderLineId
    *           in: path
    *           required: true
    *           description: the id of the orderline to complete
    *
    *       responses:
    *           '200':    
    *               description: order line completed
    *           '400':
    *               description: order line is already complete
    *           '404':
    *               description: order line doesn't exist or requested item doesn't exist
    *           '500':
    *               description: internal server error
    * 
    * /order-lines/get-order-pdf/{orderLineId}:
    *    get:
    *       tags: [order lines]
    *       summary: get purchase order pdf of the order line
    *       parameters:
    *         - name: orderLineId
    *           in: path
    *           required: true
    *           description: the id of the orderline to get purchase pdf
    *
    *       responses:
    *           '200':    
    *               description: a pdf file
    *               content:
    *                   application/pdf:
    *                       schema:
    *                           type: string
    *                           format: binary
    *           '404':
    *               description: order line doesn't exist or requested item doesn't exist
    *           '500':
    *               description: internal server error 
    */


router.route('/')
    .get(orderlinesController.index)
    .post(orderLineRules(), validator, orderlinesController.create)

router.route('/complete-order/:id')
    .post(orderlinesController.completeOrder)

router.route('/get-order-pdf/:id')
    .get(orderlinesController.getOrderPdf)

router.route('/:id')
    .delete(orderlinesController.destroy)
    .patch(updateOrderLineRules(), validator, orderlinesController.update)

router.route('/:id/item/:itemId')
    .post(addItemRules(), validator, orderlinesController.addItem)
    .delete(orderlinesController.removeItem)
    .patch(updateOrderLineItemRules(), validator, orderlinesController.updateItem)

router.route('/:id/update-received/:itemId')
    .patch(updateReceivedQtyRules(), validator, orderlinesController.updateReceivedQty)

module.exports = router
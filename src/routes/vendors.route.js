const router = require('express').Router();
const { vendorRules, updateVendorRules, validator } = require('../middlewares/validator.middleware')
const vendorsController = require('../controllers/vendors.controller')

/**
    * @openapi
    * /vendors:
    *   get:
    *     tags: [vendors]
    *     summary: returns all vendors
    *     responses:
    *        '200':    
    *            description: A JSON with array of available vendors
    *        '500':
    *            description: internal server error
    *   post:
    *       tags: [vendors]
    *       summary: add a new vendor
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                    schema:
    *                        type: object
    *                        properties:
    *                            name:
    *                                type: string
    *                            phone:
    *                                type: integer
    *                            address:
    *                                type: string
    *       responses:
    *           '201':    
    *               description: vendor created
    *           '500':
    *               description: internal server error
    * 
    * 
    * /vendors/{vendorId}:
    *    delete:
    *       tags: [vendors]
    *       summary: delete a vendor
    *       parameters:
    *         - name: vendorId
    *           in: path
    *           required: true
    *           description: the id of the vendor to delete 
    *       responses:
    *           '200':    
    *               description: vendor deleted
    *           '404':
    *               description: vendor doesn't exist
    *           '500':
    *               description: internal server error
    * 
    *    patch:
    *       tags: [vendors]
    *       summary: update a vendor
    *       parameters:
    *         - name: vendorId
    *           in: path
    *           required: true
    *           description: the id of the vendor to update
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                    schema:
    *                        type: object
    *                        properties:
    *                            name:
    *                                type: string
    *                            phone:
    *                                type: integer
    *                            address:
    *                                type: string
    *       responses:
    *           '200':    
    *               description: vendor updated
    *           '404':
    *               description: vendor doesn't exist
    *           '500':
    *               description: internal server error
    *          
    */

router.route('/')
    .get(vendorsController.index)
    .post(vendorRules(), validator, vendorsController.create)

router.route('/:id')
    .delete(vendorsController.destroy)
    .patch(updateVendorRules(), validator, vendorsController.update)

module.exports = router
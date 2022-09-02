const { check, validationResult } = require("express-validator")

const brandRules = () => {
    return [
        check('brand_name')
            .not()
            .isEmpty()
            .trim()
            .withMessage('Brand name is required!')
    ]
}

const categoryRules = () => {
    return [
        check('category_type')
            .notEmpty()
            .trim()
            .withMessage('Category type is required!')
    ]
}

const orderStatusRules = () => {
    return [
        check('status')
            .notEmpty()
            .trim()
            .withMessage('Order status is required!')
    ]
}

const vendorRules = () => {
    return [
        check('name')
            .notEmpty()
            .trim()
            .withMessage('Vendor name is required!'),
        check('phone')
            .isInt()
            .trim()
            .withMessage('Vendor phone is required and must be a number!'),
        check('address')
            .notEmpty()
            .trim()
            .withMessage('Vendor address is required!')
    ]
}

const updateVendorRules = () => {
    return [
        check('name')
            .optional()
            .notEmpty()
            .trim()
            .withMessage('Vendor name is required!'),
        check('phone')
            .optional()
            .isInt()
            .trim()
            .withMessage('Vendor phone is required and must be a number!'),
        check('address')
            .optional()
            .notEmpty()
            .trim()
            .withMessage('Vendor address is required!')
    ]
}

const itemRules = (req, res, next) => {
    return [
        check('category_id')
            .isInt()
            .trim()
            .withMessage('Category ID is required.'),
        check('brand_id')
            .isInt()
            .trim()
            .withMessage('Brand ID is required.'),
        check('name')
            .notEmpty()
            .trim()
            .withMessage('Item Name is required.'),
        check('sku_code')
            .notEmpty()
            .trim()
            .withMessage('SKU Code is required'),
        check('description')
            .notEmpty()
            .trim()
            .withMessage('Item Description is required'),
    ]
}

const updateItemRules = (req, res, next) => {
    return [
        check('category_id')
            .optional()
            .notEmpty()
            .isInt()
            .trim()
            .withMessage('Category ID is required.'),
        check('brand_id')
            .optional()
            .notEmpty()
            .isInt()
            .trim()
            .withMessage('Brand ID is required.'),
        check('name')
            .optional()
            .notEmpty()
            .trim()
            .withMessage('Item Name is required.'),
        check('sku_code')
            .optional()
            .notEmpty()
            .trim()
            .withMessage('SKU Code is required'),
        check('description')
            .optional()
            .notEmpty()
            .trim()
            .withMessage('Item Description is required'),
    ]
}

const orderLineRules = () => {
    return [
        check('vendor_id')
            .isInt()
            .trim()
            .withMessage('Vendor ID is required.'),
        check('order_status_id')
            .isInt()
            .trim()
            .withMessage('Order Status ID is required.'),
        check('description')
            .notEmpty()
            .trim()
            .withMessage('Order description is required.'),
        check('items')
            .isArray()
            .notEmpty()
            .withMessage("Items required"),
        check('items.*.item_id')
            .isInt()
            .withMessage("Item id is required"),
        check('items.*.price')
            .isInt()
            .trim()
            .withMessage("Item price is required"),
        check('items.*.order_quantity')
            .isInt()
            .trim()
            .withMessage("Quantity is required"),
        check('invoice_number')
            .notEmpty()
            .trim()
            .withMessage('Invoice number is required.'),
        check('order_date')
            .isDate()
            .trim()
            .withMessage('Order date is required'),
    ]
}

const updateOrderLineRules = () => {
    return [
        check('vendor_id')
            .optional()
            .isInt()
            .trim()
            .withMessage('Vendor ID is required.'),
        check('order_status_id')
            .optional()
            .isInt()
            .trim()
            .withMessage('Order Status ID is required.'),
        check('description')
            .optional()
            .notEmpty()
            .trim()
            .withMessage('Order description is required.'),
        check('invoice_number')
            .optional()
            .notEmpty()
            .trim()
            .withMessage('Invoice number is required.'),
        check('order_date')
            .optional()
            .isDate()
            .trim()
            .withMessage('Order date is required'),
    ]
}

const addItemRules = () => {
    return [
        check('price')
            .isInt()
            .trim()
            .withMessage('Item price is required.'),
        check('order_quantity')
            .isInt()
            .trim()
            .withMessage('Order quantity is required and must be a whole number.'),
    ]
}

const updateOrderLineItemRules = () => {
    return [
        check('price')
            .optional()
            .isInt()
            .trim()
            .withMessage('Item price is required.'),
        check('order_quantity')
            .optional()
            .isInt()
            .trim()
            .withMessage('Order quantity is required.'),
    ]
}

const updateReceivedQtyRules = () => {
    return [
        check('received_quantity')
            .isInt()
            .trim()
            .withMessage('Received quantity is required.'),
    ]
}

const inventoryRules = () => {
    return [
        check('item_id')
            .isInt()
            .trim()
            .withMessage('Item id is required'),
        check('in_stock')
            .isInt()
            .trim()
            .withMessage('Stock quantity is required.'),
    ]
}

const updateInventoryRules = () => {
    return [
        check('in_stock')
            .isInt()
            .trim()
            .withMessage('Stock quantity is required.'),
    ]
}

const validator = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
        return res.status(400).json({ error: extractedErrors })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

module.exports = {
    brandRules,
    categoryRules,
    itemRules,
    updateItemRules,
    vendorRules,
    updateVendorRules,
    orderStatusRules,
    orderLineRules,
    updateOrderLineRules,
    addItemRules,
    updateOrderLineItemRules,
    updateReceivedQtyRules,
    inventoryRules,
    updateInventoryRules,
    validator
}
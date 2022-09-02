const router = require('express').Router();
// import and use all routes here as required
const categoriesRoute = require('./categories.route')
const brandsRoute = require('./brands.route')
const itemsRoute = require('./items.route')
const vendorsRoute = require('./vendors.route')
const orderStatusRoute = require('./orderstatuses.route')
const orderLinesRoute = require('./orderlines.route')
const inventoryRoute = require('./inventory.route')

router.use('/categories', categoriesRoute)
router.use('/brands', brandsRoute)
router.use('/inventory', inventoryRoute)
router.use('/items', itemsRoute)
router.use('/order-lines', orderLinesRoute)
router.use('/order-status', orderStatusRoute)
router.use('/vendors', vendorsRoute)

module.exports = router;

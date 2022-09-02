const PDFDocument = require('pdfkit')
const { Items, Categories, Brands, OrderLines, Vendors, OrderStatuses, Inventory, OrderLinesItems } = require("../models")
const logger = require("../config/logger.config")
const { pick, removeUndefinedKeys } = require("../utils/index")

const index = async (_, res) => {
    try {
        const dbRes = await OrderLines.findAll({
            include: [{
                model: Items,
                attributes: ["id", "name", "description", "image_url", "sku_code"],
                include: [
                    {
                        model: Brands,
                        attributes: ["brand_name"]
                    },
                    {
                        model: Categories,
                        attributes: ["category_type"]
                    }
                ]
            }, {
                model: Vendors,
                attributes: ["name", "phone", "address"]
            }, {
                model: OrderStatuses,
                attributes: ["status"]
            }],
        })
        return res.status(200).json({ message: "success", data: dbRes, dataCount: dbRes.length })
    } catch (e) {
        logger.error(e.message)
        res.status(500).json({ error: "internal server error" })
    }
}

// create a new task
const create = async (req, res) => {
    try {
        const reqObj = pick(req.body, ["vendor_id", "order_status_id", "items", "description", "invoice_number", "order_date"])
        // validate if the vendor,status and item exists
        const vendor = await Vendors.findOne({
            where: { id: reqObj.vendor_id }
        })

        const orderstatus = await OrderStatuses.findOne({
            where: { id: reqObj.order_status_id }
        })

        const invoice_number = await OrderLines.findOne({ where: { invoice_number: reqObj.invoice_number } })

        if (!vendor) {
            return res.status(404).json({ error: "The vendor doesn't exist!" })
        }
        if (!orderstatus) {
            return res.status(404).json({ error: "The order status doesn't exist!" })
        }

        if (invoice_number) {
            return res.status(409).json({ error: "The order with the provided invoice number already exists!" })
        }

        // reqObj.items.forEach(async item => {
        //     const dbItem = await Items.findByPk(item.item_id);
        //     if (!dbItem) {
        //         return res.status(404).json({ error: `Requested item with id: ${item.item_id} doesn't exits!` })
        //     }
        // })
        const itemErrors = await Promise.all(reqObj.items.map(async item => {
            const dbItem = await Items.findByPk(item.item_id);
            if (!dbItem) {
                return { error: `Requested item with id: ${item.item_id} doesn't exits!` }
            }
        }))

        const newItemErrors = itemErrors.filter(el => {
            return el !== undefined;
        });

        if(newItemErrors.length > 0){
            return res.status(404).json({ errors: newItemErrors })   
        }
      
        const currentOrderLine = await OrderLines.create(reqObj)
        const itemData = reqObj.items.map(item => ({
            ...item,
            order_line_id: currentOrderLine.id
        }))

        await OrderLinesItems.bulkCreate(itemData, {
            fields: ["order_line_id", "item_id", "price", "order_quantity"]
        });


        return res.status(201).json({ message: "successfully created a new order line", data: currentOrderLine });
    } catch (e) {
        logger.error(e.message)
        res.status(500).json({ error: "internal server error" })
    }
}

// delete an existing item
const destroy = async (req, res) => {
    try {
        const { id } = req.params
        // returns a boolean
        const orderline = await OrderLines.findByPk(id)
        if (!orderline) {
            return res.status(404).json({ error: 'Item not found!' })
        }
        const items = await orderline.getItems()
        await orderline.removeItems(items)
        await OrderLines.destroy({
            where: { id }
        })
        return res.status(200).json({ message: 'Order line deleted successfully!' })
    } catch (e) {
        logger.error(e.message)
        res.status(500).json({ error: "internal server error" })
    }
}


// update task, only fields except image url
const update = async (req, res) => {
    try {
        const { id } = req.params
        // find if the category exists
        const orderline = await OrderLines.findByPk(id)
        if (!orderline) {
            return res.status(404).json({ error: "The item doesn't exist" })
        }
        // update all "vendor_id", "order_status_id", "description", "invoice_number", "order_date"
        const reqObj = removeUndefinedKeys(pick(req.body, ["vendor_id", "order_status_id", "description", "invoice_number", "order_date"]));
        // check if vendor and order status exists
        if (reqObj.vendor_id) {
            const vendor = await Vendors.findByPk(reqObj.vendor_id)
            if (!vendor) {
                return res.status(404).json({ error: "The vendor doesn't exist!" })
            }
        }
        if (reqObj.order_status_id) {
            const status = await OrderStatuses.findByPk(reqObj.order_status_id)
            if (!status) {
                return res.status(404).json({ error: "The status doesn't exist!" })
            }
        }
        if (reqObj.invoice_number) {
            const invoice_number = await OrderLines.findOne({ where: { invoice_number: reqObj.invoice_number } })
            if (invoice_number) {
                return res.status(409).json({ error: "The order with the provided invoice number already exists!" })
            }
        }

        // update by id
        await OrderLines.update(reqObj, {
            where: { id }
        })


        return res.status(200).json({ message: 'Order updated successfully!', data: reqObj })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// complete order 
const completeOrder = async (req, res) => {
    try {
        const { id } = req.params
        // find if the category exists
        const orderline = await OrderLines.findByPk(id, {
            include: [{
                model: Items,
                attributes: ["id", "name", "description", "image_url", "sku_code"],
                include: [
                    {
                        model: Brands,
                        attributes: ["brand_name"]
                    },
                    {
                        model: Categories,
                        attributes: ["category_type"]
                    }
                ]
            }],
        })
        if (!orderline) {
            return res.status(404).json({ error: "The order line doesn't exist" })
        }
        if (orderline.is_complete) {
            return res.status(400).json({ error: "The order is already completed!" })
        }

        // update received quantity
        orderline.Items.forEach(async item => {

            const inventoryItem = await Inventory.findOne({ where: { item_id: item.id } })
            // if item is in inventory
            if (inventoryItem) {
                // check if received qty exists, if not update received qty to order quantity
                if (item.OrderLinesItems.received_quantity == 0) {
                    // const itemInstance = await Items.findByPk(item.id)
                    await orderline.addItem(item.id, {
                        through: {
                            received_quantity: item.OrderLinesItems.order_quantity
                        }
                    })
                    const newStock = inventoryItem.in_stock + item.OrderLinesItems.order_quantity
                    await Inventory.update({ in_stock: newStock }, { where: { item_id: item.id } })
                } else {
                    // update with received qty
                    const newStock = inventoryItem.in_stock + item.OrderLinesItems.received_quantity
                    await Inventory.update({ in_stock: newStock }, { where: { item_id: item.id } })
                }

            } else {
                // check if received qty exists, if not update received qty to order quantity
                if (item.OrderLinesItems.received_quantity == 0) {
                    // const itemInstance = await Items.findByPk(item.id)
                    await orderline.addItem(item.id, {
                        through: {
                            received_quantity: item.OrderLinesItems.order_quantity
                        }
                    })
                    const newStock = item.OrderLinesItems.order_quantity
                    await Inventory.create({ item_id: item.id, in_stock: newStock }, { where: { item_id: item.id } })
                } else {
                    // update with received qty
                    const newStock = item.OrderLinesItems.received_quantity
                    await Inventory.create({ item_id: item.id, in_stock: newStock }, { where: { item_id: item.id } })
                }
            }
        })

        await OrderLines.update({ is_complete: true }, { where: { id } });

        return res.status(200).json({ message: 'Order completed and inventory updated successfully!' });
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}

//add items to order line
const addItem = async (req, res) => {
    try {
        const { id, itemId } = req.params
        // find if the item exists
        const orderline = await OrderLines.findByPk(id)
        if (!orderline) {
            return res.status(404).json({ error: "The order line doesn't exist" })
        }
        if (orderline.is_complete) {
            return res.status(400).json({ error: "Cannot add items to a completed order!" })
        }
        const reqObj = removeUndefinedKeys(pick(req.body, ["price", "order_quantity"]))
        const item = await Items.findByPk(itemId)
        if (!item) {
            return res.status(404).json({ error: "The item doesn't exist" })
        }
        const itemExists = await orderline.hasItem(item)
        if (itemExists) {
            return res.status(404).json({ error: "The item already exists in the order line" })
        }

        await orderline.addItem(item, {
            through: {
                ...reqObj,
                //add item to the order line with 0
                // received_quantity: 0
            }
        })

        return res.status(201).json({ message: 'Item added successfully!' })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}

//remove items from order line
const removeItem = async (req, res) => {
    try {
        const { id, itemId } = req.params
        // find if the item exists
        const orderline = await OrderLines.findByPk(id)
        if (!orderline) {
            return res.status(404).json({ error: "The order line doesn't exist" })
        }
        if (orderline.is_complete) {
            return res.status(400).json({ error: "Cannot remove items from a completed order!" })
        }
        const item = await Items.findByPk(itemId)
        if (!item) {
            return res.status(404).json({ error: "The item doesn't exist" })
        }
        const itemExists = await orderline.hasItem(item)
        if (!itemExists) {
            return res.status(409).json({ error: "The item doesn't exist in the order line" })
        }
        await orderline.removeItem(item)
        return res.status(200).json({ message: 'Item removed successfully!' })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}

const updateItem = async (req, res) => {
    try {
        const { id, itemId } = req.params
        // find if the item exists
        const orderline = await OrderLines.findByPk(id)
        if (!orderline) {
            return res.status(404).json({ error: "The order line doesn't exist" })
        }
        if (orderline.is_complete) {
            return res.status(400).json({ error: "Cannot update items of a completed order!" })
        }
        const reqObj = removeUndefinedKeys(pick(req.body, ["price", "order_quantity"]))
        const item = await Items.findByPk(itemId)
        if (!item) {
            return res.status(404).json({ error: "The item doesn't exist" })
        }
        const itemExists = await orderline.hasItem(item)
        if (!itemExists) {
            return res.status(404).json({ error: "The item doesn't exists in the order line" })
        }
        await orderline.addItem(item, {
            through: {
                ...reqObj
            }
        })
        return res.status(200).json({ message: 'Order line item updated successfully!' })
    } catch (e) {
        logger.error(e)
        return res.status(500).json({ error: "internal server error" })
    }
}

const updateReceivedQty = async (req, res) => {
    try {
        const { id, itemId } = req.params
        // find if the item exists
        const orderline = await OrderLines.findByPk(id)
        if (!orderline) {
            return res.status(404).json({ error: "The order line doesn't exist" })
        }
        if (orderline.is_complete) {
            return res.status(400).json({ error: "Cannot update items of a completed order!" })
        }
        const reqObj = removeUndefinedKeys(pick(req.body, ["received_quantity"]))
        const item = await Items.findByPk(itemId)
        if (!item) {
            return res.status(404).json({ error: "The item doesn't exist" })
        }
        const itemExists = await orderline.hasItem(item)
        if (!itemExists) {
            return res.status(404).json({ error: "The item doesn't exists in the order line" })
        }
        await orderline.addItem(item, {
            through: {
                ...reqObj
            }
        })
        return res.status(200).json({ message: 'Received quantity updated successfully!' })
    } catch (e) {
        logger.error(e)
        return res.status(500).json({ error: "internal server error" })
    }
}

// get purchase order print pdf
const getOrderPdf = async (req, res) => {
    try {
        const { id } = req.params
        // find if the item exists
        const orderline = await OrderLines.findByPk(id, {
            include: [{
                model: Items,
                attributes: ["id", "name", "description", "image_url", "sku_code"],
                include: [
                    {
                        model: Brands,
                        attributes: ["brand_name"]
                    },
                    {
                        model: Categories,
                        attributes: ["category_type"]
                    }
                ]
            }, {
                model: Vendors,
                attributes: ["name", "phone", "address"]
            }],
        })
        if (!orderline) {
            return res.status(404).json({ error: "The order line doesn't exist" })
        }
        // extract required information
        const orderDate = `${orderline.order_date.getFullYear()}/${orderline.order_date.getMonth() + 1}/${orderline.order_date.getDate()}`;

        const doc = new PDFDocument({ size: "A4", margin: 50 })
        res.setHeader('Content-Type', 'application/pdf');
        doc.pipe(res)

        // header info
        doc
            // .image("logo.png", 50, 45, { width: 50 })
            .fillColor("#444444")
            .fontSize(20)
            .text("XYZ Company", 110, 57)
            .fontSize(10)
            .text("XYZ Company", 200, 50, { align: "right" })
            .text("123 lorem address", 200, 65, { align: "right" })
            .text("980-1234567", 200, 80, { align: "right" })
            .text("test@mail.com", 200, 95, { align: "right" })
            .moveDown();

        doc
            .fillColor("#444444")
            .fontSize(20)
            .text("Purchase Order", 50, 160);

        // horizontal line
        doc
            .strokeColor("#aaaaaa")
            .lineWidth(1)
            .moveTo(50, 185)
            .lineTo(550, 185)
            .stroke();

        doc
            .fontSize(10)
            .text(`Purchase Order Number: ${orderline.invoice_number}`, 50, 200)
            .font("Helvetica-Bold")
            .font("Helvetica")
            .text(`Order Date: ${orderDate}`, 50, 215)
            .moveDown();

        // horizontal line
        doc
            .strokeColor("#aaaaaa")
            .lineWidth(1)
            .moveTo(50, 240)
            .lineTo(550, 240)
            .stroke();

        // table header
        doc
            .font("Helvetica-Bold")
            .fontSize(10)
            .text('item', 50, 280)
            .text('price', 280, 280, { width: 90, align: "right" })
            .text('quantity', 370, 280, { width: 90, align: "right" })
            .text('total', 0, 280, { align: "right" });

        // hr
        doc
            .strokeColor("#aaaaaa")
            .lineWidth(1)
            .moveTo(50, 300)
            .lineTo(550, 300)
            .stroke();

        doc.font("Helvetica");
        let totalAmount = 0;
        let pos = 0;
        // tr
        orderline.Items.forEach((item, i) => {
            const position = 280 + (i + 1) * 30;
            doc
                .fontSize(10)
                .text(item.name, 50, position)
                .text(`Rs.${item.OrderLinesItems.price}`, 280, position, { width: 90, align: "right" })
                .text(item.OrderLinesItems.order_quantity, 370, position, { width: 90, align: "right" })
                .text(`Rs. ${item.OrderLinesItems.order_quantity * item.OrderLinesItems.price}`, 0, position, { align: "right" });
            // hr
            doc
                .strokeColor("#aaaaaa")
                .lineWidth(1)
                .moveTo(50, position + 20)
                .lineTo(550, position + 20)
                .stroke();

            totalAmount = totalAmount + (item.OrderLinesItems.order_quantity * item.OrderLinesItems.price);
            pos++;
        });
        const totalPosition = 280 + (pos + 1) * 30;

        doc
            .font("Helvetica-Bold")
            .fontSize(10)
            .text('', 50, totalPosition)
            .text('', 280, totalPosition, { width: 90, align: "right" })
            .text('total amount:', 370, totalPosition, { width: 90, align: "right" })
            .text(totalAmount, 0, totalPosition, { align: "right" });


        doc
            .fontSize(10)
            .text(
                "Delivery expected within 15 days. Thank you for your business.",
                50,
                580,
                { align: "center", width: 500 }
            );


        doc.end()
        // return res.status(200).json({ message: 'OK!', data: orderline })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}

module.exports = {
    index,
    create,
    destroy,
    update,
    completeOrder,
    addItem,
    removeItem,
    updateItem,
    getOrderPdf,
    updateReceivedQty
}

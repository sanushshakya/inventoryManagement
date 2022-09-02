const { Items, Inventory, Brands, Categories } = require('../models/index')
const logger = require("../config/logger.config")
const { pick } = require('../utils')


const index = async (_, res) => {
    try {
        const dbRes = await Inventory.findAll({
            include: [{
                model: Items,
                attributes: ["name", "description", "sku_code"],
                include: [{
                    model: Brands,
                    attributes: ["brand_name"]
                }, {
                    model: Categories,
                    attributes: ["category_type"]
                }]
            }],
            // raw: true
        })
        return res.status(200).json({ message: "success", data: dbRes, dataCount: dbRes.length })
    } catch (e) {
        logger.error(e.message)
        res.status(500).json({ error: "internal server error" })
    }
}

const create = async (req, res) => {
    try {
        const reqObj = pick(req.body,["item_id","in_stock"])
        const item = await Items.findByPk(reqObj.item_id)
        if(!item){
            return res.status(404).json({ error: "Item does not exist" })
        }
        const itemInInventory = await Inventory.findOne({ where: { item_id: reqObj.item_id } })
        if (itemInInventory) {
            return res.status(409).json({ error: "Item already exists in the inventory" })
        }
        const dbRes = await Inventory.create(reqObj)
        res.status(201).json({ message: "successfully added new item in the inventory", data: dbRes })
    } catch (e) {
        logger.error(e.message)
        res.status(500).json({ error: "internal server error" })
    }
}

const destroy = async (req, res) => {
    try {
        const { itemId } = req.params
        const dbRes = await Inventory.findOne({ where: { item_id: itemId } })
        if (!dbRes) {
            return res.status(404).json({ error: "Item not found in the inventory" })
        }

        await Inventory.destroy({ where: { item_id: itemId } })

        return res.status(200).json({ message: "Item stock updated successfully" })
    } catch (e) {
        logger.error(e.message)
        res.status(500).json({ error: "internal server error" })
    }
}

const update = async (req, res) => {
    try {
        const { itemId } = req.params
        const dbRes = await Inventory.findOne({ where: { item_id: itemId } })
        if (!dbRes) {
            return res.status(404).json({ error: "Item not found in the inventory" })
        }
        const reqObj = pick(req.body, ["in_stock"])
        await Inventory.update(reqObj, { where: { item_id: itemId } })

        return res.status(200).json({ message: "Item deleted successfully from inventory" })
    } catch (e) {
        logger.error(e.message)
        res.status(500).json({ error: "internal server error" })
    }
}

module.exports = {
    index,
    create,
    destroy,
    update
}

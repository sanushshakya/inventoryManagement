const { Items, Categories, Brands } = require("../models")
const logger = require("../config/logger.config")
const { pick, removeUndefinedKeys } = require("../utils/index")
const vars = require('../config/vars.config')

const index = async (_, res) => {
    try {
        const dbRes = await Items.findAll({
            include: [{
                model: Categories,
                attributes: ["category_type"],
            },
            {
                model: Brands,
                attributes: ["brand_name"]
            }],
            // raw: true
        })
        return res.status(200).json({ message: "success", data: dbRes, dataCount: dbRes.length })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// create a new task
const create = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: "Please upload an image file!" });
        }
        //item id, brand name, category_type, name, sku code, image, description
        const reqObj = pick(req.body, ["category_id", "brand_id", "name", "sku_code", "description"])
  
        // validate if the category and brand exists
        const category = await Categories.findOne({
            where: { id: reqObj.category_id }
        })

        const brand = await Brands.findOne({
            where: { id: reqObj.brand_id }
        })
        if (!category) {
            return res.status(404).json({ error: "The category doesn't exist!" })
        }
        if (!brand) {
            return res.status(404).json({ error: "The brand doesn't exist!" })
        }
        reqObj["image_url"] = `${vars.base}:${vars.port}/media/${req.file.filename}`
        // add new item
        await Items.create(reqObj)
        res.status(201).json({ message: "successfully added new item" })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// delete an existing item
const destroy = async (req, res) => {
    try {
        const { id } = req.params
        // returns a boolean
        const response = await Items.destroy({
            where: { id }
        })
        if (!response) {
            return res.status(404).json({ error: 'Item not found!' })
        }
        return res.status(200).json({ message: 'Item deleted successfully!' })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// update task
const update = async (req, res) => {
    try {
        const { id } = req.params
        // find if the category exists
        const resFindOne = await Items.findOne({
            where: { id },
        })
        if (!resFindOne) {
            return res.status(404).json({ error: "The item doesn't exist" })
        }
        const reqObj = removeUndefinedKeys(pick(req.body, ["category_id", "brand_id", "name", "sku_code", "description"]))
        // validate if the category and brand exists
        if (reqObj.category_id) {
            const category = await Categories.findOne({
                where: { id: reqObj.category_id }
            })
            if (!category) {
                return res.status(404).json({ error: "The category doesn't exist!" })
            }
        }

        if (reqObj.brand_id) {
            const brand = await Brands.findOne({
                where: { id: reqObj.brand_id }
            })

            if (!brand) {
                return res.status(404).json({ error: "The brand doesn't exist!" })
            }
        }

        // update category by id
        await Items.update(reqObj, {
            where: { id },
        })
        return res.status(200).json({ message: 'Item updated successfully!' })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}

const updateImage = async (req, res) => {
    try {
        const { id } = req.params
        // find if the category exists
        const resFindOne = await Items.findOne({
            where: { id },
        })
        if (!resFindOne) {
            return res.status(404).json({ error: "The item doesn't exist" })
        }
        if (!req.file) {
            return res.status(400).send({ error: "Please upload an image file!" });
        }
        const reqObj = {
            image_url: `${vars.base}:${vars.port}/media/${req.file.filename}`
        }
        await Items.update(reqObj, {
            where: { id },
        })
        return res.status(200).json({ message: 'Item image updated successfully!' })
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
    updateImage,
}

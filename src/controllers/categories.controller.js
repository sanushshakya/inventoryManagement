const { Categories } = require("../models")
const logger = require("../config/logger.config")
const { pick, removeUndefinedKeys } = require("../utils/index")

const index = async (_, res) => {
    try {
        const dbRes = await Categories.findAll()
        return res.status(200).json({ message: "success", data: dbRes, dataCount: dbRes.length })
    } catch (e) {
        logger.debug(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// create a new category
const create = async (req, res) => {
    try {
        const reqObj = pick(req.body, ["category_type"])
        const category = await Categories.findOne({
            where: { category_type: reqObj.category_type },
        })
        // if category is found 
        if (category) {
            return res.status(409).json({ error: "The category already exist" })
        }
        // add new category
        const dbRes = await Categories.create(reqObj)
        res.status(201).json({ message: "successfully added a new category", data:dbRes })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// delete an existing category
const destroy = async (req, res) => {
    try {
        const { id } = req.params
        // returns a boolean
        const response = await Categories.destroy({
            where: { id }
        })
        if (!response) {
            return res.status(404).json({ error: 'Category not found!' })
        }
        return res.status(200).json({ message: 'Category deleted successfully!' })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// update category
const update = async (req, res) => {
    try {
        const { id } = req.params
        // find if the category exists
        const resFindOne = await Categories.findOne({
            where: { id },
        })
        if (!resFindOne) {
            return res.status(404).json({ error: "The category doesn't exist" })
        }
        const reqObj = removeUndefinedKeys(pick(req.body, ["category_type"]))
        const existingCategory = await Categories.findOne({
            where: { category_type: reqObj.category_type },
        })
        // if category is found 
        if (existingCategory) {
            return res.status(409).json({ error: "The category already exist" })
        }
        // update category by id
        await Categories.update(reqObj, {
            where: { id },
        })
        return res.status(200).json({ message: 'Category updated successfully!' })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}


module.exports = {
    index,
    create,
    destroy,
    update
}

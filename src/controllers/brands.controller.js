const { Brands } = require("../models")
const logger = require("../config/logger.config")
const { pick, removeUndefinedKeys } = require("../utils/index")

const index = async (_, res) => {
    try {

        const dbRes = await Brands.findAll()
        // logger.warn(JSON.stringify(response))
        return res.status(200).json({ message: "success", data: dbRes, dataCount: dbRes.length })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// create a new brand
const create = async (req, res) => {
    try {
        const reqObj = pick(req.body, ["brand_name"])
        const brand = await Brands.findOne({
            where: { brand_name: reqObj.brand_name },
        })
        // if brand is found 
        if (brand) {
            return res.status(409).json({ error: "The brand name already exist" })
        }
        // add new brand
        const dbRes = await Brands.create(reqObj)
        res.status(201).json({ message: "successfully added new brand", data: dbRes })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// delete an existing Brand
const destroy = async (req, res) => {
    try {
        const { id } = req.params
        // returns a boolean
        const response = await Brands.destroy({
            where: { id }
        })
        if (!response) {
            return res.status(404).json({ error: 'Brand not found!' })
        }
        return res.status(200).json({ message: 'Brand deleted successfully!' })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// update brand
const update = async (req, res) => {
    try {
        const { id } = req.params
        // find if the Brand exists
        const resFindOne = await Brands.findOne({
            where: { id },
        })
        if (!resFindOne) {
            return res.status(404).json({ error: "The Brand doesn't exist" })
        }
        const reqObj = removeUndefinedKeys(pick(req.body, ["brand_name"]))
        const brand = await Brands.findOne({
            where: { brand_name: reqObj.brand_name },
        })
        // if brand is found 
        if (brand) {
            return res.status(409).json({ error: "The brand name already exist" })
        }
        // update Brand by id
        await Brands.update(reqObj, {
            where: { id },
        })
        return res.status(200).json({ message: 'Brand updated successfully!' })
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

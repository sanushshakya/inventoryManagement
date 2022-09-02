const { Vendors } = require("../models")
const logger = require("../config/logger.config")
const { pick, removeUndefinedKeys } = require("../utils/index")
const vars = require('../config/vars.config')

const index = async (_, res) => {
    try {
        const dbRes = await Vendors.findAll()
        return res.status(200).json({ message: "success", data: dbRes, dataCount: dbRes.length })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// create a new vendor
const create = async (req, res) => {
    try {
        const reqObj = pick(req.body, ["name","phone","address"])
        // add new vendor
        await Vendors.create(reqObj)
        res.status(201).json({ message: "successfully added new vendor!" })
    } catch (e) {
        logger.error(e.message)
        res.status(500).json({ error: "internal server error" })
    }
}

// delete an existing vendor
const destroy = async (req, res) => {
    try {
        const { id } = req.params
        // returns a boolean
        const response = await Vendors.destroy({
            where: { id }
        })
        if (!response) {
            return res.status(404).json({ error: 'Vendor not found!' })
        }
        return res.status(200).json({ message: 'Vendor deleted successfully!' })
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
        const resFindOne = await Vendors.findOne({
            where: { id },
        })
        if (!resFindOne) {
            return res.status(404).json({ error: "The vendor doesn't exist" })
        }
        const reqObj = removeUndefinedKeys(pick(req.body, ["name", "phone", "address"]))
        // update category by id
        await Vendors.update(reqObj, {
            where: { id },
        })
        return res.status(200).json({ message: 'Vendor updated successfully!' })
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
}

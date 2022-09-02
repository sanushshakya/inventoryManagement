const { OrderStatuses } = require("../models")
const logger = require("../config/logger.config")
const { pick, removeUndefinedKeys } = require("../utils/index")

const index = async (_, res) => {
    try {

        const dbRes = await OrderStatuses.findAll()
        return res.status(200).json({ message: "success", data: dbRes, dataCount: dbRes.length })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// create a new status
const create = async (req, res) => {
    try {
        const reqObj = pick(req.body, ["status"])
        const status = await OrderStatuses.findOne({
            where: { status: reqObj.status },
        })
        // if status is found 
        if (status) {
            return res.status(409).json({ error: "The status already exist" })
        }
        // add new status
        const dbRes = await OrderStatuses.create(reqObj)
        res.status(201).json({ message: "successfully added new status", data: dbRes })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// delete an existing status
const destroy = async (req, res) => {
    try {
        const { id } = req.params
        // returns a boolean
        const response = await OrderStatuses.destroy({
            where: { id }
        })
        if (!response) {
            return res.status(404).json({ error: 'Status not found!' })
        }
        return res.status(200).json({ message: 'Status deleted successfully!' })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// update status
const update = async (req, res) => {
    try {
        const { id } = req.params
        // find if the status exists
        const resFindOne = await OrderStatuses.findOne({
            where: { id },
        })
        if (!resFindOne) {
            return res.status(404).json({ error: "The Status doesn't exist" })
        }
        const reqObj = removeUndefinedKeys(pick(req.body, ["status"]))
        const status = await OrderStatuses.findOne({
            where: { status: reqObj.status },
        })
        // if status is found 
        if (status) {
            return res.status(409).json({ error: "The status already exist" })
        }
        // update status by id
        await OrderStatuses.update(reqObj, {
            where: { id },
        })
        return res.status(200).json({ message: 'Status updated successfully!' })
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

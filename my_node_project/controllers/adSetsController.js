// adSetsController.js
const AdSets = require('../models/Adset');

const createAdSet = async (req, res) => {
    try {
        const newAdSet = await AdSets.create(req.body);
        res.status(201).json(newAdSet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAdSet = async (req, res) => {
    try {
        const adSet = await AdSets.findByPk(req.params.id);
        res.status(200).json(adSet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAdSet = async (req, res) => {
    try {
        const updatedAdSet = await AdSets.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        });
        res.status(200).json(updatedAdSet[1]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAdSet = async (req, res) => {
    try {
        await AdSets.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: 'Ad set deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createAdSet,
    getAdSet,
    updateAdSet,
    deleteAdSet
};
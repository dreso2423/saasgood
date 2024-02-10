// adsController.js
const { Ad } = require('../models');

const createAd = async (req, res) => {
    try {
        const newAd = await Ad.create(req.body);
        res.status(201).json(newAd);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAd = async (req, res) => {
    try {
        const ad = await Ad.findByPk(req.params.id);
        res.status(200).json(ad);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAd = async (req, res) => {
    try {
        const updatedAd = await Ad.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        });
        res.status(200).json(updatedAd[1]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAd = async (req, res) => {
    try {
        await Ad.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: 'Ad deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createAd,
    getAd,
    updateAd,
    deleteAd
};
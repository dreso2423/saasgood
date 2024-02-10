// campaignsController.js
const Campaign = require('../models/campaign');

const createCampaign = async (req, res) => {
    try {
        const newCampaign = await Campaign.create(req.body);
        res.status(201).json(newCampaign);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByPk(req.params.id);
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCampaign = async (req, res) => {
    try {
        const updatedCampaign = await Campaign.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        });
        res.status(200).json(updatedCampaign[1]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCampaign = async (req, res) => {
    try {
        await Campaign.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: 'Campaign deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCampaign,
    getCampaign,
    updateCampaign,
    deleteCampaign
};
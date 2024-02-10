// conversionsController.js
const Conversion = require('../models/Conversion');

const createConversion = async (req, res) => {
    try {
        const newConversion = await Conversion.create(req.body);
        res.status(201).json(newConversion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getConversion = async (req, res) => {
    try {
        const conversion = await Conversion.findByPk(req.params.id);
        res.status(200).json(conversion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateConversion = async (req, res) => {
    try {
        const updatedConversion = await Conversion.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        });
        res.status(200).json(updatedConversion[1]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteConversion = async (req, res) => {
    try {
        await Conversion.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: 'Conversion deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createConversion,
    getConversion,
    updateConversion,
    deleteConversion
};
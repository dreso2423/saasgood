// companiesController.js
const Company = require('../models/company');

const createCompany = async (req, res) => {
    try {
        const newCompany = await Company.create(req.body);
        res.status(201).json(newCompany);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCompany = async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.id);
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCompany = async (req, res) => {
    try {
        const updatedCompany = await Company.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        });
        res.status(200).json(updatedCompany[1]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCompany = async (req, res) => {
    try {
        await Company.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: 'Company deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCompany,
    getCompany,
    updateCompany,
    deleteCompany
};
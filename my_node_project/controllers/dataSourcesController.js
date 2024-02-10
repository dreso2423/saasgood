// dataSourcesController.js
const DataSources = require('../models/DataSource');

const createDataSource = async (req, res) => {
    try {
        const newDataSource = await DataSources.create(req.body);
        res.status(201).json(newDataSource);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDataSource = async (req, res) => {
    try {
        const dataSource = await DataSources.findByPk(req.params.id);
        res.status(200).json(dataSource);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateDataSource = async (req, res) => {
    try {
        const updatedDataSource = await DataSources.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        });
        res.status(200).json(updatedDataSource[1]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteDataSource = async (req, res) => {
    try {
        await DataSources.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: 'Data source deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createDataSource,
    getDataSource,
    updateDataSource,
    deleteDataSource
};
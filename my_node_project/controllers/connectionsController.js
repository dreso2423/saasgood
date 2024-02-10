// connectionsController.js
const Connections = require('../models/connection');

const createConnection = async (req, res) => {
    try {
        const newConnection = await Connections.create(req.body);
        res.status(201).json(newConnection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getConnection = async (req, res) => {
    try {
        const connection = await Connections.findByPk(req.params.id);
        res.status(200).json(connection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateConnection = async (req, res) => {
    try {
        const updatedConnection = await Connections.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        });
        res.status(200).json(updatedConnection[1]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteConnection = async (req, res) => {
    try {
        await Connections.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: 'Connection deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createConnection,
    getConnection,
    updateConnection,
    deleteConnection
};
// userController.js
const Users = require('../models/User');

const createUser = async (req, res) => {
    try {
        const newUser = await Users.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await Users.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        });
        res.status(200).json(updatedUser[1]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await Users.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
};
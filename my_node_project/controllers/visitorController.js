// controllers/visitorController.js
const Visitor = require('../models/Visitor');

const createVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.create(req.body);
    res.status(201).json(visitor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.findAll();
    res.status(200).json(visitors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByPk(req.params.id);
    if (visitor) {
      res.status(200).json(visitor);
    } else {
      res.status(404).json({ error: 'Visitor not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByPk(req.params.id);
    if (visitor) {
      await visitor.update(req.body);
      res.status(200).json(visitor);
    } else {
      res.status(404).json({ error: 'Visitor not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByPk(req.params.id);
    if (visitor) {
      await visitor.destroy();
      res.status(204).json({ message: 'Visitor deleted' });
    } else {
      res.status(404).json({ error: 'Visitor not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createVisitor,
  getVisitors,
  getVisitor,
  updateVisitor,
  deleteVisitor
};
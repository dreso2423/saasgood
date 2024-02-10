// controllers/IntegrationController.js
const Integration = require('../models/Integrations');

const createIntegration = async (req, res) => {
  const { type, settings } = req.body;
  const userId = req.user.id; // Assuming you have middleware that sets req.user

  try {
    const integration = await Integration.create({ type, settings, userId });
    res.status(201).json(integration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateIntegration = async (req, res) => {
  const { id } = req.params;
  const { settings } = req.body;

  try {
    const integration = await Integration.findByPk(id);
    if (!integration) {
      return res.status(404).json({ error: 'Integration not found' });
    }

    integration.settings = settings;
    await integration.save();

    res.json(integration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const runMeltanoETL = async (req, res) => {
  const { id } = req.params;

  try {
    const integration = await Integration.findByPk(id);
    if (!integration) {
      return res.status(404).json({ error: 'Integration not found' });
    }

    integration.runMeltanoETL();

    res.json({ message: 'Meltano ETL process started' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createIntegration,
  updateIntegration,
  runMeltanoETL
};
// routes.js
const express = require('express');
const router = express.Router();

// Controllers
const adsController = require('../controllers/adsController');
const adsetsController = require('../controllers/adSetsController');
const companyController = require('../controllers/companiesController');
const connectionsController = require('../controllers/connectionsController');
const conversionsController = require('../controllers/conversionsController');
const datasourcesController = require('../controllers/dataSourcesController');
const eventsController = require('../controllers/eventsController');
const usersController = require('../controllers/usersController');
const visitorController = require('../controllers/visitorController');
const IntegrationController = require('../controllers/integrationController');


// Ad routes
router.post('/ads', adsController.createAd);
router.get('/ads/:id', adsController.getAd);
router.put('/ads/:id', adsController.updateAd);
router.delete('/ads/:id', adsController.deleteAd);

// Adsets Company routes
router.post('/adsets', adsetsController.createAdSet);
router.get('/adsets/:id', adsetsController.getAdSet);
router.put('/adsets/:id', adsetsController.updateAdSet);
router.delete('/adsets/:id', adsetsController.deleteAdSet);

// Company routes
router.post('/companies', companyController.createCompany);
router.get('/companies/:id', companyController.getCompany);
router.put('/companies/:id', companyController.updateCompany);
router.delete('/companies/:id', companyController.deleteCompany);

// Connections routes
router.post('/connections', connectionsController.createConnection);
router.get('/connections/:id', connectionsController.getConnection);
router.put('/connections/:id', connectionsController.updateConnection);
router.delete('/connections/:id', connectionsController.deleteConnection);

// Conversions routes
router.post('/conversions', conversionsController.createConversion);
router.get('/conversions/:id', conversionsController.getConversion);
router.put('/conversions/:id', conversionsController.updateConversion);
router.delete('/conversions/:id', conversionsController.deleteConversion);

// Datasources routes
router.post('/datasources', datasourcesController.createDataSource);
router.get('/datasources/:id', datasourcesController.getDataSource);
router.put('/datasources/:id', datasourcesController.updateDataSource);
router.delete('/datasources/:id', datasourcesController.deleteDataSource);

// Events routes
router.post('/events', eventsController.createEvent);
router.get('/events/:id', eventsController.getEvent);
router.put('/events/:id', eventsController.updateEvent);
router.delete('/events/:id', eventsController.deleteEvent);

// User routes
router.post('/users', usersController.createUser);
router.get('/users/:id', usersController.getUser);
router.put('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);

// Visitor routes
router.post('/visitors', visitorController.createVisitor);
router.get('/visitors', visitorController.getVisitors);
router.get('/visitors/:id', visitorController.getVisitor);
router.put('/visitors/:id', visitorController.updateVisitor);
router.delete('/visitors/:id', visitorController.deleteVisitor);

// Integration routes
router.post('/', IntegrationController.createIntegration);
router.put('/:id', IntegrationController.updateIntegration);
router.post('/:id/run', IntegrationController.runMeltanoETL);

module.exports = router;
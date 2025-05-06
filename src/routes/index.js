const express = require('express');
const router = express.Router();

const HelloWorld = require("./hello_world_route.js");
const AccountRoute = require('./account_route');
const CategoryRoute = require('./category_route');
const EventRoute = require('./event_route');
const ParticipantRoute = require('./participant_route');
const AuthRoute = require('./auth_route');

// API version prefix
const API_PREFIX = '/api/v1';

// Home route
router.use('/', HelloWorld);

// API routes with versioning
router.use(API_PREFIX, AuthRoute);
router.use(API_PREFIX, AccountRoute);
router.use(API_PREFIX, CategoryRoute);
router.use(API_PREFIX, EventRoute);
router.use(API_PREFIX, ParticipantRoute);

module.exports = router;
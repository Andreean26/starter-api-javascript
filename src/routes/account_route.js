const express = require('express');
const router = express.Router();
const { AccountController } = require('../controllers');

router.get('/accounts', AccountController.getAllAccounts);
router.get('/accounts/:id', AccountController.getAccountById);
router.get('/accounts/username/:username', AccountController.getAccountByUsername);
router.post('/accounts', AccountController.createAccount);
router.put('/accounts/:id', AccountController.updateAccount);
router.delete('/accounts/:id', AccountController.deleteAccount);

module.exports = router;
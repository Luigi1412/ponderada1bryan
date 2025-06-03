const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { userValidators } = require('../middlewares/validators');

router.post('/', userValidators.create, UserController.create);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.put('/:id', userValidators.update, UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router; 
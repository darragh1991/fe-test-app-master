const ContentController = require('../controllers/content.controller')
const express = require('express');
const router = express.Router();

router.get('/', ContentController.get);
router.get('/:lang', ContentController.getOne);

module.exports = router;

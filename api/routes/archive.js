const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const CardController = require('../controllers/card')

// get all archived cards
router.get('/',  CardController.get_archived_cards);

// get all archived cards
router.patch('/:cardId',  CardController.patch_archive_card)

// delete archived cards
router.delete('/delete/all', CardController.delete_all_archived_cards);

module.exports = router;
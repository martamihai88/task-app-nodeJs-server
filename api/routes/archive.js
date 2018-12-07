const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const CardController = require('../controllers/card')

// archive card
router.post('/',  CardController.add_card_to_archive);

// get all archived cards
router.get('/',  CardController.get_archived_cards)

// delete archived card
router.delete('/:cardId',  CardController.delete_archived_card);

// delete archived cards
router.delete('/delete/all', CardController.delete_all_archived_cards);

module.exports = router;
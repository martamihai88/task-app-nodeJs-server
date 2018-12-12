const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const CardController = require('../controllers/card')

// get all cards
router.get('/', checkAuth, CardController.cards_get_all)

// create new card
router.post('/', checkAuth, CardController.create_new_card);

// get card by Id
router.get('/:cardId', checkAuth, CardController.get_cardById);

// edit card by Id
router.put('/:cardId', checkAuth, CardController.edit_cardById);

// delete card by Id
router.delete('/:cardId', checkAuth,  CardController.delete_cardById);

// delet all cards
router.delete('/delete/all', checkAuth, CardController.delete_all_cards);

module.exports = router;
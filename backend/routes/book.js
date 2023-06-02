const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const getAllBooksCtrl = require('../controllers/book/getAllBooks');
const getBookByIdCtrl = require('../controllers/book/getBookById');
const getBestRatingCtrl = require('../controllers/book/getBestRating');
const postBooksCtrl = require('../controllers/book/postBook');
const modifyBookCtrl = require('../controllers/book/modifyBook');
const deleteBookCtrl = require('../controllers/book/deleteBook');
const giveRatingBookCtrl = require('../controllers/book/giveRatingBook');

router.get('/', getAllBooksCtrl.getAllBooks);
router.get('/bestrating', getBestRatingCtrl.getBestRating);
router.get('/:id', getBookByIdCtrl.getBookById);
router.post('/:id/rating', auth, giveRatingBookCtrl.giveRatingBook);
router.post('/', auth, multer, postBooksCtrl.postBook);
router.put('/:id', auth, multer, modifyBookCtrl.modifyBook);
router.delete('/:id', auth, deleteBookCtrl.deleteBook);

module.exports = router;

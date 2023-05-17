const router = require('express').Router();
const NewsController = require('../controllers/newsController');

router.get('/', NewsController.getNews);
router.post('/', NewsController.createNew);
router.delete('/:id', NewsController.deleteNew);
router.patch('/:id', NewsController.archiveNew)

module.exports = router;
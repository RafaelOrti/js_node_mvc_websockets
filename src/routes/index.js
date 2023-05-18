const router = require('express').Router();

const UsersRouter = require('./usersRouter');
const newsRouter = require('./newsRouter');

router.use('/users', UsersRouter);
router.use('/news', newsRouter);

module.exports = router;
const { addMenu, getMenus, updateMenu, deleteMenu } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router()

router.post('/', authMiddleware, addMenu);
router.get('/', authMiddleware, getMenus);
router.put('/:id', authMiddleware, updateMenu);
router.delete('/:id', authMiddleware, deleteMenu);

module.exports = router

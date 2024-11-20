const router = require('express').Router()

const { makeOrder, getOrders, updateOrder, deleteOrder } = require("../controllers/commandeController");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', authMiddleware, makeOrder);
router.get('/', authMiddleware, getOrders);
router.patch('/:id', authMiddleware, updateOrder);
router.delete('/:id', authMiddleware, deleteOrder);


module.exports = router

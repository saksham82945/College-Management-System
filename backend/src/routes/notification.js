'use strict';
const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const {
    getNotifications,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification
} = require('../controllers/notification');

router.use(authMiddleware);

router.get('/', getNotifications);
router.post('/', roleMiddleware(['ADMIN']), createNotification);
router.put('/read-all', markAllAsRead);
router.put('/:id/read', markAsRead);
router.delete('/:id', roleMiddleware(['ADMIN']), deleteNotification);

module.exports = router;

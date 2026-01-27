'use strict';
const Notification = require('../models/Notification');

/** GET /api/v1/notifications */
const getNotifications = async (req, res) => {
    try {
        const { page = 1, limit = 20, unreadOnly } = req.query;
        const filter = {};
        if (unreadOnly === 'true') filter.isRead = false;

        const skip = (Number(page) - 1) * Number(limit);
        const [notifications, total, unreadCount] = await Promise.all([
            Notification.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
            Notification.countDocuments(filter),
            Notification.countDocuments({ isRead: false })
        ]);

        res.json({ data: notifications, total, unreadCount, page: Number(page), limit: Number(limit) });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch notifications', error: err.message });
    }
};

/** POST /api/v1/notifications */
const createNotification = async (req, res) => {
    try {
        const { title, message, type, targetRole } = req.body;
        if (!title || !message) return res.status(400).json({ message: 'title and message are required' });

        const notification = await Notification.create({ title, message, type: type || 'INFO', targetRole });
        res.status(201).json({ message: 'Notification created', data: notification });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create notification', error: err.message });
    }
};

/** PUT /api/v1/notifications/:id/read */
const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        if (!notification) return res.status(404).json({ message: 'Notification not found' });
        res.json({ message: 'Marked as read', data: notification });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update notification', error: err.message });
    }
};

/** PUT /api/v1/notifications/read-all */
const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany({ isRead: false }, { isRead: true });
        res.json({ message: 'All notifications marked as read' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update notifications', error: err.message });
    }
};

/** DELETE /api/v1/notifications/:id */
const deleteNotification = async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.json({ message: 'Notification deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete notification', error: err.message });
    }
};

module.exports = { getNotifications, createNotification, markAsRead, markAllAsRead, deleteNotification };

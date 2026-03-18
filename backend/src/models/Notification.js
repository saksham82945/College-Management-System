'use strict';
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['INFO', 'WARNING', 'SUCCESS', 'ERROR', 'ALERT'],
        default: 'INFO',
    },
    targetRole: {
        type: String,
        enum: ['ADMIN', 'TEACHER', 'STUDENT', 'STAFF', 'ALL'],
        default: 'ALL',
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    link: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});

// Index for fast queries
notificationSchema.index({ isRead: 1, createdAt: -1 });
notificationSchema.index({ targetRole: 1, isRead: 1 });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;

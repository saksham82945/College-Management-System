const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        default: 'General'
    },
    type: {
        type: String,
        enum: ['Written', 'Practical', 'Online', 'Viva'],
        default: 'Written'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Exam', examSchema);

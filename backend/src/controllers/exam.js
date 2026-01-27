const Exam = require('../models/Exam');

// @desc    Get all exams
// @route   GET /api/v1/exams
// @access  Private
exports.getExams = async (req, res) => {
    try {
        const exams = await Exam.find().sort({ date: 1 });
        res.status(200).json({ success: true, count: exams.length, data: exams });
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create new exam
// @route   POST /api/v1/exams
// @access  Private
exports.createExam = async (req, res) => {
    try {
        // Add user to req.body if user exists on req
        if (req.user) {
            req.body.createdBy = req.user.id;
        }

        // Map class to course if frontend sends class instead of course
        if (req.body.class && !req.body.course) {
            req.body.course = req.body.class;
        }

        const exam = await Exam.create(req.body);
        res.status(201).json({ success: true, data: exam });
    } catch (error) {
        console.error('Error creating exam:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete exam
// @route   DELETE /api/v1/exams/:id
// @access  Private
exports.deleteExam = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            return res.status(404).json({ success: false, message: 'Exam not found' });
        }
        await exam.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

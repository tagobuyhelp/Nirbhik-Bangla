const Schedule = require('../models/Schedule');

// @desc    Get all program schedules
// @route   GET /api/v1/schedules
// @access  Public
exports.getSchedules = async (req, res) => {
  try {
    const { status, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;

    const schedules = await Schedule.find(query)
      .sort({ startDate: 1, startTime: 1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: schedules.length,
      data: schedules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single schedule item
// @route   GET /api/v1/schedules/:id
// @access  Public
exports.getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }
    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Create new schedule item
// @route   POST /api/v1/schedules
// @access  Private (Admin)
exports.createSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json({ success: true, data: schedule });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update schedule item
// @route   PUT /api/v1/schedules/:id
// @access  Private (Admin)
exports.updateSchedule = async (req, res) => {
  try {
    let schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }
    schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete schedule item
// @route   DELETE /api/v1/schedules/:id
// @access  Private (Admin)
exports.deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }
    await schedule.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

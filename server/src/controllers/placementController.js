const AdPlacement = require('../models/AdPlacement');

// @desc    Get all ad placements
// @route   GET /api/v1/placements
// @access  Public (or Private depending on use case, Admin for now)
exports.getPlacements = async (req, res) => {
  try {
    const placements = await AdPlacement.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: placements.length, data: placements });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create new ad placement
// @route   POST /api/v1/placements
// @access  Private/Admin
exports.createPlacement = async (req, res) => {
  try {
    const placement = await AdPlacement.create(req.body);
    res.status(201).json({ success: true, data: placement });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update ad placement
// @route   PUT /api/v1/placements/:id
// @access  Private/Admin
exports.updatePlacement = async (req, res) => {
  try {
    const placement = await AdPlacement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!placement) {
      return res.status(404).json({ success: false, error: 'Placement not found' });
    }

    res.status(200).json({ success: true, data: placement });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete ad placement
// @route   DELETE /api/v1/placements/:id
// @access  Private/Admin
exports.deletePlacement = async (req, res) => {
  try {
    const placement = await AdPlacement.findByIdAndDelete(req.params.id);

    if (!placement) {
      return res.status(404).json({ success: false, error: 'Placement not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

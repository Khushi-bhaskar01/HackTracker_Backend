const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Hackathon = require('../models/Hackathon');
const User = require('../models/User'); 

router.post('/', auth, async (req, res) => {
  try {
    const hackathon = new Hackathon({ ...req.body, userId: req.user.id });
    const saved = await hackathon.save();
    console.log('🚀🔥Saved hackathon:', saved);
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error('Error creating hackathon:', err);
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const hackathons = await Hackathon.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: hackathons });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Server Error while fetching hackathons' });
  }
});

router.put('/update/:id', auth, async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon || hackathon.userId.toString() !== req.user.id)
      return res.status(404).json({ success: false, msg: 'Not authorized or Hackathon not found' });
    const updated = await Hackathon.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json({ success: true, msg: 'Hackathon updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Server error while updating hackathon' });
  }
});

module.exports = router;

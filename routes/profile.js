const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Hackathon = require('../models/Hackathon');
console.log("=== Profile router loaded ===");

router.get('/:username/full', async (req, res) => {
  try {
    console.log('===> PROFILE ROUTE HIT:', req.params.username);

    const user = await User.findOne({ username: req.params.username }).lean();

    if (!user) return res.status(404).json({ message: "User not found" });


    const hacks = await Hackathon.find({ userId: user._id });

    res.json({
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        githubLink: user.githubLink,
        linkedinLink: user.linkedinLink,
        bio: user.bio,
      },
      hackathons: hacks,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
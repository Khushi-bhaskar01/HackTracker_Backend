const mongoose = require('mongoose');

const HackathonSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hackName: { type: String, required: true },
  organization: { type: String, default: '' },
  officialLink: { type: String, required: true },
  appliedDate: { type: Date, required: true },
  lastDateToApply: { type: Date, required: true },
  lastDateToSubmit: { type: Date },
  status: { type: String },
  projectLink: { type: String },
  githubLink: { type: String },
  certificateUrl: { type: String },
  teamType: { type: String },
  description: { type: String },
  techStack: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Hackathon', HackathonSchema);

const ActivityLeader = require('../models/ActivityLeader')

exports.getAll = async (req, res) => {
  try {
    const activityLeader = await ActivityLeader.find()
    console.log(activityLeader)
    res.json(activityLeader)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const activityLeader = await ActivityLeader.findById(id);
    if (!activityLeader) {
      return res.status(404).json({ message: 'ActivityLeader not found' });
    }
    console.log(activityLeader);
    res.json(activityLeader);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.create = async (req, res) => {
  try {
    const { firstName, lastName, email, imageUrl } = req.body;
    console.log(req.body);
    const newActivityLeader = new ActivityLeader({ firstName, lastName, email, imageUrl });
    await newActivityLeader.save();
    res.status(201).json(newActivityLeader);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, imageUrl, activityId } = req.body;
    console.log( firstName, lastName, imageUrl, activityId);
    const activityLeader = await ActivityLeader.findByIdAndUpdate(id, { firstName, lastName, imageUrl, activityId }, { new: true });
    if (!activityLeader) {
      return res.status(404).json({ message: 'ActivityLeader not found' });
    }
    console.log(activityLeader);
    res.json(activityLeader);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.remove = async (req, res) => {
  try {
    const id = req.params.id; 
    const activityLeader = await ActivityLeader.findByIdAndRemove(id);
    if (!activityLeader) {
      return res.status(404).json({ message: 'ActivityLeader not found' });
    }
    console.log('deleted: ', activityLeader);
    res.json({ message: 'ActivityLeader deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
}

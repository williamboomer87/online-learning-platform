const { Discussion, User } = require('../models');

// Create a new discussion
exports.createDiscussion = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id; // user ID obtained from the JWT token

    const discussion = await Discussion.create({
      title,
      content,
      UserId: userId,
    });

    res.status(201).json({
      success: true,
      message: 'Discussion created successfully',
      discussion,
    });
  } catch (error) {
    next(error);
  }
};

// Get all discussions
exports.getDiscussions = async (req, res, next) => {
  try {
    const discussions = await Discussion.findAll({
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      message: 'Discussions retrieved successfully',
      discussions,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single discussion by ID
exports.getDiscussionById = async (req, res, next) => {
  try {
    const discussionId = req.params.id;

    const discussion = await Discussion.findOne({
      where: { id: discussionId },
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    });

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: 'Discussion not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Discussion retrieved successfully',
      discussion,
    });
  } catch (error) {
    next(error);
  }
};

// Update a discussion by ID
exports.updateDiscussionById = async (req, res, next) => {
  try {
    const discussionId = req.params.id;
    const { title, content } = req.body;

    const discussion = await Discussion.findOne({
      where: { id: discussionId },
    });

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: 'Discussion not found',
      });
    }

    // Check if the user is the author of the discussion
    if (discussion.UserId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to perform this action',
      });
    }

    discussion.title = title || discussion.title;
    discussion.content = content || discussion.content;

    await discussion.save();

    res.status(200).json({
      success: true,
      message: 'Discussion updated successfully',
      discussion,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a discussion by ID
exports.deleteDiscussionById = async (req, res, next) => {
  try {
    const discussionId = req.params.id;

    const discussion = await Discussion.findOne({
      where: { id: discussionId },
    });

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: 'Discussion not found',
      });
    }

    // Check if the user is the author of the discussion
    if (discussion.UserId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to perform this action',
      });
    }

    await discussion.destroy();

    res.status(200).json({
      success: true,
      message: 'Discussion deleted

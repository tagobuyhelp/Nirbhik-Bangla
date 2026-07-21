const BaseRepository = require('./BaseRepository');
const Article = require('../models/Article');
const { WORKFLOW_STATES } = require('../constants/workflow');

class ArticleRepository extends BaseRepository {
  constructor() {
    super(Article);
  }

  async findPublishedArticles(options = {}) {
    const query = { status: WORKFLOW_STATES.PUBLISHED };
    return await this.find(query, {
      ...options,
      populate: 'category tags author featuredImage'
    });
  }

  async findBreakingArticles() {
    return await this.model
      .find({ status: WORKFLOW_STATES.PUBLISHED, isBreaking: true })
      .populate('category author featuredImage')
      .sort({ createdAt: -1 })
      .limit(5);
  }

  async findTrendingArticles(limit = 10) {
    return await this.model
      .find({ status: WORKFLOW_STATES.PUBLISHED })
      .populate('category author featuredImage')
      .sort({ viewsCount: -1, createdAt: -1 })
      .limit(limit);
  }

  async incrementViews(id) {
    return await this.model.findByIdAndUpdate(id, { $inc: { viewsCount: 1 } }, { new: true });
  }
}

module.exports = new ArticleRepository();

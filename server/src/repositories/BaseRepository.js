class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findById(id, populate = '') {
    return await this.model.findById(id).populate(populate);
  }

  async findOne(query, populate = '') {
    return await this.model.findOne(query).populate(populate);
  }

  async find(query = {}, options = {}) {
    const { page = 1, limit = 10, sort = { createdAt: -1 }, populate = '', select = '' } = options;
    const skip = (page - 1) * limit;

    const data = await this.model
      .find(query)
      .select(select)
      .populate(populate)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await this.model.countDocuments(query);

    return {
      data,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async updateById(id, updateData) {
    return await this.model.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  async deleteById(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;

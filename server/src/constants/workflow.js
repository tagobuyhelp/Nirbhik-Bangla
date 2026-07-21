const WORKFLOW_STATES = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted', // Reporter submitted
  SUB_EDITOR_REVIEW: 'sub_editor_review',
  EDITOR_REVIEW: 'editor_review',
  APPROVED: 'approved',
  SCHEDULED: 'scheduled',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  REJECTED: 'rejected'
};

const LANGUAGES = {
  BANGLA: 'bn',
  HINDI: 'hi',
  ENGLISH: 'en'
};

module.exports = {
  WORKFLOW_STATES,
  LANGUAGES
};

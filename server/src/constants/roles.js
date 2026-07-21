const ROLES = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  MANAGING_EDITOR: 'Managing Editor',
  EDITOR: 'Editor',
  SUB_EDITOR: 'Sub Editor',
  REPORTER: 'Reporter',
  PHOTO_JOURNALIST: 'Photo Journalist',
  VIDEO_EDITOR: 'Video Editor',
  MODERATOR: 'Moderator',
  ADVERTISEMENT_MANAGER: 'Advertisement Manager',
  SEO_MANAGER: 'SEO Manager',
  TRANSLATOR: 'Translator',
  SUBSCRIBER: 'Subscriber'
};

const ALL_ROLES = Object.values(ROLES);

module.exports = {
  ROLES,
  ALL_ROLES
};

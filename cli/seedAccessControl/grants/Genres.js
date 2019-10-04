const Genres = [
  // Admin
  {
    role: 'Admin',
    resource: 'Genres',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Genres',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Genres',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Genres',
    action: 'delete:any',
    attributes: '*',
  },

  // Full Access
  {
    role: 'Full Access',
    resource: 'Genres',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Genres',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Genres',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Genres',
    action: 'delete:any',
    attributes: '*',
  },

  // Show Captain
  {
    role: 'Show Captain',
    resource: 'Genres',
    action: 'read:any',
    attributes: '*',
  },

  // Underwriting
  {
    role: 'Underwriting',
    resource: 'Genres',
    action: 'read:any',
    attributes: '*',
  },

  // DJ
  {
    role: 'DJ',
    resource: 'Genres',
    action: 'read:any',
    attributes: '*',
  },

  // Music Library Admin
  {
    role: 'Music Library Admin',
    resource: 'Genres',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Music Library Admin',
    resource: 'Genres',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Music Library Admin',
    resource: 'Genres',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Music Library Admin',
    resource: 'Genres',
    action: 'delete:any',
    attributes: '*',
  },
];

module.exports = Genres;

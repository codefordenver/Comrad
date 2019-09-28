const Playlists = [
  // Admin
  {
    role: 'Admin',
    resource: 'Playlists',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Playlists',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Playlists',
    action: 'delete:any',
    attributes: '*',
  },

  // Full Access
  {
    role: 'Full Access',
    resource: 'Playlists',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Playlists',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Playlists',
    action: 'delete:any',
    attributes: '*',
  },

  // Show Captain
  {
    role: 'Show Captain',
    resource: 'Playlists',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Show Captain',
    resource: 'Playlists',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Show Captain',
    resource: 'Playlists',
    action: 'delete:any',
    attributes: '*',
  },

  // Underwriting
  {
    role: 'Underwriting',
    resource: 'Playlists',
    action: 'read:any',
    attributes: '*',
  },

  // DJ
  {
    role: 'DJ',
    resource: 'Playlists',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'DJ',
    resource: 'Playlists',
    action: 'update:own',
    attributes: '*',
  },

  // Music Library Admin
  {
    role: 'Music Library Admin',
    resource: 'Playlists',
    action: 'read:any',
    attributes: '*',
  },
];

module.exports = Playlists;

const Library = [
  // Admin
  {
    role: 'Admin',
    resource: 'Library',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Library',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Library',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Library',
    action: 'delete:any',
    attributes: '*',
  },

  // Full Access
  {
    role: 'Full Access',
    resource: 'Library',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Library',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Library',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Library',
    action: 'delete:any',
    attributes: '*',
  },

  // Show Captain
  {
    role: 'Show Captain',
    resource: 'Library',
    action: 'read:any',
    attributes: '*',
  },

  // Underwriting
  {
    role: 'Underwriting',
    resource: 'Library',
    action: 'read:any',
    attributes: '*',
  },

  // DJ
  {
    role: 'DJ',
    resource: 'Library',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'DJ',
    resource: 'Library',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'DJ',
    resource: 'Library',
    action: 'create:any',
    attributes: '*',
  },

  // Music Library Admin
  {
    role: 'Music Library Admin',
    resource: 'Library',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Music Library Admin',
    resource: 'Library',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Music Library Admin',
    resource: 'Library',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Music Library Admin',
    resource: 'Library',
    action: 'delete:any',
    attributes: '*',
  },
];

module.exports = Library;

const Resources = [
  // Admin
  {
    role: 'Admin',
    resource: 'Resources',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Resources',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Resources',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Resources',
    action: 'delete:any',
    attributes: '*',
  },

  // Full Access
  {
    role: 'Full Access',
    resource: 'Resources',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Resources',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Resources',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Resources',
    action: 'delete:any',
    attributes: '*',
  },

  // Show Captain
  {
    role: 'Show Captain',
    resource: 'Resources',
    action: 'read:any',
    attributes: '*',
  },

  // Underwriting
  {
    role: 'Underwriting',
    resource: 'Resources',
    action: 'read:any',
    attributes: '*',
  },

  // DJ
  {
    role: 'DJ',
    resource: 'Resources',
    action: 'read:any',
    attributes: '*',
  },

  // Music Library Admin
  {
    role: 'Music Library Admin',
    resource: 'Resources',
    action: 'read:any',
    attributes: '*',
  },
];

module.exports = Resources;

const Shows = [
  // Admin
  {
    role: 'Admin',
    resource: 'Shows',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Shows',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Shows',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Shows',
    action: 'delete:any',
    attributes: '*',
  },

  // Full Access
  {
    role: 'Full Access',
    resource: 'Shows',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Shows',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Shows',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Shows',
    action: 'delete:any',
    attributes: '*',
  },

  // Show Captain
  {
    role: 'Show Captain',
    resource: 'Shows',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Show Captain',
    resource: 'Shows',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Show Captain',
    resource: 'Shows',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Show Captain',
    resource: 'Shows',
    action: 'delete:any',
    attributes: '*',
  },

  // Underwriting
  {
    role: 'Underwriting',
    resource: 'Shows',
    action: 'read:any',
    attributes: '*',
  },

  // DJ
  {
    role: 'DJ',
    resource: 'Shows',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'DJ',
    resource: 'Shows',
    action: 'update:own',
    attributes: '*',
  },

  // Music Library Admin
  {
    role: 'Music Library Admin',
    resource: 'Shows',
    action: 'read:any',
    attributes: '*',
  },
];

module.exports = Shows;

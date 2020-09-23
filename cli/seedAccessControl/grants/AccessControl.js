const AccessControl = [
  // Admin
  {
    role: 'Admin',
    resource: 'AccessControl',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'AccessControl',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'AccessControl',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'AccessControl',
    action: 'delete:any',
    attributes: '*',
  },

  // Full Access
  {
    role: 'Full Access',
    resource: 'AccessControl',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'AccessControl',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'AccessControl',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'AccessControl',
    action: 'delete:any',
    attributes: '*',
  },

  // Show Captain
  {
    role: 'Show Captain',
    resource: 'AccessControl',
    action: 'read:any',
    attributes: '*',
  },

  // Underwriting
  {
    role: 'Underwriting',
    resource: 'AccessControl',
    action: 'read:any',
    attributes: '*',
  },

  // DJ
  {
    role: 'DJ',
    resource: 'AccessControl',
    action: 'read:any',
    attributes: '*',
  },

  // Music Library Admin
  {
    role: 'Music Library Admin',
    resource: 'AccessControl',
    action: 'read:any',
    attributes: '*',
  },
];

module.exports = AccessControl;

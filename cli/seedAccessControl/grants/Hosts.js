const Users = [
  // Admin
  {
    role: 'Admin',
    resource: 'Hosts',
    action: 'read:any',
    attributes: '*',
  },

  // Full Access
  {
    role: 'Full Access',
    resource: 'Hosts',
    action: 'read:any',
    attributes: '*',
  },

  // Show Captain
  {
    role: 'Show Captain',
    resource: 'Hosts',
    action: 'read:any',
    attributes: '*',
  },

  // Underwriting
  {
    role: 'Underwriting',
    resource: 'Hosts',
    action: 'read:any',
    attributes: '*',
  },

  // DJ
  {
    role: 'DJ',
    resource: 'Hosts',
    action: 'read:any',
    attributes: '*',
  },

  // Music Library Admin
  {
    role: 'Music Library Admin',
    resource: 'Users',
    action: 'read:any',
    attributes: '*',
  },
];

module.exports = Users;

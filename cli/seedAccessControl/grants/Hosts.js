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

  // Show Producer
  {
    role: 'Show Producer',
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

  // Guest
  {
    role: 'Guest',
    resource: 'Users',
    action: 'read:any',
    attributes: '*',
  },
];

module.exports = Users;

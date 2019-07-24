const Users = [
  // Admin
  {
    role: 'Admin',
    resource: 'Users',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Users',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Users',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Users',
    action: 'delete:any',
    attributes: '*',
  },

  // Full Access
  {
    role: 'Full Access',
    resource: 'Users',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Users',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Users',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Users',
    action: 'delete:any',
    attributes: '*',
  },

  // Show Producer
  {
    role: 'Show Producer',
    resource: 'Users',
    action: 'create:own',
    attributes: '*',
  },
  {
    role: 'Show Producer',
    resource: 'Users',
    action: 'read:own',
    attributes: '*',
  },
  {
    role: 'Show Producer',
    resource: 'Users',
    action: 'update:own',
    attributes: '*',
  },
  {
    role: 'Show Producer',
    resource: 'Users',
    action: 'delete:own',
    attributes: '*',
  },

  // Underwriting
  {
    role: 'Underwriting',
    resource: 'Users',
    action: 'create:own',
    attributes: '*',
  },
  {
    role: 'Underwriting',
    resource: 'Users',
    action: 'read:own',
    attributes: '*',
  },
  {
    role: 'Underwriting',
    resource: 'Users',
    action: 'update:own',
    attributes: '*',
  },
  {
    role: 'Underwriting',
    resource: 'Users',
    action: 'delete:own',
    attributes: '*',
  },

  // DJ
  {
    role: 'DJ',
    resource: 'AccessControl',
    action: 'create:own',
    attributes: '*',
  },
  {
    role: 'DJ',
    resource: 'AccessControl',
    action: 'read:own',
    attributes: '-_id first_name last_name',
  },
  {
    role: 'DJ',
    resource: 'AccessControl',
    action: 'update:own',
    attributes: '*',
  },
  {
    role: 'DJ',
    resource: 'AccessControl',
    action: 'delete:own',
    attributes: '*',
  },

  // Guest
  {
    role: 'Guest',
    resource: 'Users',
    action: 'create:own',
    attributes: '*',
  },
  {
    role: 'Guest',
    resource: 'Users',
    action: 'read:own',
    attributes: '*',
  },
  {
    role: 'Guest',
    resource: 'Users',
    action: 'update:own',
    attributes: '*',
  },
  {
    role: 'Guest',
    resource: 'Users',
    action: 'delete:own',
    attributes: '*',
  },
];

module.exports = Users;

const users = [
  // Admin
  {
    role: 'admin',
    resource: 'users',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'admin',
    resource: 'users',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'admin',
    resource: 'users',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'admin',
    resource: 'users',
    action: 'delete:any',
    attributes: '*',
  },

  // Full Access
  {
    role: 'full access',
    resource: 'users',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'full access',
    resource: 'users',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'full access',
    resource: 'users',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'full access',
    resource: 'users',
    action: 'delete:any',
    attributes: '*',
  },

  // Show Producer
  {
    role: 'show producer',
    resource: 'users',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'show producer',
    resource: 'users',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'show producer',
    resource: 'users',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'show producer',
    resource: 'users',
    action: 'delete:any',
    attributes: '*',
  },

  // Underwriting
  {
    role: 'underwriting',
    resource: 'users',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'underwriting',
    resource: 'users',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'underwriting',
    resource: 'users',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'underwriting',
    resource: 'users',
    action: 'delete:any',
    attributes: '*',
  },

  // DJ
  {
    role: 'dj',
    resource: 'users',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'dj',
    resource: 'users',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'dj',
    resource: 'users',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'dj',
    resource: 'users',
    action: 'delete:any',
    attributes: '*',
  },

  // Guest
  {
    role: 'guest',
    resource: 'users',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'guest',
    resource: 'users',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'guest',
    resource: 'users',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'guest',
    resource: 'users',
    action: 'delete:any',
    attributes: '*',
  },
];

module.exports = users;

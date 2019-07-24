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
    action: 'read:own',
    attributes: '-_id, link',
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

  // Show Producer
  {
    role: 'Show Producer',
    resource: 'Resources',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Show Producer',
    resource: 'Resources',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Show Producer',
    resource: 'Resources',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Show Producer',
    resource: 'Resources',
    action: 'delete:any',
    attributes: '*',
  },

  // Underwriting
  {
    role: 'Underwriting',
    resource: 'Resources',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Underwriting',
    resource: 'Resources',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Underwriting',
    resource: 'Resources',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Underwriting',
    resource: 'Resources',
    action: 'delete:any',
    attributes: '*',
  },

  // DJ
  {
    role: 'DJ',
    resource: 'Resources',
    action: 'create:own',
    attributes: '*',
  },
  {
    role: 'DJ',
    resource: 'Resources',
    action: 'read:own',
    attributes: '*',
  },
  {
    role: 'DJ',
    resource: 'Resources',
    action: 'update:own',
    attributes: '*',
  },
  {
    role: 'DJ',
    resource: 'Resources',
    action: 'delete:own',
    attributes: '*',
  },

  // Guest
  {
    role: 'Guest',
    resource: 'Resources',
    action: 'create:own',
    attributes: '*',
  },
  {
    role: 'Guest',
    resource: 'Resources',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Guest',
    resource: 'Resources',
    action: 'update:own',
    attributes: '*',
  },
  {
    role: 'Guest',
    resource: 'Resources',
    action: 'delete:own',
    attributes: '*',
  },
];

module.exports = Resources;

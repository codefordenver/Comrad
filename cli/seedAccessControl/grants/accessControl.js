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
    action: 'create:own',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'AccessControl',
    action: 'read:own',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'AccessControl',
    action: 'update:own',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'AccessControl',
    action: 'delete:own',
    attributes: '*',
  },

  // Show Producer
  {
    role: 'Show Producer',
    resource: 'AccessControl',
    action: 'create:own',
    attributes: '*',
  },
  {
    role: 'Show Producer',
    resource: 'AccessControl',
    action: 'read:own',
    attributes: '*',
  },
  {
    role: 'Show Producer',
    resource: 'AccessControl',
    action: 'update:own',
    attributes: '*',
  },
  {
    role: 'Show Producer',
    resource: 'AccessControl',
    action: 'delete:own',
    attributes: '*',
  },

  // Underwriting
  {
    role: 'Underwriting',
    resource: 'AccessControl',
    action: 'create:own',
    attributes: '*',
  },
  {
    role: 'Underwriting',
    resource: 'AccessControl',
    action: 'read:own',
    attributes: '*',
  },
  {
    role: 'Underwriting',
    resource: 'AccessControl',
    action: 'update:own',
    attributes: '*',
  },
  {
    role: 'Underwriting',
    resource: 'AccessControl',
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
    attributes: '*',
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
    resource: 'AccessControl',
    action: 'create:own',
    attributes: '*',
  },
  {
    role: 'Guest',
    resource: 'AccessControl',
    action: 'read:own',
    attributes: '*',
  },
  {
    role: 'Guest',
    resource: 'AccessControl',
    action: 'update:own',
    attributes: '*',
  },
  {
    role: 'Guest',
    resource: 'AccessControl',
    action: 'delete:own',
    attributes: '*',
  },
];

module.exports = AccessControl;

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
];

module.exports = AccessControl;

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
];

module.exports = AccessControl;

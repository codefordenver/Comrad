const accessControl = [
  // Admin
  {
    role: 'admin',
    resource: 'accessControl',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'admin',
    resource: 'accessControl',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'admin',
    resource: 'accessControl',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'admin',
    resource: 'accessControl',
    action: 'delete:any',
    attributes: '*',
  },
];

module.exports = accessControl;

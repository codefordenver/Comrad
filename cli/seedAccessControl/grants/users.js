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
];

module.exports = Users;

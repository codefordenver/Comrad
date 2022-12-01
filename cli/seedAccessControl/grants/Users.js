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
  // Show Captain
  {
    role: 'Show Captain',
    resource: 'Users',
    action: 'read:own',
    attributes: '*',
  },
  {
    role: 'Show Captain',
    resource: 'Users',
    action: 'update:own',
    attributes: 'first_name,last_name,email,on_air_name,bio',
  },

  // Underwriting
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
    attributes: 'first_name,last_name,email,on_air_name,bio',
  },

  // DJ
  {
    role: 'DJ',
    resource: 'Users',
    action: 'read:own',
    attributes: '*',
  },
  {
    role: 'DJ',
    resource: 'Users',
    action: 'update:own',
    attributes: 'first_name,last_name,email,on_air_name,bio',
  },

  // Music Library Admin
  {
    role: 'Music Library Admin',
    resource: 'Users',
    action: 'read:own',
    attributes: '*',
  },
  {
    role: 'Music Library Admin',
    resource: 'Users',
    action: 'update:own',
    attributes: 'first_name,last_name,email,on_air_name,bio',
  },
];

module.exports = Users;

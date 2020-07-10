const HostGroups = [
  // Admin
  {
    role: 'Admin',
    resource: 'HostGroups',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'HostGroups',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'HostGroups',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'HostGroups',
    action: 'delete:any',
    attributes: '*',
  },

  // Full Access
  {
    role: 'Full Access',
    resource: 'HostGroups',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'HostGroups',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'HostGroups',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'HostGroups',
    action: 'delete:any',
    attributes: '*',
  },

  // Show Captain
  {
    role: 'Show Captain',
    resource: 'HostGroups',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Show Captain',
    resource: 'HostGroups',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Show Captain',
    resource: 'HostGroups',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Show Captain',
    resource: 'HostGroups',
    action: 'delete:any',
    attributes: '*',
  },

  // Underwriting
  {
    role: 'Underwriting',
    resource: 'HostGroups',
    action: 'read:any',
    attributes: '*',
  },

  // DJ
  {
    role: 'DJ',
    resource: 'HostGroups',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'DJ',
    resource: 'HostGroups',
    action: 'update:own',
    attributes: '*',
  },

  // Music Library Admin
  {
    role: 'Music Library Admin',
    resource: 'HostGroups',
    action: 'read:any',
    attributes: '*',
  },
];

module.exports = HostGroups;

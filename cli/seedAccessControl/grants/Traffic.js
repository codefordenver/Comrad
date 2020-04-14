const Traffic = [
  // Admin
  {
    role: 'Admin',
    resource: 'Traffic',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Traffic',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Traffic',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Traffic',
    action: 'delete:any',
    attributes: '*',
  },

  // Full Access
  {
    role: 'Full Access',
    resource: 'Traffic',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Traffic',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Traffic',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Traffic',
    action: 'delete:any',
    attributes: '*',
  },

  // Show Captain
  {
    role: 'Show Captain',
    resource: 'Traffic',
    action: 'read:any',
    attributes: '*',
  },

  // Underwriting
  {
    role: 'Underwriting',
    resource: 'Traffic',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Underwriting',
    resource: 'Traffic',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Underwriting',
    resource: 'Traffic',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Underwriting',
    resource: 'Traffic',
    action: 'delete:any',
    attributes: '*',
  },

  // DJ
  {
    role: 'DJ',
    resource: 'Traffic',
    action: 'read:any',
    attributes: '*',
  },

  // Music Library Admin
  {
    role: 'Music Library Admin',
    resource: 'Traffic',
    action: 'read:any',
    attributes: '*',
  },
];

module.exports = Traffic;

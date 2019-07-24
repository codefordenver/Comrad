const Announcements = [
  // Admin
  {
    role: 'Admin',
    resource: 'Announcements',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Announcements',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Announcements',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Admin',
    resource: 'Announcements',
    action: 'delete:any',
    attributes: '*',
  },

  // Full Access
  {
    role: 'Full Access',
    resource: 'Announcements',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Announcements',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Announcements',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Full Access',
    resource: 'Announcements',
    action: 'delete:any',
    attributes: '*',
  },

  // Show Producer
  {
    role: 'Show Producer',
    resource: 'Announcements',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Show Producer',
    resource: 'Announcements',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Show Producer',
    resource: 'Announcements',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Show Producer',
    resource: 'Announcements',
    action: 'delete:any',
    attributes: '*',
  },

  // Underwriting
  {
    role: 'Underwriting',
    resource: 'Announcements',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Underwriting',
    resource: 'Announcements',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Underwriting',
    resource: 'Announcements',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Underwriting',
    resource: 'Announcements',
    action: 'delete:any',
    attributes: '*',
  },

  // DJ
  {
    role: 'DJ',
    resource: 'Announcements',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'DJ',
    resource: 'Announcements',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'DJ',
    resource: 'Announcements',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'DJ',
    resource: 'Announcements',
    action: 'delete:any',
    attributes: '*',
  },

  // Guest
  {
    role: 'Guest',
    resource: 'Announcements',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'Guest',
    resource: 'Announcements',
    action: 'read:any',
    attributes: '*',
  },
  {
    role: 'Guest',
    resource: 'Announcements',
    action: 'update:any',
    attributes: '*',
  },
  {
    role: 'Guest',
    resource: 'Announcements',
    action: 'delete:any',
    attributes: '*',
  },
];

module.exports = Announcements;

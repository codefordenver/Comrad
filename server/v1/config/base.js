module.exports = {
  modelCustomFields: {
    //TODO: move this to a place where it could be edited by whatever station is running comrad
    //schema for custom fields:
    // name (required) - String - The name of the field in the database
    // label (required) - String - The human-readable name of the field to use in UX
    // editFieldType (required) - String - How to display the field for editing. Possible values: checkbox, dropdown
    // options (optional) - Array - If displayType is "dropdown", this is the list of possible values to select from
    album: [
      { name: 'local', label: 'Local Artist', editFieldType: 'checkbox' },
      {
        name: 'location',
        label: 'Location',
        editFieldType: 'dropdown',
        options: [
          'Gnu Bin',
          'KGNU Library',
          'KGNU Library - lost',
          'KGNU Library - discarded',
          'Not in library',
        ],
      },
    ],
  },
  queryPageSize: 100,
};

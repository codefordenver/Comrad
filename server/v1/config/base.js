module.exports = {
  inComplianceReportingPeriod: true, // when true, users will be prompted to enter a label for any track that does not have one when adding a track to their Show Builder playlist
  modelCustomFields: {
    //TODO: move this to a place where it could be edited by whatever station is running comrad
    //schema for custom fields:
    // name (required) - String - The name of the field in the database
    // label (required) - String - The human-readable name of the field to use in UX
    // editFieldType (required) - String - How to display the field for editing. Possible values: checkbox, dropdown, text
    // options (optional) - Array - If displayType is "dropdown", this is the list of possible values to select from
    // includeInTextIndex - Boolean - only configured for albums right now. will include this in the full text index - but requires removing & recreating the index
    // includeInChartingReport - Boolean - only configured for albums right now. will include this in the charting report export
    // jotformUrlParameter - String - for giveaways, the parameter that should be passed into JotForm
    //
    // When we set up a way to edit this, we will need a way to modify full text indexes
    //   Mongoose will not do it on its own -- https://github.com/Automattic/mongoose/issues/4644
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
      {
        name: 'library_number',
        label: 'Library Number',
        editFieldType: 'text',
        includeInTextIndex: true,
        includeInChartingReport: true,
      },
    ],
    giveaway: [
      {
        name: 'ticket_type',
        label: 'Ticket Type',
        editFieldType: 'dropdown',
        jotformUrlParameter: 'typeOf10',
        options: ['Guest List', 'Paper'],
      },
    ],
    show: [
      {
        name: 'record_audio',
        label: 'Record Audio',
        editFieldType: 'checkbox',
      },
    ],
  },
  queryPageSize: 100,
  resourcesCategories: [
    'Announcements',
    'Policies',
    'Fund Drives',
    'Other Important Documents',
  ],
  stationTimeZone: 'America/Denver', // all events will be adjusted to this time zone (for Daylight Savings Time adjustments), should be in a proper format for the Luxon package
};

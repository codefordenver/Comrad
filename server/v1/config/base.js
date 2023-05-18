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
        required: true,
        kgnuCustomFunctionalityAutoIncrement: true, // this field will auto increment from its highest value when imported from itunes
      },
      {
        name: 'album_art_url',
        label: 'Album Art URL',
        editFieldType: 'text'
      }
    ],
    giveaway: [
      {
        name: 'ticket_type',
        label: 'Ticket Type',
        editFieldType: 'dropdown',
        jotformUrlParameter: 'ticketType',
        options: ['Guest List', 'Paper', 'Digital', 'Other'],
      },
    ],
    show: [
      {
        name: 'record_audio',
        label: 'Record Audio',
        editFieldType: 'checkbox',
      },
      {
        name: 'category',
        label: 'Category',
        editFieldType: 'dropdown',
        options: ['NewsPA', 'Music']
      }
    ],
  },
  queryPageSize: 100,
  resourcesCategories: [
    'Announcements',
    'Policies',
    'Fund Drives',
    'Other Important Documents',
  ],
  ticketGiveawayHtml: "<div>" + 
    "<b>Notes to DJ:</b>" +
    "<br />" +
    "<br />" +
    "We ask that callers have NOT won anything from KGNU in the last 30 days and can make it to the show." +
    "<br />" +
    "<br />" +
    "IF DOING A PHONE GIVEAWAY:" +
    "<br />" +
    "<br />" +
    "Give the phone number of the studio you are broadcasting from, and tell listeners which caller you will be \"taking\" (2nd or 3rd works well). Record the winner's information by clicking on “ENTER WINNER INFORMATION” below, entering the required info and then *VERY IMPORTANT* click \"SUBMIT.\" If there are no callers, please check the 'no callers' box on the form." +
    "<br />" +
    "<br />" +
    "Please spell/read back the winner's email address and phone number so we can contact them." +
    "<br />" +
    "<br />" +
    "IF YOU'D RATHER DO AN EMAIL GIVEAWAY:" +
    "<br />" +
    "<br />" +
    "Tell listeners to send an email with the concert in the subject line to <a href=\"mailto:tickets@kgnu.org\">tickets@kgnu.org</a>. The third person to email <a href=\"mailto:tickets@kgnu.org\">tickets@kgnu.org</a> will win the tickets and will be notified by email." +
    "<br />" +
    "<br />" +
    "For *all* questions about tickets, please email <a href=\"mailto:tickets@kgnu.org\">tickets@kgnu.org</a>" +
  "</div>",
  stationTimeZone: 'America/Denver', // all events will be adjusted to this time zone (for Daylight Savings Time adjustments), should be in a proper format for the Luxon package
};

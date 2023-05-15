const db = require('../../models');

const moment = require('moment-timezone');
const keys = require('../../config/keys');
const { Parser } = require('json2csv');

function charting(req, res) {
  let { from, to } = req.query;

  let match_query = { 'saved_items.track': { $ne: null } };
  if (from != null && to != null) {
    match_query['saved_items.executed_time_utc'] = {
      $gte: moment.tz(from, keys.stationTimeZone).toDate(),
      $lte: moment.tz(to, keys.stationTimeZone).toDate(),
    };
  } else if (from != null) {
    match_query['saved_items.executed_time_utc'] = { $gte: moment.tz(from, keys.stationTimeZone).toDate() };
  } else if (to != null) {
    match_query['saved_items.executed_time_utc'] = { $lte: moment.tz(to, keys.stationTimeZone).toDate() };
  } else {
    return res.status(422).json({"error":"Please provide a parameter for 'from' or 'to'"});
  }

  // look for custom properties we should include in the export
  var customPropertiesToInclude = [];
  var customPropertiesToIncludeLabels = [];
  let customPropertiesProjection = {};
  let customPropertiesGroup = {};
  if ('album' in keys.modelCustomFields) {
    keys.modelCustomFields.album.forEach(function(a) {
      if (a.includeInChartingReport != null && a.includeInChartingReport) {
        customPropertiesToInclude.push(a.name);
        customPropertiesToIncludeLabels.push(a.label);
        customPropertiesProjection[a.name + '_custom_field'] =
          '$album_info.custom.' + a.name;
        customPropertiesGroup[a.name + '_custom_field'] = {
          $first: '$' + a.name + '_custom_field',
        };
      }
    });
  }

  db.Playlist.aggregate([
    { $unwind: { path: '$saved_items' } },
    { $match: match_query },
    {
      $lookup: {
        from: 'library',
        localField: 'saved_items.track',
        foreignField: '_id',
        as: 'track_info',
      },
    },
    {
      $project: {
        track_info: { $arrayElemAt: ['$track_info', 0] },
      },
    },
    {
      $lookup: {
        from: 'library',
        localField: 'track_info.album',
        foreignField: '_id',
        as: 'album_info',
      },
    },
    {
      $project: {
        album_info: { $arrayElemAt: ['$album_info', 0] },
      },
    },
    {
      $lookup: {
        from: 'library',
        localField: 'album_info.artist',
        foreignField: '_id',
        as: 'artist',
      },
    },

    {
      $lookup: {
        from: 'genres',
        localField: 'album_info.genre',
        foreignField: '_id',
        as: 'genre',
      },
    },
    {
      $project: {
        album_info: 1,
        genre: { $arrayElemAt: ['$genre', 0] },
        artist: { $arrayElemAt: ['$artist', 0] },
      },
    },
    {
      $project: {
        album_id: '$album_info._id',
        name: '$album_info.name',
        artist: '$artist.name',
        add_date: '$album_info.created_at',
        label: '$album_info.label',
        genre: '$genre.name',
        ...customPropertiesProjection,
      },
    },

    {
      $group: {
        _id: '$album_id',
        plays: { $sum: 1 },
        album_title: { $first: '$name' },
        artist: { $first: '$artist' },
        add_date: { $first: '$add_date' },
        label: { $first: '$label' },
        genre: { $first: '$genre' },
        ...customPropertiesGroup,
      },
    },
    {
      $sort: {
        genre: 1,
        plays: -1,
      },
    },
  ])
    .then(albumsForCharting => {
      //res.setHeader('Content-disposition', 'attachment; filename=charting.xlsx');
      //res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');


      // Require library
      var xl = require('excel4node');

      // Create a new instance of a Workbook class
      var wb = new xl.Workbook();
      var worksheets = [
        wb.addWorksheet('Unknown genre')
      ];

      var worksheetGenre;
      var currentRow = 2;
      for (var i = 0; i < albumsForCharting.length; i++) {
        let dataRow = albumsForCharting[i];

        if (dataRow.genre != worksheetGenre) {
          worksheetGenre = dataRow.genre;
          worksheets.push(wb.addWorksheet(dataRow.genre));
          currentRow = 2;
        }

        let currentWorksheet = worksheets[worksheets.length - 1];


        let addDateValue = dataRow.addDate != null ?
          moment(dataRow.add_date)
            .tz(keys.stationTimeZone)
            .format('YYYY-M-D h:mm:ss a')
          : null;
        currentWorksheet.cell(currentRow, 1).number(dataRow.plays);
        currentWorksheet.cell(currentRow, 2).string(dataRow.artist);
        currentWorksheet.cell(currentRow, 3).string(dataRow.album_title);
        currentWorksheet.cell(currentRow, 4).string(dataRow.label);
        currentWorksheet.cell(currentRow, 5).string(addDateValue);
        if (dataRow.genre != null) {
          currentWorksheet.cell(currentRow, 6).string(dataRow.genre);
        }

        for (let j = 0; j < customPropertiesToInclude.length; j++) {
          let value =  dataRow[customPropertiesToInclude[j] + '_custom_field'];
          if (value != null) {
            currentWorksheet.cell(currentRow, 7 + j).string(value);
          }
        }

        currentRow++;

      }

      //set worksheet titles
      worksheets.forEach((ws) => {
        let bold = {"font":{"bold":true}};
        ws.cell(1,1).string("Plays").style(bold);
        ws.cell(1,2).string("Artist").style(bold);
        ws.cell(1,3).string("Album Title").style(bold);
        ws.cell(1,4).string("Label").style(bold);
        ws.cell(1,5).string("Add Date").style(bold);
        ws.cell(1,6).string("Genre").style(bold);

        for (let j = 0; j < customPropertiesToInclude.length; j++) {
          ws.cell(1, 7 + j).string(customPropertiesToIncludeLabels[j]).style(bold);
        }
      });

      var title;
      if (from != null && to != null) {
        title = "Comrad Charting Report " + moment(from).format('M-D-YYYY') + ' to ' + moment(to).format('M-D-YYYY');
      } else if (from != null) {
        title = "Comrad Charting Report " + moment(from).format('M-D-YYYY') + " to " + moment(new Date()).format("M-D-YYYY");
      } else {
        title = "Comrad Charting Report before " + moment(to).format('M-D-YYYY');
      }

      wb.write(title + ".xlsx", res);

      return;
    })
    .catch(err => {
      console.error(err);
      return res.status(422).json(err);
    });
}

module.exports = charting;

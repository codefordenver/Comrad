const {
  utils: { getModelForEventType, eventList },
  utils__mongoose: {
    findEventQueryByDateRange,
    populateShowHost,
    populateMasterEvent,
  },
} = require('../utils');

function find(req, res) {
  let { endDate, host, showsWithNoHost, startDate } = req.query;
  const { eventType } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  startDate = startDate ? JSON.parse(startDate) : null;
  endDate = endDate ? JSON.parse(endDate) : null;

  //This date filter allows the same endpoint to be used to find all shows or return a subset if both startDate and endDate are provided.
  const showDateFilter =
    startDate && endDate ? findEventQueryByDateRange(startDate, endDate) : {};

  let promiseChain = []; // an array of promises that we will run before the main show query (in case we need to gather addt'l data for filters)

  let filter = showDateFilter[0];

  if (host != null) {
    //only query shows where any instance or the series has the provided host
    //we will filter this list down farther after the show list has been generated
    //from the series and instances
    promiseChain.push(
      dbModel.find(
        { 'show_details.host': host },
        { _id: 1, master_event_id: 1 },
      ),
    );
  }

  Promise.all(promiseChain)
    .then(promiseResults => {
      if (host != null) {
        let retrieveAllInstancesForSeries = [];
        let retrieveSeries = [];
        promiseResults[0].forEach(function(val) {
          if (val.master_event_id != null) {
            retrieveSeries.push(val.master_event_id);
          } else {
            retrieveAllInstancesForSeries.push(val._id);
          }
        });

        filter = {
          $and: [
            filter,
            {
              $or: [
                //show has the host:
                { 'show_details.host': host },
                //one of the series instance's has the matching host, we'll get the series:
                { _id: { $in: retrieveSeries } },
                //the series has the matching host, we will get all instances:
                { master_event_id: { $in: retrieveAllInstancesForSeries } },
              ],
            },
          ],
        };
      }

      return dbModel
        .find(filter)
        .populate(populateShowHost())
        .populate(populateMasterEvent())
        .then(dbShow => {
          let showResults = eventList(dbShow, startDate, endDate);
          //apply filters, if they were provided
          //these filters can't be applied on the initial query because of series + instances possibly having
          //different values. For example, if we search for a show with a host of "Sean" and a series has
          //a host of "Sean" but the June 1 instance has a host of "Josh", the instance would be excluded from the initial
          //query, and this function would incorrectly return the June 1 instance thinking it has a hos a host of "Sean"
          if (host != null) {
            showResults = showResults.filter(function(val) {
              return (
                val.show_details.host != null &&
                val.show_details.host._id == host
              );
            });
          }

          if (showsWithNoHost == 'true') {
            showResults = showResults.filter(function(val) {
              return val.show_details.host == null;
            });
          }

          res.json(showResults);
        })
        .catch(err => {
          console.error(err);
          return res.status(422).json(err);
        });
    })
    .catch(err => {
      console.error(err);
      return res.status(422).json(err);
    });
}

module.exports = find;
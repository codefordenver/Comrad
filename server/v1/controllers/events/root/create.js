const {
  utils: { getModelForEventType, eventList },
  utils__mongoose: { formatShow, populateShowHost },
} = require('../utils');

function create(req, res) {
  const { body } = req;
  const { startDate, endDate } = body;
  const { eventType } = req.params;
  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }
  dbModel
    .create(formatShow(body, res))
    .then(dbShow => {
      dbModel
        .populate(dbShow, populateShowHost())
        .then(dbShow => {
          res.json(eventList(dbShow, startDate, endDate));
        })
        .catch(err => {
          console.log('Error Populating Show Data from linked records');
          res.status(422).json(err);
        });
    })
    .catch(err => {
      console.log('Error Creating Show');
      console.error(err);
      res.status(422).json(err);
    });
}

module.exports = create;

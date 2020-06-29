const AccessControl = require('accesscontrol');
const db = require('../models');
const {
  utils: { eventList },
  utils__mongoose: { findEventQueryByDateRange },
} = require('../controllers/events/utils');

function requireAC(resource, action) {
  return async function(req, res, next) {
    if (
      process.env.NODE_ENV === 'development' &&
      !process.env.ENFORCE_PERMISSIONS_IN_DEV
    ) {
      return next();
    }

    // TODO: Need to clean up logic a little bit
    const { authorization } = req.headers;

    // eventType determines if this is show or traffic type
    const { eventType } = req.params;
    if (!eventType && !resource) {
      return res
        .status(500)
        .json({ message: 'Access Control Resource is not defined' });
    }

    if (eventType) {
      resource =
        eventType.charAt(0).toUpperCase() + eventType.substr(1).toLowerCase(); // capitalize the first letter of the resource
    }

    if (authorization) {
      const dbUser = await db.User.findOne({
        'api_key.short': authorization.substr(0, 8),
      });

      if (dbUser) {
        const isMatch = await dbUser.compareApiKey(authorization);

        if (isMatch) {
          req.user = dbUser;
        }
      }
    }

    if (!req.user || req.user.status !== 'Active') {
      return res
        .status(401)
        .json({ message: 'Incorrect Credentials or Not Active' });
    }

    const dbAccessControl = await db.AccessControl.find({}, '-_id').lean();
    const ac = new AccessControl(dbAccessControl);
    let permission;
    try {
      permission = ac.can(req.user.roles)[action](resource);
    } catch (err) {
      next(err);
      return;
    }

    if (!permission.granted) {
      return res.status(403).json({
        message: 'You do not have permission to access this resource',
      });
    }

    req.ac = permission;
    req.ac.fields = permission.attributes;

    // check permissions for "own" resources when user does not have updateAny access
    if (
      (action === 'updateOwn' &&
        !ac.can(req.user.roles).updateAny(resource).granted) ||
      (action === 'readOwn' &&
        !ac.can(req.user.roles).readAny(resource).granted)
    ) {
      let show, userIsHost;
      switch (resource) {
        case 'Shows':
          //check to ensure the user is the host of the show
          const { id } = req.params;
          show = await db.Show.findOne({ _id: id });
          userIsHost = await userIsHostOfShow(req.user, show);
          if (!userIsHost) {
            return res.status(403).json({
              message: 'You do not have permission to access this resource',
            });
          }
          break;
        case 'Playlists':
          //check to ensure the user is the host of the related show
          const { playlistId } = req.params;
          let playlist = await db.Playlist.findOne({ _id: playlistId });
          let filter = findEventQueryByDateRange(
            playlist.start_time_utc,
            playlist.end_time_utc,
          );
          let shows = await db.Show.find(filter);
          let showResults = eventList(
            shows,
            playlist.start_time_utc,
            playlist.end_time_utc,
          );
          userIsHost = await userIsHostOfShow(req.user, showResults[0]);
          if (!userIsHost) {
            return res.status(403).json({
              message: 'You do not have permission to access this resource',
            });
          }
          break;
        case 'Users':
          //check to ensure the user is the user they're trying to update
          if (req.params.id !== req.user.id) {
            return res.status(403).json({
              message: 'You do not have permission to access this resource',
            });
          }
          break;
        default:
          return res.status(500).json({
            message: 'updateOwn access has not been configured for ' + resource,
          });
      }
    }

    return next();
  };
}

async function userIsHostOfShow(user, show) {
  if (
    typeof show.show_details.host === 'undefined' &&
    show.master_event_id != null
  ) {
    let series = await db.Show.find({ _id: show.master_event_id });
    if (String(series.show_details.host) !== String(user._id)) {
      return false;
    }
  } else if (String(show.show_details.host) !== String(user._id)) {
    return false;
  }
  return true;
}

module.exports = requireAC;

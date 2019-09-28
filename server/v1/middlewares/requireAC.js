const AccessControl = require('accesscontrol');
const db = require('../models');

function requireAC(resource, action) {
  return async function(req, res, next) {
    if (process.env.NODE_ENV === 'development') {
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

    const permission = ac.can(req.user.role)[action](resource);

    if (!permission.granted) {
      return res.status(403).json({
        message: 'You do not have permission to access this resource',
      });
    }

    req.ac = permission;
    req.ac.fields =
      permission.attributes.indexOf('*') !== -1 ? [] : permission.attributes;

    // check permissions for "own" resources
    if (action === 'updateOwn') {
      switch (resource) {
        case 'Show':
          //check to ensure the user is the host of the show
          const { id } = req.params;
          let show = await db.Show.find({ _id: id });
          //TODO
          console.log('is req user set: ');
          console.log(req.user);
          if (
            typeof show.show_details.host === 'undefined' &&
            typeof show.master_event_id !== 'undefined'
          ) {
            let series = await db.Show.find({ _id: show.master_event_id });
            if (series.show_details.host !== req.user.id) {
              return res.status(403).json({
                message: 'You do not have permission to access this resource',
              });
            }
          } else if (show.show_details.host !== req.user.id) {
            return res.status(403).json({
              message: 'You do not have permission to access this resource',
            });
          }
          break;
        case 'Playlist':
          //check to ensure the user is the host of the related show
          const { playlistId } = req.params;
          let playlist = await db.Playlist.find({ _id: playlistId });
          //TODO: find shows
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

module.exports = requireAC;

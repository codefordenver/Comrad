/**
 * @swagger
 *
 * components:
 *   schemas:
 *     HostGroup:
 *       type: object
 *       required: [on_air_name,users]
 *       description: "When multiple Comrad users are hosting a show together,
 *         they are represented as a `Host Group`. If a `Host Group`
 *         is hosting a show, Comrad will consider the show as \"belonging\" to
 *         each of the users. So when filtering by any of the users in a host
 *         group, the show will appear. `Host Groups` have custom on-air names,
 *         so the group can be identified any way you'd like. For example, the
 *         group could display as \"Robby, Sean, Pete and Josh\" or \"The Way Low
 *         Down\"."
 *       properties:
 *         on_air_name:
 *           type: string
 *           description: The public-facing on-air name the group should be identified by
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *           description: The users that will be hosting together
 *       example:
 *         users:
 *         - 5f35a3cf783e63454ccd7525
 *         - 5f35a651783e63454cd916d4
 *         - 5f35a651783e63454cd1425d
 *         - 5f35a651783e63454cd97ae4
 *         _id: 5f35abd3661c7f37f047dbcb
 *         on_air_name: The Way Low Down
 *         __v: 0
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostGroupSchema = new Schema({
  on_air_name: {
    type: String,
    required: true,
  },

  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

hostGroupSchema.index({ users: 1 }, { background: true });

const HostGroup = mongoose.model('HostGroup', hostGroupSchema);

module.exports = HostGroup;

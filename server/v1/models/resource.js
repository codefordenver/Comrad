/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Resource:
 *       type: object
 *       required: [category,description,link]
 *       description: A link to an external file that can Comrad users can reference. This could be anything a DJ or other user would need to access, like a list of station rules
 *       properties:
 *         category:
 *           type: string
 *           description: The category associated with the link. Possible values can be obtained from the Configuration > Resources - Get Categories API endpoint
 *           required: true
 *         description:
 *           type: string
 *           required: true
 *           description: A description of what the link is
 *         link:
 *           type: string
 *           format: uri
 *           description: The URL link of the resource
 *           required: true
 *       example:
 *         - category: "Announcements"
 *           description: "ON-AIR - Online Ticket Giveaways"
 *           link: "https://getcomrad.org/example/On-AirTicketGiveawayInstructions.pdf"
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  category: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: true,
  },
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;

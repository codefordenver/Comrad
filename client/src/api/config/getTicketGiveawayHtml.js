import axios from 'axios';
import { ROOT_CONFIG_URL } from '../root';

export function getTicketGiveawayHtml() {
  return axios.get(`${ROOT_CONFIG_URL}/ticket-giveaway-html`);
}

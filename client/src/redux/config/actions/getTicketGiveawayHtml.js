import { configTypes } from '../configTypes';
import { configAPI } from '../../../api';

export const getTicketGiveawayHtml = () => async dispatch => {
  try {
    const { data } = await configAPI.getTicketGiveawayHtml();

    dispatch({
      type: configTypes.TICKET_GIVEAWAY_HTML,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

import moment from 'moment';

export function getShowType(show) {
  if (show.is_recurring) {
    return 'series';
  } else if (show.master_event_id) {
    return 'instance';
  } else {
    return 'regular';
  }
}

export function getShowRecordingUrl(show) {
  let titleNoSpaces = show.show_details?.title;
  if (titleNoSpaces) {
    titleNoSpaces = titleNoSpaces.replace(/ /g, '');
  }
  let startTime = moment(show.start_time_utc);
  return "https://aa.kgnu.net/audioarchives/" + titleNoSpaces + "/" 
        + startTime.format('YYYY') + "/" 
        + titleNoSpaces + "_" + startTime.format('YYYY') + "-" + startTime.format('MM') + "-" + startTime.format('DD') + ".mp3";
}
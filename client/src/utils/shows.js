export function getShowType(show) {
  if (show.is_recurring) {
    return 'series';
  } else if (show.master_event_id) {
    return 'instance';
  } else {
    return 'regular';
  }
}

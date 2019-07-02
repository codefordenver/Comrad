/**
 * Returns the display name for a host name
 * @param {Object} user object
 * @returns {String} a formatted string
 */
export const formatHostName = user => {
  const { first_name, last_name, on_air_name } = user;

  return on_air_name || first_name + ' ' + last_name;
};

/**
 * Formats a total number of seconds as mm:ss,
 * for example, would make 100 seconds 1:40
 * @param {Number} totalSeconds the total number of seconds
 * @returns {String} a formatted string in an mm:ss format
 */
export const formatTotalSecondsAsMMSS = totalSeconds => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  let secondsString = String(seconds);
  if (seconds === 0) {
    secondsString = '00';
  } else if (seconds < 10) {
    secondsString = '0' + secondsString;
  }
  return minutes + ':' + secondsString;
};

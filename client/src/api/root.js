export const API_VERSION = 'v1';

export const ROOT_AUTH_URL =
  process.env.REACT_APP_API_SERVER_URL + `/${API_VERSION}/auth`;
export const ROOT_CONFIG_URL =
  process.env.REACT_APP_API_SERVER_URL + `/${API_VERSION}/config`;
export const ROOT_GENRE_URL =
  process.env.REACT_APP_API_SERVER_URL + `/${API_VERSION}/genres`;
export const ROOT_HOST_GROUPS_URL =
  process.env.REACT_APP_API_SERVER_URL + `/${API_VERSION}/host-groups`;
export const ROOT_LIBRARY_URL =
  process.env.REACT_APP_API_SERVER_URL + `/${API_VERSION}/library`;
export const ROOT_PLAYLISTS_URL =
  process.env.REACT_APP_API_SERVER_URL + `/${API_VERSION}/playlists`;
export const ROOT_RESOURCES_URL =
  process.env.REACT_APP_API_SERVER_URL + `/${API_VERSION}/resources`;
export const ROOT_SHOWS_URL =
  process.env.REACT_APP_API_SERVER_URL + `/${API_VERSION}/events/shows`;
export const ROOT_TRAFFIC_URL =
  process.env.REACT_APP_API_SERVER_URL + `/${API_VERSION}/events/traffic`;
export const ROOT_USERS_URL =
  process.env.REACT_APP_API_SERVER_URL + `/${API_VERSION}/users`;

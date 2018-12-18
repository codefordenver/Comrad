const patterns = {
  canDelete: /^(true|false)$/,
  email: /^([a-zA-Z\d.-]+)@([a-zA-Z\d-]+\.)([a-zA-Z]{2,8})(.[a-zA-Z]{2,8})?$/,
  firstName: /^[a-zA-Z0-9\s]{1,}$/,
  lastName: /^[a-zA-Z0-9\s]{1,}$/,
  onAirName: /^[a-zA-Z0-9\s]{1,}$/,
  password: /^.{1,}$/,
  role: /^[a-zA-Z]{1,}$/,
  status: /^[a-zA-Z]{1,}$/,
};

export default patterns;

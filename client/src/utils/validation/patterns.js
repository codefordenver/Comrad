const patterns = {
  can_delete: /^(true|false)$/,
  email: /^([a-zA-Z\d.-]+)@([a-zA-Z\d-]+\.)([a-zA-Z]{2,8})(.[a-zA-Z]{2,8})?$/,
  first_name: /^[a-zA-Z0-9\s]{1,}$/,
  last_name: /^[a-zA-Z0-9\s]{1,}$/,
  on_air_name: /^[a-zA-Z0-9\s]{1,}$/,
  password: /^.{1,}$/,
  role: /^[a-zA-Z]{1,}$/,
  status: /^[a-zA-Z]{1,}$/,

  //Event Patterns
  title: /^[a-zA-Z0-9\s]{1,}$/,
  summary: /^[a-zA-Z0-9\s]{1,}$/,
  description: /^[a-zA-Z0-9\s]{1,}$/,
  producer: /^[a-zA-Z0-9\s]{1,}$/,
  host: /^[a-zA-Z0-9\s]{1,}$/,
  guests: /^[a-zA-Z0-9\s]{1,}$/,
  playlist: /^[a-zA-Z0-9\s]{1,}$/,
  show_start_time_utc: /^[a-zA-Z0-9\s]{1,}$/,
  show_end_time_utc: /^[a-zA-Z0-9\s]{1,}$/,
};

export default patterns;

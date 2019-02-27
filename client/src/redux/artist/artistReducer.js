const initialState = {
  doc: {},
  docs: [],
  error: false,
  loading: false,
  search: {
    filter: '',
    query: '',
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

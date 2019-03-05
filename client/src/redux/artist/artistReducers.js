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

export const artistReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

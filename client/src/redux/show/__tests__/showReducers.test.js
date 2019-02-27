import reducer from '../../../reducers/shows';
import * as types from '../../../actions/types';

const initialState = [
  {
    id: 0,
    title: 'Show 1',
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: 'Show 2',
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 1,
  },
  {
    id: 2,
    title: 'Show 3',
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 1,
  },
  {
    id: 11,
    title: 'Show 4',
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 1,
  },
];

describe('Get Show Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return the payload with id set as key', () => {
    const show_payload = [
      {
        id: 124123,
        name: 'Test Show',
        startDate: 1544159101375,
      },
    ];

    expect(
      reducer([], {
        type: types.SHOW_GET,
        payload: show_payload,
      }),
    ).toEqual({
      '124123': { id: 124123, name: 'Test Show', startDate: 1544159101375 },
    });
  });
});

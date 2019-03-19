const { connect, disconnect } = require('../../tests/mongoose');
const { reduceShowsByRepeatProperty } = require('../showController');

beforeEach(connect);
afterEach(disconnect);

const showsList = [
  {
    created_at: '2018-12-28T02:35:17.747Z',
    is_recurring: true,
    repeat_rule: {
      frequency: 'WEEKLY',
      repeat_start_date: '2018-12-28T02:27:01.732Z',
      repeat_end_date: '2019-04-04T18:00:00.000Z',
      count: null,
      byweekly: '',
    },
    show_details: {
      guests: Array(0),
      title: 'Repeat #1',
      summary: '',
      description: '',
      producer: '',
    },
  },
  {
    created_at: '2018-12-28T02:35:17.747Z',
    is_recurring: false,
    repeat_rule: {
      frequency: '',
      repeat_start_date: '',
      repeat_end_date: '',
      count: null,
      byweekly: '',
    },
    show_details: {
      guests: Array(0),
      title: 'Non-Repeat #1',
      summary: '',
      description: '',
      producer: '',
    },
  },
  {
    created_at: '2018-12-28T02:35:17.747Z',
    is_recurring: true,
    repeat_rule: {
      frequency: 'WEEKLY',
      repeat_start_date: '2018-12-28T02:27:01.732Z',
      repeat_end_date: '2019-04-04T18:00:00.000Z',
      count: null,
      byweekly: '',
    },
    show_details: {
      guests: Array(0),
      title: 'Repeat #2',
      summary: '',
      description: '',
      producer: '',
    },
  },
  {
    created_at: '2018-12-28T02:35:17.747Z',
    is_recurring: false,
    repeat_rule: {
      frequency: '',
      repeat_start_date: '',
      repeat_end_date: '',
      count: null,
      byweekly: '',
    },
    show_details: {
      guests: Array(0),
      title: 'Non-Repeat #2',
      summary: '',
      description: '',
      producer: '',
    },
  },
];

const repeatOnlyShowList = [
  {
    created_at: '2018-12-28T02:35:17.747Z',
    is_recurring: true,
    repeat_rule: {
      frequency: 'WEEKLY',
      repeat_start_date: '2018-12-28T02:27:01.732Z',
      repeat_end_date: '2019-04-04T18:00:00.000Z',
      count: null,
      byweekly: '',
    },
    show_details: {
      guests: Array(0),
      title: 'Repeat #1',
      summary: '',
      description: '',
      producer: '',
    },
  },
  {
    created_at: '2018-12-28T02:35:17.747Z',
    is_recurring: true,
    repeat_rule: {
      frequency: 'WEEKLY',
      repeat_start_date: '2018-12-28T02:27:01.732Z',
      repeat_end_date: '2019-04-04T18:00:00.000Z',
      count: null,
      byweekly: '',
    },
    show_details: {
      guests: Array(0),
      title: 'Repeat #2',
      summary: '',
      description: '',
      producer: '',
    },
  },
];

const nonRepeatShowList = [
  {
    created_at: '2018-12-28T02:35:17.747Z',
    is_recurring: false,
    repeat_rule: {
      frequency: '',
      repeat_start_date: '',
      repeat_end_date: '',
      count: null,
      byweekly: '',
    },
    show_details: {
      guests: Array(0),
      title: 'Non-Repeat #1',
      summary: '',
      description: '',
      producer: '',
    },
  },
  {
    created_at: '2018-12-28T02:35:17.747Z',
    is_recurring: false,
    repeat_rule: {
      frequency: '',
      repeat_start_date: '',
      repeat_end_date: '',
      count: null,
      byweekly: '',
    },
    show_details: {
      guests: Array(0),
      title: 'Non-Repeat #2',
      summary: '',
      description: '',
      producer: '',
    },
  },
];

describe('Test Repeat Rules', () => {
  it('Should filter out repeat shows', () => {
    const repeatShows = reduceShowsByRepeatProperty(showsList, true);
    expect(repeatShows).toEqual(repeatOnlyShowList);
  });

  it('Should filter out shows that are not repeated', () => {
    const nonRepeatShows = reduceShowsByRepeatProperty(showsList, false);
    expect(nonRepeatShows).toEqual(nonRepeatShowList);
  });
});

describe('Updating Moment Date and Time', () => {
  it('Should convert date and time to', () => {
    const returnedDateAndTime = new Date();
    expect(returnedDateAndTime).toEqual('Not Hello');
  });
});

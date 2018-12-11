import * as actions from "../shows";
import * as types from "../types";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("getShow actions", () => {
  beforeEach(function() {
    mockAxios.reset();
  });

  afterEach(function() {});

  it("should create an action to GET a new show", () => {
    const store = mockStore({ shows: [] });
    const show_id = "123";
    const show_id_url = "/api/show/123";
    const show_payload = [
      {
        name: "Test Show"
      }
    ];
    const expectedAction = [
      {
        type: types.SHOW_GET,
        payload: show_payload
      }
    ];

    mockAxios.onGet(show_id_url).reply(200, show_payload);

    return store.dispatch(actions.getShow(show_id)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe("postShow actions", () => {
  beforeEach(function() {
    mockAxios.reset();
  });

  afterEach(function() {});

  it("should create an action to POST a new show", () => {
    const store = mockStore({ shows: [] });
    const show_id_url = "/api/show/";
    const show_post = [
      {
        name: "Test Show"
      }
    ];
    const show_post_payload = [
      {
        name: "Test Show",
        description: "Hello world!"
      }
    ];
    const expectedAction = [
      {
        type: types.SHOW_POST,
        payload: show_post_payload
      }
    ];

    mockAxios.onPost(show_id_url).reply(200, show_post_payload);

    return store.dispatch(actions.postShow(show_post)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

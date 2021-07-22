/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable camelcase */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// actions
const GET_ITEM = "GET_ITEM";

// action creators
const getItem = createAction(GET_ITEM, (list) => ({ list }));

// initialState
const initialState = {
  item: null,
};

// middleware actions
const getItemAciton = () => {
  const jwt = localStorage.getItem("jwt");
  return function (dispatch, getState, { history }) {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/api/v1/items`,
          {
            headers: { jwt: `${jwt}` },
          },
        );
        getItem(result.data.response.content);
        console.log(result.data.response.content);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };
};

// reducer
export default handleActions(
  {
    [GET_ITEM]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.item = action.payload.item;
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  getItemAciton,
};

export { actionCreators };

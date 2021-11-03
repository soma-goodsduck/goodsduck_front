/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const SET_VOTED_IDOL_ID = "SET_VOTED_IDOL_ID";
const SET_VOTED_IDOL_NAME = "SET_VOTED_IDOL_NAME";
const SET_SHOW_CONFIRM_MODAL = "SET_SHOW_CONFIRM_MODAL";
const SET_VOTED_COUNT = "SET_VOTED_COUNT";
const SET_OWNED_VOTE_COUNT = "SET_OWNED_VOTE_COUNT";
const SET_SHOW_VOTE_POPUP = "SET_SHOW_VOTE_POPUP";
const SET_GETTING_VOTE_COUNT = "SET_GETTING_VOTE_COUNT";

// action creators
const setVotedIdolId = createAction(SET_VOTED_IDOL_ID, (votedIdolId) => ({
  votedIdolId,
}));
const setVotedIdolName = createAction(SET_VOTED_IDOL_NAME, (votedIdolName) => ({
  votedIdolName,
}));
const setShowConfirmModal = createAction(
  SET_SHOW_CONFIRM_MODAL,
  (showConfirmModal) => ({
    showConfirmModal,
  }),
);
const setVotedCount = createAction(SET_VOTED_COUNT, (votedCount) => ({
  votedCount,
}));
const setOwnedVoteCount = createAction(
  SET_OWNED_VOTE_COUNT,
  (ownedVoteCount) => ({
    ownedVoteCount,
  }),
);
const setShowVotePopup = createAction(SET_SHOW_VOTE_POPUP, (showVotePopup) => ({
  showVotePopup,
}));
const setGettingVoteCount = createAction(
  SET_GETTING_VOTE_COUNT,
  (gettingVoteCount) => ({
    gettingVoteCount,
  }),
);

// initialState
const initialState = {
  votedIdolId: 0, // 방금 투표한 아이돌 아이디
  votedIdolName: "", // 방금 투표한 아이돌 이름
  votedCount: 0, // 방금 투표한 수
  showConfirmModal: false, // 투표 확인창
  ownedVoteCount: 0, // 가지고 있는 투표권수
  showVotePopup: false, // 획득한 투표권을 보여주는 알림창
  gettingVoteCount: 0, // 굿즈 등록, 커뮤니티 글 등록을 통해 획득한 투표권 수
};

// middleware actions

// reducer
export default handleActions(
  {
    [SET_VOTED_IDOL_ID]: (state, action) =>
      produce(state, (draft) => {
        draft.votedIdolId = action.payload.votedIdolId;
      }),
    [SET_VOTED_IDOL_NAME]: (state, action) =>
      produce(state, (draft) => {
        draft.votedIdolName = action.payload.votedIdolName;
      }),
    [SET_SHOW_CONFIRM_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.showConfirmModal = action.payload.showConfirmModal;
      }),
    [SET_VOTED_COUNT]: (state, action) =>
      produce(state, (draft) => {
        draft.votedCount = action.payload.votedCount;
      }),
    [SET_OWNED_VOTE_COUNT]: (state, action) =>
      produce(state, (draft) => {
        draft.ownedVoteCount = action.payload.ownedVoteCount;
      }),
    [SET_SHOW_VOTE_POPUP]: (state, action) =>
      produce(state, (draft) => {
        draft.showVotePopup = action.payload.showVotePopup;
      }),
    [SET_GETTING_VOTE_COUNT]: (state, action) =>
      produce(state, (draft) => {
        draft.gettingVoteCount = action.payload.gettingVoteCount;
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  setVotedIdolId,
  setVotedIdolName,
  setShowConfirmModal,
  setVotedCount,
  setOwnedVoteCount,
  setShowVotePopup,
  setGettingVoteCount,
};

export { actionCreators };

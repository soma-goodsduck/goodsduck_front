/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import firebase from "firebase/app";
import { firebaseDatabase } from "../../shared/firebase";
import { postAction } from "../../shared/axios";

// actions
const SET_CHAT_ROOM = "SET_CHAT_ROOM";

// action creators
const setChatRoom = createAction(SET_CHAT_ROOM, (chatRoom) => ({
  chatRoom,
}));

// initialState
const initialState = {
  chatRoomId: "",
  createdById: "",
  createdByNickName: "",
  createdByImg: "",
  createdWithId: "",
  createdWithNickName: "",
  createdWithImg: "",
  itemId: "",
  itemImg: "",
  itemName: "",
  itemPrice: 0,
};

// middleware actions
const addChatRoomAciton = (item) => {
  const chatRoomsRef = firebaseDatabase.ref("chatRooms");
  const key = chatRoomsRef.push().key;
  const newChatRoom = {
    id: key,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    item: {
      id: item.itemId, // 아이템 ID
      image: item.images[0].url, // 아이템 이미지
      name: item.name, // 아이템 이름
      price: item.price, // 아이템 가격
    },
    createdWith: {
      id: item.itemOwner.userId, // 글쓴이의 아이디
      nickName: item.itemOwner.nickName, // 글쓴이의 닉네임
      profileImg: item.itemOwner.imageUrl, // 글쓴이의 프로필 이미지
      isPresented: true, // 현재 채팅방에 참여하고 있는지
    },
    createdBy: {
      id: item.loginUser.userId, // 유저 아이디
      nickName: item.loginUser.nickName, // 로그인 유저의 닉네임
      profileImg: item.loginUser.imageUrl, // 로그인 유저의 프로필 이미지
      isPresented: true, // 현재 채팅방에 참여하고 있는지
    },
  };

  return function (dispatch, getState, { history }) {
    chatRoomsRef.child(key).update(newChatRoom);

    postAction(`v1/chat/items/${newChatRoom.item.id}`, {
      chatId: key,
    });
    history.push(`/chat-room/${key}`);
  };
};

const addChatRoomAtPropseAciton = (item, user) => {
  const chatRoomsRef = firebaseDatabase.ref("chatRooms");
  const key = chatRoomsRef.push().key;

  const newChatRoom = {
    id: key,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    item: {
      id: item.item.itemId, // 아이템 ID
      image: item.item.imageUrl, // 아이템 이미지
      name: item.item.name, // 아이템 이름
      price: item.proposedPrice, // 제안된 아이템 가격
    },
    createdWith: {
      id: item.proposer.userId, // 가격제안한 유저 아이디
      nickName: item.proposer.nickName, // 가격제안한 유저의 닉네임
      profileImg: item.proposer.imageUrl, // 가격제안한 유저의 프로필 이미지
      isPresented: true, // 현재 채팅방에 참여하고 있는지
    },
    createdBy: {
      id: user.id, // 글쓴이(로그인 유저)의 아이디
      nickName: user.nickName, // 글쓴이(로그인 유저)의 닉네임
      profileImg: user.profileImg, // 글쓴이(로그인 유저)의 프로필 이미지
      isPresented: true, // 현재 채팅방에 참여하고 있는지
    },
  };

  return function (dispatch, getState, { history }) {
    chatRoomsRef.child(key).update(newChatRoom);
    postAction(`v1/chat/price-propose/${item.priceProposeId}`, {
      chatId: key,
    });
    history.push(`/chat-room/${key}`);
  };
};

// reducer
export default handleActions(
  {
    [SET_CHAT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.chatRoomId = action.payload.chatRoom.id;
        draft.createdById = action.payload.chatRoom.createdBy.id;
        draft.createdByNickName = action.payload.chatRoom.createdBy.nickName;
        draft.createdByImg = action.payload.chatRoom.createdBy.imageUrl;
        draft.createdWithId = action.payload.chatRoom.createdWith.id;
        draft.createdWithNickName =
          action.payload.chatRoom.createdWith.nickName;
        draft.createdWithImg = action.payload.chatRoom.createdWith.imageUrl;
        draft.itemId = action.payload.chatRoom.item.id;
        draft.itemImg = action.payload.chatRoom.item.image;
        draft.itemName = action.payload.chatRoom.item.name;
        draft.itemPrice = action.payload.chatRoom.item.price;
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  addChatRoomAciton,
  setChatRoom,
  addChatRoomAtPropseAciton,
};

export { actionCreators };

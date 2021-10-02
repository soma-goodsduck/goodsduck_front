/* eslint-disable import/no-cycle */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable indent */
/* eslint-disable global-require */

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import Home from "./modules/home";
import Image from "./modules/image";
import Filtering from "./modules/filtering";
import NewItem from "./modules/newItem";
import Chat from "./modules/chat";
import Item from "./modules/item";
import Community from "./modules/community";
import NewPost from "./modules/newPost";
import Post from "./modules/post";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: User,
  home: Home,
  image: Image,
  newItem: NewItem,
  filtering: Filtering,
  chat: Chat,
  item: Item,
  community: Community,
  newPost: NewPost,
  post: Post,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history })];

const env = process.env.REACT_APP_TYPE;

if (env === "DEV") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = (initialStore) => createStore(rootReducer, enhancer);

export default store();

import { combineReducers } from "redux";

import memories from "./memories";
import auth from "./auth";

export const reducers = combineReducers({ memories, auth });

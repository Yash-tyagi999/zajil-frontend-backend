import { combineReducers } from "@reduxjs/toolkit";
import authMgmtSlice from "./slices/auth";
import userMgmtSlice from "./slices/user";
import riderMgmtSlice from "./slices/user";
import branchMgmtSlice from "./slices/branch";
import bannerMgmtSlice from "./slices/banner";
import companyMgmtSlice from "./slices/company";
import vehicleMgmtSlice from "./slices/company";
import roleMgmtSlice from "./slices/company";

const rootReducer = combineReducers({
  authMgmtSlice,
  userMgmtSlice,
  riderMgmtSlice,
  branchMgmtSlice,
  bannerMgmtSlice,
  companyMgmtSlice,
  vehicleMgmtSlice,
  roleMgmtSlice,
});
export default rootReducer;

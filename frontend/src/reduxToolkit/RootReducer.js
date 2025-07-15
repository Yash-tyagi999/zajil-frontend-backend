import { combineReducers } from "@reduxjs/toolkit";
import authMgmtSlice from "./slices/auth";
import userMgmtSlice from "./slices/user";
import riderMgmtSlice from "./slices/user";
import branchMgmtSlice from "./slices/branch";
import bannerMgmtSlice from "./slices/banner";
import companyMgmtSlice from "./slices/company";
import vehicleMgmtSlice from "./slices/company";

const rootReducer = combineReducers({
  authMgmt: authMgmtSlice,
  userMgmt: userMgmtSlice,
  riderMgmt: riderMgmtSlice,
  branchMgmt: branchMgmtSlice,
  bannerMgmt: bannerMgmtSlice,
  companyMgmt: companyMgmtSlice,
  vehicleMgmt: vehicleMgmtSlice,
});
export default rootReducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../config/config";

export const createSubadmin = createAsyncThunk(
  "subadmin/createSubadmin",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("subadmin/createsubadmin", payload);

      if (res.status === 201) {
        return {
          status: res.status,
          data: res.data,
        };
      } else {
        return rejectWithValue({
          status: res.status,
          data: res.data,
        });
      }
    } catch (err) {
      return rejectWithValue({
        status: err.response?.status || 500,
        data: err.response?.data || { message: "Network or server error" },
      });
    }
  }
);

export const getSubadmins = createAsyncThunk(
  "subadmin/getSubadmins",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("subadmin/getsubadmins", payload);

      if (res.status === 200) {
        return {
          status: res.status,
          data: res.data,
        };
      } else {
        return rejectWithValue({
          status: res.status,
          data: res.data,
        });
      }
    } catch (err) {
      return rejectWithValue({
        status: err.response?.status || 500,
        data: err.response?.data || { message: "Network or server error" },
      });
    }
  }
);

export const updateSubadminStatus = createAsyncThunk(
  "subadmin/updateSubadminStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch("subadmin/updatesubadminstatus", payload);

      if (res.status === 200) {
        return {
          status: res.status,
          data: res.data,
        };
      } else {
        return rejectWithValue({
          status: res.status,
          data: res.data,
        });
      }
    } catch (err) {
      return rejectWithValue({
        status: err.response?.status || 500,
        data: err.response?.data || { message: "Network or server error" },
      });
    }
  }
);

const initialState = {
  subadminProfile: {},
  loader: false,
  error: null,
};

const subadminMgmtSlice = createSlice({
  name: "subadmin",
  initialState,
  extraReducers: (builder) => {
    builder

      // Create Subadmin
      .addCase(createSubadmin.pending, (state) => {
        state.loader = true;
        state.subadminProfile = null;
        state.error = null;
      })
      .addCase(createSubadmin.fulfilled, (state, action) => {
        state.loader = false;
        state.subadminProfile = action.payload?.data;
        state.error = null;
      })
      .addCase(createSubadmin.rejected, (state, action) => {
        state.loader = false;
        state.subadminProfile = null;
        state.error =
          action.payload?.data?.message || "Subadmin creation failed";
      });
  },
});

export default subadminMgmtSlice.reducer;

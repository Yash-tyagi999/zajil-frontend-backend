import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../config/config";

export const createBranch = createAsyncThunk(
  "branch/createBranch",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("branch/createbranch", payload);

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

export const getBranches = createAsyncThunk(
  "branch/getBranches",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("branch/getbranches", payload);

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

export const updateStatus = createAsyncThunk(
  "branch/updateStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch("branch/updatestatus", payload);

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

export const updateWeekdaysShift = createAsyncThunk(
  "branch/updateWeekdaysShift",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch("branch/updateWeekdaysShift", payload);

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
  branch: {},
  loader: false,
  error: null,
};

const branchMgmtSlice = createSlice({
  name: "branch",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createBranch.pending, (state) => {
        state.loader = true;
        state.branch = null;
        state.error = null;
      })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.loader = false;
        state.branch = action.payload?.data;
        state.error = null;
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.loader = false;
        state.branch = null;
        state.error = action.payload?.data?.message || "Branch creation failed";
      });
  },
});

export default branchMgmtSlice.reducer;

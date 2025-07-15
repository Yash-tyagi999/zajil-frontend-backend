import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../config/config";

export const createRider = createAsyncThunk(
  "rider/createRider",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("rider/signup", payload);

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

export const getRiders = createAsyncThunk(
  "rider/getRiders",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("rider/getriders", payload);

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
  "rider/updateStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch("rider/updatestatus", payload);

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
export const getRider = createAsyncThunk(
  "rider/getRider",
  async (payload, { rejectWithValue }) => {
    try {
      const userId = payload.userId;
      // console.log(userId);
      const res = await axios.get(`rider/getrider/${userId}`);

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
  riderProfile: {},
  loader: false,
  error: null,
};

const riderMgmtSlice = createSlice({
  name: "rider",
  initialState,
  extraReducers: (builder) => {
    builder

      // Create Rider
      .addCase(createRider.pending, (state) => {
        state.loader = true;
        state.riderProfile = null;
        state.error = null;
      })
      .addCase(createRider.fulfilled, (state, action) => {
        state.loader = false;
        state.riderProfile = action.payload?.data;
        state.error = null;
      })
      .addCase(createRider.rejected, (state, action) => {
        state.loader = false;
        state.riderProfile = null;
        state.error = action.payload?.data?.message || "Rider creation failed";
      });
  },
});

export default riderMgmtSlice.reducer;

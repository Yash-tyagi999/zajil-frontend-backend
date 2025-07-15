import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../config/config";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("user/signup", payload);

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

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("user/getusers", payload);

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
  "user/updateStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch("user/updatestatus", payload);

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

export const getUser = createAsyncThunk(
  "user/getUser",
  async (payload, { rejectWithValue }) => {
    try {
      const userId = payload.userId;
      // console.log(userId);
      const res = await axios.get(`user/getuser/${userId}`);

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
  userProfile: {},
  loader: false,
  error: null,
};

const userMgmtSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder

      // Create User
      .addCase(createUser.pending, (state) => {
        state.loader = true;
        state.userProfile = null;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loader = false;
        state.userProfile = action.payload?.data;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loader = false;
        state.userProfile = null;
        state.error = action.payload?.data?.message || "User creation failed";
      });
  },
});

export default userMgmtSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../config/config";

export const createBanner = createAsyncThunk(
  "banner/createBanner",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("banner/createbanner", payload);

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

export const getBanners = createAsyncThunk(
  "banner/getBanners",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("banner/getbanners", payload);

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
  "banner/updateStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch("banner/updatestatus", payload);

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

export const updateBanner = createAsyncThunk(
  "banner/updateBanner",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch("banner/updatebanner", payload);

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
  banner: {},
  loader: false,
  error: null,
};

const bannerMgmtSlice = createSlice({
  name: "banner",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createBanner.pending, (state) => {
        state.loader = true;
        state.banner = null;
        state.error = null;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.loader = false;
        state.banner = action.payload?.data;
        state.error = null;
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.loader = false;
        state.banner = null;
        state.error = action.payload?.data?.message || "Banner creation failed";
      });
  },
});

export default bannerMgmtSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/config";

export const createVehicle = createAsyncThunk(
  "vehicle/createVehicle",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("vehicle/createvehicle", payload);

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

export const getVehicles = createAsyncThunk(
  "vehicle/getVehicles",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("vehicle/getvehicles", payload);
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

export const updateVehicleStatus = createAsyncThunk(
  "vehicle/updateVehicleStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch("vehicle/updatevehiclestatus", payload);

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

export const updateVehicle = createAsyncThunk(
  "vehicle/updateVehicle",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch("vehicle/updatevehicle", payload);

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
  vehicleProfile: {},
  loader: false,
  error: null,
};

const vehicleMgmtSlice = createSlice({
  name: "vehicle",
  initialState,
  extraReducers: (builder) => {
    builder

      // Create vehicle
      .addCase(createVehicle.pending, (state) => {
        state.loader = true;
        state.vehicleProfile = null;
        state.error = null;
      })
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.loader = false;
        state.vehicleProfile = action.payload?.data;
        state.error = null;
      })
      .addCase(createVehicle.rejected, (state, action) => {
        state.loader = false;
        state.vehicleProfile = null;
        state.error =
          action.payload?.data?.message || "Vehicle creation failed";
      });
  },
});

export default vehicleMgmtSlice.reducer;

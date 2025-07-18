import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../config/config";

export const createRole = createAsyncThunk(
  "role/createRole",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("role/createrole", payload);

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

export const getRoles = createAsyncThunk(
  "role/getRoles",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("role/getroles", payload);

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

export const updateRoleStatus = createAsyncThunk(
  "role/updateRoleStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch("role/updaterolestatus", payload);

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

export const getRole = createAsyncThunk(
  "role/getRole",
  async (payload, { rejectWithValue }) => {
    try {
      const roleId = payload.roleId;

      const res = await axios.get(`role/getrole/${roleId}`);

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

export const updateRole = createAsyncThunk(
  "role/updateRole",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch("role/updaterole", payload);

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
  roleProfile: {},
  loader: false,
  error: null,
};

const roleMgmtSlice = createSlice({
  name: "role",
  initialState,
  extraReducers: (builder) => {
    builder

      // Create Role
      .addCase(createRole.pending, (state) => {
        state.loader = true;
        state.roleProfile = null;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loader = false;
        state.roleProfile = action.payload?.data;
        state.error = null;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loader = false;
        state.roleProfile = null;
        state.error = action.payload?.data?.message || "Role creation failed";
      });
  },
});

export default roleMgmtSlice.reducer;

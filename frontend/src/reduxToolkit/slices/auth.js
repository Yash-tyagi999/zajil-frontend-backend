import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../config/config";

export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("admin/login", payload);

      if (response.status === 200) {
        localStorage.setItem("AdminDetails", JSON.stringify(response?.data));
        return {
          status: response.status,
          data: response.data,
        };
      } else {
        return rejectWithValue({
          status: response.status,
          data: response.data,
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

export const verifyMail = createAsyncThunk(
  "auth/verifyMail",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("admin/forgotpassword", payload);

      if (response.status === 200) {
        return {
          status: response.status,
          data: response.data,
        };
      } else {
        return rejectWithValue({
          status: response.status,
          data: response.data,
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

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("admin/verifyotp", payload);

      if (response.status === 200) {
        return {
          status: response.status,
          data: response.data,
        };
      } else {
        return rejectWithValue({
          status: response.status,
          data: response.data,
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

export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("admin/resendotp", payload);

      if (response.status === 200) {
        return {
          status: response.status,
          data: response.data,
        };
      } else {
        return rejectWithValue({
          status: response.status,
          data: response.data,
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

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("admin/resetpassword", payload);

      if (response.status === 200) {
        return {
          status: response.status,
          data: response.data,
        };
      } else {
        return rejectWithValue({
          status: response.status,
          data: response.data,
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

export const adminLogout = createAsyncThunk(
  "auth/adminLogout",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("admin/logout", payload);

      if (response.status === 200) {
        localStorage.removeItem("AdminDetails");
        return {
          status: response.status,
          data: response.data,
        };
      } else {
        return rejectWithValue({
          status: response.status,
          data: response.data,
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
  adminProfile: null,
  loader: false,
  error: null,
};

const authMgmtSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder

      // Admin Login
      .addCase(adminLogin.pending, (state) => {
        state.loader = true;
        state.adminProfile = null;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loader = false;
        state.adminProfile = action.payload?.data;
        state.error = null;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loader = false;
        state.adminProfile = null;
        state.error = action.payload?.data?.message || "Login failed";
      })

      // Verify Mail
      .addCase(verifyMail.pending, (state) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(verifyMail.fulfilled, (state) => {
        state.loader = false;
        state.error = null;
      })
      .addCase(verifyMail.rejected, (state, action) => {
        state.loader = false;
        state.error =
          action.payload?.data?.message || "Email verification failed";
      })

      // Verify OTP
      .addCase(verifyOTP.pending, (state) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.loader = false;
        state.error = null;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loader = false;
        state.error =
          action.payload?.data?.message || "OTP verification failed";
      })

      // Resend OTP
      .addCase(resendOTP.pending, (state) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state) => {
        state.loader = false;
        state.error = null;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload?.data?.message || "Failed to resend OTP";
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loader = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload?.data?.message || "Password reset failed";
      })

      // Admin Logout
      .addCase(adminLogout.pending, (state) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.loader = false;
        state.adminProfile = null;
        state.error = null;
      })
      .addCase(adminLogout.rejected, (state, action) => {
        state.loader = false;
        state.adminProfile = null;
        state.error = action.payload?.data?.message || "Logout failed";
      });
  },
});

export default authMgmtSlice.reducer;

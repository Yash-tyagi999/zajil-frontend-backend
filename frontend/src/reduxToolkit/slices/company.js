import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../config/config";

export const createCompany = createAsyncThunk(
  "comapany/createCompany",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("company/createcompany", payload);

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
      console.log(err);
      return rejectWithValue({
        status: err.response?.status || 500,
        data: err.response?.data || { message: "Network or server error" },
      });
    }
  }
);

export const getCompanies = createAsyncThunk(
  "company/getCompanies",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("company/getcompanies", payload);
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

export const updateCompanyStatus = createAsyncThunk(
  "company/updateCompanyStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch("company/updatecompanystatus", payload);

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

export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch("company/updatecompany", payload);

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
  company: {},
  loader: false,
  error: null,
};

const companyMgmtSlice = createSlice({
  name: "company",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createCompany.pending, (state) => {
        state.loader = true;
        state.company = null;
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.loader = false;
        state.company = action.payload?.data;
        state.error = null;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loader = false;
        state.company = null;
        state.error =
          action.payload?.data?.message || "Company creation failed";
      });
  },
});

export default companyMgmtSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../config/config";

export const getOrders = createAsyncThunk(
  "ordes/getOrders",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("order/getorders", payload);
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

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch("order/updateorderstatus", payload);

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

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const orderId = payload.orderId;
      // console.log(orderId);
      const res = await axios.get(`order/getorder/${orderId}`);

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
  order: {},
  loader: false,
  error: null,
};

const orderMgmtSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder;
    //   .addCase(getOrders.pending, (state) => {
    //     state.loader = true;
    //     state.branch = null;
    //     state.error = null;
    //   })
    //   .addCase(getOrders.fulfilled, (state, action) => {
    //     state.loader = false;
    //     state.branch = action.payload?.data;
    //     state.error = null;
    //   })
    //   .addCase(getOrders.rejected, (state, action) => {
    //     state.loader = false;
    //     state.branch = null;
    //     state.error =
    //       action.payload?.data?.message || "Order creation failed";
    //   });
  },
});

export default orderMgmtSlice.reducer;

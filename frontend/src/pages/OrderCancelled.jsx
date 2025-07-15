import { Link } from "react-router-dom";
import { getOrders } from "../reduxToolkit/slices/order";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

function OrderCancelled() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const dateInitialState = { fromDate: "", toDate: "", timeFrame: "" };
  const [formState, setFormState] = useState(dateInitialState);
  const { fromDate, toDate, timeFrame } = formState;

  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const result = orders.filter((b) => {
      const orderIdStr = `OR-${b?.orderId.toString().padStart(3, "0")}`;
      return (
        !debouncedSearch ||
        orderIdStr.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    });

    setFilteredOrders(result);
  }, [debouncedSearch, orders]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await dispatch(getOrders());
        const { status, data } = res?.payload || {};

        if (status === 200) {
          setOrders(data?.orders || []);
        } else {
          setError(data?.message || "Failed to load orders");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [dispatch]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    if (name === "fromDate" || name === "toDate") {
      setFormState((prev) => ({
        ...prev,
        [name]: value,
        timeFrame: "",
      }));
    } else if (name === "timeFrame") {
      setFormState((prev) => ({
        ...prev,
        [name]: value,
        fromDate: "",
        toDate: "",
      }));
    }
  };

  const handleDateSearch = (e) => {
    e.preventDefault();

    try {
      let filtered = [...orders];
      const validTimeFrames = ["Today", "Week", "Month"];

      if (timeFrame) {
        if (!validTimeFrames.includes(timeFrame)) {
          toast.error("Invalid time frame selected");
          return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let startDate, endDate;

        if (timeFrame === "Today") {
          startDate = new Date(today);
          endDate = new Date(today);
        } else if (timeFrame === "Week") {
          startDate = new Date(today);
          startDate.setDate(today.getDate() - today.getDay());
          endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + 6);
        } else if (timeFrame === "Month") {
          startDate = new Date(today.getFullYear(), today.getMonth(), 1);
          endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        }

        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        filtered = filtered.filter((b) => {
          const orderDate = new Date(b.orderEstimateDeliveryDate);
          return orderDate >= startDate && orderDate <= endDate;
        });
      } else if (fromDate || toDate) {
        if (!fromDate || !toDate) {
          toast.error("Please select both From and To dates");
          return;
        }

        const from = new Date(fromDate);
        const to = new Date(toDate);

        if (isNaN(from.getTime()) || isNaN(to.getTime())) {
          toast.error("Invalid date format");
          return;
        }

        if (from > to) {
          toast.error("From Date cannot be after To Date");
          return;
        }

        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);

        filtered = filtered.filter((b) => {
          const orderDate = new Date(b.orderCancellationDate);
          return orderDate >= from && orderDate <= to;
        });
      }

      setFilteredOrders(filtered);
      console.log("Valid Date Filter:", formState);
    } catch (err) {
      console.error("Date filtering failed:", err);
      toast.error("Error while applying date filter");
    }
  };

  const handleResetFilters = () => {
    setFormState(dateInitialState);
    setSearch("");
    setFilteredOrders(orders);
  };

  const cancelledOrders = filteredOrders.filter(
    (o) => o.orderStatus === "Canceled"
  );

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Cancelled Order</h4>
          </div>
          <div className="FilterBox FilterArea">
            <div className="form-group">
              <label htmlFor="fromDate">From Date</label>
              <input
                type="date"
                id="fromDate"
                className="form-control"
                name="fromDate"
                value={fromDate}
                onChange={handleDateChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="toDate">To Date</label>
              <input
                type="date"
                className="form-control"
                id="toDate"
                name="toDate"
                value={toDate}
                onChange={handleDateChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="apply">&nbsp;</label>
              <button id="apply" className="Button" onClick={handleDateSearch}>
                Apply
              </button>
              <button className="Button Cancel" onClick={handleResetFilters}>
                <i className="fa fa-refresh" />
              </button>
            </div>
            <div className="form-group fltR">
              <label htmlFor="timeFrame">Timeframe</label>
              <select
                className="form-control"
                id="timeFrame"
                name="timeFrame"
                value={formState.timeFrame}
                onChange={handleDateChange}
              >
                <option value="">Select </option>
                <option value="Today">Today</option>
                <option value="Week">This Week</option>
                <option value="Month">This Month</option>
              </select>
            </div>
          </div>
          <div className="FilterBox">
            <div className="form-group">
              <label>Search By</label>
              <input
                type="text"
                className="form-control"
                placeholder="Order Id"
                id="search"
                value={search}
                onChange={handleSearchChange}
                aria-label="Search Order by Order Id"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="TableList">
            {loading && <p>Loading Orders...</p>}
            {error && (
              <p className="error" role="alert" tabIndex={0}>
                {error}
              </p>
            )}
            {!loading && cancelledOrders.length === 0 && <p>No Order found.</p>}

            {!loading && cancelledOrders.length > 0 && (
              <table style={{ width: "125%" }}>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Contact Number </th>
                    <th>Pickup Date </th>
                    <th>Pickup Address</th>
                    <th>Receiver Address</th>
                    <th>Pickup Branch</th>
                    <th>Shippment Weight </th>
                    <th>Cancellation Date</th>
                    <th>Cancellation Reason</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cancelledOrders.map((currentOrder, index) => (
                    <tr key={currentOrder.orderId}>
                      <td>{index + 1}</td>
                      <td>
                        OR-
                        {currentOrder.orderId.toString().padStart(3, "0")}
                      </td>
                      <td>{currentOrder.orderSenderName}</td>
                      <td>{currentOrder.orderSenderNumber}</td>
                      <td>
                        {new Date(
                          currentOrder.orderPickupDate
                        ).toLocaleDateString()}
                      </td>
                      <td>{currentOrder.orderPickupAddress}</td>
                      <td>{currentOrder.orderReceiverAddress}</td>
                      <td>{currentOrder.orderPickupBranch}</td>
                      <td>
                        {currentOrder.orderShipmentWeight}{" "}
                        {currentOrder.orderShipmentUnit}
                      </td>

                      <td>
                        {new Date(
                          currentOrder.orderCancellationDate
                        ).toLocaleDateString()}
                      </td>
                      <td>{currentOrder.orderCancellationReason}</td>
                      <td>
                        <div className="Actions">
                          <Link
                            className="Blue"
                            to={`/orderdetails/${currentOrder.orderId}`}
                          >
                            <i className="fa fa-eye" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderCancelled;

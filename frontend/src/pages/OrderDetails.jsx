import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder, updateOrderStatus } from "../reduxToolkit/slices/order";

function OrderDetails() {
  const { orderId } = useParams();

  const [disable, setDisable] = useState(false);
  const [order, setOrder] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await dispatch(getOrder({ orderId }));

        if (res?.payload?.status === 200) {
          setOrder(res?.payload?.data?.order || []);
        } else {
          toast.error("Failed to load order details");
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    })();
  }, [orderId, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = async (e) => {
    e.preventDefault();

    try {
      setDisable(true);
      const newStatus = order.orderStatus;
      const res = await dispatch(
        updateOrderStatus({
          orderId: order.orderId,
          orderStatus: newStatus,
        })
      );

      const resStatus = res?.payload?.status;

      if (resStatus === 200) {
        setOrder((prev) => ({
          ...prev,
          orderStatus: newStatus,
        }));
        setDisable(false);
        toast.success(`Order status updated to "${newStatus}"`);
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Network error while updating status");
      setDisable(false);
    }
  };

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Order Details</h4>
          </div>
          <div className="PersonalBox">
            <figcaption>
              <h3>Order ID: #{order.orderId}</h3>
              <p>
                Order Date &amp; Time :
                {new Date(order.createdAt).toLocaleDateString()} ,05:30 PM
              </p>
              <p>AWB Number :1178 KJHB302 01</p>
            </figcaption>
          </div>
          <div className="InformationBox">
            <h3>Shipment Details </h3>
            <div className="Informations">
              <div className="ProfileInfo">
                <article>
                  <aside>
                    <p>
                      <strong>Type of package </strong>{" "}
                      <span> {order.orderPackageType} </span>
                    </p>
                    <p>
                      <strong>No. of boxes </strong>{" "}
                      <span> {order.orderNoOfBoxes} </span>
                    </p>
                    <p>
                      <strong>Additional Boxes cost </strong>{" "}
                      <span> 5 SAR </span>
                    </p>
                    <p>
                      <strong>Estimated Weight </strong>{" "}
                      <span>
                        {" "}
                        {order.orderShipmentWeight} {order.orderShipmentUnit}{" "}
                      </span>
                    </p>
                    <p>
                      <strong>Item Description </strong>{" "}
                      <span> {order.orderItemDescription} </span>
                    </p>
                  </aside>
                  <aside>
                    <p>
                      <strong>Pickup Branch </strong>{" "}
                      <span> {order.orderPickupBranch}</span>
                    </p>
                    <p>
                      <strong>Pickup Date </strong>{" "}
                      <span> {order.orderPickupDate}</span>
                    </p>
                    <p>
                      <strong>Pickup Time</strong> <span> 05:30 PM</span>
                    </p>
                  </aside>
                </article>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="InformationBox">
                <h3>Sender Details </h3>
                <div className="Informations DocumnetInfo">
                  <div className="ProfileInfo">
                    <article>
                      <aside>
                        <p>
                          <strong>Sender’s Name </strong>
                          <span> {order.orderSenderName}</span>
                        </p>
                        <p>
                          <strong>Sender’s Phone number</strong>
                          <span>{order.orderSenderNumber}</span>
                        </p>

                        <p>
                          <strong>Sender’s Address </strong>
                          <span> {order.orderSenderAddress} </span>
                        </p>
                      </aside>
                    </article>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="InformationBox">
                <h3>Receiver Details</h3>
                <div className="Informations DocumnetInfo">
                  <div className="ProfileInfo">
                    <article>
                      <aside>
                        <p>
                          <strong>Receiver's Name</strong>
                          <span> {order.orderReceiverName}</span>
                        </p>
                        <p>
                          <strong>Receiver's Phone number </strong>
                          <span> {order.orderReceiverNumber}</span>
                        </p>
                        <p>
                          <strong>Receiver's City</strong>
                          <span> {order.orderReceiverCity}</span>
                        </p>
                        <p>
                          <strong>Receiver's Address</strong>
                          <span> {order.orderReceiverAddress}</span>
                        </p>
                      </aside>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="InformationBox">
            <h3>Payment Details </h3>
            <div className="Informations">
              <div className="ProfileInfo">
                <article>
                  <aside>
                    <p>
                      <strong>Booking Price</strong> <span> SAR 639.45</span>
                    </p>
                    <p>
                      <strong>Discounted Price </strong>{" "}
                      <span> SAR 614.5 *(VAT included 15%: 17.00 SAR)</span>
                    </p>
                    <p>
                      <strong>Promocode Applied </strong>{" "}
                      <span> SDFWEIYWWR</span>
                    </p>
                  </aside>
                  <aside>
                    <p>
                      <strong>Transaction ID </strong> <span> SAR 639.45</span>
                    </p>
                    <p>
                      <strong>Payment Date &amp; Time</strong>{" "}
                      <span> 12-08-2023,02:30 pm</span>
                    </p>
                    <p>
                      <strong>Payment Method </strong> <span> Credit Card</span>
                    </p>
                  </aside>
                </article>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="InformationBox">
                <h3>Delivery Details</h3>
                <div className="Informations DocumnetInfo">
                  <div className="ProfileInfo">
                    <article>
                      <aside>
                        <form onSubmit={handleStatusChange}>
                          <div className="form-group">
                            <label>Status</label>
                            <select
                              className="form-control"
                              value={order.orderStatus}
                              name="orderStatus"
                              onChange={handleInputChange}
                            >
                              <option value="">Select Status</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Picked Up">Picked Up</option>
                              <option value="Pickup Delivered">
                                Pickup Delivered
                              </option>
                              <option value="Reattempt Pickup">
                                Reattempt Pickup
                              </option>
                              <option value="Reattempt Delivery">
                                Reattempt Delivery
                              </option>
                              <option value="Canceled">Canceled</option>
                            </select>
                          </div>
                          <button
                            className="Button"
                            style={{ marginTop: "9px" }}
                            disabled={disable || order.orderStatus === ""}
                          >
                            {disable ? "Updating..." : "Confirm"}
                          </button>
                        </form>
                      </aside>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;

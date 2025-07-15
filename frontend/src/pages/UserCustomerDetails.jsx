import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getUser, updateStatus } from "../reduxToolkit/slices/user";
import avatar_2 from "../images/Avatar-2.png";

function UserCustomerDetails() {
  const { userId } = useParams();

  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await dispatch(getUser({ userId }));

        if (res?.payload?.status === 200) {
          setUser(res?.payload?.data?.user || []);
        } else {
          toast.error("Failed to load user");
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    })();
  }, [userId, dispatch]);

  const handleUserStatus = async () => {
    const newStatus = user.status === "Active" ? "Inactive" : "Active";

    try {
      const res = await dispatch(updateStatus({ userId, status: newStatus }));

      if (res?.payload?.status === 200) {
        const updatedUser = { ...user, status: newStatus };
        setUser(updatedUser);
        toast.success(`User ${user.name} status updated to "${newStatus}"`);
      } else {
        toast.error(`Update failed`);
      }
    } catch (err) {
      toast.error("Network error while updating status");
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await dispatch(updateStatus({ userId, status: "Delete" }));

      if (res?.payload?.status === 200) {
        navigate("/usercustomer");
        toast.success(`User ${user.name} Deleted`);
      } else {
        toast.error(`Update failed`);
      }
    } catch (err) {
      toast.error("Network error while updating status");
    }
  };

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Customer Details</h4>
          </div>
          <div className="CommonTabs">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={
                    activeTab == "profile" ? "nav-link active" : "nav-link"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("profile");
                  }}
                >
                  Customer Profile
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    activeTab == "order" ? "nav-link active" : "nav-link"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("order");
                  }}
                >
                  Order History
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            {activeTab == "profile" && (
              <div className="tab-pane active" id="Profile">
                <div className="TitleBox">
                  <h4 className="Title">Profile Information</h4>
                </div>
                <div className="PersonalBox">
                  <figure>
                    <img src={avatar_2} />
                  </figure>
                  <figcaption>
                    <h3>{user.name}</h3>
                    <p>User ID: BP-{user.userId}</p>
                  </figcaption>
                  <div
                    className="Actions"
                    style={{ display: "flex", gap: "14px" }}
                  >
                    <label className="Switch">
                      <input
                        type="checkbox"
                        checked={user.status === "Active"}
                        onChange={handleUserStatus}
                      />
                      <span className="slider" />
                    </label>
                    <div
                      className="Red"
                      role="button"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      <i className="fa fa-trash" />
                    </div>
                  </div>
                </div>
                <div className="InformationBox">
                  <h3>Profile Information</h3>
                  <div className="Informations">
                    <div className="ProfileInfo">
                      <article>
                        <aside>
                          <p>
                            <strong>User Name </strong>{" "}
                            <span> {user.name}</span>
                          </p>
                          <p>
                            <strong>User ID</strong>{" "}
                            <span> BP-{user.userId}</span>
                          </p>
                          <p>
                            <strong>User Phone Number </strong>{" "}
                            <span> {user.phoneNumber}</span>
                          </p>
                          <p>
                            <strong>User Email ID</strong>{" "}
                            <span> {user.email}</span>
                          </p>
                        </aside>
                        <aside>
                          <p>
                            <strong>Address</strong>{" "}
                            <span> {user.address}</span>
                          </p>
                          <p>
                            <strong>Registered on </strong>{" "}
                            <span>
                              {" "}
                              {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                          </p>
                          <p>
                            <strong>Total No. of Orders</strong>{" "}
                            <span> {user.ordersCount || 0}</span>
                          </p>
                          <p>
                            <strong>Total Amount spent </strong>{" "}
                            <span> {user.amountCount || 0}</span>
                          </p>
                        </aside>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab == "order" && (
              <div className="tab-pane active" id="History">
                <div className="TitleBox">
                  <h4 className="Title">Order History</h4>
                </div>
                <div className="TableList">
                  <table style={{ width: "125%" }}>
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Order ID</th>
                        <th>Rider's Name</th>
                        <th>Contact Number </th>
                        <th>Pickup Date </th>
                        <th>Pickup Address</th>
                        <th>Reciver Address</th>
                        <th>Pickup Branch</th>
                        <th>Delivered On</th>
                        <th>Delivery Status</th>
                        <th>Payment Amount</th>
                        <th>Payment Method</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01</td>
                        <td>OR-001</td>
                        <td>John Smith</td>
                        <td>+91 9876543210</td>
                        <td>25/08/2023</td>
                        <td>123 Main st, City</td>
                        <td>456 Park Ave, City</td>
                        <td>Sabya</td>
                        <td>30/08/2023</td>
                        <td>
                          <span className="Green">Delivered</span>
                        </td>
                        <td>SAR 350</td>
                        <td>Credit Card</td>
                        <td>
                          <div className="Actions">
                            <Link className="Blue" to="/orderdetails">
                              <i className="fa fa-eye" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>02</td>
                        <td>OR-002</td>
                        <td>John Smith</td>
                        <td>+91 9876543210</td>
                        <td>25/08/2023</td>
                        <td>123 Main st, City</td>
                        <td>456 Park Ave, City</td>
                        <td>Sabya</td>
                        <td>30/08/2023</td>
                        <td>
                          <span className="Red">Cancelled</span>
                        </td>
                        <td>SAR 350</td>
                        <td>Credit Card</td>
                        <td>
                          <div className="Actions">
                            <a className="Blue" href="order-details.html">
                              <i className="fa fa-eye" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>03</td>
                        <td>OR-003</td>
                        <td>John Smith</td>
                        <td>+91 9876543210</td>
                        <td>25/08/2023</td>
                        <td>123 Main st, City</td>
                        <td>456 Park Ave, City</td>
                        <td>Sabya</td>
                        <td>30/08/2023</td>
                        <td>
                          <span className="Orange">In Progress</span>
                        </td>
                        <td>SAR 350</td>
                        <td>Credit Card</td>
                        <td>
                          <div className="Actions">
                            <a className="Blue" href="order-details.html">
                              <i className="fa fa-eye" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>04</td>
                        <td>OR-004</td>
                        <td>John Smith</td>
                        <td>+91 9876543210</td>
                        <td>25/08/2023</td>
                        <td>123 Main st, City</td>
                        <td>456 Park Ave, City</td>
                        <td>Sabya</td>
                        <td>30/08/2023</td>
                        <td>
                          <span className="Green">Delivered</span>
                        </td>
                        <td>SAR 350</td>
                        <td>Credit Card</td>
                        <td>
                          <div className="Actions">
                            <a className="Blue" href="order-details.html">
                              <i className="fa fa-eye" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>05</td>
                        <td>OR-005</td>
                        <td>John Smith</td>
                        <td>+91 9876543210</td>
                        <td>25/08/2023</td>
                        <td>123 Main st, City</td>
                        <td>456 Park Ave, City</td>
                        <td>Sabya</td>
                        <td>30/08/2023</td>
                        <td>
                          <span className="Green">Delivered</span>
                        </td>
                        <td>SAR 350</td>
                        <td>Credit Card</td>
                        <td>
                          <div className="Actions">
                            <a className="Blue" href="order-details.html">
                              <i className="fa fa-eye" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="ModalBox">
          <div className="modal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="Decline">
                    <a
                      className="CloseModal"
                      role="button"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowModal(false)}
                    >
                      ×
                    </a>
                    <h3>Delete Confirmation</h3>
                    <p>
                      Are you sure you want to delete this User{" "}
                      <strong>{user?.name}</strong>?
                    </p>
                    <h4>
                      <a
                        role="button"
                        style={{ cursor: "pointer", marginRight: "6px" }}
                        onClick={() => setShowModal(false)}
                      >
                        no
                      </a>
                      <a
                        role="button"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleUserDelete();
                          setShowModal(false);
                        }}
                      >
                        Yes
                      </a>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserCustomerDetails;

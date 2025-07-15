import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import avatar_2 from "../images/Avatar-2.png";
import { getRider, updateStatus } from "../reduxToolkit/slices/rider";

function UserRiderDetails() {
  const { userId } = useParams();

  const [rider, setRider] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await dispatch(getRider({ userId }));

        if (res?.payload?.status === 200) {
          setRider(res?.payload?.data?.rider || []);
        } else {
          toast.error("Failed to load rider details");
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    })();
  }, [userId, dispatch]);

  const handleRiderStatus = async () => {
    const newStatus = rider.status === "Active" ? "Inactive" : "Active";

    try {
      const res = await dispatch(updateStatus({ userId, status: newStatus }));

      if (res?.payload?.status === 200) {
        const updatedRider = { ...rider, status: newStatus };
        setRider(updatedRider);
        toast.success(`Rider ${rider.name} status updated to "${newStatus}"`);
      } else {
        toast.error(`Update failed`);
      }
    } catch (err) {
      toast.error("Network error while updating status");
    }
  };

  const handleRiderDelete = async () => {
    try {
      const res = await dispatch(updateStatus({ userId, status: "Delete" }));

      if (res?.payload?.status === 200) {
        navigate("/userrider");
        toast.success(`Rider ${rider.name} Deleted`);
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
            <h4 className="Title">Rider Details</h4>
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
                  Profile Information
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
                  Order Delivery
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
                    <h3>{rider.name}</h3>
                    <p>User ID: BP-{rider.userId}</p>
                  </figcaption>
                  <div
                    className="Actions"
                    style={{ display: "flex", gap: "14px" }}
                  >
                    <label className="Switch">
                      <input
                        type="checkbox"
                        checked={rider.status === "Active"}
                        onChange={handleRiderStatus}
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
                            <strong>Rider Name </strong>{" "}
                            <span> {rider.name}</span>
                          </p>
                          <p>
                            <strong>Rider ID</strong>{" "}
                            <span> BP-{rider.userId}</span>
                          </p>
                          <p>
                            <strong>Rider Phone Number </strong>{" "}
                            <span> {rider.phoneNumber}</span>
                          </p>
                          <p>
                            <strong>Rider Email Address</strong>{" "}
                            <span> {rider.email}</span>
                          </p>
                          <p>
                            <strong>Rider Type </strong>{" "}
                            <span> {rider.riderType}</span>
                          </p>
                          <p>
                            <strong>Address</strong>{" "}
                            <span> {rider.address}</span>
                          </p>
                        </aside>
                        <aside>
                          <p>
                            <strong>Rider company </strong>{" "}
                            <span> {rider.riderCompany || "--"} </span>
                          </p>
                          <p>
                            <strong>Created on </strong>{" "}
                            <span>
                              {" "}
                              {new Date(rider.createdAt).toLocaleDateString()}
                            </span>
                          </p>
                          <p>
                            <strong>Created By </strong> <span> Admin</span>
                          </p>
                          <p>
                            <strong>Total No. of Orders</strong>{" "}
                            <span> --</span>
                          </p>
                          <p>
                            <strong>Total Earning </strong> <span> --</span>
                          </p>
                          <p>
                            <strong>Total Penalty </strong> <span> -- </span>
                          </p>
                        </aside>
                      </article>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="InformationBox">
                      <h3>National ID Details</h3>
                      <div className="Informations DocumnetInfo">
                        <div className="ProfileInfo">
                          <article>
                            <aside>
                              <p>
                                <strong>National ID Number</strong>
                                <span>{rider.documentIdNumber}</span>
                              </p>
                              <p>
                                <strong>Expiry</strong>
                                <span>10/09/2023</span>
                              </p>
                            </aside>
                            <aside>
                              <div className="DocumnetBox">
                                <figcaption>
                                  <span>
                                    <img src="https://mobulous.co.in/just-clubbing/assets/images/driving.png" />
                                  </span>
                                </figcaption>
                              </div>
                            </aside>
                          </article>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="InformationBox">
                      <h3>Bank Account Details</h3>
                      <div className="Informations DocumnetInfo">
                        <div className="ProfileInfo">
                          <article>
                            <aside>
                              <p>
                                <strong>Bank Name</strong>
                                <span>{rider.bankName}</span>
                              </p>
                              <p>
                                <strong>IBAN Number</strong>
                                <span>{rider.bankNumber}</span>
                              </p>
                              <p>
                                <strong>Account Holder name </strong>
                                <span>{rider.bankAccountHolderName}</span>
                              </p>
                            </aside>
                          </article>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab == "order" && (
              <div className="tab-pane active" id="Delivery">
                <div className="TitleBox">
                  <h4 className="Title">Order History</h4>
                </div>
                <div className="TableList">
                  <table style={{ width: "125%" }}>
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Order ID</th>
                        <th>User Name</th>
                        <th>Contact Number </th>
                        <th>Pickup Date </th>
                        <th>Pickup Address</th>
                        <th>Reciver Address</th>
                        <th>Pickup Branch</th>
                        <th>Delivered On</th>
                        <th>Delivery Status</th>
                        <th>Earning</th>
                        <th>Penalty</th>
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
                        <td>--</td>
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
                        <td>--</td>
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
                        <td>--</td>
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
                        <td>--</td>
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
                        <td>SAR 52</td>
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
                      Are you sure you want to delete this Rider{" "}
                      <strong>{rider?.name}</strong>?
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
                          handleRiderDelete();
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

export default UserRiderDetails;

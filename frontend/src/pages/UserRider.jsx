import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRiders, updateStatus } from "../reduxToolkit/slices/rider";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

function UserRider() {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [riderToDelete, setRiderToDelete] = useState(null);

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const res = await dispatch(getRiders());
        const { status, data } = res?.payload || {};

        if (status === 200) {
          setRiders(data?.riders || []);
        } else {
          setError(data?.message || "Failed to load riders");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRiders();
  }, [dispatch]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleRiderStatus = async (userId) => {
    const rider = riders.find((u) => u.userId === userId);
    if (!rider) return;

    const newStatus = rider.status === "Active" ? "Inactive" : "Active";

    try {
      const res = await dispatch(updateStatus({ userId, status: newStatus }));
      const resStatus = res?.payload?.status;

      if (resStatus === 200) {
        const updatedRiders = riders.map((u) =>
          u.userId === userId ? { ...u, status: newStatus } : u
        );
        setRiders(updatedRiders);
        toast.success(`Rider ${rider.name} status updated to "${newStatus}"`);
      } else {
        toast.error(`Update failed`);
      }
    } catch (err) {
      toast.error("Network error while updating status");
    }
  };

  const handleRiderDelete = async (userId) => {
    const rider = riders.find((u) => u.userId === userId);
    if (!rider) return;

    const newStatus = "Delete";

    try {
      const res = await dispatch(updateStatus({ userId, status: newStatus }));
      const resStatus = res?.payload?.status;

      if (resStatus === 200) {
        const updatedRiders = riders.map((u) =>
          u.userId === userId ? { ...u, status: newStatus } : u
        );
        setRiders(updatedRiders);
        toast.success(`Rider ${rider.name} Deleted`);
      } else {
        toast.error(`Update failed`);
      }
    } catch (err) {
      toast.error("Network error while updating status");
    }
  };

  return (
    <div>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Rider</h4>
            <Link to="/userrideradd" className="TitleLink">
              Add Rider
            </Link>
          </div>
          <div className="FilterBox">
            <div className="form-group">
              <label>Search By</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={search}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="TableList">
            {loading && <p>Loading riders...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && riders.length === 0 && <p>No riders found.</p>}

            {!loading && riders.length > 0 && (
              <table style={{ width: "125%" }}>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Rider ID</th>
                    <th>Rider Name</th>
                    <th>Contact Number </th>
                    <th>Email address</th>
                    <th>No. of orders</th>
                    <th>Total Earning</th>
                    <th>Total Penalty</th>
                    <th>Created on </th>
                    <th>Created By </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {riders
                    .filter(
                      (r) =>
                        !search.trim() ||
                        r.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .filter((r) => r.status !== "Delete")
                    .map((currentRider, index) => (
                      <tr key={currentRider.userId}>
                        <td>{index + 1}</td>
                        <td>U-{index + 101}</td>
                        <td>{currentRider.name}</td>
                        <td>{currentRider.phoneNumber}</td>
                        <td>{currentRider.email}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>--</td>
                        <td>
                          {new Date(
                            currentRider.createdAt
                          ).toLocaleDateString()}
                        </td>
                        <td>Admin</td>
                        <td>
                          <div className="Actions">
                            <Link
                              className="Blue"
                              to={`/userriderdetails/${currentRider.userId}`}
                            >
                              <i className="fa fa-eye" />
                            </Link>

                            <label className="Switch">
                              <input
                                type="checkbox"
                                checked={currentRider.status === "Active"}
                                onChange={() =>
                                  handleRiderStatus(currentRider.userId)
                                }
                              />
                              <span className="slider" />
                            </label>
                            <div
                              className="Red"
                              role="button"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setRiderToDelete(currentRider);
                                setShowModal(true);
                              }}
                            >
                              <i className="fa fa-trash" />
                            </div>
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
                      <strong>{riderToDelete?.name}</strong>?
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
                          handleRiderDelete(riderToDelete.userId);
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

     
    </div>
  );
}

export default UserRider;

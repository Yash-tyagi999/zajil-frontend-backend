import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getUsers } from "../reduxToolkit/slices/user";
import { updateStatus } from "../reduxToolkit/slices/user";

function UserCustomer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await dispatch(getUsers());
        const { status, data } = res?.payload || {};

        if (status === 200) {
          setUsers(data?.users || []);
        } else {
          setError(data?.message || "Failed to load users");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleUserStatus = async (userId) => {
    const user = users.find((u) => u.userId === userId);
    if (!user) return;

    const newStatus = user.status === "Active" ? "Inactive" : "Active";

    try {
      const res = await dispatch(updateStatus({ userId, status: newStatus }));
      const resStatus = res?.payload?.status;

      if (resStatus === 200) {
        const updatedUsers = users.map((u) =>
          u.userId === userId ? { ...u, status: newStatus } : u
        );
        setUsers(updatedUsers);
        toast.success(`User ${user.name} status updated to "${newStatus}"`);
      } else {
        toast.error(`Update failed`);
      }
    } catch (err) {
      toast.error("Network error while updating status");
    }
  };

  const handleUserDelete = async (userId) => {
    const user = users.find((u) => u.userId === userId);
    if (!user) return;

    const newStatus = "Delete";

    try {
      const res = await dispatch(updateStatus({ userId, status: newStatus }));
      const resStatus = res?.payload?.status;

      if (resStatus === 200) {
        const updatedUsers = users.map((u) =>
          u.userId === userId ? { ...u, status: newStatus } : u
        );
        setUsers(updatedUsers);
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
            <h4 className="Title">Customer</h4>
            <Link to="/createuser" className="TitleLink">
              Add User
            </Link>
            {/* <a className="TitleLink">
              <i className="fa fa-file-excel-o" /> Download
            </a> */}
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
            {loading && <p>Loading users...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && users.length === 0 && <p>No users found.</p>}

            {!loading && users.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>User ID</th>
                    <th>User Name</th>
                    <th>Contact Number</th>
                    <th>Email address</th>
                    <th>No. of orders</th>
                    <th>Created on</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter(
                      (u) =>
                        !search.trim() ||
                        u.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .filter((u) => u.status !== "Delete")
                    .map((currentUser, index) => (
                      <tr key={currentUser.userId}>
                        <td>{index + 1}</td>
                        <td>U-{1000 + index + 1}</td>
                        <td>{currentUser.name}</td>
                        <td>{currentUser.phoneNumber}</td>
                        <td>{currentUser.email}</td>
                        <td>{currentUser.ordersCount ?? 0}</td>
                        <td>
                          {new Date(currentUser.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <span
                            className={
                              currentUser.status === "Active" ? "Green" : "Red"
                            }
                          >
                            {currentUser.status}
                          </span>
                        </td>
                        <td>
                          <div className="Actions">
                            <Link
                              className="Blue"
                              to={`/usercustomerdetails/${currentUser.userId}`}
                            >
                              <i className="fa fa-eye" />
                            </Link>
                            <label className="Switch">
                              <input
                                type="checkbox"
                                checked={currentUser.status === "Active"}
                                onChange={() =>
                                  handleUserStatus(currentUser.userId)
                                }
                              />
                              <span className="slider" />
                            </label>
                            <div
                              className="Red"
                              role="button"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setUserToDelete(currentUser);
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
                      Are you sure you want to delete this User{" "}
                      <strong>{userToDelete?.name}</strong>?
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
                          handleUserDelete(userToDelete.userId);
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

export default UserCustomer;

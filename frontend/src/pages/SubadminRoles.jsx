import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getRoles, updateRoleStatus } from "../reduxToolkit/slices/role";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function SubadminRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [roleToUpdate, setRoleToUpdate] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await dispatch(getRoles());
        const { status, data } = res?.payload || {};

        if (status === 200) {
          setRoles(data?.roles || []);
        } else {
          setError(data?.message || "Failed to load roles");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleRoleStatus = async (roleId) => {
    const role = roles.find((r) => r.roleId === roleId);
    if (!role) return;

    const newStatus = role.status === "Active" ? "Inactive" : "Active";

    try {
      const res = await dispatch(
        updateRoleStatus({ roleId, status: newStatus })
      );
      const resStatus = res?.payload?.status;

      if (resStatus === 200) {
        const updatedRoles = roles.map((r) =>
          r.roleId === roleId ? { ...r, status: newStatus } : r
        );
        setRoles(updatedRoles);
        toast.success(
          `Role ${roles.roleName} status updated to "${newStatus}"`
        );
      } else {
        toast.error(`Update failed`);
      }
    } catch (err) {
      toast.error("Network error while updating status");
    }
  };

  const handleRoleDelete = async (roleId) => {
    const role = roles.find((r) => r.roleId === roleId);
    if (!role) return;

    const newStatus = "Delete";

    try {
      const res = await dispatch(
        updateRoleStatus({ roleId, status: newStatus })
      );
      const resStatus = res?.payload?.status;

      if (resStatus === 200) {
        const updatedRoles = roles.map((r) =>
          r.roleId === roleId ? { ...r, status: newStatus } : r
        );
        setRoles(updatedRoles);
        toast.success(`Role ${roles.roleName} Deleted`);
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
            <h4 className="Title">Role</h4>
            <Link className="TitleLink" to="/subadminrolesadd">
              Create Role
            </Link>
          </div>
          <div className="FilterBox">
            <div className="form-group">
              <label>Search By</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search here"
              />
            </div>
          </div>
          <div className="TableList">
            <table>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Role ID</th>
                  <th>Role Name</th>
                  <th>Created On</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {roles
                  .filter((r) => r.status !== "Delete")
                  .map((currentRole, index) => (
                    <tr key={currentRole.roleId}>
                      <td>{index + 1}</td>
                      <td>{`R-${currentRole.roleId
                        .toString()
                        .padStart(3, "0")}`}</td>
                      <td>{currentRole.roleName}</td>
                      <td>
                        {new Date(currentRole.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <span
                          className={
                            currentRole.status === "Active" ? "Green" : "Red"
                          }
                        >
                          {currentRole.status}
                        </span>{" "}
                      </td>
                      <td>
                        <div className="Actions">
                          <label className="Switch">
                            <input
                              type="checkbox"
                              checked={currentRole.status === "Active"}
                              onChange={() =>
                                handleRoleStatus(currentRole.roleId)
                              }
                            />
                            <span className="slider" />
                          </label>

                          <Link
                            className="Green"
                            to={`/subadminrolesedit/${currentRole.roleId}`}
                          >
                            <i className="fa fa-pencil" />
                          </Link>
                          <a
                            className="Red"
                            onClick={() => {
                              setRoleToUpdate(currentRole);
                              setDeleteModal(true);
                            }}
                          >
                            <i className="fa fa-trash" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {deleteModal && (
        <div className="modal-open">
          <div className="ModalBox">
            <div id="DeleteModal" className="modal fade active" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content" style={{ top: "80px" }}>
                  <div className="modal-body">
                    <div className="Decline">
                      <a
                        className="CloseModal"
                        role="button"
                        onClick={() => {
                          setDeleteModal(false);
                          setRoleToUpdate(null);
                        }}
                      >
                        ×
                      </a>
                      <h3>Delete</h3>
                      <p>Are you sure you want to delete this Role?</p>
                      <h4>
                        <a
                          role="button"
                          onClick={() => {
                            setDeleteModal(false);
                            setRoleToUpdate(null);
                          }}
                        >
                          no
                        </a>
                        <a
                          role="button"
                          onClick={() => {
                            handleRoleDelete(roleToUpdate.roleId);
                            setDeleteModal(false);
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
        </div>
      )}
    </>
  );
}

export default SubadminRoles;

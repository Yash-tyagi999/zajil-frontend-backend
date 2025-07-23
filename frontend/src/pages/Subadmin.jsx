import { useEffect, useState } from "react";
import {
  createSubadmin,
  getSubadmins,
  updateSubadminStatus,
} from "../reduxToolkit/slices/subadmin";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../config/config";
import toast from "react-hot-toast";
import { getRoles } from "../reduxToolkit/slices/role";

function Subadmin() {
  const [subAdminUserAdd, setSubAdminUserAdd] = useState(false);
  const [subAdminUserEdit, setSubAdminUserEdit] = useState(false);
  const [subAdminDeleteModal, setSubAdminDeleteModal] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [filteredSubadmins, setFilteredSubadmins] = useState([]);

  const [subadmins, setSubadmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const result = subadmins.filter((s) => {
      const subadminIdStr = `SA-${s?.subadminId.toString().padStart(3, "0")}`;
      return (
        !debouncedSearch ||
        subadminIdStr.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    });

    setFilteredSubadmins(result);
  }, [debouncedSearch, subadmins]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchSubadmins = async () => {
    try {
      const res = await dispatch(getSubadmins());
      const { status, data } = res?.payload || {};
      if (status === 200) {
        setSubadmins(data?.subadmins || []);
      } else {
        setError(data?.message || "Failed to load subadmins");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubadmins();
  }, []);

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
        setError("Something went wrong while fetching Role Data");
      }
    };
    fetchRoles();
  }, []);

  const initialState = {
    subadminName: "",
    subadminCompanyName: "",
    subadminRoleName: "",
    subadminEmail: "",
    subadminPhoneNumber: "",
    subadminUserName: "",
    subadminPassword: "",
    subadminProfileImageUrl: "",
    errors: {},
    disable: false,
  };

  const [formState, setFormState] = useState(initialState);

  const {
    subadminName,
    subadminCompanyName,
    subadminRoleName,
    subadminEmail,
    subadminPhoneNumber,
    subadminUserName,
    subadminPassword,
    subadminProfileImageUrl,
    errors,
    disable,
  } = formState;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
      errors: {},
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post("upload", formData);
      const data = res.data;

      if (data?.imageUrl) {
        setFormState((prev) => ({
          ...prev,
          subadminProfileImageUrl: data.imageUrl,
        }));
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error uploading image");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;
    if (!subadminName.trim()) {
      newErrors.subadminName = " *Sub Admin Name can't be empty";
      valid = false;
    }
    if (!subadminCompanyName.trim()) {
      newErrors.subadminCompanyName = " *Company Name can't be empty";
      valid = false;
    }
    if (!subadminRoleName.trim()) {
      newErrors.subadminRoleName = " *Role Name can't be empty";
      valid = false;
    }
    if (!subadminEmail.trim()) {
      newErrors.subadminEmail = " *Email ID can't be empty";
      valid = false;
    }
    if (!subadminPhoneNumber.trim()) {
      newErrors.subadminPhoneNumber = " *Phone Number can't be empty";
      valid = false;
    }
    if (!subadminUserName.trim()) {
      newErrors.subadminUserName = " *User Name can't be empty";
      valid = false;
    }
    if (!subadminPassword.trim()) {
      newErrors.subadminPassword = " *Password can't be empty";
      valid = false;
    }
    if (!subadminProfileImageUrl.trim()) {
      newErrors.subadminProfileImageUrl = " *Profile Image can't be empty";
      valid = false;
    }

    setFormState((prev) => ({ ...prev, errors: newErrors }));
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setFormState((prev) => ({ ...prev, disable: true }));

    const data = {
      subadminName: subadminName.trim(),
      subadminCompanyName: subadminCompanyName.trim(),
      subadminRoleName: subadminRoleName.trim(),
      subadminEmail: subadminEmail.trim(),
      subadminPhoneNumber: subadminPhoneNumber.trim(),
      subadminUserName: subadminUserName.trim(),
      subadminPassword: subadminPassword,
      subadminProfileImageUrl: subadminProfileImageUrl.trim(),
    };

    try {
      const res = await dispatch(createSubadmin(data));

      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 201) {
        toast.success(message || "Sub Admin Created Sucessfully");
        setSubAdminUserAdd(false);
        setFormState(initialState);
        await fetchSubadmins();
      } else if (status === 409) {
        toast.error(message || "already exists");
      } else {
        toast.error(message || "Error! Try Again");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setFormState((prev) => ({ ...prev, disable: false }));
    }
  };

  const handleSubadminStatus = async (subadminId) => {
    const subadmin = subadmins.find((b) => b.subadminId === subadminId);
    if (!subadmin) return;

    const newStatus =
      subadmin.subadminStatus === "Active" ? "Inactive" : "Active";

    try {
      const res = await dispatch(
        updateSubadminStatus({ subadminId, subadminStatus: newStatus })
      );
      const resStatus = res?.payload?.status;

      if (resStatus === 200) {
        setSubadmins((prev) =>
          prev.map((s) =>
            s.subadminId === subadminId
              ? { ...s, subadminStatus: newStatus }
              : s
          )
        );
        toast.success(
          `Subadmin "${subadmin.subadminName}" status updated to "${newStatus}"`
        );
      } else {
        toast.error("Update failed");
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
            <h4 className="Title">Sub Admin</h4>
            <a
              className="TitleLink"
              role="button"
              onClick={() => setSubAdminUserAdd(true)}
            >
              Add Sub Admin
            </a>
          </div>
          <div className="FilterBox">
            <div className="form-group">
              <label>Search By</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by ID"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="TableList">
            {loading && <p>Loading Sub Admins...</p>}
            {error && (
              <p className="error" role="alert" tabIndex={0}>
                {error}
              </p>
            )}
            {!loading && filteredSubadmins.length === 0 && (
              <p>No Sub Admin found.</p>
            )}

            {!loading && filteredSubadmins.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Sub Admin ID</th>
                    <th>Sub Admin Name</th>
                    <th>Role</th>
                    <th>Email Id</th>
                    <th>Registered On</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubadmins
                    .filter(
                      (s) =>
                        s.subadminStatus === "Active" ||
                        s.subadminStatus === "Inactive"
                    )
                    .map((currentSubadmin, index) => (
                      <tr key={currentSubadmin.subadminId}>
                        <td>{index + 1}</td>
                        <td>{`SA-${currentSubadmin.subadminId
                          .toString()
                          .padStart(3, "0")}`}</td>
                        <td>{currentSubadmin.subadminName}</td>
                        <td>{currentSubadmin.subadminRoleName}</td>
                        <td>{currentSubadmin.subadminEmail}</td>
                        <td>
                          {new Date(
                            currentSubadmin.createdAt
                          ).toLocaleDateString()}
                        </td>
                        <td>
                          <span
                            className={
                              currentSubadmin.subadminStatus === "Active"
                                ? "Green"
                                : "Red"
                            }
                          >
                            {currentSubadmin.subadminStatus}
                          </span>{" "}
                        </td>
                        <td>
                          <div className="Actions">
                            <label className="Switch">
                              <input
                                type="checkbox"
                                checked={
                                  currentSubadmin.subadminStatus === "Active"
                                }
                                onChange={() =>
                                  handleSubadminStatus(
                                    currentSubadmin.subadminId
                                  )
                                }
                              />
                              <span className="slider" />
                            </label>
                            <Link className="Blue" to="/subadmindetails">
                              <i className="fa fa-eye" />
                            </Link>
                            <a className="Green">
                              <i className="fa fa-pencil" />
                            </a>
                            <a className="Red">
                              <i className="fa fa-trash" />
                            </a>
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

      <div className="ModalBox">
        {subAdminUserAdd && (
          <div className="modal-open">
            <div className="ModalBox">
              <div className="modal show active fade" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content" style={{ top: "420px" }}>
                    <div className="modal-body">
                      <div className="Category">
                        <a
                          className="CloseModal"
                          role="button"
                          onClick={() => {
                            setSubAdminUserAdd(false);
                            setFormState(initialState);
                          }}
                        >
                          ×
                        </a>
                        <h3>Add New Sub Admin</h3>
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label>Sub Admin Name</label>

                            <input
                              type="text"
                              className="form-control"
                              name="subadminName"
                              value={subadminName}
                              onChange={handleInputChange}
                              placeholder="Enter Sub Admin Name"
                            />
                            <span className="text-danger">
                              {errors?.subadminName}
                            </span>
                          </div>
                          <div className="form-group">
                            <label>Company Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="subadminCompanyName"
                              value={subadminCompanyName}
                              onChange={handleInputChange}
                              placeholder="Enter Company Name"
                            />
                            <span className="text-danger">
                              {errors?.subadminCompanyName}
                            </span>
                          </div>
                          <div className="form-group">
                            <label>Assign Role</label>{" "}
                            <select
                              className="form-control"
                              name="subadminRoleName"
                              value={subadminRoleName}
                              onChange={handleInputChange}
                            >
                              <option value="">Select Role</option>
                              {roles.map((currentRole) => (
                                <option
                                  value={currentRole.roleName}
                                  key={currentRole.roleName}
                                >
                                  {currentRole.roleName}
                                </option>
                              ))}
                            </select>
                            <span className="text-danger">
                              {errors?.subadminRoleName}
                            </span>
                          </div>
                          <div className="form-group">
                            <label>Email ID</label>
                            <input
                              type="email"
                              className="form-control"
                              name="subadminEmail"
                              value={subadminEmail}
                              onChange={handleInputChange}
                              placeholder="Enter Email ID"
                            />
                            <span className="text-danger">
                              {errors?.subadminEmail}
                            </span>
                          </div>
                          <div className="form-group">
                            <label>Mobile Number</label>
                            <input
                              type="text"
                              className="form-control"
                              name="subadminPhoneNumber"
                              value={subadminPhoneNumber}
                              onChange={handleInputChange}
                              placeholder="Enter Mobile Number"
                            />{" "}
                            <span className="text-danger">
                              {errors?.subadminPhoneNumber}
                            </span>
                          </div>
                          <div className="form-group">
                            <label>Username</label>
                            <input
                              type="text"
                              className="form-control"
                              name="subadminUserName"
                              value={subadminUserName}
                              onChange={handleInputChange}
                              placeholder="Enter User Name"
                            />{" "}
                            <span className="text-danger">
                              {errors?.subadminUserName}
                            </span>
                          </div>
                          <div className="form-group">
                            <label>Password</label>
                            <input
                              type="password"
                              className="form-control"
                              name="subadminPassword"
                              value={subadminPassword}
                              onChange={handleInputChange}
                              placeholder="Enter Password"
                            />{" "}
                            <span className="text-danger">
                              {errors?.subadminPassword}
                            </span>
                          </div>
                          <div className="form-group">
                            <label>Profile Image</label>
                            <div className="UploadBox">
                              <div className="Upload">
                                <i className="fa fa-upload" />{" "}
                                <span>Upload Image</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                />
                              </div>
                              {errors.subadminProfileImageUrl && (
                                <span className="text-danger">
                                  {errors?.subadminProfileImageUrl}
                                </span>
                              )}
                              {subadminProfileImageUrl && (
                                <img
                                  src={subadminProfileImageUrl}
                                  width="150"
                                  alt="Uploaded"
                                />
                              )}
                            </div>
                          </div>
                          <button className="Button" disabled={disable}>
                            {disable ? "Adding Sub Admin..." : "Add Sub Admin"}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {subAdminUserEdit && (
          <div id="SubAdminUserEdit" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="Category">
                    <a
                      href="javascript:void(0);"
                      className="CloseModal"
                      data-dismiss="modal"
                    >
                      ×
                    </a>
                    <h3>Edit Sub Admin</h3>
                    <div className="form-group">
                      <label>Sub Admin Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Company Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Assign Role</label>
                      <select className="form-control">
                        <option>Select Role</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Enter Email ID</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Enter Mobile Number</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Enter Username</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Enter password</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Profile Images</label>
                      <div className="UploadBox">
                        <div className="Upload">
                          <i className="fa fa-upload" />{" "}
                          <span>Upload Images</span>
                          <input type="file" />
                        </div>
                      </div>
                    </div>
                    <button className="Button">Update</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {subAdminDeleteModal && (
          <div id="SubAdminDeleteModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="Decline">
                    <a
                      href="javascript:void(0);"
                      className="CloseModal"
                      data-dismiss="modal"
                    >
                      ×
                    </a>
                    <h3>Delete</h3>
                    <p>Are you sure you want to delete this Sub Admin?</p>
                    <h4>
                      <a href="javascript:void(0);" data-dismiss="modal">
                        no
                      </a>
                      <a href="javascript:void(0);" data-dismiss="modal">
                        Yes
                      </a>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Subadmin;

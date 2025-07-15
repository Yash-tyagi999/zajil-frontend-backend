import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createVehicle,
  getVehicles,
  updateVehicle,
  updateVehicleStatus,
} from "../reduxToolkit/slices/vehicle";
import { useDispatch } from "react-redux";

function VehicleManagement() {
  const [vehicleAddModal, setVehicleAddModal] = useState(false);
  const [vehicleEditModal, setVehicleEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [vehicleToUpdate, setVehicleToUpdate] = useState(null);

  const initialState = {
    vehicleName: "",
    vehicleType: "",
    vehicleCapacity: "",
    vehicleNumber: "",
    vehicleImageUrl: "",
    errors: {},
    disable: false,
  };

  const [formState, setFormState] = useState(initialState);

  const {
    vehicleName,
    vehicleType,
    vehicleCapacity,
    vehicleNumber,
    vehicleImageUrl,
    errors,
    disable,
  } = formState;

  const dispatch = useDispatch();

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
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );
      const data = res.data;

      if (data?.imageUrl) {
        setFormState((prev) => ({
          ...prev,
          vehicleImageUrl: data.imageUrl,
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

    if (!vehicleName.trim()) {
      newErrors.vehicleName = "*Vehicle Name can't be empty";
      valid = false;
    }
    if (!vehicleType.trim()) {
      newErrors.vehicleType = "*Vehicle Type can't be empty";
      valid = false;
    }
    if (!vehicleCapacity.trim()) {
      newErrors.vehicleCapacity = "*Vehicle Capacity can't be empty";
      valid = false;
    }
    if (!vehicleNumber.trim()) {
      newErrors.vehicleNumber = "*Vehicle Number can't be empty";
      valid = false;
    }
    if (!vehicleImageUrl.trim()) {
      newErrors.vehicleImageUrl = "*Vehicle Image can't be empty";
      valid = false;
    }

    setFormState((prev) => ({ ...prev, errors: newErrors }));
    return valid;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!validateForm()) return;

      setFormState((prev) => ({ ...prev, disable: true }));

      const data = {
        vehicleName: vehicleName.trim(),
        vehicleType: vehicleType.trim(),
        vehicleCapacity: vehicleCapacity.trim(),
        vehicleNumber: vehicleNumber.trim(),
        vehicleImageUrl,
      };
      const res = await dispatch(createVehicle(data));

      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 201) {
        toast.success(message);
        setVehicleAddModal(false);
        setFormState(initialState);
      } else {
        toast.error(message || "Error! Try Again");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await dispatch(getVehicles());
        const { status, data } = res?.payload || {};

        if (status === 200) {
          setVehicles(data?.vehicles || []);
        } else {
          setError(data?.message || "Failed to load Vehicle");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredVehicle = vehicles.filter(
    (b) =>
      !debouncedSearch ||
      b?.vehicleName?.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleVehicleStatus = async (vehicleId) => {
    const vehicle = vehicles.find((v) => v.vehicleId === vehicleId);
    if (!vehicle) return;

    const newStatus = vehicle.status === "Active" ? "Inactive" : "Active";

    try {
      const res = await dispatch(
        updateVehicleStatus({ vehicleId, status: newStatus })
      );
      const resStatus = res?.payload?.status;

      if (resStatus === 200) {
        setVehicles((prev) =>
          prev.map((b) =>
            b.vehicleId === vehicleId ? { ...b, status: newStatus } : b
          )
        );
        toast.success(
          `Vehicle "${vehicle.vehicleName}" status updated to "${newStatus}"`
        );
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Network error while updating status");
    }
  };

  const handleVehicleDelete = async (vehicleId) => {
    const vehicle = vehicles.find((b) => b.vehicleId === vehicleId);
    if (!vehicle) return;

    const newStatus = "Delete";

    try {
      const res = await dispatch(
        updateVehicleStatus({ vehicleId, status: newStatus })
      );
      const resStatus = res?.payload?.status;

      if (resStatus === 200) {
        setVehicles((prev) =>
          prev.map((b) =>
            b.vehicleId === vehicleId ? { ...b, status: newStatus } : b
          )
        );
        toast.success(`Vehicle "${vehicle.vehicleName}" Deleted`);
        setVehicleToUpdate(null);
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Network error while updating status");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const updatedData = {
      vehicleId: vehicleToUpdate.vehicleId,
      vehicleName: vehicleName.trim(),
      vehicleType: vehicleType.trim(),
      vehicleCapacity: vehicleCapacity.trim(),
      vehicleNumber: vehicleNumber.trim(),
      vehicleImageUrl,
    };

    try {
      const res = await dispatch(updateVehicle(updatedData));
      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 200) {
        toast.success(message || "Vehicle updated successfully");

        setVehicles((prev) =>
          prev.map((v) =>
            v.vehicleId === updatedData.vehicleId ? { ...v, ...updatedData } : v
          )
        );
        setVehicleEditModal(false);
        setVehicleToUpdate(null);
        setFormState(initialState);
      } else {
        toast.error(message || "Error! Try again");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (vehicleEditModal && vehicleToUpdate) {
      setFormState({
        vehicleName: vehicleToUpdate.vehicleName,
        vehicleType: vehicleToUpdate.vehicleType,
        vehicleCapacity: vehicleToUpdate.vehicleCapacity,
        vehicleNumber: vehicleToUpdate.vehicleNumber,
        vehicleImageUrl: vehicleToUpdate.vehicleImageUrl,
        errors: {},
        disable: false,
      });
    }
  }, [vehicleEditModal, vehicleToUpdate]);

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Vehicle Management</h4>
            <a
              className="TitleLink"
              role="button"
              onClick={() => setVehicleAddModal(true)}
            >
              Add Vehicle
            </a>
          </div>
          <div className="FilterBox">
            <div className="form-group">
              <label>Search By</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search Name"
                value={search}
                onChange={handleSearchChange}
                aria-label="Search Vehicle by Name"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="TableList">
            {loading && <p>Loading Vehicles...</p>}
            {error && (
              <p className="error" role="alert" tabIndex={0}>
                {error}
              </p>
            )}
            {!loading && filteredVehicle.length === 0 && (
              <p>No Vehicle found.</p>
            )}

            {!loading && filteredVehicle.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Vehicle ID</th>
                    <th>Vehicle Name</th>
                    <th>Vehicle Number</th>
                    <th>Vehicle Type</th>
                    <th>Vehicle Capacity</th>
                    <th>Vehicle Icon</th>
                    <th>Created By</th>
                    <th>Created on</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicle
                    .filter((v) => v.status !== "Delete")
                    .map((currentVehicle, index) => (
                      <tr key={currentVehicle._id || currentVehicle.vehicleId}>
                        <td>{index + 1}</td>
                        <td>VEHICLE-{currentVehicle.vehicleId}</td>
                        <td>{currentVehicle.vehicleName}</td>
                        <td>{currentVehicle.vehicleNumber}</td>
                        <td>{currentVehicle.vehicleType}</td>
                        <td>{currentVehicle.vehicleCapacity}</td>
                        <td>
                          <img
                            src={currentVehicle.vehicleImageUrl}
                            width="50px"
                          />
                        </td>
                        <td>Admin</td>
                        <td>
                          {new Date(
                            currentVehicle.createdAt
                          ).toLocaleDateString()}
                        </td>
                        <td>
                          <span
                            className={
                              currentVehicle.status === "Active"
                                ? "Green"
                                : "Red"
                            }
                          >
                            {currentVehicle.status}{" "}
                          </span>
                        </td>
                        <td>
                          <div className="Actions">
                            <label className="Switch">
                              <input
                                type="checkbox"
                                checked={currentVehicle.status === "Active"}
                                onChange={() =>
                                  handleVehicleStatus(currentVehicle.vehicleId)
                                }
                              />
                              <span className="slider" />
                            </label>

                            <a
                              className="Green"
                              role="button"
                              onClick={() => {
                                setVehicleToUpdate(currentVehicle);
                                setVehicleEditModal(true);
                              }}
                            >
                              <i className="fa fa-pencil" />
                            </a>

                            <a
                              className="Red"
                              role="button"
                              onClick={() => {
                                setVehicleToUpdate(currentVehicle);
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
            )}
          </div>
        </div>
      </div>

      {vehicleAddModal && (
        <div className="modal-open">
          <div className="ModalBox">
            <div className="modal show active fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content" style={{ top: "280px" }}>
                  <div className="modal-body">
                    <div className="Category">
                      <a
                        className="CloseModal"
                        role="button"
                        onClick={() => setVehicleAddModal(false)}
                      >
                        ×
                      </a>
                      <form onSubmit={handleSubmit}>
                        <h3>Add Vehicle </h3>
                        <div className="form-group">
                          <label>Vehicle Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Vehicle Name"
                            name="vehicleName"
                            value={vehicleName}
                            onChange={handleInputChange}
                          />
                          {errors.vehicleName && (
                            <p className="error-text">{errors.vehicleName}</p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Vehicle Type</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Vehicle Type"
                            name="vehicleType"
                            value={vehicleType}
                            onChange={handleInputChange}
                          />
                          {errors.vehicleType && (
                            <p className="error-text">{errors.vehicleType}</p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Vehicle Capacity</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Vehicle Capacity"
                            name="vehicleCapacity"
                            value={vehicleCapacity}
                            onChange={handleInputChange}
                          />
                          {errors.vehicleCapacity && (
                            <p className="error-text">
                              {errors.vehicleCapacity}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Vehicle Number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Vehicle Number"
                            name="vehicleNumber"
                            value={vehicleNumber}
                            onChange={handleInputChange}
                          />
                          {errors.vehicleNumber && (
                            <p className="error-text">{errors.vehicleNumber}</p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Vehicle Icon</label>
                          <div className="UploadBox">
                            <div className="Upload">
                              <i className="fa fa-upload" />{" "}
                              <span>Upload Icon</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                              />
                            </div>
                            {errors.vehicleImageUrl && (
                              <p className="error-text">
                                {errors.vehicleImageUrl}
                              </p>
                            )}
                            {vehicleImageUrl && (
                              <img
                                src={vehicleImageUrl}
                                width="150"
                                alt="Uploaded"
                              />
                            )}
                          </div>
                        </div>
                        <button className="Button" disabled={disable}>
                          {disable ? "Submitting..." : "Submit"}{" "}
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
      {vehicleEditModal && (
        <div className="modal-open">
          <div className="ModalBox">
            <div className="modal active" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content" style={{ top: "240px" }}>
                  <div className="modal-body">
                    <div className="Category">
                      <a
                        className="CloseModal"
                        role="button"
                        onClick={() => {
                          setVehicleEditModal(false);
                          setVehicleToUpdate(null);
                          setFormState(initialState);
                        }}
                      >
                        ×
                      </a>
                      <form onSubmit={handleUpdate}>
                        <h3>Edit Vehicle </h3>
                        <div className="form-group">
                          <label>Vehicle Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="vehicleName"
                            value={formState.vehicleName}
                            onChange={handleInputChange}
                          />
                          {errors.vehicleName && (
                            <p className="error-text">{errors.vehicleName}</p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Vehicle Number</label>
                          <input
                            type="text"
                            className="form-control"
                            name="vehicleNumber"
                            value={formState.vehicleNumber}
                            onChange={handleInputChange}
                          />
                          {errors.vehicleNumber && (
                            <p className="error-text">{errors.vehicleNumber}</p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Vehicle Type</label>
                          <input
                            type="text"
                            className="form-control"
                            name="vehicleType"
                            value={formState.vehicleType}
                            onChange={handleInputChange}
                          />
                          {errors.vehicleType && (
                            <p className="error-text">{errors.vehicleType}</p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Vehicle Capacity</label>
                          <input
                            type="text"
                            className="form-control"
                            name="vehicleCapacity"
                            value={formState.vehicleCapacity}
                            onChange={handleInputChange}
                          />
                          {errors.vehicleCapacity && (
                            <p className="error-text">
                              {errors.vehicleCapacity}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Vehicle Icon</label>
                          <div className="UploadBox">
                            <div className="Upload">
                              <i className="fa fa-upload" />{" "}
                              <span>Upload Icon</span>
                              <input type="file" onChange={handleFileChange} />
                            </div>
                            <div className="UploadIcon">
                              {formState.vehicleImageUrl?.trim() ? (
                                <img
                                  src={formState.vehicleImageUrl}
                                  width="150"
                                />
                              ) : null}{" "}
                              {errors.vehicleImageUrl && (
                                <p className="error-text">
                                  {errors.vehicleImageUrl}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <button className="Button">Update</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {deleteModal && (
        <div className="modal-open">
          <div className="ModalBox">
            <div id="DeleteModal" className="modal fade active" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content" style={{ top: "40px" }}>
                  <div className="modal-body">
                    <div className="Decline">
                      <a
                        className="CloseModal"
                        role="button"
                        onClick={() => {
                          setDeleteModal(false);
                          setVehicleToUpdate(null);
                        }}
                      >
                        ×
                      </a>
                      <h3>Delete</h3>
                      <p>Are you sure you want to delete this Vehicle ?</p>
                      <h4>
                        <a
                          role="button"
                          onClick={() => {
                            setDeleteModal(false);
                            setVehicleToUpdate(null);
                          }}
                        >
                          no
                        </a>
                        <a
                          role="button"
                          onClick={() => {
                            handleVehicleDelete(vehicleToUpdate.vehicleId);
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

export default VehicleManagement;

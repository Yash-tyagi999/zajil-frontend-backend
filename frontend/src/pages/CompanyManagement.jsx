import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  createCompany,
  getCompanies,
  updateCompany,
  updateCompanyStatus,
} from "../reduxToolkit/slices/company";

function CompanyManagement() {
  const [companyAddModal, setCompanyAddModal] = useState(false);
  const [companyEditModal, setCompanyEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const initialState = {
    companyName: "",
    companyAddress: "",
    companyImageUrl: "",
    errors: {},
    disable: false,
  };

  const [formState, setFormState] = useState(initialState);

  const { companyName, companyAddress, companyImageUrl, errors, disable } =
    formState;

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCompanies = companies.filter(
    (b) =>
      !debouncedSearch ||
      b?.companyName?.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await dispatch(getCompanies());
        const { status, data } = res?.payload || {};

        if (status === 200) {
          setCompanies(data?.companies || []);
        } else {
          setError(data?.message || "Failed to load riders");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [dispatch]);

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
          companyImageUrl: data.imageUrl,
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

    if (!companyName.trim()) {
      newErrors.companyName = "*Company Name can't be empty";
      valid = false;
    }
    if (!companyAddress.trim()) {
      newErrors.companyAddress = "*Company Address can't be empty";
      valid = false;
    }
    if (!companyImageUrl.trim()) {
      newErrors.companyImageUrl = "*Company Image can't be empty";
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
        companyName: companyName.trim(),
        companyAddress: companyAddress.trim(),
        companyImageUrl,
      };
      const res = await dispatch(createCompany(data));

      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 201) {
        toast.success(message);
        setCompanyAddModal(false);
        setFormState(initialState);
      } else {
        toast.error(message || "Error! Try Again");
      }
    } catch (err) {
      // console.log(err)
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (currentCompany) => {
    setCompanyEditModal(true);
    setSelectedCompany(currentCompany);
    setFormState({
      companyName: currentCompany.companyName,
      companyAddress: currentCompany.companyAddress,
      companyImageUrl: currentCompany.companyImageUrl,
      errors: {},
      disable: false,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const updatedData = {
      companyId: selectedCompany.companyId,
      companyName: companyName.trim(),
      companyAddress: companyAddress.trim(),
      companyImageUrl,
    };

    try {
      const res = await dispatch(updateCompany(updatedData));
      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 200) {
        toast.success(message || "Company updated successfully");

        setCompanies((prev) =>
          prev.map((b) =>
            b.companyId === updatedData.companyId ? { ...b, ...updatedData } : b
          )
        );
      } else {
        toast.error(message || "Error! Try again");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setCompanyEditModal(false);
      setSelectedCompany(null);
      setFormState(initialState);
    }
  };

  const handleCompanyStatus = async (companyId) => {
    try {
      const company = companies.find((c) => c.companyId === companyId);
      if (!company) return;
      const newStatus = company.status === "Active" ? "Inactive" : "Active";
      const res = await dispatch(
        updateCompanyStatus({ companyId, status: newStatus })
      );

      const resStatus = res?.payload?.status;

      if (resStatus === 200) {
        setCompanies((prev) =>
          prev.map((c) =>
            c.companyId === companyId ? { ...c, status: newStatus } : c
          )
        );
        toast.success(
          `Company ${company.companyName} status updated to "${newStatus}"`
        );
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Network error while updating status");
    }
  };

  const handleCompanyDelete = async () => {
    try {
      const company = companies.find(
        (c) => c.companyId === selectedCompany.companyId
      );
      if (!company) return;
      const newStatus = "Delete";
      const res = await dispatch(
        updateCompanyStatus({
          companyId: selectedCompany.companyId,
          status: newStatus,
        })
      );

      const resStatus = res?.payload?.status;

      if (resStatus === 200) {
        setCompanies((prev) =>
          prev.map((c) =>
            c.companyId === selectedCompany.companyId
              ? { ...c, status: newStatus }
              : c
          )
        );
        toast.success(`Company ${company.companyName} Deleted`);

        setDeleteModal(false);
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Network error while Deleting");
    } finally {
      setSelectedCompany(null);
    }
  };

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Company Management</h4>
            <a
              role="button"
              onClick={() => {
                setCompanyAddModal(true);
              }}
              className="TitleLink"
            >
              Add Company
            </a>
          </div>
          <div className="FilterBox">
            <div className="form-group">
              <label>Search By</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={search}
                onChange={handleSearchChange}
                aria-label="Search Branch by Name"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="TableList">
            {loading && <p>Loading Companies...</p>}
            {error && (
              <p className="error" role="alert" tabIndex={0}>
                {error}
              </p>
            )}
            {!loading && filteredCompanies.length === 0 && (
              <p>No Company found.</p>
            )}

            {!loading && filteredCompanies.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Company ID</th>
                    <th>Company Name</th>
                    <th width="400px">Company Address</th>
                    <th>Company Icon</th>
                    <th>Created on</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies
                    .filter(
                      (c) => c.status === "Active" || c.status === "Inactive"
                    )
                    .map((currentCompany, index) => (
                      <tr key={currentCompany.companyId || currentCompany._id}>
                        <td>{index + 1}</td>
                        <td>COMP-{currentCompany.companyId}</td>
                        <td>{currentCompany.companyName}</td>
                        <td>{currentCompany.companyAddress}</td>
                        <td>
                          <img
                            src={currentCompany.companyImageUrl}
                            width="75px"
                          />
                        </td>
                        <td>
                          {new Date(
                            currentCompany.createdAt
                          ).toLocaleDateString()}
                        </td>
                        <td>
                          <span
                            className={
                              currentCompany.status === "Active"
                                ? "Green"
                                : "Red"
                            }
                          >
                            {currentCompany.status}{" "}
                          </span>
                        </td>
                        <td>
                          <div className="Actions">
                            <label className="Switch">
                              <input
                                type="checkbox"
                                checked={currentCompany.status === "Active"}
                                onChange={() =>
                                  handleCompanyStatus(currentCompany.companyId)
                                }
                              />
                              <span className="slider" />
                            </label>
                            <a
                              className="Green"
                              role="button"
                              onClick={() => handleEdit(currentCompany)}
                            >
                              <i className="fa fa-pencil" />
                            </a>
                            <a
                              className="Red"
                              role="button"
                              onClick={() => {
                                setDeleteModal(true);
                                setSelectedCompany(currentCompany);
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
      {companyAddModal && (
        <div className="modal-open">
          <div className="ModalBox">
            <div className="modal show active fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content" style={{ top: "220px" }}>
                  <div className="modal-body">
                    <div className="Category">
                      <a
                        className="CloseModal"
                        role="button"
                        onClick={() => {
                          setCompanyAddModal(false);
                          setFormState(initialState);
                        }}
                      >
                        ×
                      </a>
                      <form onSubmit={handleSubmit}>
                        <h3>Add Company </h3>
                        <div className="form-group">
                          <label>Company Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="companyName"
                            value={companyName}
                            onChange={handleInputChange}
                            placeholder="Enter Company Name"
                          />
                          {errors.companyName && (
                            <p className="error-text">{errors.companyName}</p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Company Address</label>
                          <input
                            type="text"
                            className="form-control"
                            name="companyAddress"
                            value={companyAddress}
                            onChange={handleInputChange}
                            placeholder="Enter Company Address"
                          />
                          {errors.companyAddress && (
                            <p className="error-text">
                              {errors.companyAddress}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Company Images</label>
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
                            {errors.companyImageUrl && (
                              <p className="error-text">
                                {errors.companyImageUrl}
                              </p>
                            )}
                            {companyImageUrl && (
                              <img
                                src={companyImageUrl}
                                width="150"
                                alt="Uploaded"
                              />
                            )}
                          </div>
                        </div>
                        <button className="Button" disabled={disable}>
                          {disable ? "Submitting..." : "Submit"}
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
      {companyEditModal && (
        <div className="modal-open">
          <div className="ModalBox">
            <div className="modal active" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content" style={{ top: "198px" }}>
                  <div className="modal-body">
                    <div className="Category">
                      <a
                        className="CloseModal"
                        data-dismiss="modal"
                        onClick={() => {
                          setCompanyEditModal(false);
                          setSelectedCompany(null);
                          setFormState(initialState);
                        }}
                      >
                        ×
                      </a>
                      <form onSubmit={handleUpdate}>
                        <h3>Edit Company </h3>
                        <div className="form-group">
                          <label>Company Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="companyName"
                            value={formState.companyName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Company Address</label>
                          <input
                            type="text"
                            className="form-control"
                            name="companyAddress"
                            value={formState.companyAddress}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Company Image</label>
                          <div className="UploadBox">
                            <div className="Upload">
                              <i className="fa fa-upload" />{" "}
                              <span>Upload Image</span>
                              <input type="file" onChange={handleFileChange} />
                            </div>
                            <div className="UploadIcon">
                              {formState.companyImageUrl?.trim() ? (
                                <img
                                  src={formState.companyImageUrl}
                                  width="150"
                                />
                              ) : null}
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
                          setSelectedCompany(null);
                        }}
                      >
                        ×
                      </a>
                      <h3>Delete</h3>
                      <p>Are you sure you want to delete this Company?</p>
                      <h4>
                        <a
                          role="button"
                          onClick={() => {
                            setDeleteModal(false);
                            setSelectedCompany(null);
                          }}
                        >
                          no
                        </a>
                        <a role="button" onClick={() => handleCompanyDelete()}>
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

export default CompanyManagement;

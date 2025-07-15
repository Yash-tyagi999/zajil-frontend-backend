import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  createBanner,
  getBanners,
  updateStatus,
  updateBanner,
} from "../reduxToolkit/slices/banner";
import axios from "axios";

function BannerManagement() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [bannerToUpdate, setBannerToUpdate] = useState(null);

  const [bannerAddModal, setBannerAddModal] = useState(false);
  const [bannerEditModal, setBannerEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const dispatch = useDispatch();

  const initState = {
    banner_title: "",
    banner_image_url: "",
    errors: {},
    disable: false,
  };

  const [formState, setFormState] = useState(initState);

  const { banner_title, banner_image_url, errors, disable } = formState;

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await dispatch(getBanners());
        const { status, data } = res?.payload || {};

        if (status === 200) {
          setBanners(data?.banners || []);
        } else {
          setError(data?.message || "Failed to load Banners");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredBanners = banners.filter(
    (b) =>
      !debouncedSearch ||
      b?.bannerTitle?.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

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
          banner_image_url: data.imageUrl,
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

    if (!banner_title.trim()) {
      newErrors.titleError = " *Banner Title can't be empty";
      valid = false;
    }
    if (!banner_image_url.trim()) {
      newErrors.imageError = " *Banner Image can't be empty";
      valid = false;
    }

    setFormState((prev) => ({ ...prev, errors: newErrors }));
    return valid;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!validateForm()) {
        return;
      }
      setFormState((prev) => ({ ...prev, disable: true }));
      const data = {
        banner_title: banner_title.trim(),
        banner_image_url,
      };
      const res = await dispatch(createBanner(data));

      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;
      if (status === 201) {
        toast.success(message || "banner Created Sucessfully");
        handleCloseModal();
        setFormState(initState);
      } else {
        toast.error(message || "Error! Try Again");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const handleCloseModal = () => {
    setFormState(initState);
    setBannerAddModal(false);
  };

  const handleBannerStatus = async (bannerId) => {
    const banner = banners.find((b) => b.bannerId === bannerId);
    if (!banner) return;

    const newStatus = banner.status === "Active" ? "Inactive" : "Active";

    try {
      const res = await dispatch(updateStatus({ bannerId, status: newStatus }));
      const resStatus = res?.payload?.status;

      if (resStatus === 200) {
        setBanners((prev) =>
          prev.map((b) =>
            b.bannerId === bannerId ? { ...b, status: newStatus } : b
          )
        );
        toast.success(
          `Banner "${banner.bannerTitle}" status updated to "${newStatus}"`
        );
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Network error while updating status");
    }
  };

  const handleBannerDelete = async (bannerId) => {
    const banner = banners.find((b) => b.bannerId === bannerId);
    if (!banner) return;

    const newStatus = "Delete";

    try {
      const res = await dispatch(updateStatus({ bannerId, status: newStatus }));
      const resStatus = res?.payload?.status;

      if (resStatus === 200) {
        setBanners((prev) =>
          prev.map((b) =>
            b.bannerId === bannerId ? { ...b, status: newStatus } : b
          )
        );
        toast.success(`Banner "${banner.bannerTitle}" Deleted`);
        setBannerToUpdate(null);
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Network error while updating status");
    }
  };

  useEffect(() => {
    if (bannerEditModal && bannerToUpdate) {
      setFormState({
        banner_title: bannerToUpdate.bannerTitle,
        banner_image_url: bannerToUpdate.bannerImageUrl,
        errors: {},
        disable: false,
      });
    }
  }, [bannerEditModal, bannerToUpdate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const updatedData = {
      bannerId: bannerToUpdate.bannerId,
      bannerTitle: formState.banner_title.trim(),
      bannerImageUrl: formState.banner_image_url.trim(),
    };

    try {
      const res = await dispatch(updateBanner(updatedData));
      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 200) {
        toast.success(message || "Banner updated successfully");

        setBanners((prevBanners) =>
          prevBanners.map((b) =>
            b.bannerId === updatedData.bannerId ? { ...b, ...updatedData } : b
          )
        );
      } else {
        toast.error(message || "Error! Try again");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setBannerEditModal(false);
      setBannerToUpdate(null);
      setFormState(initState);
    }
  };

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Banner Management</h4>
            <a
              role="button"
              className="TitleLink"
              onClick={() => setBannerAddModal(true)}
            >
              Add Banner
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
                aria-label="Search Banner by Name"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="TableList">
            {loading && <p>Loading Banners...</p>}
            {error && (
              <p className="error" role="alert" tabIndex={0}>
                {error}
              </p>
            )}
            {!loading && filteredBanners.length === 0 && (
              <p>No Banner found.</p>
            )}

            {!loading && filteredBanners.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Banner Id</th>
                    <th>Banner Title</th>
                    <th>Banner image</th>
                    <th>Uploaded on</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBanners
                    .filter((r) => r.status !== "Delete")
                    .map((currentBanner) => (
                      <tr key={currentBanner._id || currentBanner.bannerId}>
                        <td>BID{currentBanner.bannerId}</td>
                        <td>{currentBanner.bannerTitle}</td>
                        <td>
                          <img
                            src={currentBanner.bannerImageUrl}
                            width="100px"
                          />
                        </td>
                        <td>
                          {new Date(
                            currentBanner.createdAt
                          ).toLocaleDateString()}
                        </td>
                        <td>
                          <span
                            className={
                              currentBanner.status === "Active"
                                ? "Green"
                                : "Red"
                            }
                          >
                            {currentBanner.status}
                          </span>
                        </td>
                        <td>
                          <div className="Actions">
                            <label className="Switch">
                              <input
                                type="checkbox"
                                checked={currentBanner.status === "Active"}
                                onChange={() =>
                                  handleBannerStatus(currentBanner.bannerId)
                                }
                              />
                              <span className="slider" />
                            </label>

                            <a
                              role="button"
                              className="Green"
                              onClick={() => {
                                setBannerToUpdate(currentBanner);
                                setBannerEditModal(true);
                              }}
                            >
                              <i className="fa fa-pencil" />
                            </a>

                            <a
                              role="button"
                              className="Red"
                              onClick={() => {
                                setBannerToUpdate(currentBanner);
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

      {bannerAddModal && (
        <div className="modal-open">
          <div className="ModalBox">
            <div
              className="modal show active fade"
              aria-modal="true"
              role="dialog"
            >
              <div className="modal-dialog">
                <div className="modal-content" style={{ top: "148px" }}>
                  <div className="modal-body">
                    <div className="Category">
                      <a
                        className="CloseModal"
                        role="button"
                        onClick={handleCloseModal}
                      >
                        ×
                      </a>
                      <form onSubmit={handleSubmit}>
                        <h3>Add Banner </h3>

                        <div className="form-group">
                          <label>Banner Title</label>
                          <input
                            type="text"
                            name="banner_title"
                            className="form-control"
                            placeholder="Enter Banner Title"
                            value={banner_title}
                            onChange={handleInputChange}
                          />
                          {errors.titleError && (
                            <p className="error-text">{errors.titleError}</p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>Banner Image</label>

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
                            {errors.imageError && (
                              <p className="error-text">{errors.imageError}</p>
                            )}
                          </div>

                          {banner_image_url && (
                            <img
                              src={banner_image_url}
                              width="150"
                              alt="Uploaded"
                            />
                          )}
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

      {bannerEditModal && (
        <div className="modal-open">
          <div className="ModalBox">
            <div className="modal fade active" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content" style={{ top: "198px" }}>
                  <div className="modal-body">
                    <div className="Category">
                      <a
                        className="CloseModal"
                        role="button"
                        onClick={() => {
                          setBannerEditModal(false);
                          setBannerToUpdate(null);
                          setFormState(initState);
                        }}
                      >
                        ×
                      </a>
                      <form onSubmit={handleUpdate}>
                        <h3>Edit Banner </h3>
                        <div className="form-group">
                          <label>Banner Title</label>
                          <input
                            type="text"
                            className="form-control"
                            name="banner_title"
                            value={formState.banner_title}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Banner Image</label>
                          <div className="UploadBox">
                            <div className="Upload">
                              <i className="fa fa-upload" />{" "}
                              <span>Upload Image</span>
                              <input type="file" onChange={handleFileChange} />
                            </div>
                            <div className="UploadIcon">
                              {formState.banner_image_url?.trim() ? (
                                <img
                                  src={formState.banner_image_url}
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
                          setBannerToUpdate(null);
                        }}
                      >
                        ×
                      </a>
                      <h3>Delete</h3>
                      <p>Are you sure you want to delete this Banner?</p>
                      <h4>
                        <a
                          role="button"
                          onClick={() => {
                            setDeleteModal(false);
                            setBannerToUpdate(null);
                          }}
                        >
                          no
                        </a>
                        <a
                          role="button"
                          onClick={() => {
                            handleBannerDelete(bannerToUpdate.bannerId);
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

export default BannerManagement;

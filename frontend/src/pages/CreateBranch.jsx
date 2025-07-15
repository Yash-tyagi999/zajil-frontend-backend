import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createBranch } from "../reduxToolkit/slices/branch";

function CreateBranch() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    branch_name: "",
    branch_city: "",
    longitude: "",
    latitude: "",
    business_hours_start: "",
    business_hours_end: "",
    errors: {},
    disable: false,
  });

  const {
    branch_name,
    branch_city,
    longitude,
    latitude,
    business_hours_start,
    business_hours_end,
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

  const validateForm = () => {
    const newErrors = {};
    let valid = true;
    if (!branch_name.trim()) {
      newErrors.nameError = " *Username can't be empty";
      valid = false;
    }
    if (!branch_city.trim()) {
      newErrors.cityError = " *City can't be empty";
      valid = false;
    }
    if (!longitude.trim()) {
      newErrors.longError = " *Longitude can't be empty";
      valid = false;
    }
    if (!latitude.trim()) {
      newErrors.latError = " *Latitude can't be empty";
      valid = false;
    }
    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
      newErrors.longError = " *Longitude must be a number between -180 and 180";
      valid = false;
    }
    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
      newErrors.latError = " *Latitude must be a number between -90 and 90";
      valid = false;
    }

    if (!business_hours_start.trim()) {
      newErrors.hoursstartError = " *Business Hours can't be empty";
      valid = false;
    }
    if (!business_hours_end.trim()) {
      newErrors.hoursendError = " *Business Hours can't be empty";
      valid = false;
    }

    setFormState((prev) => ({ ...prev, errors: newErrors }));
    return valid;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setFormState((prev) => ({ ...prev, disable: true }));

    const data = {
      branch_name: branch_name.trim(),
      branch_city: branch_city.trim(),
      longitude: longitude.trim(),
      latitude: latitude.trim(),
      business_hours_start: business_hours_start.trim(),
      business_hours_end: business_hours_end.trim(),
    };

    try {
      const res = await dispatch(createBranch(data));

      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 201) {
        toast.success(message || "Branch Created Sucessfully");

        navigate("/branchmanagement");
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

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div>
          <div className="LoginBody">
            <form onSubmit={handleSignIn}>
              <div className="form-group">
                <label>Branch Name</label>
                <input
                  type="text"
                  placeholder="Enter branch name"
                  className="form-control"
                  name="branch_name"
                  value={branch_name}
                  onChange={handleInputChange}
                />
                <span className="text-danger">{errors?.nameError}</span>
              </div>

              <div className="form-group">
                <label>Branch City</label>
                <select
                  className="form-control"
                  name="branch_city"
                  value={branch_city}
                  onChange={handleInputChange}
                >
                  <option value="">Select Branch City</option>
                  <option value="Gurugram">Gurugram</option>
                  <option value="Noida">Noida</option>
                </select>

                <span className="text-danger">{errors?.cityError}</span>
              </div>

              <div className="form-group">
                <label>Latitude</label>
                <input
                  type="text"
                  placeholder="Enter Latitude"
                  className="form-control"
                  name="latitude"
                  value={latitude}
                  onChange={handleInputChange}
                />
                <span className="text-danger">{errors?.latError}</span>
              </div>

              <div className="form-group">
                <label>Longitude</label>
                <input
                  type="text"
                  placeholder="Enter Longitude"
                  className="form-control"
                  name="longitude"
                  value={longitude}
                  onChange={handleInputChange}
                />
                <span className="text-danger">{errors?.longError}</span>
              </div>

              <div className="form-group">
                <label>Business Start Hours</label>
                <input
                  type="time"
                  className="form-control"
                  name="business_hours_start"
                  value={business_hours_start}
                  onChange={handleInputChange}
                />
                <span className="text-danger">{errors?.hoursstartError}</span>
              </div>
              <div className="form-group">
                <label>Business End Hours</label>
                <input
                  type="time"
                  className="form-control"
                  name="business_hours_end"
                  value={business_hours_end}
                  onChange={handleInputChange}
                />
                <span className="text-danger">{errors?.hoursendError}</span>
              </div>

              <button className="Button" type="submit" disabled={disable}>
                {disable ? "Creating Branch..." : "Create Branch"}{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBranch;

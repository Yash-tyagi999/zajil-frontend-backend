import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRider } from "../reduxToolkit/slices/rider";

function UserRiderAdd() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    rider_type: "",
    rider_company: "",
    user_name: "",
    email_id: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    address: "",
    city: "",
    document_id_number: "",
    bank_name: "",
    bank_number: "",
    bank_account_holder_name: "",
    errors: {},
    disable: false,
  });

  const {
    rider_type,
    rider_company,
    user_name,
    email_id,
    password,
    confirm_password,
    phone_number,
    address,
    city,
    document_id_number,
    bank_name,
    bank_number,
    bank_account_holder_name,
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

    if (!rider_type) {
      newErrors.rider_type = "Rider type is required";
      valid = false;
    }

    if (!user_name.trim()) {
      newErrors.user_name = "Username can't be empty";
      valid = false;
    }

    if (!email_id.trim()) {
      newErrors.email_id = "Email can't be empty";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password can't be empty";
      valid = false;
    }

    if (!confirm_password || confirm_password !== password) {
      newErrors.confirm_password = "Passwords do not match";
      valid = false;
    }

    if (!phone_number.trim()) {
      newErrors.phone_number = "Phone Number can't be empty";
      valid = false;
    } else if (phone_number.trim().length < 10) {
      newErrors.phone_number = "Phone Number should be 10 digits";
      valid = false;
    }

    if (!address.trim()) {
      newErrors.address = "Address can't be empty";
      valid = false;
    }
    if (!city.trim()) {
      newErrors.city = "City is required";
      valid = false;
    }

    setFormState((prev) => ({ ...prev, errors: newErrors }));
    return valid;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormState((prev) => ({ ...prev, disable: true }));

    const data = {
      rider_type,
      rider_company: rider_company.trim(),
      user_name: user_name.trim(),
      email: email_id.trim(),
      password,
      phone_number: phone_number.trim(),
      address: address.trim(),
      city,
      document_id_number: document_id_number.trim(),
      bank_name: bank_name.trim(),
      bank_number: bank_number.trim(),
      bank_account_holder_name: bank_account_holder_name.trim(),
    };

    try {
      const res = await dispatch(createRider(data));
      const status = res?.payload?.status;

      if (status === 201) {
        toast.success("Rider Created Successfully");
        navigate("/userrider");
      } else if (status === 409) {
        toast.error("Rider already exist with the provided email address.");
      } else {
        toast.error("Error! Try Again");
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
        <div className="TitleBox">
          <h4 className="Title">Add Rider</h4>
        </div>
        <form onSubmit={handleSignIn}>
          <div className="CommonForm">
            <h4>Profile Information</h4>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Rider type</label>
                  <select
                    className="form-control"
                    name="rider_type"
                    value={rider_type}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Rider type</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Under Company">Under Company</option>
                  </select>
                  <p className="text-danger">{errors.rider_type}</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Rider's Company Name (optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="rider_company"
                    placeholder="Enter Rider’s Company Name"
                    value={rider_company}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Rider's Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="user_name"
                    placeholder="Enter rider's name"
                    value={user_name}
                    onChange={handleInputChange}
                  />
                  <p className="text-danger">{errors.user_name}</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Email ID</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email_id"
                    placeholder="Enter email"
                    value={email_id}
                    onChange={handleInputChange}
                  />
                  <p className="text-danger">{errors.email_id}</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Contact No.</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone_number"
                    placeholder="Enter phone number"
                    value={phone_number}
                    onChange={handleInputChange}
                  />
                  <p className="text-danger">{errors.phone_number}</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="Enter address"
                    value={address}
                    onChange={handleInputChange}
                  />
                  <p className="text-danger">{errors.address}</p>
                </div>
                <div className="form-group">
                  <label>City</label>
                  <select
                    className="form-control"
                    name="city"
                    value={city}
                    onChange={handleInputChange}
                  >
                    <option value="">Select City</option>
                    <option value="Gurugram">Gurugram</option>
                    <option value="Noida">Noida</option>
                  </select>
                  <p className="text-danger">{errors.city}</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Upload Profile Image (optional)</label>
                  <div className="UploadBox">
                    <div className="Upload">
                      <i className="fa fa-upload" /> <span>Upload Image</span>
                      <input type="file" name="profile_image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h4>Documents</h4>
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group">
                  <label>ID Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="document_id_number"
                    placeholder="Enter ID number"
                    value={document_id_number}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Upload Document</label>
                  <div className="UploadBox">
                    <div className="Upload">
                      <i className="fa fa-upload" /> <span>Upload</span>
                      <input type="file" name="document_file" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h4>Bank Account Details (for freelancers)</h4>
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Bank Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bank_name"
                    placeholder="Enter bank name"
                    value={bank_name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>IBAN Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bank_number"
                    placeholder="Enter IBAN number"
                    value={bank_number}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Account Holder Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bank_account_holder_name"
                    placeholder="Enter account holder name"
                    value={bank_account_holder_name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <h4>Create Credentials</h4>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handleInputChange}
                  />
                  <p className="text-danger">{errors.password}</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirm_password"
                    placeholder="Confirm password"
                    value={confirm_password}
                    onChange={handleInputChange}
                  />
                  <p className="text-danger">{errors.confirm_password}</p>
                </div>
              </div>
            </div>

            <button className="Button" disabled={disable}>
              {disable ? "Adding..." : "Add Rider"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserRiderAdd;

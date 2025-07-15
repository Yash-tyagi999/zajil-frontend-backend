import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createUser } from "../reduxToolkit/slices/user";

function CreateUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    user_name: "",
    email_id: "",
    password: "",
    phone_number: "",
    address: "",
    errors: {},
    disable: false,
  });

  const {
    user_name,
    email_id,
    password,
    phone_number,
    address,
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
    if (!user_name.trim()) {
      newErrors.nameError = " *Username can't be empty";
      valid = false;
    }

    if (!email_id.trim()) {
      newErrors.emailError = " *Email can't be empty";
      valid = false;
    }
    if (!password) {
      newErrors.passError = " *Password can't be empty";
      valid = false;
    }
    if (!phone_number.trim()) {
      newErrors.numberError = " *Phone Number can't be empty";
      valid = false;
    }
    if (phone_number.trim().length < 10) {
      newErrors.numberError = " *Phone Number should be a 10-digit number";
      valid = false;
    }
    if (!address.trim()) {
      newErrors.addressError = " *Address can't be empty";
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
      user_name: user_name.trim(),
      email: email_id.trim(),
      password,
      phone_number: phone_number.trim(),
      address: address.trim(),
    };

    try {
      const res = await dispatch(createUser(data));

      const status = res?.payload?.status;

      if (status === 201) {
        toast.success("User Created Sucessfully");

        navigate("/usercustomer");
      } else if (status === 409) {
        toast.error("user already exists with the provided email address.");
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
        <div>
          <div className="LoginBody">
            <form onSubmit={handleSignIn}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="form-control"
                  name="user_name"
                  value={user_name}
                  onChange={handleInputChange}
                />
                <span className="text-danger">{errors?.nameError}</span>
                <span className="Icon"></span>
              </div>

              <div className="form-group">
                <label>Email ID</label>
                <input
                  type="email"
                  placeholder="Enter Email ID"
                  className="form-control"
                  name="email_id"
                  value={email_id}
                  onChange={handleInputChange}
                />
                <span className="text-danger">{errors?.emailError}</span>
                <span className="Icon"></span>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                />
                <span className="text-danger">{errors?.passError}</span>
                <span className="Icon"></span>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  className="form-control"
                  name="phone_number"
                  value={phone_number}
                  onChange={handleInputChange}
                />
                <span className="text-danger">{errors?.numberError}</span>
                <span className="Icon"></span>
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={handleInputChange}
                />
                <span className="text-danger">{errors?.addressError}</span>
                <span className="Icon"></span>
              </div>

              <button className="Button" type="submit" disabled={disable}>
                {disable ? "Creating User..." : "Create User"}{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";

import logo from "../images/logo.png";
import { resetPassword } from "../reduxToolkit/slices/auth";

const LoginReset = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    password: "",
    confirmPassword: "",
    disable: false,
    errors: {},
  });

  const { password, confirmPassword, disable, errors } = formState;

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
    if (!password.trim()) {
      newErrors.passError = " *Password can't be empty";
      valid = false;
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassError = " *Confirm Password can't be empty";
      valid = false;
    }
    if (password != confirmPassword) {
      newErrors.confirmPassError =
        " *New Password and Confirm Password must match";
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
      password,
    };
    try {
      const res = await dispatch(resetPassword(data));

      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 200) {
        toast.success(message);
        navigate("/loginsuccess");
      } else if (status === 404||status===401) {
        toast.error(message);
      } else {
        toast.error("Something went wrong try again");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setFormState((prev) => ({ ...prev, disable: false }));
    }
  };

  return (
    <div>
      <>
        <div className="LoginArea">
          <div className="LoginBox">
            <div className="LoginHead">
              <figure>
                <img src={logo} />
              </figure>
              <h5>
                Let's Started <span>Zajil</span>
              </h5>
              <h6>To keep connected wit us please login .</h6>
            </div>
            <div className="LoginBody">
              <h2>
                Zajil <span>Admin</span>
              </h2>
              <h3>
                <span>Change password</span>
              </h3>
              <h6>No Problem! Enter your new password</h6>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Enter new password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                  <span className="error">{errors?.passError}</span>
                  <span className="Icon">
                    <i className="fa fa-eye" />
                  </span>
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleInputChange}
                  />
                  <span className="error">{errors?.confirmPassError}</span>
                  <span className="Icon">
                    <i className="fa fa-eye" />
                  </span>
                </div>

                <button className="Button" type="submit" disabled={disable}>
                  {disable ? "Confirming..." : "Confirm"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default LoginReset;

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import logo from "../images/logo.png";
import { verifyMail } from "../reduxToolkit/slices/auth";

const LoginForgot = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    email_id: "",
    disable: false,
    errors: {},
  });
  const { email_id, disable, errors } = formState;

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
    if (!email_id.trim()) {
      newErrors.emailError = " *Email can't be empty";
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
      email: email_id.trim(),
    };

    try {
      const res = await dispatch(verifyMail(data));

      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 200) {
        toast.success(message);
        navigate("/loginverification");
      } else if (status === 404) {
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
              <span>Forgot Password</span>
            </h3>
            <h6>
              No Problem! Just provide your e-mail address and we'll <br /> send
              you a reset OTP.
            </h6>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="text"
                  placeholder="Enter Email Address"
                  className="form-control"
                  name="email_id"
                  value={email_id}
                  onChange={handleInputChange}
                />
                <span className="error">{errors?.emailError}</span>
                <span className="Icon">
                  <i className="fa fa-envelope" />
                </span>
              </div>
              <button className="Button" type="submit" disabled={disable}>
                {disable ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForgot;

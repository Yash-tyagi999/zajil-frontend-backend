import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import logo from "../images/logo.png";
import { adminLogin } from "../reduxToolkit/slices/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    email_id: localStorage.getItem("email") || "",
    password: localStorage.getItem("password") || "",
    errors: {},
    disable: false,
    check: localStorage.getItem("check") === "true",
  });

  const { email_id, password, errors, disable, check } = formState;

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      setFormState((prev) => ({ ...prev, check: checked }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [name]: value,
        errors: {},
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;
    if (!email_id.trim()) {
      newErrors.emailError = " *Email or Username can't be empty";
      valid = false;
    }
    if (!password) {
      newErrors.passError = " *Password can't be empty";
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
      email: email_id.trim(),
      password,
    };

    try {
      const res = await dispatch(adminLogin(data));

      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 200) {
        toast.success(message);
        if (check) {
          localStorage.setItem("email", email_id);
          localStorage.setItem("password", password);
          localStorage.setItem("check", "true");
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
          localStorage.removeItem("check");
        }
        navigate("/dashboard");
      } else if (status === 401) {
        toast.error(message || "User not found");
      } else {
        toast.error(message || "Login failed");
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
              <img src={logo} alt="Zajil Logo" />
            </figure>
            <h5>
              Let's Get Started <span>Zajil</span>
            </h5>
            <h6>To stay connected with us, please log in.</h6>
          </div>

          <div className="LoginBody">
            <h2>
              Zajil <span>Admin</span>
            </h2>
            <h3>
              <span>Login to your account</span>
            </h3>
            <h6>
              Enter your email address and password to <br /> access the admin
              panel.
            </h6>

            <form onSubmit={handleSignIn}>
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
                <span className="error">{errors?.emailError}</span>
                <span className="Icon">
                  <i className="fa fa-envelope" />
                </span>
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
                <span className="error">{errors?.passError}</span>
                <span className="Icon">
                  <i className="fa fa-unlock-alt" />
                </span>
              </div>

              <div className="Checkboxs">
                <label className="CheckBox" htmlFor="remember">
                  Remember Me
                  <input
                    type="checkbox"
                    id="remember"
                    name="check"
                    checked={check}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark" />
                </label>
                <Link to="/loginforgot">Forgot password?</Link>
              </div>

              <button className="Button" type="submit" disabled={disable}>
                {disable ? "Loading..." : "Log In"}{" "}
                <i className="fa fa-sign-in" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

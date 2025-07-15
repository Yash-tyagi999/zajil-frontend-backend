import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import logo from "../images/logo.png";
import { resendOTP, verifyOTP } from "../reduxToolkit/slices/auth";

const LoginVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [formState, setFormState] = useState({
    disable: false,
    errors: {},
  });
  const { disable, errors } = formState;
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setFormState((prev) => ({
      ...prev,
      errors: {},
    }));

    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;
    const otpFilled = otp.every((digit) => digit.trim() !== "");
    if (!otpFilled) {
      newErrors.OTPError = "*Please enter all 6 digits of the OTP";
      valid = false;
    }
    setFormState((prev) => ({ ...prev, errors: newErrors }));
    return valid;
  };

  const handleResend = async () => {
    try {
      const res = await dispatch(resendOTP());
      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 200) {
        toast.success(message);
      } else if (status === 404 || status === 401) {
        toast.error(message);
      } else {
        toast.error("Something went wrong try again");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setFormState((prev) => ({ ...prev, disable: true }));

    const data = {
      otpcode: otp.join(""),
    };
    try {
      const res = await dispatch(verifyOTP(data));

      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 200) {
        toast.success(message);
        navigate("/loginreset");
      } else if (status === 400 || status === 401) {
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
              <img src={logo} alt="Zajil Logo" />
            </figure>
            <h5>
              Let's Started <span>Zajil</span>
            </h5>
            <h6>To keep connected with us please login.</h6>
          </div>

          <div className="LoginBody">
            <h2>
              Zajil <span>Admin</span>
            </h2>
            <h3>
              <span>OTP Verification</span>
            </h3>
            <h6>
              Please enter 6 digit OTP Verification code received <br /> on your
              email address.
            </h6>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="OTPBox">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      className="form-control"
                      maxLength={1}
                      inputMode="numeric"
                      value={digit}
                      ref={(el) => (inputsRef.current[index] = el)}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  ))}
                </div>
                <span className="error">{errors?.OTPError}</span>
                <p className="text-right">
                  <a onClick={handleResend}>Resend OTP</a>
                </p>
              </div>
              <button className="Button" type="submit" disabled={disable}>
                {disable ? "Verifying OTP..." : "Verify OTP"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginVerification;

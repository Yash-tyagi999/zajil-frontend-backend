import logo from "../images/logo.png";
import success from "../images/success.png";
import { Link } from "react-router-dom";

const LoginSuccess = () => {
  
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
              <div className="SuccessBox">
                <span>
                  <img src={success} />
                </span>
                <h3>Congratulations!</h3>
                <p>Your password has been updated successfully!!</p>
                <Link to="/login">Login to Continue</Link>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default LoginSuccess;

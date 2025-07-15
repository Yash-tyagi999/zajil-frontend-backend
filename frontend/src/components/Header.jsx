import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import avatar_1 from "../images/Avatar-1.png";
import { adminLogout } from "../reduxToolkit/slices/auth";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      const res = await dispatch(adminLogout());

      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 200) {
        toast.success(message);
        navigate("/");
      } else {
        toast.error(message || "Logout failed Try again");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="Header">
        <div className="Navigation">
          <div className="Avater">
            <a href="javascript:void(0);">
              <figure>
                <img src={avatar_1} />
              </figure>
              Bob Hyden
            </a>
            <ul>
              <li>
                <figure>
                  <img src={avatar_1} />
                </figure>
                <h4>
                  {" "}
                  Bob Hyden <span>Administrator</span>
                </h4>
              </li>
              <li>
                {/* <Link to="login">
                  <span>
                    <i className="fa fa-sign-out" />
                  </span>{" "}
                  Logout
                </Link> */}
                <div onClick={handleClick} className="logout-link">
                  <span className="Icon">
                    <i className="fa fa-sign-out" />
                  </span>{" "}
                  Logout
                </div>
              </li>
            </ul>
          </div>
          <div className="clear" />
        </div>
      </div>
    </>
  );
}

export default Header;

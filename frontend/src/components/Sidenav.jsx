import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import logo from "../images/logo.png";
import { adminLogout } from "../reduxToolkit/slices/auth";

import { useSelector } from "react-redux";

function Sidenav() {
  const EMPTY_PERMISSIONS = [];

  const permissionsList = useSelector(
    (state) => state.authMgmtSlice?.permissionsList ?? EMPTY_PERMISSIONS
  );
  const roleType = useSelector((state) => state.authMgmtSlice?.roleType ?? "");

  const hasReadAccess = (moduleName) => {
    const module = permissionsList.find(
      (mod) => mod.name?.toLowerCase() === moduleName?.toLowerCase()
    );
    return module?.read === true;
  };

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

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <div className="SidenavArea">
      <div className="SidenavHead">
        <div className="Logo">
          <img src={logo} alt="Logo" />
        </div>
      </div>

      <div className="SidenavBody">
        <ul>
          {/* Dashboard */}
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <span className="Icon">
                <i className="fa fa-tachometer" />
              </span>{" "}
              Dashboard
            </NavLink>
          </li>

          {/* User Management */}
          {(roleType === "Admin" || hasReadAccess("User Management")) && (
            <li
              className={`dropdown ${openDropdown === "user" ? "active" : ""}`}
            >
              <div
                onClick={() => toggleDropdown("user")}
                className="dropdown-toggle"
              >
                <span className="Icon">
                  <i className="fa fa-user" />
                </span>{" "}
                User Management
                <i
                  className={`fa ${
                    openDropdown === "user"
                      ? "fa-chevron-up"
                      : "fa-chevron-down"
                  } float-right`}
                  style={{ marginTop: "3px" }}
                />
              </div>
              {openDropdown === "user" && (
                <ol className="dropdown-menu">
                  <li>
                    <NavLink
                      to="/usercustomer"
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      Customer
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/userrider"
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      Rider
                    </NavLink>
                  </li>
                </ol>
              )}
            </li>
          )}

          {/* Branch Management */}
          {(roleType === "Admin" || hasReadAccess("Branch Management")) && (
            <li>
              <NavLink
                to="/branchmanagement"
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                <span className="Icon">
                  <i className="fa fa-connectdevelop" />
                </span>{" "}
                Branch Management
              </NavLink>
            </li>
          )}

          {/* Banner Management */}
          {(roleType === "Admin" || hasReadAccess("Banner Management")) && (
            <li>
              <NavLink
                to="/bannermanagement"
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                <span className="Icon">
                  <i className="fa fa-bookmark" />
                </span>{" "}
                Banner Management
              </NavLink>
            </li>
          )}

          {/* Company Management */}
          {(roleType === "Admin" || hasReadAccess("Company Management")) && (
            <li>
              <NavLink
                to="/companymanagement"
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                <span className="Icon">
                  <i className="fa fa-building-o" />
                </span>{" "}
                Company Management
              </NavLink>
            </li>
          )}

          {/* Vehicle Management */}
          {(roleType === "Admin" || hasReadAccess("Vehicle Management")) && (
            <li>
              <NavLink
                to="/vehiclemanagement"
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                <span className="Icon">
                  <i className="fa fa-taxi" />
                </span>{" "}
                Vehicle Management
              </NavLink>
            </li>
          )}

          {/* Order Management */}
          {(roleType === "Admin" || hasReadAccess("Order Management")) && (
            <li
              className={`dropdown ${openDropdown === "order" ? "active" : ""}`}
            >
              <div
                onClick={() => toggleDropdown("order")}
                className="dropdown-toggle"
              >
                <span className="Icon">
                  <i className="fa fa-server" />
                </span>{" "}
                Order Management
                <i
                  className={`fa ${
                    openDropdown === "order"
                      ? "fa-chevron-up"
                      : "fa-chevron-down"
                  } float-right`}
                />
              </div>
              {openDropdown === "order" && (
                <ol className="dropdown-menu">
                  <li>
                    <NavLink
                      to="/orderinprogress"
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      In Progress
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/orderdelivered"
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      Delivered
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/ordercancelled"
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      Cancelled
                    </NavLink>
                  </li>
                </ol>
              )}
            </li>
          )}

          {/* Payment Management */}
          {(roleType === "Admin" || hasReadAccess("Payment Management")) && (
            <li
              className={`dropdown ${
                openDropdown === "payment" ? "active" : ""
              }`}
            >
              <div
                onClick={() => toggleDropdown("payment")}
                className="dropdown-toggle"
              >
                <span className="Icon">
                  <i className="fa fa-credit-card" />
                </span>{" "}
                Payment Management
                <i
                  className={`fa ${
                    openDropdown === "payment"
                      ? "fa-chevron-up"
                      : "fa-chevron-down"
                  } float-right`}
                />
              </div>
              {openDropdown === "payment" && (
                <ol className="dropdown-menu">
                  <li>
                    <NavLink
                      to="/paymentrevenue"
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      Reconciliation Revenue
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/paymentwithdrawal"
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      Reconciliation Withdrawal
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/paymentamount"
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      Withdrawal Amount
                    </NavLink>
                  </li>
                </ol>
              )}
            </li>
          )}

          {/* Sub Admin Management */}
          {(roleType === "Admin" || hasReadAccess("Sub Admin Management")) && (
            <li
              className={`dropdown ${
                openDropdown === "subadmin" ? "active" : ""
              }`}
            >
              <div
                onClick={() => toggleDropdown("subadmin")}
                className="dropdown-toggle"
              >
                <span className="Icon">
                  <i className="fa fa-users" />
                </span>{" "}
                Sub Admin Management
                <i
                  className={`fa ${
                    openDropdown === "subadmin"
                      ? "fa-chevron-up"
                      : "fa-chevron-down"
                  } float-right`}
                />
              </div>
              {openDropdown === "subadmin" && (
                <ol className="dropdown-menu">
                  <li>
                    <NavLink
                      to="/subadmin"
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      Sub Admin
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/subadminroles"
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      Roles
                    </NavLink>
                  </li>
                </ol>
              )}
            </li>
          )}

          {/* Price Management */}
          {(roleType === "Admin" || hasReadAccess("Price Management")) && (
            <li>
              <NavLink
                to="/pricemanagement"
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                <span className="Icon">
                  <i className="fa fa-cube" />
                </span>{" "}
                Price Management
              </NavLink>
            </li>
          )}

          {/* Settings */}
          {(roleType === "Admin" || hasReadAccess("Settings")) && (
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                <span className="Icon">
                  <i className="fa fa-sliders" />
                </span>{" "}
                Settings
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      <div className="SidenavFooter">
        <div onClick={handleClick} className="logout-link">
          <span className="Icon">
            <i className="fa fa-sign-out" />
          </span>{" "}
          Logout
        </div>
      </div>
    </div>
  );
}

export default Sidenav;

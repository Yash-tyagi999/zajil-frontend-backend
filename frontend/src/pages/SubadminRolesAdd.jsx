import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createRole } from "../reduxToolkit/slices/role";

function SubadminRolesAdd() {
  const initialsState = {
    roleName: "",
    moduleName: [
      { name: "Dashboard", read: false, fullAccess: false },
      { name: "User Management", read: false, fullAccess: false },
      { name: "Branch Management", read: false, fullAccess: false },
      { name: "Order Management", read: false, fullAccess: false },
      { name: "Payment Management", read: false, fullAccess: false },
      { name: "Sub Admin Management", read: false, fullAccess: false },
      { name: "Price Management", read: false, fullAccess: false },
      { name: "Settings", read: false, fullAccess: false },
    ],
    errors: {},
    disable: false,
  };
  const [formState, setFormState] = useState(initialsState);
  const { roleName, moduleName, errors, disable } = formState;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRoleNameChange = (e) => {
    const { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
      errors: {},
    }));
  };

  const handleReadValueChange = (moduleName) => {
    setFormState((prev) => ({
      ...prev,
      moduleName: prev.moduleName.map((mod) =>
        mod.name === moduleName ? { ...mod, read: !mod.read } : mod
      ),
    }));
  };

  const handleFullAccessValueChange = (moduleName) => {
    setFormState((prev) => ({
      ...prev,
      moduleName: prev.moduleName.map((mod) =>
        mod.name === moduleName ? { ...mod, fullAccess: !mod.fullAccess } : mod
      ),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!roleName.trim()) {
      newErrors.roleName = "Role Name can't be empty";
      valid = false;
    }

    setFormState((prev) => ({ ...prev, errors: newErrors }));
    return valid;
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setFormState((prev) => ({ ...prev, disable: true }));

    const data = {
      roleName: roleName.trim(),
      moduleName,
    };

    try {
      const res = await dispatch(createRole(data));

      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 201) {
        toast.success(message || "Role Created Sucessfully");

        navigate("/subadminroles");
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
        <div className="TitleBox">
          <h4 className="Title">Create Role</h4>
        </div>
        <div className="CommonForm">
          <form onSubmit={handleCreateRole}>
            <div className="form-group">
              <label>Role Name</label>
              <input
                type="text"
                name="roleName"
                value={roleName}
                onChange={handleRoleNameChange}
                className="form-control"
              />
              <span className="text-danger">{errors?.roleName}</span>
            </div>

            <h4>Sub Admin Rights Access</h4>
            <div className="AdminAccess">
              <table className="table">
                <thead>
                  <tr>
                    <th>Module</th>
                    <th width="150px">Read</th>
                    <th width="150px">Full Access</th>
                  </tr>
                </thead>
                <tbody>
                  {moduleName.map((module) => (
                    <tr key={module.name}>
                      <td>
                        <strong>{module.name}</strong>
                      </td>
                      <td>
                        <div className="Read">
                          <label className="Switch">
                            <input
                              type="checkbox"
                              checked={module.read}
                              onChange={() =>
                                handleReadValueChange(module.name)
                              }
                            />
                            <span className="slider" />
                          </label>
                          {/* <input
                            type="checkbox"
                            checked={module.read}
                            onChange={() => handleReadValueChange(module.name)}
                          />
                          <span>
                            <img
                              src={module.read ? eye : eyeslash}
                              width="15px"
                              alt="read icon"
                            />
                          </span> */}
                        </div>
                      </td>
                      <td>
                        <div className="Access">
                          <label className="Switch">
                            <input
                              type="checkbox"
                              checked={module.fullAccess}
                              onChange={() =>
                                handleFullAccessValueChange(module.name)
                              }
                            />
                            <span className="slider" />
                          </label>
                          {/* <input
                            type="checkbox"
                            checked={module.fullAccess}
                            onChange={() =>
                              handleFullAccessValueChange(module.name)
                            }
                          /> 
                           <span>
                            <img
                              src={module.fullAccess ? lock : unlock}
                              width="15px"
                              alt="access icon"
                            />
                          </span> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="Button" type="submit" disabled={disable}>
              {disable ? "Creating Role..." : "Create Role"}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SubadminRolesAdd;

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getRole, updateRole } from "../reduxToolkit/slices/role";

function SubadminRolesEdit() {
  const { roleId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [role, setRole] = useState({ roleName: "", moduleName: [] });
  const [errors, setErrors] = useState({});
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await dispatch(getRole({ roleId }));

        if (res?.payload?.status === 200) {
          setRole(res?.payload?.data?.role || []);
        } else {
          toast.error("Failed to load role details");
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    })();
  }, [roleId, dispatch]);

  const { roleName, moduleName } = role;

  const handleRoleNameChange = (e) => {
    const { name, value } = e.target;

    setRole((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({});
  };

  const handleReadValueChange = (moduleName) => {
    setRole((prev) => ({
      ...prev,
      moduleName: prev.moduleName.map((mod) =>
        mod.name === moduleName ? { ...mod, read: !mod.read } : mod
      ),
    }));
  };

  const handleFullAccessValueChange = (moduleName) => {
    setRole((prev) => ({
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

    setErrors(newErrors);
    return valid;
  };

  const handleEditRole = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setDisable(true);

    const data = {
      roleName: roleName.trim(),
      moduleName,
      roleId,
    };

    try {
      const res = await dispatch(updateRole(data));

      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 200) {
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
      setDisable(false);
    }
  };
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Edit Role</h4>
          </div>
          <div className="CommonForm">
            <form onSubmit={handleEditRole}>
              <div className="form-group">
                <label>Role Name</label>
                <input
                  type="text"
                  name="roleName"
                  value={roleName}
                  className="form-control"
                  onChange={handleRoleNameChange}
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
                    {moduleName.map((currentModule) => (
                      <tr key={currentModule.name}>
                        <td>
                          <strong>{currentModule.name}</strong>
                        </td>
                        <td>
                          <div className="Read">
                            <label className="Switch">
                              <input
                                type="checkbox"
                                checked={currentModule.read}
                                onChange={() =>
                                  handleReadValueChange(currentModule.name)
                                }
                              />
                              <span className="slider" />
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="Access">
                            <label className="Switch">
                              <input
                                type="checkbox"
                                checked={currentModule.fullAccess}
                                onChange={() =>
                                  handleFullAccessValueChange(
                                    currentModule.name
                                  )
                                }
                              />
                              <span className="slider" />
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <button className="Button">Update Role</button> */}
              <button className="Button" type="submit" disabled={disable}>
                {disable ? "Updating Role..." : "Update Role"}{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubadminRolesEdit;

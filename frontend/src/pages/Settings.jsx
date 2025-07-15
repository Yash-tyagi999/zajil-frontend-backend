import React from "react";

function Settings() {
  return (
    <div>
      <>
        <div className="WrapperArea">
          <div className="WrapperBox">
            <div className="TitleBox">
              <h4 className="Title">Settings</h4>
            </div>
            <div className="PasswordBox">
              <aside>
                <h4>Change Password</h4>
              </aside>
              <article>
                <div className="CommonForm">
                  <div className="form-group">
                    <label>Old Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Old Password"
                    />
                    <span className="Icon">
                      <i className="fa fa-eye" />
                    </span>
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter New Password"
                    />
                    <span className="Icon">
                      <i className="fa fa-eye" />
                    </span>
                  </div>
                  <div className="form-group">
                    <label>Re-enter Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Re-enter Password"
                    />
                    <span className="Icon">
                      <i className="fa fa-eye" />
                    </span>
                  </div>
                  <button className="Button">Update Password</button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Settings;

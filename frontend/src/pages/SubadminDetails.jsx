import React from "react";

function SubadminDetails() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Sub Admin Details</h4>
          </div>
          <div className="SubAdminBox">
            <figure>
              <img src="images/Avatar-1.png" />
            </figure>
            <figcaption>
              <p>
                <strong>Sub Admin Name</strong>
                <span>Mr. Kim</span>
              </p>
              <p>
                <strong>Sub Admin ID</strong>
                <span>2523238</span>
              </p>
              <p>
                <strong>Created On</strong>
                <span>12-03-2023</span>
              </p>
              <p>
                <strong>Role</strong>
                <span>Manager</span>
              </p>
              <p>
                <strong> Email ID</strong>
                <span>kim@gmail.com</span>
              </p>
              <p>
                <strong> Contact No.</strong>
                <span>32684234823</span>
              </p>
              <p>
                <strong> User Name</strong>
                <span>Manager1</span>
              </p>
              <p>
                <strong>Password</strong>
                <span>Kim123</span>
              </p>
            </figcaption>
          </div>
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
                <tr>
                  <td>
                    <strong>Dashboard</strong>
                  </td>
                  <td>
                    <div className="Read">
                      <input type="checkbox" defaultChecked="" />
                      <span>
                        <i className="fa fa-eye" />
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="Access">
                      <input type="checkbox" />
                      <span>
                        <i className="fa fa-lock" />
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>User Management</strong>
                  </td>
                  <td>
                    <div className="Read">
                      <input type="checkbox" defaultChecked="" />
                      <span>
                        <i className="fa fa-eye" />
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="Access">
                      <input type="checkbox" />
                      <span>
                        <i className="fa fa-lock" />
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Branch Management</strong>
                  </td>
                  <td>
                    <div className="Read">
                      <input type="checkbox" defaultChecked="" />
                      <span>
                        <i className="fa fa-eye" />
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="Access">
                      <input type="checkbox" defaultChecked="" />
                      <span>
                        <i className="fa fa-lock" />
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Order Management</strong>
                  </td>
                  <td>
                    <div className="Read">
                      <input type="checkbox" />
                      <span>
                        <i className="fa fa-eye" />
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="Access">
                      <input type="checkbox" defaultChecked="" />
                      <span>
                        <i className="fa fa-lock" />
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Payment Management</strong>
                  </td>
                  <td>
                    <div className="Read">
                      <input type="checkbox" />
                      <span>
                        <i className="fa fa-eye" />
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="Access">
                      <input type="checkbox" defaultChecked="" />
                      <span>
                        <i className="fa fa-lock" />
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Sub Admin Management</strong>
                  </td>
                  <td>
                    <div className="Read">
                      <input type="checkbox" />
                      <span>
                        <i className="fa fa-eye" />
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="Access">
                      <input type="checkbox" defaultChecked="" />
                      <span>
                        <i className="fa fa-lock" />
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Price Management</strong>
                  </td>
                  <td>
                    <div className="Read">
                      <input type="checkbox" defaultChecked="" />
                      <span>
                        <i className="fa fa-eye" />
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="Access">
                      <input type="checkbox" />
                      <span>
                        <i className="fa fa-lock" />
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Settings</strong>
                  </td>
                  <td>
                    <div className="Read">
                      <input type="checkbox" defaultChecked="" />
                      <span>
                        <i className="fa fa-eye" />
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="Access">
                      <input type="checkbox" />
                      <span>
                        <i className="fa fa-lock" />
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubadminDetails;

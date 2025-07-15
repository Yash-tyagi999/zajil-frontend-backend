import React from "react";

function SubadminRoles() {
  return (
      <>
        <div className="WrapperArea">
          <div className="WrapperBox">
            <div className="TitleBox">
              <h4 className="Title">Role</h4>
              <a className="TitleLink" href="subadmin-roles-add.html">
                Create Role
              </a>
            </div>
            <div className="FilterBox">
              <div className="form-group">
                <label>Search By</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here"
                />
              </div>
            </div>
            <div className="TableList">
              <table>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Role ID</th>
                    <th>Role Name</th>
                    <th>Created On</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01</td>
                    <td>R-001</td>
                    <td>CS Agent</td>
                    <td>25/08/2023</td>
                    <td>
                      <span className="Green">Active</span>{" "}
                    </td>
                    <td>
                      <div className="Actions">
                        <label className="Switch">
                          <input type="checkbox" />
                          <span className="slider" />
                        </label>
                        <a className="Green" href="subadmin-roles-edit.html">
                          <i className="fa fa-pencil" />
                        </a>
                        <a
                          className="Red"
                          data-toggle="modal"
                          data-target="#RoleDeleteModal"
                        >
                          <i className="fa fa-trash" />
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>02</td>
                    <td>R-002</td>
                    <td>Manger</td>
                    <td>25/08/2023</td>
                    <td>
                      <span className="Green">Active</span>{" "}
                    </td>
                    <td>
                      <div className="Actions">
                        <label className="Switch">
                          <input type="checkbox" />
                          <span className="slider" />
                        </label>
                        <a className="Green" href="subadmin-roles-edit.html">
                          <i className="fa fa-pencil" />
                        </a>
                        <a
                          className="Red"
                          data-toggle="modal"
                          data-target="#RoleDeleteModal"
                        >
                          <i className="fa fa-trash" />
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>03</td>
                    <td>R-003</td>
                    <td>Admin</td>
                    <td>25/08/2023</td>
                    <td>
                      <span className="Green">Active</span>{" "}
                    </td>
                    <td>
                      <div className="Actions">
                        <label className="Switch">
                          <input type="checkbox" />
                          <span className="slider" />
                        </label>
                        <a className="Green" href="subadmin-roles-edit.html">
                          <i className="fa fa-pencil" />
                        </a>
                        <a
                          className="Red"
                          data-toggle="modal"
                          data-target="#RoleDeleteModal"
                        >
                          <i className="fa fa-trash" />
                        </a>
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

export default SubadminRoles;

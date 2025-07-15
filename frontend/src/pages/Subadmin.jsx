import React from "react";

function Subadmin() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Sub Admin</h4>
            <a
              className="TitleLink"
              data-toggle="modal"
              data-target="#SubAdminUserAdd"
            >
              Add Sub Admin
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
                  <th>Sub Admin ID</th>
                  <th>Sub Admin Name</th>
                  <th>Role</th>
                  <th>Email Id</th>
                  <th>Registered On</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01</td>
                  <td>SA-001</td>
                  <td>Mr. John Smith</td>
                  <td>Manger</td>
                  <td>john@gmai.com</td>
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
                      <a className="Blue" href="subadmin-details.html">
                        <i className="fa fa-eye" />
                      </a>
                      <a
                        className="Green"
                        data-toggle="modal"
                        data-target="#SubAdminUserEdit"
                      >
                        <i className="fa fa-pencil" />
                      </a>
                      <a
                        className="Red"
                        data-toggle="modal"
                        data-target="#SubAdminDeleteModal"
                      >
                        <i className="fa fa-trash" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>02</td>
                  <td>SA-002</td>
                  <td>Mr. John Smith</td>
                  <td>Manger</td>
                  <td>john@gmai.com</td>
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
                      <a className="Blue" href="subadmin-details.html">
                        <i className="fa fa-eye" />
                      </a>
                      <a
                        className="Green"
                        data-toggle="modal"
                        data-target="#SubAdminUserEdit"
                      >
                        <i className="fa fa-pencil" />
                      </a>
                      <a
                        className="Red"
                        data-toggle="modal"
                        data-target="#SubAdminDeleteModal"
                      >
                        <i className="fa fa-trash" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>03</td>
                  <td>SA-003</td>
                  <td>Mr. John Smith</td>
                  <td>Manger</td>
                  <td>john@gmai.com</td>
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
                      <a className="Blue" href="subadmin-details.html">
                        <i className="fa fa-eye" />
                      </a>
                      <a
                        className="Green"
                        data-toggle="modal"
                        data-target="#SubAdminUserEdit"
                      >
                        <i className="fa fa-pencil" />
                      </a>
                      <a
                        className="Red"
                        data-toggle="modal"
                        data-target="#SubAdminDeleteModal"
                      >
                        <i className="fa fa-trash" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>04</td>
                  <td>SA-004</td>
                  <td>Mr. John Smith</td>
                  <td>Manger</td>
                  <td>john@gmai.com</td>
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
                      <a className="Blue" href="subadmin-details.html">
                        <i className="fa fa-eye" />
                      </a>
                      <a
                        className="Green"
                        data-toggle="modal"
                        data-target="#SubAdminUserEdit"
                      >
                        <i className="fa fa-pencil" />
                      </a>
                      <a
                        className="Red"
                        data-toggle="modal"
                        data-target="#SubAdminDeleteModal"
                      >
                        <i className="fa fa-trash" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>05</td>
                  <td>SA-005</td>
                  <td>Mr. John Smith</td>
                  <td>Manger</td>
                  <td>john@gmai.com</td>
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
                      <a className="Blue" href="subadmin-details.html">
                        <i className="fa fa-eye" />
                      </a>
                      <a
                        className="Green"
                        data-toggle="modal"
                        data-target="#SubAdminUserEdit"
                      >
                        <i className="fa fa-pencil" />
                      </a>
                      <a
                        className="Red"
                        data-toggle="modal"
                        data-target="#SubAdminDeleteModal"
                      >
                        <i className="fa fa-trash" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>06</td>
                  <td>SA-006</td>
                  <td>Mr. John Smith</td>
                  <td>Manger</td>
                  <td>john@gmai.com</td>
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
                      <a className="Blue" href="subadmin-details.html">
                        <i className="fa fa-eye" />
                      </a>
                      <a
                        className="Green"
                        data-toggle="modal"
                        data-target="#SubAdminUserEdit"
                      >
                        <i className="fa fa-pencil" />
                      </a>
                      <a
                        className="Red"
                        data-toggle="modal"
                        data-target="#SubAdminDeleteModal"
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
      {/* <div className="ModalBox">
          <div id="SubAdminUserAdd" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="Category">
                    <a
                      href="javascript:void(0);"
                      className="CloseModal"
                      data-dismiss="modal"
                    >
                      ×
                    </a>
                    <h3>Add New Sub Admin</h3>
                    <div className="form-group">
                      <label>Sub Admin Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Company Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Assign Role</label>
                      <select className="form-control">
                        <option>Select Role</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Enter Email ID</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Enter Mobile Number</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Enter Username</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Enter password</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Profile Images</label>
                      <div className="UploadBox">
                        <div className="Upload">
                          <i className="fa fa-upload" />{" "}
                          <span>Upload Images</span>
                          <input type="file" />
                        </div>
                      </div>
                    </div>
                    <button className="Button"> Add Sub Admin</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="SubAdminUserEdit" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="Category">
                    <a
                      href="javascript:void(0);"
                      className="CloseModal"
                      data-dismiss="modal"
                    >
                      ×
                    </a>
                    <h3>Edit Sub Admin</h3>
                    <div className="form-group">
                      <label>Sub Admin Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Company Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Assign Role</label>
                      <select className="form-control">
                        <option>Select Role</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Enter Email ID</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Enter Mobile Number</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Enter Username</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Enter password</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Profile Images</label>
                      <div className="UploadBox">
                        <div className="Upload">
                          <i className="fa fa-upload" />{" "}
                          <span>Upload Images</span>
                          <input type="file" />
                        </div>
                      </div>
                    </div>
                    <button className="Button">Update</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="SubAdminDeleteModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="Decline">
                    <a
                      href="javascript:void(0);"
                      className="CloseModal"
                      data-dismiss="modal"
                    >
                      ×
                    </a>
                    <h3>Delete</h3>
                    <p>Are you sure you want to delete this Sub Admin?</p>
                    <h4>
                      <a href="javascript:void(0);" data-dismiss="modal">
                        no
                      </a>
                      <a href="javascript:void(0);" data-dismiss="modal">
                        Yes
                      </a>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>  */}
    </>
  );
}

export default Subadmin;

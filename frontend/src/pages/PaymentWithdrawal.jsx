import React from "react";

function PaymentWithdrawal() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Reconciliation Withdrawal</h4>
            <a
              className="TitleLink"
              href="javascript:void(0);"
              data-toggle="modal"
              data-target="#UploadModal"
            >
              <i className="fa fa-upload" /> Upload Excel
            </a>
          </div>
          <div className="FilterBox FilterArea">
            <div className="form-group">
              <label>From Date</label>
              <input type="date" className="form-control" />
            </div>
            <div className="form-group">
              <label>To Date</label>
              <input type="date" className="form-control" />
            </div>
            <div className="form-group">
              <label>3rd Party Company Name </label>
              <select className="form-control">
                <option>Select </option>
              </select>
            </div>
            <div className="form-group">
              <label>Rider’s Name </label>
              <select className="form-control">
                <option>Select </option>
              </select>
            </div>
            <div className="form-group">
              <label>&nbsp;</label>
              <button className="Button">Apply</button>
              <button className="Button Cancel">
                <i className="fa fa-refresh" />
              </button>
            </div>
          </div>
          <div className="FilterBox">
            <div className="form-group">
              <label>Search By</label>
              <input
                type="text"
                className="form-control"
                placeholder="Rider Id, Name"
              />
            </div>
          </div>
          <div className="TableList">
            <table>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Orde ID</th>
                  <th>Rider Name</th>
                  <th>Rider Number</th>
                  <th>Rider Company Name</th>
                  <th>Order Amount </th>
                  <th>Payment Amount</th>
                  <th>Payment Date</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01</td>
                  <td>R-001</td>
                  <td>John Smith</td>
                  <td>+91 9876543210</td>
                  <td>ABC Company</td>
                  <td>SAR 234</td>
                  <td>SAR 2532</td>
                  <td>25/08/2023</td>
                  <td>
                    <div className="Actions">
                      <button className="Gray" disabled="">
                        Invoiced
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>02</td>
                  <td>R-002</td>
                  <td>John Smith</td>
                  <td>+91 9876543210</td>
                  <td>ABC Company</td>
                  <td>SAR 234</td>
                  <td>SAR 2532</td>
                  <td>25/08/2023</td>
                  <td>
                    <div className="Actions">
                      <button className="Gray" disabled="">
                        Invoiced
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>03</td>
                  <td>R-003</td>
                  <td>John Smith</td>
                  <td>+91 9876543210</td>
                  <td>ABC Company</td>
                  <td>SAR 234</td>
                  <td>SAR 2532</td>
                  <td>25/08/2023</td>
                  <td>
                    <div className="Actions">
                      <button className="Gray" disabled="">
                        Invoiced
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>04</td>
                  <td>R-004</td>
                  <td>John Smith</td>
                  <td>+91 9876543210</td>
                  <td>ABC Company</td>
                  <td>SAR 234</td>
                  <td>SAR 2532</td>
                  <td>--</td>
                  <td>
                    <div className="Actions">
                      <button className="Orange">Mark ad Paid</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>05</td>
                  <td>R-005</td>
                  <td>John Smith</td>
                  <td>+91 9876543210</td>
                  <td>ABC Company</td>
                  <td>SAR 234</td>
                  <td>SAR 2532</td>
                  <td>--</td>
                  <td>
                    <div className="Actions">
                      <button className="Orange">Mark ad Paid</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>06</td>
                  <td>R-006</td>
                  <td>John Smith</td>
                  <td>+91 9876543210</td>
                  <td>ABC Company</td>
                  <td>SAR 234</td>
                  <td>SAR 2532</td>
                  <td>--</td>
                  <td>
                    <div className="Actions">
                      <button className="Orange">Mark ad Paid</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <div className="ModalBox">
        <div id="UploadModal" className="modal fade" role="dialog">
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
                  <h3>Upload Reconciled Data </h3>
                  <div className="form-group">
                    <label>Excel File</label>
                    <input type="file" className="form-control" />
                  </div>
                  <button className="Button">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default PaymentWithdrawal;

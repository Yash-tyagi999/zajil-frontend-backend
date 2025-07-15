import React from "react";

function PaymentAmount() {
  return (
    <div>
      <>
        <div className="WrapperArea">
          <div className="WrapperBox">
            <div className="TitleBox">
              <h4 className="Title">Withdrawal Amount</h4>
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
                    <th>Rider ID</th>
                    <th>Rider Name</th>
                    <th>Rider Type</th>
                    <th>Company Name</th>
                    <th>Contact Number </th>
                    <th>Registered On</th>
                    <th>Total Deliveries</th>
                    <th>Total KMs</th>
                    <th>Total Payout</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01</td>
                    <td>R-001</td>
                    <td>John Smith</td>
                    <td>Under Company</td>
                    <td>ABC Company</td>
                    <td>+91 9876543210</td>
                    <td>25/08/2023</td>
                    <td>234</td>
                    <td>2532</td>
                    <td>SAR 545</td>
                  </tr>
                  <tr>
                    <td>02</td>
                    <td>R-002</td>
                    <td>John Smith</td>
                    <td>Under Company</td>
                    <td>ABC Company</td>
                    <td>+91 9876543210</td>
                    <td>25/08/2023</td>
                    <td>234</td>
                    <td>2532</td>
                    <td>SAR 545</td>
                  </tr>
                  <tr>
                    <td>03</td>
                    <td>R-003</td>
                    <td>John Smith</td>
                    <td>Under Company</td>
                    <td>ABC Company</td>
                    <td>+91 9876543210</td>
                    <td>25/08/2023</td>
                    <td>234</td>
                    <td>2532</td>
                    <td>SAR 545</td>
                  </tr>
                  <tr>
                    <td>04</td>
                    <td>R-004</td>
                    <td>John Smith</td>
                    <td>Under Company</td>
                    <td>ABC Company</td>
                    <td>+91 9876543210</td>
                    <td>25/08/2023</td>
                    <td>234</td>
                    <td>2532</td>
                    <td>SAR 545</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default PaymentAmount;

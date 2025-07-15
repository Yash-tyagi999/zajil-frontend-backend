import logo from "../images/logo.png";
import avatar_1 from "../images/Avatar-1.png";

const Dashboard = () => {
  return (
    <div>
      <>
        <div className="WrapperArea">
          <div className="WrapperBox">
            <div className="WelcomeBox">
              <figure>
                <img src={avatar_1} />
              </figure>
              <figcaption>
                <h3>Welcome back, Admin!</h3>
                <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus
                  qui.
                </p>
              </figcaption>
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
                <label>&nbsp;</label>
                <button className="Button">Apply</button>
                <button className="Button Cancel">
                  <i className="fa fa-refresh" />
                </button>
              </div>
              <div className="form-group fltR">
                <label>Timeframe</label>
                <select className="form-control">
                  <option>Select </option>
                  <option value="Today">Today</option>
                  <option value="Week">This Week</option>
                  <option value="Month">This Month</option>
                </select>
              </div>
            </div>
            <div className="TitleBox">
              <h4 className="Title">User Statics</h4>
            </div>
            <div className="DashboardBox">
              <ul>
                <li>
                  <aside>
                    <span className="Icon">
                      <i className="fa fa-user-circle-o" />
                    </span>
                    <h3>60</h3>
                    <p>Total Customer</p>
                  </aside>
                </li>
                <li>
                  <aside>
                    <span className="Icon">
                      <i className="fa fa-user-circle-o" />
                    </span>
                    <h3>60</h3>
                    <p>Active Customer</p>
                  </aside>
                </li>
                <li>
                  <aside>
                    <span className="Icon">
                      <i className="fa fa-user-circle-o" />
                    </span>
                    <h3>60</h3>
                    <p>Blocked Customer</p>
                  </aside>
                </li>
                <li>
                  <aside>
                    <span className="Icon">
                      <i className="fa fa-motorcycle" />
                    </span>
                    <h3>60</h3>
                    <p>Total Riders</p>
                  </aside>
                </li>
                <li>
                  <aside>
                    <span className="Icon">
                      <i className="fa fa-motorcycle" />
                    </span>
                    <h3>60</h3>
                    <p>Active Riders</p>
                  </aside>
                </li>
                <li>
                  <aside>
                    <span className="Icon">
                      <i className="fa fa-motorcycle" />
                    </span>
                    <h3>60</h3>
                    <p>Blocked Riders</p>
                  </aside>
                </li>
              </ul>
            </div>
            <div className="TitleBox">
              <h4 className="Title">Order Statics</h4>
            </div>
            <div className="DashboardBox">
              <ul>
                <li>
                  <aside>
                    <span className="Icon">
                      <i className="fa fa-server" />
                    </span>
                    <h3>60</h3>
                    <p>Total In - Progress Orders</p>
                  </aside>
                </li>
                <li>
                  <aside>
                    <span className="Icon">
                      <i className="fa fa-server" />
                    </span>
                    <h3>60</h3>
                    <p>Total Delivered Orders</p>
                  </aside>
                </li>
                <li>
                  <aside>
                    <span className="Icon">
                      <i className="fa fa-server" />
                    </span>
                    <h3>60</h3>
                    <p>Total Cancelled Orders</p>
                  </aside>
                </li>
                <li>
                  <aside>
                    <span className="Icon">
                      <i className="fa fa-server" />
                    </span>
                    <h3>60</h3>
                    <p>Shipped Orders</p>
                  </aside>
                </li>
              </ul>
            </div>
            <div className="TitleBox">
              <h4 className="Title">Revenue Statics</h4>
            </div>
            <div className="DashboardBox">
              <ul>
                <li>
                  <aside>
                    <span className="Icon">
                      <i className="fa fa-line-chart" />
                    </span>
                    <h3>60</h3>
                    <p>Total Revenue Generated</p>
                  </aside>
                </li>
                <li>
                  <aside>
                    <span className="Icon">
                      <i className="fa fa-user-circle-o" />
                    </span>
                    <h3>60</h3>
                    <p>Total Payout </p>
                  </aside>
                </li>
                <li>
                  <aside>
                    <span className="Icon">
                      <i className="fa fa-money" />
                    </span>
                    <h3>60</h3>
                    <p>Net Earning</p>
                  </aside>
                </li>
                <li>
                  <aside>
                    <span className="Icon">
                      <i className="fa fa-eur" />
                    </span>
                    <h3>60</h3>
                    <p>Total Rider’s Penalty </p>
                  </aside>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Dashboard;
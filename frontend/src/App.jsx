import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LoginForgot from "./pages/LoginForgot";
import LoginReset from "./pages/LoginReset";
import LoginSuccess from "./pages/LoginSuccess";
import LoginVerification from "./pages/LoginVerification";
import store from "./reduxToolkit/store";
import HeaderSidenav from "./layouts/HeaderSidenav";
import UserCustomer from "./pages/UserCustomer";
import UserRider from "./pages/UserRider";
import BranchManagement from "./pages/BranchManagement";
import BannerManagement from "./pages/BannerManagement";
import CompanyManagement from "./pages/CompanyManagement";
import VehicleManagement from "./pages/VehicleManagement";
import OrderInprogress from "./pages/OrderInprogress";
import OrderDelivered from "./pages/OrderDelivered";
import OrderCancelled from "./pages/OrderCancelled";
import PaymentRevenue from "./pages/PaymentRevenue";
import PaymentWithdrawal from "./pages/PaymentWithdrawal";
import PaymentAmount from "./pages/PaymentAmount";
import Subadmin from "./pages/Subadmin";
import SubadminRoles from "./pages/SubadminRoles";
import Settings from "./pages/Settings";
import PriceManagement from "./pages/PriceManagement";
import UserAuthProtect from "./components/UserAuthProtect";
import CreateUser from "./pages/CreateUser";
import UserCustomerDetails from "./pages/UserCustomerDetails";
import UserRiderAdd from "./pages/userRiderAdd";
import UserRiderDetails from "./pages/UserRiderDetails";
import OrderDetails from "./pages/OrderDetails";
import SyncLogout from "./components/SyncLogout";
import CreateBranch from "./pages/CreateBranch";
import SubadminRolesAdd from "./pages/SubadminRolesAdd";
import SubadminRolesEdit from "./pages/SubadminRolesEdit";
import SubadminDetails from "./pages/SubadminDetails";

function App() {
  return (
    <div>
      <SyncLogout />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginforgot" element={<LoginForgot />} />
        <Route path="/loginverification" element={<LoginVerification />} />
        <Route path="/loginreset" element={<LoginReset />} />
        <Route path="/loginsuccess" element={<LoginSuccess />} />

        <Route element={<UserAuthProtect />}>
          <Route element={<HeaderSidenav />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/usercustomer" element={<UserCustomer />} />
            <Route path="/createuser" element={<CreateUser />} />
            <Route
              path="/usercustomerdetails/:userId"
              element={<UserCustomerDetails />}
            />
            <Route path="/orderdetails/:orderId" element={<OrderDetails />} />
            <Route path="/userrider" element={<UserRider />} />
            <Route path="/userrideradd" element={<UserRiderAdd />} />
            <Route
              path="/userriderdetails/:userId"
              element={<UserRiderDetails />}
            />
            <Route path="/branchmanagement" element={<BranchManagement />} />
            <Route path="/createbranch" element={<CreateBranch />} />
            <Route path="/bannermanagement" element={<BannerManagement />} />
            <Route path="/companymanagement" element={<CompanyManagement />} />
            <Route path="/vehiclemanagement" element={<VehicleManagement />} />
            <Route path="/orderinprogress" element={<OrderInprogress />} />
            <Route path="/orderdelivered" element={<OrderDelivered />} />
            <Route path="/ordercancelled" element={<OrderCancelled />} />

            <Route path="/paymentrevenue" element={<PaymentRevenue />} />
            <Route path="/paymentamount" element={<PaymentAmount />} />
            <Route path="/paymentwithdrawal" element={<PaymentWithdrawal />} />
            <Route path="/subadmin" element={<Subadmin />} />
            <Route path="/subadminroles" element={<SubadminRoles />} />
            <Route path="/subadminrolesadd" element={<SubadminRolesAdd />} />
            <Route
              path="/subadminrolesedit/:roleId"
              element={<SubadminRolesEdit />}
            />
            <Route path="/subadmindetails" element={<SubadminDetails />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/pricemanagement" element={<PriceManagement />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Usersignup from "./User/Usersignup";
import Userlogin from "./User/Userlogin";
import UserRequest from "./User/UserRequest";
import CreditLog from "./User/CreditLog";
import ViewAllLogs from "./User/ViewAllLogs";
import DebitLog from "./User/DebitLog";
import VCategory from "./User/VCategory";
import ViewSpecificLogs from "./User/ViewSpecificLogs";
import Sidebar from "./User/Sidebar";
import CreateBus from "./User/CreateBus";
import CreateAgent from "./User/CreateAgent";
import CreateOperator from "./User/CreateOperator";
import Credit from "./User/Credit";
import Paylater from "./User/Paylater";
import Transactions from "./User/Transactions";
import Reports from "./User/Reports";
import Admin from "./Admin/Admin";
import Adminsidebar from "./Admin/Adminsidebar";
import Adminlogin from "./Admin/Adminlogin";
import Allusers from "./Admin/Allusers";
import Pending from "./Admin/Pending";
import { AuthProvider } from "./Admin/AuthContext";
import ControlPanel from "./Admin/ControlPanel";
import Custom from "./User/Custom";
import OwnerPassword from "./Owner/OwnerPassword";
import OwnerDashboard from "./Owner/OwnerDashboard";
import ViewCandDLog from "./User/ViewCandDLog";
import TodayCandDLog from "./Header/TodayCandDLog";
import MonthCandDLog from "./Header/MonthCandDLog";
import CustomCandDLog from "./Header/CustomCandDLog";
import UserBalance from "./Header/UserBalance";
import Header from "./Header/Header";
import Welcome from "./Owner/Welcome";
import StartingAccount from "./Owner/StartingAccount";
import SecretPassword from "./Owner/SecretPassword";
import BackToHome from "./PayLater/BackToHome";
import ViewShare from "./Owner/ViewShare";
import SendResetLink from "./ForgotPassword/SendResetLink";
import RestPassword from "./ForgotPassword/RestPassword";
import OwnerResetLink from "./Owner/OwnerResetLink";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="h-screen flex flex-col items-center justify-center text-8xl font-bold bg-blue-500 text-white">
                Fintrack
                <br />
                <a
                  className="text-xl bg-blue-900 p-3 rounded-xl mt-5 px-4"
                  href="/signup"
                >
                  Request our Product
                </a>
              </div>
            </>
          }
        />
        {/* Routes without Sidebar */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/startingaccount" element={<StartingAccount />} />
        <Route path="/secret" element={<SecretPassword />} />
        <Route path="/share" element={<ViewShare />} />
        <Route path="/signup" element={<Usersignup />} />
        <Route path="/login" element={<Userlogin />} />
        <Route path="/userrequest" element={<UserRequest />} />
        <Route path="/viewcategory" element={<VCategory />} />
        <Route path="/bus" element={<CreateBus />} />
        <Route path="/agent" element={<CreateAgent />} />
        <Route path="/operator" element={<CreateOperator />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/header" element={<Header />} />
        <Route path="/total-credit-debit" element={<ViewCandDLog />} />
        <Route path="/today-credit-debit" element={<TodayCandDLog />} />
        <Route path="/monthly-credit-debit" element={<MonthCandDLog />} />
        <Route path="/custom-credit-debit" element={<CustomCandDLog />} />
        <Route path="/userbalance" element={<UserBalance />} />
        <Route path="/ownerpassword" element={<OwnerPassword />} />
        <Route path="/adminlogin" element={<Adminlogin />} />
        
        <Route path="/admin" element={<Admin />} />
        
        {/* <Route path="/admin-sidebar" element={<Adminsidebar />} /> */}
        {/* <Route path="/controlpannel" element={<OwnerDashboard />} /> */}
        <Route path="/sendlink" element={<SendResetLink />} />
        <Route path="/resetpassword" element={<RestPassword />} />
        <Route path="/ownersendlink" element={<OwnerResetLink />} />
        <Route path="/ownerresetpassword" element={<OwnerPassword />} />


        <Route
          path="/all-users"
          element={
            <Adminsidebar>
              <Allusers />
            </Adminsidebar>
          }
        />
        <Route
          path="/pending"
          element={
            <Adminsidebar>
              <Pending />
            </Adminsidebar>
          }
        />
        {/* Routes with Sidebar */}
        <Route
          path="/transactions"
          element={
            <Sidebar>
              <Transactions />
            </Sidebar>
          }
        />
        <Route
          path="/paylater"
          element={
            <Sidebar>
              <Paylater />
            </Sidebar>
          }
        />
        <Route
          path="/reports"
          element={
            <Sidebar>
              <Custom />
            </Sidebar>
          }
        />
        <Route
          path="/controlpannel"
          element={
            <Sidebar>
              <OwnerDashboard />
            </Sidebar>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

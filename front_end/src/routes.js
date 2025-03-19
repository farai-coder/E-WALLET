
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import { AnalyticsSharp } from "@mui/icons-material";
import Staff from "layouts/staff/components/Staff";
import Settings from "layouts/settings/components/Settings";
import Reports from "layouts/reports/components/Reports";
import Visitors from "layouts/visitors/components/Visitors";
import Analytics from "layouts/analytics/components/Analytics";
import DatePicker from "layouts/Demo";
import Admin from "layouts/admin/components/Admin";
import Logs from "layouts/logs/components/Logs";
import AddStaff from "layouts/staff/components/AddStaff";
import Header from "layouts/Demo";
import Sets from "layouts/settings/components/Sets";
import StorageManagement from "layouts/settings/components/StorageManagement";
import BasicTimePicker from "layouts/logs/components/BasicTimerPicker";
import LiveView from "layouts/LiveView";
import LogoutForm from "layouts/Logout";
import VisitorMain from "layouts/visitors/components/VisitorMain";
import ReportMain from "layouts/reports/components/ReportsMain";
import StaffMain from "layouts/staff/components/StaffMain";
import MqttPublisher from "mqtt/publisher";
// @mui icons
import Icon from "@mui/material/Icon";
import Wallet from "layouts/wallet/Wallet";
import Transaction from "layouts/transaction/Transaction";
import Services from "layouts/service/Services";
import Students from "layouts/students/Students";
import Cover from "layouts/authentication/sign-up";


const routes = [
  // {
  //   type: "collapse",
  //   name: "Dashboard",
  //   key: "dashboard",
  //   icon: <Icon fontSize="small">dashboard</Icon>,
  //   route: "/dashboard",
  //   component: <Dashboard />,
  // },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
 
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },

  {
    type: "collapse",
    name: "Wallet",
    key: "wallet",
    icon: <Icon fontSize="large">wallet</Icon>,
    route: "/wallet",
    component: <Wallet/>,
  },

  {
    type: "collapse",
    name: "Students",
    key: "students",
    icon: <Icon fontSize="large">people</Icon>,
    route: "/students",
    component: <Students/>,
  },

  {
    type: "collapse",
    name: "Transactions",
    key: "transactions",
    icon: <Icon fontSize="large">contactless</Icon>,
    route: "/transactions",
    component: <Transaction />,
  },
  {
    type: "collapse",
    name: "Services",
    key: "services",
    icon: <Icon fontSize="large">miscellaneous_services</Icon>,
    route: "/services",
    component: <Services />,
  },

  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },

  {
    type: "collapse",
    name: "Admin",
    key: "admin",
    icon: <Icon fontSize="large">manage_accounts</Icon>,
    route: "/admin",
    component: <Admin/>,
  },
  

];

export default routes;
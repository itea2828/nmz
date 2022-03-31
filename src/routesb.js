import Icon from "@mui/material/Icon";
import PaymentFail from "pages/PaymentFail";
import PaymentSuccess from "pages/PaymentSuccess";
import Pay from "./pages/pay";

const routesb = [
  { 
    type: "collapse",
    name: "pay",
    key: "pay",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/pay",
    component: <Pay />,
  },
  { 
    type: "collapse",
    name: "payment-success",
    key: "payment-success",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/payment-success",
    component: <PaymentSuccess />,
  },
  { 
    type: "collapse",
    name: "payment-dail",
    key: "payment-fail",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/payment-fail",
    component: <PaymentFail />,
  },
];

export default routesb;

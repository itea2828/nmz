
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import ProductDetail from "pages/productDetail";
import Categories from "pages/categories";
import Products from "pages/products";
import SubCategories from "pages/subcategories";
import Orders from "pages/orders";

const routes = [
  {
    type: "collapse",
    name: "Панель управления",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Товары",
    key: "products",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/products",
    component: <Products />,
  },
  {
    type: "collapse",
    name: "Заказы",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Orders />,
  },
  {
    type: "collapse",
    name: "Категории",
    key: "categories",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/categories",
    component: <Categories />,
  },
  {
    type: "collapse",
    name: "Суб категории",
    key: "subcategories",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/subcategories",
    component: <SubCategories />,
  },
  {
    type: "collapse",
    name: "Профиль",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Войти",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;

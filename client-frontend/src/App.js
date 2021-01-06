import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import { useDispatch } from "react-redux";
import "react-notifications/lib/notifications.css";

import Header from "./components/nav/Header.js";
import Login from "./pages/auth/Login.js";
import Register from "./pages/auth/Register.js";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Home from "./pages/Home";
import AdminDashbord from "./pages/admin/AdminDashbord.js";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate.js";
import CategoryCreate from "./pages/admin/category/CategoryCreate.js";

import { History } from "./pages/user/History.js";
import { authentication } from "./Firebase";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { currentUser } from "./functions/auth";
import { UserRoute } from "./components/routes/UserRoute";
import { Password } from "./pages/user/Password.js";
import { WishList } from "./pages/user/Wishlist.js";
import { AdminRoute } from "./components/routes/AdminRoute.js";
import { DBStatus } from "./functions/DBConn.js";
import SubUpdate from "./pages/admin/category/sub/subUpdate.js";
import ProductCreate from "./pages/admin/product/ProductCreate.js";
import SubCreate from "./pages/admin/category/sub/subCreate.js";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });

    // perform unsubscription clean-up
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div onLoad={DBStatus}>
      <Header />
      <NotificationContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={WishList} />
        {/* conditioned private route */}
        <AdminRoute exact path="/admin/dashboard" component={AdminDashbord} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
      </Switch>
    </div>
  );
};

export default App;

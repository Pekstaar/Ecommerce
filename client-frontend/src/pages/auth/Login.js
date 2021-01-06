import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { authentication, googleAuthProvider } from "../../Firebase";
import { GooglePlusOutlined, SendOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

// const { Password } = Input;

const Login = ({ history }) => {
  const [email, setEmail] = useState("pekstaar@gmail.com");
  const [password, setPassword] = useState("passwad");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  };

  // check if the user is logged in and send to homepage if true
  useEffect(() => {
    if (user && user.token) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await authentication.signInWithEmailAndPassword(
        email,
        password
      );
      const { user } = result;
      // console.log(result);
      // react dispense
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
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

          roleBasedRedirect(res);
        })
        .catch((err) => {
          console.log(err);
        });

      // history.push("/");
    } catch (error) {
      // console.log(error);
      NotificationManager.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async (e) => {
    authentication
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        //set reducer to email and login token(keeps one logged in )
        createOrUpdateUser(idTokenResult.token)
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
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));

        // redirect to dashboard(signed in)
        // history.push("/");
      })
      .catch((error) => NotificationManager.error);
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <Input
        style={{ height: "3.5em" }}
        type="email"
        placeholder="Enter your email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <Input.Password
        style={{ height: "3.5em" }}
        placeholder="Input your Password"
        className="form-control my-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* <button type="submit" className="btn btn-raised btn-secondary m-2">
        Login
      </button> */}
      <Button
        type="primary submit"
        size="large"
        onClick={handleSubmit}
        block
        shape="round"
        icon={<SendOutlined />}
        disabled={!email || password.length < 6}
      >
        Login
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h5 className="float-center mx-3 text-warning ">Loading...</h5>
          ) : (
            <h5 className="float-center mx-3">SIGN-IN</h5>
          )}

          {loginForm()}

          <Button
            type="danger"
            size="large"
            onClick={googleLogin}
            className="my-2"
            block
            shape="round"
            icon={<GooglePlusOutlined />}
          >
            Sign in with Google
          </Button>

          <Link
            to="/forgot/password"
            className="float-right text-danger font-weight-bold"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

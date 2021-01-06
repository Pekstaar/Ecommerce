import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { authentication } from "../../Firebase";
import { NotificationManager } from "react-notifications";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");

  const dispatch = useDispatch();

  // const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setEmail(window.localStorage.getItem("registrationEmail"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (confirmPassword !== password) {
      NotificationManager.error("Passwords do not Match!");
      return;
    }

    if (!email || !password) {
      NotificationManager.error("Email and password required");
      return;
    }

    if (password.length < 6) {
      NotificationManager.error("Password must be atleast 6 characters Long");
      return;
    }

    try {
      const result = await authentication.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        //   remove userEmail form localStorage

        window.localStorage.removeItem("registrationEmail");

        // get User id

        let user = authentication.currentUser;

        await user.updatePassword(password);

        const idTokenResult = await user.getIdTokenResult();

        //redux Storage

        console.log("User", user, "idToken", idTokenResult);

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
          })
          .catch((err) => console.log(err));
        // redirect
        history.push("/");
      }
    } catch (error) {
      NotificationManager.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <Input
        style={{ height: "3.5em" }}
        // type="email"
        className="form-control"
        value={email}
        disabled
      />

      <Input.Password
        style={{ height: "3.5em" }}
        type="password"
        placeholder="Input Password"
        className="form-control my-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />

      <Input.Password
        style={{ height: "3.5em" }}
        placeholder="confirm Password"
        className="form-control mt-1 mb-3"
        value={confirmPassword}
        onChange={(e) => setConfirm(e.target.value)}
      />
      <button type="submit" className="btn btn-raised btn-secondary m-2">
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h5>Complete Signup </h5>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;

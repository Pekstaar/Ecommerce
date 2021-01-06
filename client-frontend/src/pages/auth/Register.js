import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { authentication } from "../../Firebase";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";

const Register = ({ history }) => {
  const [email, setEmail] = useState("pekstaar@gmail.com");

  const { user } = useSelector((state) => ({ ...state }));

  // check if the user is logged in and send to homepage if true
  useEffect(() => {
    if (user && user.token) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      // url declared in the environment(.env file)
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      // url: "http://localhost:3000/register/complete",
      handleCodeInApp: true,
    };

    console.log(config.url);

    await authentication.sendSignInLinkToEmail(email, config);

    NotificationManager.success(
      `Email sent to ${email}. Click link to complete registration`
    );

    // store email on local storage

    window.localStorage.setItem("registrationEmail", email);

    //clear state
    setEmail("");
  };

  const registerForm = () => (
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

      <button type="submit" className="btn btn-raised btn-secondary m-2">
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h5>SIGN-UP</h5>

          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;

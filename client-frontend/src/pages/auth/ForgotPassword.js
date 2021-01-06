import { authentication } from "../../Firebase";
import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useSelector } from "react-redux";
import NotificationManager from "react-notifications/lib/NotificationManager";

export const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // destructure state and grab user reducer as state
  const { user } = useSelector((state) => ({ ...state }));

  // check if the user is logged in and send to homepage if true
  useEffect(() => {
    if (user && user.token) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // send email to user
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await authentication
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        NotificationManager.success("Check email for the password reset link");
      })
      .catch((error) => {
        setLoading(false);
        NotificationManager.error(error.message);
      });
    // get promise
    await authentication.sendPasswordResetEmail();
  };

  return (
    <div className="container col-md-6 offset-md-3 p-4">
      {loading ? (
        <h4 className="text-warning font-italic mb-2">Loading</h4>
      ) : (
        <h4 className=" font-italic mb-2">Recover password</h4>
      )}

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
        <button className="btn btn-secondary border my-3" disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import NotificationManager from "react-notifications/lib/NotificationManager";
import UserNav from "../../components/nav/UserNav";
import { authentication } from "../../Firebase";

export const Password = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    NotificationManager.warning(
      "Please ensure password exeeds 6 characters",
      "Warning",
      4000
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmPassword === "") {
      NotificationManager.error("Error: Please confirm password");
      return;
    }
    if (confirmPassword !== password) {
      NotificationManager.error("Error: Password do not match");
      return;
    }

    setLoading(true);

    await authentication.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        NotificationManager.success(
          "user password updated!!",
          "Success!",
          4000
        );

        setPassword("");
        setConfirm("");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        NotificationManager.error(err.message);
      });
  };

  const passwordUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <Input.Password
          style={{ height: "3.5em" }}
          placeholder="Input new Password (must be atleast 6 characters"
          className="form-contro my-2 "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          autoFocus
        />
        <Input.Password
          style={{ height: "3.5em" }}
          placeholder="confirm Password"
          className="form-contro my-3 "
          value={confirmPassword}
          onChange={(e) => setConfirm(e.target.value)}
          disabled={loading}
        />
        <Button
          type="primary"
          size="large"
          onClick={handleSubmit}
          block
          shape="round"
          icon={<CloudUploadOutlined />}
          className="col-md-5 float-right"
          style={{ margin: "3px auto" }}
          disabled={!password || password.length < 6 || loading}
        >
          Update
        </Button>
      </form>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2  ">
          <UserNav prop="password" />
        </div>
        <div className="col-md-4 p-4 text-left" style={{ margin: "0 auto" }}>
          {loading ? (
            <strong className="text-danger">Loading...</strong>
          ) : (
            <h5>
              <strong>Password Update</strong>
            </h5>
          )}

          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

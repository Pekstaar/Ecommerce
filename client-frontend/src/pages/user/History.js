import React from "react";
import UserNav from "../../components/nav/UserNav";

export const History = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2  ">
          <UserNav prop="history" />
        </div>
        <div className="col">User History page</div>
      </div>
    </div>
  );
};

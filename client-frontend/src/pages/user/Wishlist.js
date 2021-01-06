import React from "react";
import UserNav from "../../components/nav/UserNav";

export const WishList = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2  ">
          <UserNav prop="wishlist" />
        </div>
        <div className="col">User Wishlist page</div>
      </div>
    </div>
  );
};

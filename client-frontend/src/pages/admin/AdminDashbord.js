import React from "react";
import AdminNav from "../../components/nav/AdminNav";
import Navigation from "../../components/nav/TitleNavigation";

const AdminDashbord = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav prop="dashboard" />
        </div>

        <div className="col-md-9 mt-4 " style={{ margin: "0 auto" }}>
          <Navigation heading="ADMIN DASH-BOARD :" loading={false} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashbord;

import React from "react";
import AdminNav from "../../components/nav/AdminNav";

const AdminDashbord = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav prop="dashboard" />
        </div>
        <div className="col mt-4">Admininstrator Dashboard page</div>
      </div>
    </div>
  );
};

export default AdminDashbord;

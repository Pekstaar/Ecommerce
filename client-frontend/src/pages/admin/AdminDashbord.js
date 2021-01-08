import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import AdminProductCard from "../../components/cards/AdminProductCard";
import Navigation from "../../components/nav/TitleNavigation";
import { getProductsByCount } from "../../functions/product";

const AdminDashbord = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    loadProducts(10);
  }, []);

  const loadProducts = (len) => {
    setLoading(true);
    getProductsByCount(len)
      .then((r) => {
        setProducts(r.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("GET PRODUCTS ERROR!", err);
        setLoading(false);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav prop="dashboard" />
        </div>

        <div className="col-md-9 mt-4 " style={{ margin: "0 auto" }}>
          <Navigation heading="PRODUCT LIST:" loading={loading} />

          {/* {JSON.stringify(products)} */}

          <div className="col  bg-light mt-2 ">
            {products &&
              products.map((p) => (
                <div className="col-md-3">
                  <AdminProductCard product={p} key={p._id} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashbord;

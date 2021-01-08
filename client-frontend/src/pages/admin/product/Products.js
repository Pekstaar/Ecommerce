import { Button } from "antd";
import React, { useEffect, useState } from "react";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import AdminNav from "../../../components/nav/AdminNav";
import Navigation from "../../../components/nav/TitleNavigation";
import { getProductsByCount } from "../../../functions/product";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { getProductsByCount } from "../../functions/product";

const Products = () => {
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
          <AdminNav prop="prods" />
        </div>

        <div className="col-md-9 mt-4 " style={{ margin: "0 auto" }}>
          <Navigation heading="PRODUCTS LIST:" loading={loading} />

          {/* {JSON.stringify(products)} */}

          <div className="col bg-light mt-2 ">
            <div className="row">
              {products &&
                products.map((p) => (
                  <div key={p._id} className="col-md-3 ">
                    <AdminProductCard product={p} />

                    {/* buttons row */}
                    <div
                      className="row"
                      style={{
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "1fr 1px 1fr",
                      }}
                    >
                      {/* Edit product button */}
                      <Button
                        type="primary"
                        className="btn"
                        style={{ borderRadius: "0", border: "none" }}
                      >
                        EDIT &nbsp; <EditOutlined />
                      </Button>

                      {/* spacer */}
                      <div style={{ backgroundColor: "white" }}> </div>

                      {/* Delete product button */}
                      <Button
                        type="primary  "
                        // className="btn btn-danger btn-raised"
                        style={{
                          borderRadius: "0",
                          border: "none",
                        }}
                        danger
                      >
                        DELETE &nbsp; <DeleteOutlined />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

import React, { useEffect, useState } from "react";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import AdminNav from "../../../components/nav/AdminNav";
import Navigation from "../../../components/nav/TitleNavigation";

import { getProductsByCount, remove } from "../../../functions/product";
import { Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);

  // redux user access
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadProducts(10);
  }, []);

  // const { slug } = products;

  // functions

  // load products from backend function
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

  // delete product function
  const handleRemove = (slug) => {
    // setLoading true
    setLoading(true);

    if (window.confirm("Delete Product?")) {
      // console.log("Delete Requested!", slug);
      remove(slug, user.token)
        .then((res) => {
          loadProducts();
          NotificationManager.warning(
            `${res.data.title} deleted!`,
            "Product Delete"
          );
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          if (err.status === 400)
            NotificationManager.error(err.response.data, "Error");
        });
    }
  };

  // body
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
                        onClick={() => handleRemove(p.slug)}
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

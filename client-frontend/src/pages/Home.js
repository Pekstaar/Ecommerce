import React, { useEffect, useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import BestSellers from "../components/home/BestSellers";
import NewArrivals from "../components/home/NewArrivals";
import { getProducts } from "../functions/product";
// import { RightOutlined } from "@ant-design/icons";

const Home = () => {
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    // setLoading(true);
    //fetch by sort, order, limit
    getProducts("createdAt", "asc", 4).then((r) => {
      // setLoading(false);
      setProducts(r.data);
    });
  };

  return (
    <>
      <div className="jumbotron text-align-center text-danger h1 font-weight-bold ">
        <div
          className="col-md-6 py-1"
          style={{ margin: " 0 auto", textAlign: "center" }}
        >
          <Jumbotron
            text={[
              "New Arrivals",
              "Latest Products!",
              "Quality Products!",
              "Best Sellers :)",
            ]}
          />
        </div>
      </div>

      <NewArrivals />
      <br />
      <br />
      <BestSellers />
    </>
  );
};

export default Home;

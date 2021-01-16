import React, { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Jumbotron from "../components/cards/Jumbotron";
import LoadingCard from "../components/cards/LoadingCard";
import ProdcuctCard from "../components/cards/ProdcuctCard";
import { getProductsByCount } from "../functions/product";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    getProductsByCount(4).then((r) => {
      setLoading(false);
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

      <div className="container">
        {loading ? (
          <LoadingCard count={8} />
        ) : (
          <div className="row">
            {products.map((p) => (
              <div key={p._id} className="col-md-3">
                <ProdcuctCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Jumbotron from "../components/cards/Jumbotron";
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
      <div className="jumbotron  text-danger h1 font-weight-bold ">
        <Header loading={loading} />
      </div>

      <div className="container-fluid">
        <div className="row">
          {products.map((p) => (
            <div key={p._id} className="col-md-3">
              <ProdcuctCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

export const Header = ({ loading }) => (
  <div
    className="col-md-6 py-1"
    style={{ margin: " 0 auto", textAlign: "center" }}
  >
    {loading ? (
      <>
        <h4>
          LOADING &nbsp;
          <PulseLoader
            color={"#CD7F32"}
            loading={loading}
            size={12}
            margin={4}
          />
        </h4>
      </>
    ) : (
      <Jumbotron
        text={[
          "New Arrivals",
          "Latest Products!",
          "Quality Products!",
          "Best Sellers :)",
        ]}
      />
    )}
  </div>
);

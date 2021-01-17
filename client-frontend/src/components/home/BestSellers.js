import React, { useEffect, useState } from "react";
import { getProducts } from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import ProdcuctCard from "../cards/ProdcuctCard";
import TabNav from "../nav/TabNav";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    //fetch by sort, order, limit
    getProducts("sold", "asc", 4).then((r) => {
      setLoading(false);
      setProducts(r.data);
    });
  };

  return (
    <div className="container">
      <TabNav
        className="float-right"
        title={"Best-Sellers"}
        bgColor="#28a745"
      />
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
  );
};

export default BestSellers;

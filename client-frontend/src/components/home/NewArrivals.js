import React, { useEffect, useState } from "react";
import { getProducts } from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import ProdcuctCard from "../cards/ProdcuctCard";
import TabNav from "../nav/TabNav";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [styling] = useState({  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    //fetch by sort, order, limit
    getProducts("createdAt", "asc", 4).then((r) => {
      setLoading(false);
      setProducts(r.data);
    });

    // setStyling({ ...styling, bgColor: "" });
  };

  return (
    <div className="container">
      <TabNav title={"New-Arrivals"} bgColor="#FF8C00" />
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

export default NewArrivals;

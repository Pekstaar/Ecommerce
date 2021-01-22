import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import ProdcuctCard from "../cards/ProdcuctCard";
import TabNav from "../nav/TabNav";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);
  //   const [styling] = useState({  });

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadProducts = () => {
    setLoading(true);
    //fetch by sort, order, limit
    getProducts("createdAt", "desc", page).then((r) => {
      setLoading(false);
      setProducts(r.data);
    });

    // setStyling({ ...styling, bgColor: "" });
  };

  return (
    <div className="container">
      {/* {productsCount} */}
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

      <Pagination
        className="float-right"
        total={(productsCount / 4) * 10}
        current={page}
        onChange={(value) => setPage(value)}
      />
    </div>
  );
};

export default NewArrivals;

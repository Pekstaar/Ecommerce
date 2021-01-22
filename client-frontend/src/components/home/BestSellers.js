import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import ProdcuctCard from "../cards/ProdcuctCard";
import TabNav from "../nav/TabNav";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

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
    getProducts("sold", "asc", page).then((r) => {
      setLoading(false);
      setProducts(r.data);
    });
  };

  return (
    <div className="container ">
      <TabNav
        className="float-right"
        title={"Best-Sellers"}
        bgColor="#28a745"
      />
      {loading ? (
        <LoadingCard count={8} />
      ) : (
        <div className="row ">
          {products.map((p) => (
            <div key={p._id} className="col-md-3">
              <ProdcuctCard product={p} />
            </div>
          ))}
        </div>
      )}

      {/* Best Sellers pagination */}
      <Pagination
        className="float-right "
        total={(productsCount / 4) * 10}
        current={page}
        onChange={(value) => setPage(value)}
      />
      <br />
      <br />
      <br />
    </div>
  );
};

export default BestSellers;

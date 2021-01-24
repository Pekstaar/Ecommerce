import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { SingleProduct } from "../../components/cards/SingleProduct";
import { getProduct } from "../../functions/product";

const useStyles = createUseStyles({
  varela: {
    fontFamily: "Varela Round",
    fontSize: "16px",
  },
});

const Product = ({ match }) => {
  const [product, setProduct] = useState({});

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const loadSingleProduct = () =>
    getProduct(slug).then((res) => setProduct(res.data));

  const classes = useStyles();

  return (
    <>
      <div className={`container-fluid ${classes.varela}`}>
        <div className="row pt-4">
          <SingleProduct product={product} />
        </div>

        <div className="row  px-3 py-5 ">
          <div className="col text-center">
            <hr />
            <h4>Related Products</h4>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;

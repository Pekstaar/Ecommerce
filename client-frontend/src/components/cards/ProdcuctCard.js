import { Button, Card } from "antd";
import React from "react";
import blank from "../images/blank-laptop.png";
import { Link } from "react-router-dom";
import { ShoppingFilled, EyeFilled } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { createUseStyles } from "react-jss";
// return <div className="text-center">{product.title}</div>

// JSS styling
const useStyles = createUseStyles({
  card: {
    border: "1px solid rgb(222, 226, 230) ",
    padding: "1px 1px",
    marginBottom: "1em",

    "& .ant-card-meta-description": {
      height: "44px",
      // overflow: "hidden",
    },
    "& .ant-card-body": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  label: {
    fontSize: "11px",
    verticalAlign: "top",
  },

  price: {
    fontFamily: "Varela Round",
    fontSize: "19px",
    padding: "0",
    color: "#013220",
    // margin: "0 auto",
    marginTop: "-1em",
    marginBottom: ".4em",
    // justifySelf: "center",
    // float: "right",
  },
});

const ProdcuctCard = ({ product }) => {
  const classes = useStyles();

  const { images, description, title, slug, price } = product;

  const actions = (
    <div
      className="row"
      style={{
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1px 1fr",
      }}
    >
      {/* Edit product button */}
      <Link to={`/product/${slug}`}>
        <Button
          type="primary"
          className="btn"
          style={{
            borderRadius: "7px 0 0 0",
            border: "none",
            width: "100%",
            background: "#228B22",
            color: "white",
          }}
        >
          <strong>VIEW</strong> &nbsp;
          <EyeFilled />
        </Button>
      </Link>

      {/* spacer */}
      <div style={{ backgroundColor: "white" }}> </div>

      {/* Delete product button */}
      <Button
        // type="primary  "
        // className="btn btn-danger btn-raised"
        style={{
          borderRadius: " 0 0 7px 0",
          border: "none",
          background: "#f68b1e",
          color: "white",
        }}
        danger
        // onClick={() => handleRemove(p.slug)}
      >
        <strong>SHOP</strong> &nbsp;
        <ShoppingFilled />
      </Button>
    </div>
  );

  // Price label
  const cost = (
    <span className={classes.price}>
      {price}
      <label className={classes.label}>kshs</label>
    </span>
  );

  return (
    <span>
      <Card
        className={classes.card}
        // className="border mb-3"
        // style={{ maxHeight: "423px", overflow: "hidden" }}
        // style={{ height: "480px" }}
        cover={
          <img
            src={images && images.length ? images[0].url : blank}
            alt=""
            style={{ height: 240, objectFit: "cover" }}
          />
        }
      >
        <Meta
          title={title}
          className="mb-4 "
          description={
            description.length >= 53
              ? `${description && description.substring(0, 53)} . . .`
              : description.length < 50 && `${description}...\n`
          }
        />
        {cost}
        {actions}
      </Card>

      <Card
        className={classes.card}
        // className="border mb-3"
        // style={{ maxHeight: "423px", overflow: "hidden" }}
        cover={
          <img
            src={images && images.length ? images[1].url : blank}
            alt=""
            style={{ height: 240, objectFit: "cover" }}
          />
        }
      >
        <Meta
          title={title}
          className="mb-4 "
          description={
            description.length >= 53
              ? `${description && description.substring(0, 53)} \n`
              : description.length < 50 && `${description}...\n`
          }
        />
        {cost}
        {actions}
      </Card>
    </span>
  );
};

export default ProdcuctCard;

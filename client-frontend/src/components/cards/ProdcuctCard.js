import { Button, Card } from "antd";
import React from "react";
import blank from "../images/blank-laptop.png";
import { Link } from "react-router-dom";
import { ShoppingFilled, EyeFilled } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
// return <div className="text-center">{product.title}</div>

const ProdcuctCard = ({ product }) => {
  const { images, description, title, slug } = product;

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
      <Link to={`/admin/product/${slug}`}>
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

  return (
    <>
      <Card
        className="border mb-3"
        style={{ height: "480px" }}
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
        {actions}
      </Card>

      <Card
        className="border mb-3"
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
        {actions}
      </Card>

      <Card
        className="border mb-3"
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
        {actions}
      </Card>
    </>
  );
};

export default ProdcuctCard;
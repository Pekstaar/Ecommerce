import { Card, Tabs } from "antd";
import React from "react";
import { ShoppingFilled, HeartFilled, StarFilled } from "@ant-design/icons";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import Laptop from "../images/blank-laptop.png";

// carousel import
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ProductListItems } from "./ProductListItems";

// Styling
const useStyles = createUseStyles({
  title: {
    // alignItems: "center",
    margin: "auto",
    color: "#fff",
  },
  card: {
    "& .font-20": {
      fontSize: "20px",
      fontWeight: "normal",
    },

    "& .font-bold": {
      fontWeight: "bold",
      borderRadius: "4em",
    },

    "& .font-17": {
      //   color: "blue",
      fontSize: "17px",
    },

    "& .ant-card-meta-description": {
      //   color: "#363636",
    },
    "& img": {
      objectFit: "cover",
      height: "450px",
    },
    "& .orange": {
      backgroundColor: "#fe8033",
      color: "#fff",
    },

    "& .ant-card-actions": {
      border: "none",
      width: "90%",
      margin: ".5em auto",
      "& li": {
        margin: "0",
        border: "none",
        // width: "unset",
      },
    },
  },

  slider: {
    "& .slider img": {
      objectFit: "cover",
      height: "450px",
    },
  },
});

export const SingleProduct = ({ product }) => {
  const { images, title, description } = product;

  const classes = useStyles();

  const { TabPane } = Tabs;

  return (
    <>
      <div className="col-md-7">
        {/* images Carousel */}
        {images && images.length ? (
          <Carousel
            className={classes.slider}
            showArrows={true}
            autoPlay
            infiniteLoop
          >
            {images &&
              // eslint-disable-next-line jsx-a11y/alt-text
              images.map((img) => <img src={img.url} key={img.public_id} />)}
          </Carousel>
        ) : (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Card
            className={classes.card}
            cover={<img src={Laptop} alt={"null img"} />}
          ></Card>
        )}

        <Tabs type="card">
          {/* Description */}
          <TabPane tab="Descripton" key="1">
            {description && description}
          </TabPane>

          {/* contact */}
          <TabPane tab="Reach us" key="2">
            Can reach us on **** *** *** And learn more about the product
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <div className={` bg-info d-flex justify-content-center p-2 px-2`}>
          <h2 className={classes.title}>{title}</h2>
        </div>
        <Card
          className={classes.card}
          actions={[
            <Link to="/">
              <div className="btn btn-info btn-raised font-bold py-2 px-3 mr-2 d-flex align-items-center">
                <HeartFilled className="font-20" /> &nbsp; Add to WishList
              </div>
            </Link>,

            <div className="btn orange font-bold py-2 px-3 d-flex align-items-center mr-2">
              <ShoppingFilled className="font-20" /> &nbsp; Add To Cart
            </div>,

            <div className="btn btn-primary btn-raised font-bold  py-2 px-3 d-flex align-items-center">
              <StarFilled className="font-20" /> &nbsp; Add To Cart
            </div>,
          ]}
        >
          {/* <Meta className="font-17 " title={title} description={description} /> */}
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

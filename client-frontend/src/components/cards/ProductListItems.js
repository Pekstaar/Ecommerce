import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
  font: {
    fontSize: "17px",
  },
  price: {
    verticalAlign: "top",
    fontSize: "12px",
  },
});

export const ProductListItems = ({ product }) => {
  const classes = useStyles();

  // destructure props
  const {
    price,
    color,
    sold,
    subs,
    category,
    shipping,
    brand,
    description,
  } = product;

  return (
    <ul className={`list-group ${classes.font}`}>
      {/* <p className="text-center">{description}</p> */}
      <li className="list-group-item">
        {/* Price item */}
        Price
        <span className="label label-default label-pill pull-xs-right">
          {price}
          <span className={classes.price}> kshs</span>
        </span>
      </li>

      {/* category */}
      {category && (
        <li className="list-group-item">
          Category
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}

      {/* subs */}
      {subs && (
        <li className="list-group-item">
          Sub-Categories
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      {/* Shipping */}
      <li className="list-group-item">
        Shipping?
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>

      {/* Color */}
      <li className="list-group-item">
        Color
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li>

      {/* Brand */}
      <li className="list-group-item">
        Brand
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>
      <li className="list-group-item">
        {/* Price item */}
        Sold
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

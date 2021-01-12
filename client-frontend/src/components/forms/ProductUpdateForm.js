import { SendOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
// import { Option } from "antd/lib/mentions";

const { Option } = Select;

export const ProductUpdateForm = ({
  handleSubmit,
  values,
  handleChange,
  // setValues,
  handleCategoryChange,
  categories,
  subOptions,
  subsArray,
  setSubsArray,
  selectedCategory,
}) => {
  //   values destructuring
  const {
    title,
    description,
    price,
    // categories,
    category,
    // subs,
    shipping,
    quantity,
    brands,
    brand,
    // images,
    colors,
    color,
  } = values;

  // console.log("Current product category:", category.name);
  // console.log("Selected category: -should be null-", selectedCategory);

  // if (!selectedCategory) {
  //   categoryValue = category && category;
  //   console.log(categoryValue);
  // } else {
  //   categoryValue = selectedCategory;
  // }

  return (
    <form
      className="product_create__form"
      style={{ padding: "1em .5em" }}
      onSubmit={handleSubmit}
    >
      {/* Title */}
      <div className="product_create__form_div">
        <span
          style={{ fontSize: "16px", fontStyle: "italic", fontWeight: "500" }}
        >
          NAME:
        </span>

        <Input
          style={{
            background: "#fff",
          }}
          type="text"
          placeholder="Input Product title"
          className="h3"
          name="title"
          value={title}
          onChange={handleChange}
          autoFocus
          required
        />
      </div>

      {/* Description */}
      <div className="product_create__form_div">
        <span
          style={{ fontSize: "16px", fontStyle: "italic", fontWeight: "500" }}
        >
          DESCRIPTION:
        </span>

        <Input
          style={{
            background: "#fff",
          }}
          type="text"
          className="h3"
          placeholder="Product Description"
          name="description"
          value={description}
          onChange={handleChange}
          required
        />
      </div>

      {/* Price */}
      <div className="product_create__form_div">
        <span
          style={{ fontSize: "16px", fontStyle: "italic", fontWeight: "500" }}
        >
          PRICE:
        </span>

        <Input
          style={{
            background: "#fff",
          }}
          type="number"
          className="h3"
          placeholder="$$ - - Product Price"
          name="price"
          value={price}
          onChange={handleChange}
          required
        />
      </div>

      {/* Shipping */}
      <div className="product_create__form_div">
        <span
          style={{ fontSize: "16px", fontStyle: "italic", fontWeight: "500" }}
        >
          SHIPPING:
        </span>

        <select
          className=" col-md-12 h3 btn border product_create__form_select text-dark"
          style={{
            background: "#fff",
            borderRadius: "0 12px 0 12px",
            margin: "10px 0",
          }}
          name="shipping"
          required
          value={shipping === "yes" ? "yes" : "No"}
          onChange={handleChange}
        >
          <option>Shipping?</option>

          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      {/* Quantity */}
      <div className="product_create__form_div">
        <span
          style={{ fontSize: "16px", fontStyle: "italic", fontWeight: "500" }}
        >
          QUANTITY:
        </span>

        <Input
          style={{
            background: "#fff",
          }}
          type="number"
          className="h3"
          placeholder="Quantity"
          name="quantity"
          value={quantity}
          onChange={handleChange}
          required
        />
      </div>

      {/* colors */}
      <div className="product_create__form_div ">
        <span
          style={{
            fontSize: "16px",
            fontStyle: "italic",
            fontWeight: "500",
          }}
        >
          COLOR:
        </span>

        <select
          className=" col-md-12 h3 btn border product_create__form_select text-dark"
          style={{
            background: "#fff",
            borderRadius: "0 12px 0 12px",
            margin: "10px 0",
          }}
          name="color"
          required
          value={color}
          onChange={handleChange}
        >
          <option> - - - Select Color - - -</option>
          {colors.map((c, index) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div className="product_create__form_div">
        <span
          style={{ fontSize: "16px", fontStyle: "italic", fontWeight: "500" }}
        >
          BRAND:
        </span>

        <select
          className=" col-md-12 h3 btn border product_create__form_select text-dark"
          style={{
            background: "#fff",
            borderRadius: "0 12px 0 12px",
            margin: "10px 0",
          }}
          name="brand"
          required
          value={brand}
          onChange={handleChange}
        >
          <option> - - - Select Brand - - -</option>
          {brands && brands.map((b, index) => <option key={index}>{b}</option>)}
        </select>
      </div>

      {/* {JSON.stringify(subOptions)} */}

      {/* Load Categories */}
      <div className="product_create__form_div">
        <span
          style={{ fontSize: "16px", fontStyle: "italic", fontWeight: "500" }}
        >
          CATEGORY:
        </span>

        <select
          className=" col-md-12 h3 btn border product_create__form_select text-dark"
          style={{
            background: "#fff",
            borderRadius: "0 12px 0 12px",
            margin: "10px 0",
          }}
          name="category"
          // multiple={true}
          onChange={handleCategoryChange}
          // value={category}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {/* subcategories */}
      <div className="product_create__form_div">
        <span
          style={{ fontSize: "16px", fontStyle: "italic", fontWeight: "500" }}
        >
          SUB-CATEGORIES:
        </span>

        <Select
          className=" text-left col-md-12 h3 btn border product_create__form_select"
          mode="multiple"
          // allowClear
          placeholder="- - - select Subcategories - - -"
          onChange={(value) => setSubsArray(value)}
          value={subsArray}
          // name="subs"
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option value={s._id} key={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>

      <Button
        type="primary submit"
        size="large"
        onClick={handleSubmit}
        block
        shape="round"
        icon={<SendOutlined />}
        // disabled={!email || password.length < 6}
      >
        Submit
      </Button>
    </form>
  );
};

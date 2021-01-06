import { SendOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
// import { Option } from "antd/lib/mentions";

const { Option } = Select;

export const CreateForm = ({
  handleSubmit,
  values,
  handleChange,
  handleCategoryChange,
  subOptions,
  setValues,
  showSub,
  categories,
}) => {
  //   values destructuring
  const {
    title,
    description,
    price,
    // categories,
    // category,
    subs,
    // shipping,
    quantity,
    brands,
    // images,
    colors,
    // color,
    // brand,
  } = values;
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
          className=" col-md-12 h3 btn border product_create__form_select"
          style={{
            background: "#fff",
            borderRadius: "0 12px 0 12px",
            margin: "10px 0",
          }}
          name="shipping"
          required
          // value={secondCity}
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
      <div className="product_create__form_div">
        <span
          style={{ fontSize: "16px", fontStyle: "italic", fontWeight: "500" }}
        >
          COLORS:
        </span>

        <select
          className=" col-md-12 h3 btn border product_create__form_select"
          style={{
            background: "#fff",
            borderRadius: "0 12px 0 12px",
            margin: "10px 0",
          }}
          name="color"
          required
          // value={secondCity}
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
          className=" col-md-12 h3 btn border product_create__form_select"
          style={{
            background: "#fff",
            borderRadius: "0 12px 0 12px",
            margin: "10px 0",
          }}
          name="brand"
          required
          // value={secondCity}
          onChange={handleChange}
        >
          <option> - - - Select Brand - - -</option>
          {brands.map((b, index) => (
            <option key={index}>{b.name}</option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div className="product_create__form_div">
        <span
          style={{ fontSize: "16px", fontStyle: "italic", fontWeight: "500" }}
        >
          CATEGORY:
        </span>

        <select
          className=" col-md-12 h3 btn border product_create__form_select"
          style={{
            background: "#fff",
            borderRadius: "0 12px 0 12px",
            margin: "10px 0",
          }}
          // value={secondCity}
          name="category"
          onChange={handleCategoryChange}
        >
          <option value="">. . . click to Select Category</option>
          {categories.map((c) => (
            <option value={c._id} key={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* {JSON.stringify(categories)} */}

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
          onChange={(v) => setValues({ ...values, subs: v })}
          value={subs}
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

      {/* {JSON.stringify(subOptions)} */}

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

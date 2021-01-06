import { ReloadOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

export const Navigation = ({ loading }) => (
  <nav
    className="navbar mb-1 bg-light form-inline"
    style={{ borderRadius: "10px 10px 0 0", width: "100%" }}
  >
    <Tooltip className="float-left" placement="top" title={"Reload Page"}>
      <Button
        type="primary"
        shape="circle"
        icon={<ReloadOutlined />}
        onClick={() => window.location.reload()}
      />
    </Tooltip>

    {loading ? (
      <h3
        className="navbar-brand "
        style={{ fontFamily: "Roboto", margin: "auto" }}
      >
        <strong className="text-warning">LOADING . . .</strong>
      </h3>
    ) : (
      <h4
        className="navbar-brand"
        style={{ fontFamily: "Roboto", margin: "auto " }}
      >
        <strong> CREATE NEW PRODUCT : </strong>
      </h4>
    )}

    {/* <Search setKeyword={setKeyword} keyword={keyword} /> */}
  </nav>
);

export default Navigation;

import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UnorderedListOutlined,
  BellOutlined,
  AlertOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "dashboard",
      icon: <HomeOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "sessions",
      icon: <UnorderedListOutlined />,
      label: "Sessions",
      onClick: () => navigate("/sessions"),
    },
  ];

  return (
    <Layout.Sider className="sidebar" width={200} collapsible trigger={null}>
      <div className="sidebar-logo">
  
        <span className="logo-text">PostureAI</span>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        items={menuItems}
        className="sidebar-menu"
      />
    </Layout.Sider>
  );
}

export default Sidebar;

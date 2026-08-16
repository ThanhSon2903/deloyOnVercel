import { useState } from "react";
import { Layout, Menu, Button } from "antd";
import uttLogo from "../../assets/logo.png";
import {
  HomeOutlined,
  UnorderedListOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: "dashboard",
      icon: <HomeOutlined className="menu-icon-glow" />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "sessions",
      icon: <UnorderedListOutlined className="menu-icon-glow" />,
      label: "Sessions",
      onClick: () => navigate("/sessions"),
    },
  ];

  return (
    <Layout.Sider 
      className="sidebar-custom" 
      width={240}
      collapsedWidth={80}
      collapsible 
      collapsed={collapsed}
      trigger={null}
    >
      <div className="sidebar-header-wrapper">
        <div className="sidebar-logo">
          <img 
            src={uttLogo} 
            alt="UTT Logo" 
            className="utt-logo-img"
          />
        </div>
        
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="collapse-toggle-btn"
        />
      </div>

      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        items={menuItems}
        className="sidebar-menu-custom"
      />
    </Layout.Sider>
  );
}

export default Sidebar;
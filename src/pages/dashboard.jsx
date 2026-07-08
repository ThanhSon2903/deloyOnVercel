import { useEffect, useState } from "react";
import { getDashboardSummary } from "../service/dashboardService";
import { Layout, Row, Col, Card } from "antd";
import { Avatar, Dropdown } from "antd";
import {
  ThunderboltOutlined,
  UserOutlined,
  LogoutOutlined,
  ReloadOutlined,       // Thêm icon Refresh
  BellOutlined,         // Thêm icon Notification
  SettingOutlined       // Thêm icon Settings
} from "@ant-design/icons";
import StatsCard from "../components/dashboard/StatsCard";
import LiveMonitoring from "../components/dashboard/LiveMonitoring";
import PostureStatus from "../components/dashboard/PostureStatus";
import Sidebar from "../components/dashboard/Sidebar";
import "./dashboard.css";

const { Header, Content } = Layout;

function Dashboard() {
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dashboard, setDashboard] = useState({
    totalSessions: 0,
    badPostureDuration: 0,
    totalAlerts: 0,
    totalNotifications: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const res = await getDashboardSummary();
      setDashboard(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTracking = (sessionId) => {
    setCurrentSessionId(sessionId);
    setIsLive(true);
  };

  const handleEndTracking = () => {
    setIsLive(false);
    setCurrentSessionId(null);
  };

  const logoutMenu = {
    items: [
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Logout",
      },
    ],
    onClick: ({ key }) => {
      if (key === "logout") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    },
  };

  return (
    <Layout className="dashboard-layout">
      <Sidebar />
      <Layout className="main-layout">
        <Header className="dashboard-navbar">
          <div className="header-left">
            <h1 className="dashboard-title">Dashboard</h1>
            <span className="session-tag">
              <ThunderboltOutlined className="blink-icon" /> 
              {isLive ? `Session #${currentSessionId} Active` : "No Active Session"}
            </span>
          </div>
          
          {/* Cập nhật khu vực góc phải bổ sung các icon chức năng */}
          <div className="header-right" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <ReloadOutlined 
              className="header-icon" 
              onClick={loadDashboard} 
              style={{ fontSize: "18px", color: "#9ca3af", cursor: "pointer" }} 
            />
            <BellOutlined 
              className="header-icon" 
              style={{ fontSize: "18px", color: "#9ca3af", cursor: "pointer" }} 
            />
            <SettingOutlined 
              className="header-icon" 
              style={{ fontSize: "18px", color: "#9ca3af", cursor: "pointer" }} 
            />
            
            <Dropdown
              menu={logoutMenu}
              trigger={["hover"]}
              placement="bottomRight"
            >
              <Avatar
                size={38}
                icon={<UserOutlined />}
                style={{
                  backgroundColor: "#14b8a6",
                  cursor: "pointer",
                }}
              />
            </Dropdown>
          </div>
        </Header>

        <Content className="dashboard-content">
          {/* Stats Section */}
          <Row gutter={[16, 16]} className="stats-row">
            <Col xs={24} sm={12} lg={6}>
              <StatsCard title="Total Sessions" value={dashboard.totalSessions} changeType="positive" />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <StatsCard title="Bad Posture Duration" value={`${dashboard.badPostureDuration} mins`} changeType="positive" />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <StatsCard title="Total Alerts" value={dashboard.totalAlerts} subtitle="Today" icon="warning" />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <StatsCard title="Notifications" value={dashboard.totalNotifications} />
            </Col>
          </Row>

          {/* Live Monitoring Section */}
          <div className="section-header">
            <h2 className="section-title">Live Monitoring</h2>
            {isLive && (
              <div className="live-indicator">
                <span className="dot visual-blink"></span> Streaming Live
              </div>
            )}
          </div>

          <Row gutter={[16, 16]} className="live-monitoring-row">
            <Col xs={24} lg={16}>
              <Card className="card-dark custom-glow" bordered={false}>
                <LiveMonitoring 
                  isTracking={isLive} 
                  sessionId={currentSessionId} 
                  onStart={handleStartTracking} 
                  onEnd={handleEndTracking} 
                />
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <PostureStatus sessionId={currentSessionId} isTracking={isLive} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;